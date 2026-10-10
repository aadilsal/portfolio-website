import { Reveal } from "@/components/Reveal";
import type { CaseStudy } from "@/lib/types";

type Diagram = CaseStudy["diagram"];

/**
 * Lays the nodes out as a row of columns: each node sits one column after the
 * node that points at it, and siblings stack vertically. Arrows are SVG paths
 * that draw in request order.
 */
function toColumns(diagram: Diagram): string[][] {
  const col: Record<string, number> = {};
  const roots = diagram.nodes.filter((n) => !diagram.edges.some(([, to]) => to === n.id));
  roots.forEach((r) => (col[r.id] = 0));
  for (let pass = 0; pass < diagram.nodes.length; pass++) {
    for (const [from, to] of diagram.edges) {
      if (col[from] != null) col[to] = Math.max(col[to] ?? 0, col[from] + 1);
    }
  }
  const columns: string[][] = [];
  diagram.nodes.forEach((n) => (columns[col[n.id] ?? 0] ??= []).push(n.id));
  return columns;
}

/** Top-to-bottom version for narrow slots: one row per step, siblings side by side. */
function ColumnDiagram({ diagram }: { diagram: Diagram }) {
  const rows = toColumns(diagram);
  const byId = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]));
  return (
    <Reveal>
      <div className="rounded-xl border border-line bg-surface p-5" role="img" aria-label={diagram.caption}>
        {rows.map((ids, r) => (
          <div key={ids.join()}>
            {r > 0 ? (
              <svg className="flow-arrow mx-auto my-1 block" width="12" height="22" aria-hidden="true">
                <path
                  d="M6,0 L6,20 M1,15 L6,21 L11,15"
                  pathLength={1}
                  fill="none"
                  stroke="var(--text-dim)"
                  style={{ "--i": r - 1 } as React.CSSProperties}
                />
              </svg>
            ) : null}
            <div className="flex gap-2">
              {ids.map((id) => (
                <div
                  key={id}
                  className={`flex-1 rounded-lg border bg-bg/40 px-3 py-2 text-center ${
                    byId[id].accent ? "border-accent" : "border-line-strong"
                  }`}
                >
                  <p className="text-[14px] font-semibold leading-tight">{byId[id].title}</p>
                  <p className="mt-0.5 text-[12px] leading-tight text-text-muted">{byId[id].note}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

export function ArchitectureDiagram({ diagram, layout = "row" }: { diagram: Diagram; layout?: "row" | "column" }) {
  if (layout === "column") return <ColumnDiagram diagram={diagram} />;
  const columns = toColumns(diagram);

  const W = 180;
  const H = 72;
  const GAP_X = 64;
  const GAP_Y = 24;
  const tallest = Math.max(...columns.map((c) => c.length));
  const height = tallest * H + (tallest - 1) * GAP_Y;
  const width = columns.length * W + (columns.length - 1) * GAP_X;

  const pos: Record<string, { x: number; y: number }> = {};
  columns.forEach((ids, c) => {
    const colH = ids.length * H + (ids.length - 1) * GAP_Y;
    ids.forEach((id, r) => {
      pos[id] = { x: c * (W + GAP_X), y: (height - colH) / 2 + r * (H + GAP_Y) };
    });
  });

  const byId = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]));

  return (
    <Reveal>
      <div className="overflow-x-auto rounded-xl border border-line bg-surface/40 p-6">
        <div className="relative mx-auto" style={{ width, height }}>
          <svg className="flow-arrow absolute inset-0 overflow-visible" width={width} height={height} aria-hidden="true">
            <defs>
              <marker id="arrowhead" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto">
                <path d="M0,0 L8,4 L0,8 z" fill="var(--text-dim)" style={{ strokeDasharray: "none", strokeDashoffset: 0 }} />
              </marker>
            </defs>
            {diagram.edges.map(([from, to], i) => {
              const a = pos[from];
              const b = pos[to];
              const x1 = a.x + W;
              const y1 = a.y + H / 2;
              const x2 = b.x - 4;
              const y2 = b.y + H / 2;
              const mid = x1 + (x2 - x1) / 2;
              const d = y1 === y2 ? `M${x1},${y1} L${x2},${y2}` : `M${x1},${y1} L${mid},${y1} L${mid},${y2} L${x2},${y2}`;
              return (
                <path
                  key={`${from}-${to}`}
                  d={d}
                  pathLength={1}
                  fill="none"
                  stroke="var(--text-dim)"
                  strokeWidth={1}
                  markerEnd="url(#arrowhead)"
                  style={{ "--i": i } as React.CSSProperties}
                />
              );
            })}
          </svg>
          <ol className="contents">
            {diagram.nodes.map((n) => (
              <li
                key={n.id}
                className={`absolute flex flex-col items-center justify-center rounded-lg border bg-surface px-3 text-center ${
                  n.accent ? "border-accent" : "border-line-strong"
                }`}
                style={{ left: pos[n.id].x, top: pos[n.id].y, width: W, height: H }}
              >
                <span className="text-[14px] font-semibold leading-tight">{byId[n.id].title}</span>
                <span className="mt-1 text-[12px] leading-tight text-text-muted">{byId[n.id].note}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Reveal>
  );
}
