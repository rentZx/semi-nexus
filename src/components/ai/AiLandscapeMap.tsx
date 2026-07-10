import { useMemo } from "react";
import { aiLandscapeEdges, aiLandscapeNodes } from "../../data/aiLandscape";
import type { AiLandscapeNode } from "../../data/aiLandscape";
import { cn } from "../../utils/cn";

type PositionedAiNode = AiLandscapeNode & {
  x: number;
  y: number;
};

type AiLandscapeMapProps = {
  activeId: string | null;
  lockedId: string | null;
  onActiveChange: (nodeId: string | null) => void;
  onLockChange: (nodeId: string | null) => void;
};

const positions: Record<string, { x: number; y: number }> = {
  "ai-chip": { x: 120, y: 260 },
  hbm: { x: 260, y: 260 },
  "advanced-packaging": { x: 420, y: 260 },
  "ic-substrate": { x: 590, y: 260 },
  pcb: { x: 750, y: 260 },
  "ai-server": { x: 920, y: 260 },
  "data-center": { x: 1100, y: 260 },
  "optical-cpo": { x: 920, y: 105 },
  "dc-interconnect": { x: 1100, y: 105 },
  "liquid-cooling": { x: 920, y: 420 },
  "server-power": { x: 1100, y: 420 },
  "power-device": { x: 1100, y: 555 },
};

const pathStyle = {
  compute: { color: "#0891b2", colorDark: "#22d3ee", label: "核心算力链" },
  optical: { color: "#7c3aed", colorDark: "#a78bfa", label: "光通信链" },
  thermal: { color: "#d97706", colorDark: "#fbbf24", label: "散热电源链" },
} as const;

export function AiLandscapeMap({ activeId, lockedId, onActiveChange, onLockChange }: AiLandscapeMapProps) {
  const effectiveId = lockedId ?? activeId;
  const positionedNodes = useMemo<PositionedAiNode[]>(
    () => aiLandscapeNodes.map((node) => ({ ...node, ...positions[node.id] })),
    []
  );
  const activeEdges = aiLandscapeEdges.filter((edge) => edge.source === effectiveId || edge.target === effectiveId);
  const relatedIds = new Set<string>([
    ...(effectiveId ? [effectiveId] : []),
    ...activeEdges.flatMap((edge) => [edge.source, edge.target]),
    ...(aiLandscapeNodes.find((node) => node.id === effectiveId)?.relatedNodes ?? []),
  ]);

  function handleLeave() {
    if (!lockedId) onActiveChange(null);
  }

  function handleCanvasClick() {
    if (lockedId) onLockChange(null);
  }

  return (
    <div className="surface flex min-h-[580px] min-w-0 flex-col overflow-hidden rounded-[2rem]"
         onClick={handleCanvasClick}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">AI Infrastructure</p>
          <h2 className="mt-1 text-xl font-semibold text-heading">AI 算力产业链核心图</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(pathStyle) as Array<keyof typeof pathStyle>).map((key) => (
            <span
              key={key}
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
              style={{
                borderColor: `${pathStyle[key].color}40`,
                color: `var(--color-accent, ${pathStyle[key].color})`,
                background: `var(--color-accent-soft)`,
              }}
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: `${pathStyle[key].color}` }}
              />
              {pathStyle[key].label}
            </span>
          ))}
        </div>
      </div>

      {/* SVG Map — flex-1 fills remaining space */}
      <svg
        viewBox="0 0 1220 650"
        preserveAspectRatio="xMidYMid meet"
        className="block w-full flex-1 select-none"
        role="img"
        aria-label="AI 算力产业链核心图"
      >
        <defs>
          <filter id="ai-glow-v24" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="ai-arrow-v24" markerWidth="8" markerHeight="8" refX="7.5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="var(--color-accent, #0891b2)" />
          </marker>
        </defs>

        {/* Background area */}
        <rect
          x="34" y="42" width="1152" height="560" rx="36"
          style={{ fill: 'var(--color-card-hover)', stroke: 'var(--color-line)', strokeWidth: 1 }}
        />

        {/* Chain labels */}
        <text x="66" y="82" style={{ fill: 'var(--color-accent)' }} fontSize="17" fontWeight="750">核心算力链</text>
        <text x="792" y="82" fill="#7c3aed" fontSize="17" fontWeight="750" style={{ fill: `var(--color-accent, #7c3aed)` }}>光通信链</text>
        <text x="792" y="610" fill="#d97706" fontSize="17" fontWeight="750">散热电源链</text>

        {/* Edges */}
        {aiLandscapeEdges.map((edge) => {
          const source = positionedNodes.find((node) => node.id === edge.source);
          const target = positionedNodes.find((node) => node.id === edge.target);
          if (!source || !target) return null;
          const highlighted = !effectiveId || edge.source === effectiveId || edge.target === effectiveId;
          const isVertical = Math.abs(source.x - target.x) < 16;
          const d = isVertical
            ? `M ${source.x} ${source.y + 38} C ${source.x} ${(source.y + target.y) / 2} ${target.x} ${(source.y + target.y) / 2} ${target.x} ${target.y - 38}`
            : `M ${source.x + 72} ${source.y} C ${(source.x + target.x) / 2} ${source.y} ${(source.x + target.x) / 2} ${target.y} ${target.x - 72} ${target.y}`;
          return (
            <path
              key={edge.id}
              d={d}
              fill="none"
              style={{ stroke: 'var(--color-accent)' }}
              strokeLinecap="round"
              strokeWidth={highlighted ? 2.8 : 1.4}
              opacity={highlighted ? 0.75 : 0.12}
              markerEnd={highlighted ? "url(#ai-arrow-v24)" : undefined}
            />
          );
        })}

        {/* Nodes */}
        {positionedNodes.map((node) => (
          <AiNode
            key={node.id}
            node={node}
            active={node.id === effectiveId}
            dimmed={Boolean(effectiveId) && !relatedIds.has(node.id)}
            onEnter={() => {
              if (!lockedId) onActiveChange(node.id);
            }}
            onLeave={handleLeave}
            onClick={(event) => {
              event.stopPropagation();
              onLockChange(lockedId === node.id ? null : node.id);
              onActiveChange(node.id);
            }}
          />
        ))}

      </svg>
    </div>
  );
}

function AiNode({
  node,
  active,
  dimmed,
  onEnter,
  onLeave,
  onClick,
}: {
  node: PositionedAiNode;
  active: boolean;
  dimmed: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: (event: React.MouseEvent<SVGGElement>) => void;
}) {
  const width = ["advanced-packaging", "ic-substrate", "liquid-cooling", "server-power"].includes(node.id) ? 146 : 132;

  return (
    <g
      className={cn("cursor-pointer transition-opacity duration-200", dimmed && "opacity-25")}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ transition: 'opacity 200ms ease' }}
    >
      <rect
        x={node.x - width / 2}
        y={node.y - 36}
        width={width}
        height="72"
        rx="20"
        style={{
          fill: active ? 'var(--color-accent-soft)' : 'var(--color-card)',
          stroke: active ? 'var(--color-accent)' : 'var(--color-line-strong)',
          strokeWidth: active ? 2.5 : 1.2,
          filter: active ? 'url(#ai-glow-v24)' : 'none',
          transition: 'fill 200ms ease, stroke 200ms ease',
        }}
      />
      <text
        x={node.x}
        y={node.y + 6}
        textAnchor="middle"
        style={{
          fill: active ? 'var(--color-accent)' : 'var(--color-heading)',
          fontSize: 17,
          fontWeight: 750,
          transition: 'fill 200ms ease',
        }}
      >
        {node.label}
      </text>
    </g>
  );
}
