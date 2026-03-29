/**
 * Normalizes assistant replies: no markdown/special markup visible, consistent structure for UI parsing.
 */
export function sanitizeChatReply(raw: string): string {
  let s = raw.replace(/\r\n/g, "\n").trim();

  // fenced code blocks: keep inner text only
  s = s.replace(/^```[\w]*\n?([\s\S]*?)```$/gm, "$1");
  s = s.replace(/```[\w]*\n?([\s\S]*?)```/g, "$1");

  // bold
  s = s.replace(/\*\*([^*]+)\*\*/g, "$1");
  s = s.replace(/__([^_]+)__/g, "$1");
  // line-start * used as bullet (before paired * italic)
  s = s.replace(/^\*\s+/gm, "- ");
  // italic (paired asterisk/underscore)
  s = s.replace(/\*([^*]+)\*/g, "$1");
  s = s.replace(/_([^_]+)_/g, "$1");

  // headings
  s = s.replace(/^#{1,6}\s+/gm, "");

  // inline code delimiters only
  s = s.replace(/`([^`]+)`/g, "$1");

  // stray backticks
  s = s.replace(/`/g, "");

  // bullets: normalize common markers to hyphen + space
  s = s.replace(/^[•‣▪▸]\s*/gm, "- ");

  // collapse 3+ newlines
  s = s.replace(/\n{3,}/g, "\n\n");

  return s.trim();
}

export type AssistantBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "numbered"; items: string[] };

/**
 * Turns plain text into blocks for structured rendering (lists, paragraphs).
 */
export function parseAssistantBlocks(text: string): AssistantBlock[] {
  const lines = text.split("\n");
  const blocks: AssistantBlock[] = [];
  let para: string[] = [];
  let bullets: string[] = [];
  let numbered: string[] = [];

  const flushPara = () => {
    const t = para.join(" ").replace(/\s+/g, " ").trim();
    if (t) blocks.push({ type: "paragraph", text: t });
    para = [];
  };
  const flushBullets = () => {
    if (bullets.length) {
      blocks.push({ type: "bullets", items: [...bullets] });
      bullets = [];
    }
  };
  const flushNumbered = () => {
    if (numbered.length) {
      blocks.push({ type: "numbered", items: [...numbered] });
      numbered = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushPara();
      flushBullets();
      flushNumbered();
      continue;
    }

    const bulletMatch = trimmed.match(/^[-–—]\s+(.+)$/);
    const numMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);

    if (bulletMatch) {
      flushPara();
      flushNumbered();
      bullets.push(bulletMatch[1].trim());
      continue;
    }

    if (numMatch) {
      flushPara();
      flushBullets();
      numbered.push(numMatch[2].trim());
      continue;
    }

    flushBullets();
    flushNumbered();
    para.push(trimmed);
  }

  flushPara();
  flushBullets();
  flushNumbered();
  return blocks;
}
