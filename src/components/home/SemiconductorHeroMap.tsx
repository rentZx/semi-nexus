import { useMemo } from "react";
import { chainOverviewEdges, chainOverviewNodes } from "../../data/chainOverview";
import type { ChainOverviewNode } from "../../data/chainOverview";
import { cn } from "../../utils/cn";

type PositionedNode = ChainOverviewNode & {
  x: number;
  y: number;
};

type SemiconductorHeroMapProps = {
  activeId: string | null;
  lockedId: string | null;
  onActiveChange: (nodeId: string | null) => void;
  onLockChange: (nodeId: string | null) => void;
};

const positions: Record<string, { x: number; y: number }> = {
  equipment: { x: 230, y: 190 },
  materials: { x: 230, y: 360 },
  "eda-ip": { x: 230, y: 530 },
  design: { x: 540, y: 190 },
  manufacturing: { x: 650, y: 360 },
  packaging: { x: 760, y: 530 },
  downstream: { x: 1030, y: 360 },
};

const categoryLabels = [
  { label: "上游支撑", x: 116, y: 96 },
  { label: "中游核心", x: 500, y: 96 },
  { label: "需求牵引", x: 925, y: 96 },
];

export function SemiconductorHeroMap({ activeId, lockedId, onActiveChange, onLockChange }: SemiconductorHeroMapProps) {
  const effectiveId = lockedId ?? activeId;
  const positionedNodes = useMemo<PositionedNode[]>(
    () => chainOverviewNodes.map((node) => ({ ...node, ...positions[node.id] })),
    []
  );
  const relatedIds = new Set<string>([
    ...(effectiveId ? [effectiveId] : []),
    ...chainOverviewEdges.filter((edge) => edge.source === effectiveId || edge.target === effectiveId).flatMap((edge) => [edge.source, edge.target]),
  ]);

  function handleLeave() {
    if (!lockedId) onActiveChange(null);
  }

  function handleCanvasClick() {
    if (lockedId) onLockChange(null);
  }

  return (
    <div className="glass hud-grid h-full min-h-0 min-w-0 overflow-hidden rounded-[2rem] p-4 sm:p-5" onClick={handleCanvasClick}>
      <svg
        viewBox="0 0 1240 720"
        preserveAspectRatio="xMidYMid meet"
        className="block h-full w-full select-none"
        role="img"
        aria-label="半导体产业链动态主图"
      >
        <defs>
          <linearGradient id="semi-flow-v22" x1="0" x2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="66%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <radialGradient id="semi-core-v22" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.42" />
            <stop offset="55%" stopColor="#2563eb" stopOpacity="0.13" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>
          <filter id="semi-soft-glow-v22" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="semi-arrow-v22" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#22d3ee" />
          </marker>
        </defs>

        <rect x="48" y="54" width="1144" height="610" rx="38" fill="rgba(2,6,23,0.28)" stroke="rgba(56,189,248,0.12)" />
        <circle cx="650" cy="360" r="190" fill="url(#semi-core-v22)" opacity="0.9" />
        {categoryLabels.map((item) => (
          <text key={item.label} x={item.x} y={item.y} fill="#67e8f9" fontSize="21" fontWeight="850">
            {item.label}
          </text>
        ))}

        {chainOverviewEdges.map((edge) => {
          const source = positionedNodes.find((node) => node.id === edge.source);
          const target = positionedNodes.find((node) => node.id === edge.target);
          if (!source || !target) return null;
          const highlighted = !effectiveId || edge.source === effectiveId || edge.target === effectiveId;
          const d =
            edge.source === "downstream"
              ? `M ${source.x - 106} ${source.y - 8} C 890 180 660 132 ${target.x + 106} ${target.y - 8}`
              : `M ${source.x + 106} ${source.y} C ${(source.x + target.x) / 2} ${source.y} ${(source.x + target.x) / 2} ${target.y} ${target.x - 106} ${target.y}`;
          return (
            <path
              key={edge.id}
              className={highlighted ? "energy-line" : ""}
              d={d}
              fill="none"
              stroke="url(#semi-flow-v22)"
              strokeLinecap="round"
              strokeWidth={highlighted ? 3.2 : 1.4}
              opacity={highlighted ? 0.78 : 0.11}
              markerEnd={highlighted ? "url(#semi-arrow-v22)" : undefined}
            />
          );
        })}

        {positionedNodes.map((node) => (
          <HeroNode
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

function HeroNode({
  node,
  active,
  dimmed,
  onEnter,
  onLeave,
  onClick,
}: {
  node: PositionedNode;
  active: boolean;
  dimmed: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: (event: React.MouseEvent<SVGGElement>) => void;
}) {
  const width = node.id === "downstream" ? 218 : 204;
  const fill = active ? "rgba(34,211,238,0.23)" : "rgba(15,23,42,0.9)";
  const stroke = active ? "rgba(34,211,238,0.92)" : "rgba(56,189,248,0.32)";

  return (
    <g
      className={cn("cursor-pointer transition-opacity duration-200", dimmed && "opacity-28")}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <rect
        className={active ? "pulse-node" : ""}
        x={node.x - width / 2}
        y={node.y - 42}
        width={width}
        height="84"
        rx="22"
        fill={fill}
        stroke={stroke}
        strokeWidth={active ? 2.8 : 1.5}
        filter={active ? "url(#semi-soft-glow-v22)" : undefined}
      />
      <text x={node.x} y={node.y - 8} textAnchor="middle" fill="#f8fafc" fontSize="22" fontWeight="850">
        {node.label}
      </text>
      <text x={node.x} y={node.y + 22} textAnchor="middle" fill="#cbd5e1" fontSize="14" fontWeight="600">
        {node.locationLabel}
      </text>
    </g>
  );
}
