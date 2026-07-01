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
  compute: { color: "#22d3ee", label: "核心算力链" },
  optical: { color: "#a78bfa", label: "光通信链" },
  thermal: { color: "#fbbf24", label: "散热电源链" },
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
    <div className="glass hud-grid flex min-h-[680px] min-w-0 flex-col overflow-hidden rounded-[2rem] p-5" onClick={handleCanvasClick}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/90">AI Infrastructure Map</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-50">AI 算力产业链核心图</h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-300">
          {Object.entries(pathStyle).map(([key, item]) => (
            <span key={key} className="rounded-full border px-3 py-1.5" style={{ borderColor: `${item.color}55`, color: item.color }}>
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <svg
        viewBox="0 0 1220 650"
        preserveAspectRatio="xMidYMid meet"
        className="block h-full min-h-0 w-full flex-1 select-none"
        role="img"
        aria-label="AI 算力产业链核心图"
      >
        <defs>
          <filter id="ai-soft-glow-v22" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="ai-arrow-v22" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#22d3ee" />
          </marker>
        </defs>

        <rect x="34" y="42" width="1152" height="560" rx="38" fill="rgba(2,6,23,0.30)" stroke="rgba(56,189,248,0.13)" />
        <text x="66" y="86" fill="#67e8f9" fontSize="20" fontWeight="850">核心算力链</text>
        <text x="805" y="82" fill="#c4b5fd" fontSize="20" fontWeight="850">光通信链</text>
        <text x="805" y="610" fill="#fde68a" fontSize="20" fontWeight="850">散热电源链</text>

        {aiLandscapeEdges.map((edge) => {
          const source = positionedNodes.find((node) => node.id === edge.source);
          const target = positionedNodes.find((node) => node.id === edge.target);
          if (!source || !target) return null;
          const highlighted = !effectiveId || edge.source === effectiveId || edge.target === effectiveId;
          const color = pathStyle[edge.path].color;
          const isVertical = Math.abs(source.x - target.x) < 16;
          const d = isVertical
            ? `M ${source.x} ${source.y + 38} C ${source.x} ${(source.y + target.y) / 2} ${target.x} ${(source.y + target.y) / 2} ${target.x} ${target.y - 38}`
            : `M ${source.x + 72} ${source.y} C ${(source.x + target.x) / 2} ${source.y} ${(source.x + target.x) / 2} ${target.y} ${target.x - 72} ${target.y}`;
          return (
            <path
              key={edge.id}
              className={highlighted ? "energy-line" : ""}
              d={d}
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeWidth={highlighted ? 3 : 1.5}
              opacity={highlighted ? 0.8 : 0.13}
              markerEnd={highlighted ? "url(#ai-arrow-v22)" : undefined}
            />
          );
        })}

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
  const width = node.id === "advanced-packaging" || node.id === "ic-substrate" || node.id === "liquid-cooling" || node.id === "server-power" ? 146 : 132;
  const color = node.layer === "thermal" ? "#fbbf24" : node.layer === "interconnect" ? "#a78bfa" : "#22d3ee";
  const fill = active ? "rgba(34,211,238,0.2)" : "rgba(15,23,42,0.9)";

  return (
    <g
      className={cn("cursor-pointer transition-opacity duration-200", dimmed && "opacity-30")}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <rect
        className={active ? "pulse-node" : ""}
        x={node.x - width / 2}
        y={node.y - 36}
        width={width}
        height="72"
        rx="20"
        fill={fill}
        stroke={active ? color : `${color}66`}
        strokeWidth={active ? 2.6 : 1.4}
        filter={active ? "url(#ai-soft-glow-v22)" : undefined}
      />
      <text x={node.x} y={node.y + 6} textAnchor="middle" fill="#f8fafc" fontSize="17" fontWeight="850">
        {node.label}
      </text>
    </g>
  );
}
