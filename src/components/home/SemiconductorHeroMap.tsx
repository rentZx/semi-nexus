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
  equipment: { x: 150, y: 155 },
  materials: { x: 150, y: 280 },
  "eda-ip": { x: 150, y: 405 },
  design: { x: 390, y: 155 },
  manufacturing: { x: 510, y: 280 },
  packaging: { x: 630, y: 405 },
  downstream: { x: 810, y: 280 },
};

const categoryLabels = [
  { label: "上游支撑", x: 72, y: 78 },
  { label: "中游核心", x: 360, y: 78 },
  { label: "需求牵引", x: 730, y: 78 },
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
    <div className="glass hud-grid flex h-full min-h-[420px] min-w-0 flex-col overflow-hidden rounded-[1.75rem] p-3 sm:p-4 xl:min-h-0" onClick={handleCanvasClick}>
      <div className="flex items-center justify-between gap-3 px-1 pb-2">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/90">Industry Cockpit</p>
          <h2 className="mt-1 truncate text-lg font-semibold text-slate-50 sm:text-xl">半导体产业链动态主图</h2>
        </div>
        <div className="hidden shrink-0 gap-2 text-[11px] text-slate-400 sm:flex">
          <span className="rounded-full border border-cyan-300/18 px-2.5 py-1">Hover 展开</span>
          <span className="rounded-full border border-cyan-300/18 px-2.5 py-1">Click 锁定</span>
        </div>
      </div>

      <svg
        viewBox="0 0 960 540"
        preserveAspectRatio="xMidYMid meet"
        className="block h-full min-h-0 w-full flex-1 select-none"
        role="img"
        aria-label="半导体产业链动态主图"
      >
        <defs>
          <linearGradient id="semi-flow-v21" x1="0" x2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="66%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <radialGradient id="semi-core-v21" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.62" />
            <stop offset="58%" stopColor="#2563eb" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>
          <filter id="semi-soft-glow-v21" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="semi-arrow-v21" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#22d3ee" />
          </marker>
        </defs>

        <rect x="28" y="36" width="904" height="468" rx="30" fill="rgba(2,6,23,0.34)" stroke="rgba(56,189,248,0.13)" />
        {categoryLabels.map((item) => (
          <text key={item.label} x={item.x} y={item.y} fill="#67e8f9" fontSize="13" fontWeight="800">
            {item.label}
          </text>
        ))}

        <circle cx="508" cy="278" r="116" fill="url(#semi-core-v21)" opacity="0.82" />
        <rect x="454" y="226" width="108" height="104" rx="24" fill="rgba(2,6,23,0.78)" stroke="rgba(34,211,238,0.55)" />
        <text x="508" y="274" textAnchor="middle" fill="#f8fafc" fontSize="17" fontWeight="900">SemiNexus</text>
        <text x="508" y="300" textAnchor="middle" fill="#94a3b8" fontSize="12">产业链中枢</text>

        {chainOverviewEdges.map((edge) => {
          const source = positionedNodes.find((node) => node.id === edge.source);
          const target = positionedNodes.find((node) => node.id === edge.target);
          if (!source || !target) return null;
          const highlighted = !effectiveId || edge.source === effectiveId || edge.target === effectiveId;
          return (
            <path
              key={edge.id}
              className={highlighted ? "energy-line" : ""}
              d={edge.source === "downstream"
                ? `M ${source.x - 78} ${source.y - 4} C 675 165 520 132 ${target.x + 78} ${target.y - 4}`
                : `M ${source.x + 78} ${source.y} C ${(source.x + target.x) / 2} ${source.y} ${(source.x + target.x) / 2} ${target.y} ${target.x - 78} ${target.y}`}
              fill="none"
              stroke="url(#semi-flow-v21)"
              strokeLinecap="round"
              strokeWidth={highlighted ? 2.3 : 1.2}
              opacity={highlighted ? 0.72 : 0.14}
              markerEnd={highlighted ? "url(#semi-arrow-v21)" : undefined}
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

      <p className="px-1 pt-2 text-xs leading-5 text-slate-400 sm:hidden">
        手机端点击节点查看细分方向，再点击空白区域取消锁定。
      </p>
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
  const width = node.id === "downstream" ? 152 : 142;
  const fill = active ? "rgba(34,211,238,0.22)" : "rgba(15,23,42,0.88)";
  const stroke = active ? "rgba(34,211,238,0.9)" : "rgba(56,189,248,0.28)";

  return (
    <g
      className={cn("cursor-pointer transition-opacity duration-200", dimmed && "opacity-32")}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <rect
        className={active ? "pulse-node" : ""}
        x={node.x - width / 2}
        y={node.y - 31}
        width={width}
        height="62"
        rx="18"
        fill={fill}
        stroke={stroke}
        strokeWidth={active ? 2.2 : 1.3}
        filter={active ? "url(#semi-soft-glow-v21)" : undefined}
      />
      <text x={node.x} y={node.y - 4} textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="850">
        {node.label}
      </text>
      <text x={node.x} y={node.y + 18} textAnchor="middle" fill="#94a3b8" fontSize="10.5">
        {node.locationLabel}
      </text>
    </g>
  );
}
