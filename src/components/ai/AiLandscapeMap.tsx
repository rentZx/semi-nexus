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
  "ai-chip": { x: 96, y: 210 },
  hbm: { x: 220, y: 210 },
  "advanced-packaging": { x: 344, y: 210 },
  "ic-substrate": { x: 484, y: 210 },
  pcb: { x: 624, y: 210 },
  "ai-server": { x: 760, y: 210 },
  "data-center": { x: 900, y: 210 },
  "optical-cpo": { x: 760, y: 82 },
  "dc-interconnect": { x: 900, y: 82 },
  "liquid-cooling": { x: 760, y: 338 },
  "server-power": { x: 900, y: 338 },
  "power-device": { x: 900, y: 452 },
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
    <div className="glass hud-grid flex min-h-[520px] min-w-0 flex-col overflow-hidden rounded-[1.75rem] p-4" onClick={handleCanvasClick}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/90">AI Infrastructure Map</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-50">AI 算力产业链核心图</h2>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
          {Object.entries(pathStyle).map(([key, item]) => (
            <span key={key} className="rounded-full border px-2.5 py-1" style={{ borderColor: `${item.color}55`, color: item.color }}>
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <svg
        viewBox="0 0 980 520"
        preserveAspectRatio="xMidYMid meet"
        className="block h-full min-h-0 w-full flex-1 select-none"
        role="img"
        aria-label="AI 算力产业链核心图"
      >
        <defs>
          <filter id="ai-soft-glow-v21" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="ai-arrow-v21" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#22d3ee" />
          </marker>
        </defs>

        <rect x="26" y="28" width="928" height="456" rx="30" fill="rgba(2,6,23,0.33)" stroke="rgba(56,189,248,0.13)" />
        <text x="54" y="64" fill="#67e8f9" fontSize="13" fontWeight="800">核心算力链</text>
        <text x="690" y="62" fill="#c4b5fd" fontSize="13" fontWeight="800">光通信链</text>
        <text x="690" y="488" fill="#fde68a" fontSize="13" fontWeight="800">散热电源链</text>

        {aiLandscapeEdges.map((edge) => {
          const source = positionedNodes.find((node) => node.id === edge.source);
          const target = positionedNodes.find((node) => node.id === edge.target);
          if (!source || !target) return null;
          const highlighted = !effectiveId || edge.source === effectiveId || edge.target === effectiveId;
          const color = pathStyle[edge.path].color;
          const isVertical = Math.abs(source.x - target.x) < 16;
          const d = isVertical
            ? `M ${source.x} ${source.y + 30} C ${source.x} ${(source.y + target.y) / 2} ${target.x} ${(source.y + target.y) / 2} ${target.x} ${target.y - 30}`
            : `M ${source.x + 58} ${source.y} C ${(source.x + target.x) / 2} ${source.y} ${(source.x + target.x) / 2} ${target.y} ${target.x - 58} ${target.y}`;
          return (
            <path
              key={edge.id}
              className={highlighted ? "energy-line" : ""}
              d={d}
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeWidth={highlighted ? 2.35 : 1.25}
              opacity={highlighted ? 0.76 : 0.14}
              markerEnd={highlighted ? "url(#ai-arrow-v21)" : undefined}
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
  const width = node.id === "advanced-packaging" || node.id === "ic-substrate" || node.id === "liquid-cooling" || node.id === "server-power" ? 118 : 106;
  const color = node.layer === "thermal" ? "#fbbf24" : node.layer === "interconnect" ? "#a78bfa" : "#22d3ee";
  const fill = active ? "rgba(34,211,238,0.2)" : "rgba(15,23,42,0.88)";

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
        y={node.y - 28}
        width={width}
        height="56"
        rx="17"
        fill={fill}
        stroke={active ? color : `${color}66`}
        strokeWidth={active ? 2.25 : 1.25}
        filter={active ? "url(#ai-soft-glow-v21)" : undefined}
      />
      <text x={node.x} y={node.y + 4} textAnchor="middle" fill="#f8fafc" fontSize="12.5" fontWeight="850">
        {node.label}
      </text>
    </g>
  );
}
