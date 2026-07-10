import { useMemo } from "react";
import { chainOverviewEdges, chainOverviewNodes, getChainOverviewNode, strongChainOverviewEdges } from "../../data/chainOverview";
import type { ChainOverviewEdge, ChainOverviewNode } from "../../data/chainOverview";
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

const NODE_W = 210;
const NODE_H = 82;

const positions: Record<string, { x: number; y: number }> = {
  "eda-ip": { x: 230, y: 170 },
  equipment: { x: 230, y: 350 },
  materials: { x: 230, y: 530 },
  design: { x: 560, y: 170 },
  manufacturing: { x: 820, y: 350 },
  packaging: { x: 1080, y: 530 },
  downstream: { x: 1350, y: 350 },
};

const categoryLabels = [
  { label: "上游支撑", x: 126, y: 86 },
  { label: "中游核心", x: 640, y: 86 },
  { label: "下游应用", x: 1270, y: 86 },
];

const edgeLaneOffset: Record<string, number> = {
  "eda-design": 0,
  "equipment-manufacturing": -14,
  "materials-manufacturing": 14,
  "design-manufacturing": 14,
  "manufacturing-packaging": -14,
  "packaging-downstream": 0,
  "equipment-packaging": -28,
  "materials-packaging": 28,
};

export function SemiconductorHeroMap({ activeId, lockedId, onActiveChange, onLockChange }: SemiconductorHeroMapProps) {
  const effectiveId = lockedId ?? activeId;
  const activeNode = getChainOverviewNode(effectiveId);
  const positionedNodes = useMemo<PositionedNode[]>(
    () => chainOverviewNodes.map((node) => ({ ...node, ...positions[node.id] })),
    []
  );
  const activeStrongEdges = strongChainOverviewEdges.filter((edge) => edge.source === effectiveId || edge.target === effectiveId);
  const relatedIds = new Set<string>([
    ...(effectiveId ? [effectiveId] : []),
    ...activeStrongEdges.flatMap((edge) => [edge.source, edge.target]),
  ]);
  const displayedEdges = effectiveId
    ? chainOverviewEdges.filter((edge) => edge.strength === "strong" || edge.source === effectiveId || edge.target === effectiveId)
    : strongChainOverviewEdges;

  function handleLeave() {
    if (!lockedId) onActiveChange(null);
  }

  function handleCanvasClick() {
    if (lockedId) onLockChange(null);
  }

  return (
    <div className="surface h-full min-h-0 min-w-0 overflow-hidden rounded-[2rem] p-4 sm:p-5" onClick={handleCanvasClick}>
      <svg
        viewBox="0 0 1500 720"
        preserveAspectRatio="xMidYMid meet"
        className={cn("block h-full w-full select-none transition-transform duration-300", lockedId && "translate-x-[-4%] scale-[0.94]")}
        role="img"
        aria-label="半导体产业链动态主图"
      >
        <defs>
          <linearGradient id="semi-flow-v23" x1="0" x2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="72%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <filter id="semi-soft-glow-v23" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="semi-arrow-v23" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#22d3ee" />
          </marker>
        </defs>

        <rect x="46" y="52" width="1408" height="616" rx="38" fill="rgba(2,6,23,0.26)" stroke="rgba(56,189,248,0.12)" />
        {categoryLabels.map((item) => (
          <text key={item.label} x={item.x} y={item.y} fill="#67e8f9" fontSize="21" fontWeight="850">
            {item.label}
          </text>
        ))}

        {displayedEdges.map((edge) => {
          const source = positionedNodes.find((node) => node.id === edge.source);
          const target = positionedNodes.find((node) => node.id === edge.target);
          if (!source || !target) return null;
          const highlighted = !effectiveId || edge.source === effectiveId || edge.target === effectiveId;
          return <FlowEdge key={edge.id} edge={edge} source={source} target={target} highlighted={highlighted} />;
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

        {activeNode && !lockedId ? <HoverTooltip node={activeNode} /> : null}
      </svg>
    </div>
  );
}

function FlowEdge({
  edge,
  source,
  target,
  highlighted,
}: {
  edge: ChainOverviewEdge;
  source: PositionedNode;
  target: PositionedNode;
  highlighted: boolean;
}) {
  const offset = edgeLaneOffset[edge.id] ?? 0;
  const startX = source.x + NODE_W / 2 + 12;
  const startY = source.y + offset;
  const endX = target.x - NODE_W / 2 - 12;
  const endY = target.y + offset;
  const midX = startX + Math.max(18, (endX - startX) * 0.5);
  const isWeak = edge.strength === "weak";
  const d = startY === endY
    ? `M ${startX} ${startY} L ${endX} ${endY}`
    : `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;

  return (
    <g opacity={isWeak && !highlighted ? 0 : 1}>
      <path
        d={d}
        fill="none"
        stroke={isWeak ? "rgba(148,163,184,0.38)" : "url(#semi-flow-v23)"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={highlighted ? (isWeak ? 1.8 : 3.2) : 1.4}
        opacity={highlighted ? (isWeak ? 0.45 : 0.86) : 0.18}
        markerEnd={highlighted && !isWeak ? "url(#semi-arrow-v23)" : undefined}
      />
    </g>
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
  const fill = active ? "rgba(34,211,238,0.23)" : "rgba(15,23,42,0.9)";
  const stroke = active ? "rgba(34,211,238,0.92)" : "rgba(56,189,248,0.32)";

  return (
    <g
      className={cn("cursor-pointer transition-opacity duration-200", dimmed && "opacity-30")}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <rect
        className={active ? "pulse-node" : ""}
        x={node.x - NODE_W / 2}
        y={node.y - NODE_H / 2}
        width={NODE_W}
        height={NODE_H}
        rx="22"
        fill={fill}
        stroke={stroke}
        strokeWidth={active ? 2.8 : 1.5}
        filter={active ? "url(#semi-soft-glow-v23)" : undefined}
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

function HoverTooltip({ node }: { node: ChainOverviewNode }) {
  const pos = positions[node.id];
  const tooltipX = node.category === "downstream" ? pos.x - 330 : pos.x + 132;
  const tooltipY = Math.max(108, Math.min(pos.y - 78, 548));

  return (
    <foreignObject x={tooltipX} y={tooltipY} width="300" height="150" className="pointer-events-none">
      <div className="rounded-2xl border border-accent/20 bg-card p-4 shadow-2xl backdrop-blur-xl">
        <p className="text-sm font-semibold text-accent">{node.label}</p>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-body">{node.summary}</p>
        <p className="mt-3 text-xs font-semibold text-accent">点击查看详情</p>
      </div>
    </foreignObject>
  );
}
