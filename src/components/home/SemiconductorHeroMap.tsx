import { useMemo, useState } from "react";
import { chainOverviewEdges, chainOverviewNodes, getChainOverviewNode } from "../../data/chainOverview";
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
  equipment: { x: 130, y: 150 },
  materials: { x: 130, y: 330 },
  "eda-ip": { x: 130, y: 510 },
  design: { x: 450, y: 145 },
  manufacturing: { x: 450, y: 330 },
  packaging: { x: 450, y: 515 },
  "ai-server": { x: 780, y: 150 },
  automotive: { x: 780, y: 330 },
  consumer: { x: 780, y: 510 },
};

const categoryLabels = {
  upstream: "上游支撑",
  midstream: "中游核心",
  downstream: "下游应用",
};

export function SemiconductorHeroMap({ activeId, lockedId, onActiveChange, onLockChange }: SemiconductorHeroMapProps) {
  const effectiveId = lockedId ?? activeId;
  const positionedNodes = useMemo<PositionedNode[]>(
    () => chainOverviewNodes.map((node) => ({ ...node, ...positions[node.id] })),
    []
  );
  const activeNode = getChainOverviewNode(effectiveId);
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
    <div className="glass hud-grid min-h-[620px] overflow-hidden rounded-[2rem] p-4 sm:p-5" onClick={handleCanvasClick}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2">
        <div>
          <p className="text-sm font-semibold text-cyan-300">Semiconductor Industry Panorama</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-50">半导体产业链动态全景图</h2>
        </div>
        <div className="flex gap-2 text-xs text-slate-400">
          <span className="rounded-full border border-cyan-300/20 px-3 py-1">Hover 展开</span>
          <span className="rounded-full border border-cyan-300/20 px-3 py-1">Click 锁定</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox="0 0 920 620" className="min-h-[520px] min-w-[900px] w-full" role="img" aria-label="半导体产业链动态全景图">
          <defs>
            <linearGradient id="semi-flow" x1="0" x2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="58%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <radialGradient id="semi-core" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.95" />
              <stop offset="48%" stopColor="#2563eb" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0" />
            </radialGradient>
            <filter id="semi-glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <marker id="semi-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#22d3ee" />
            </marker>
          </defs>

          <rect x="18" y="30" width="884" height="550" rx="34" fill="rgba(2,6,23,0.42)" stroke="rgba(56,189,248,0.16)" />
          {(["upstream", "midstream", "downstream"] as const).map((category, index) => (
            <g key={category}>
              <rect x={44 + index * 320} y="64" width="238" height="482" rx="28" fill="rgba(15,23,42,0.38)" stroke="rgba(56,189,248,0.16)" />
              <text x={64 + index * 320} y="100" fill="#22d3ee" fontSize="14" fontWeight="700">{categoryLabels[category]}</text>
            </g>
          ))}

          <g className="pulse-node" filter="url(#semi-glow)">
            <circle cx="452" cy="330" r="82" fill="url(#semi-core)" opacity="0.82" />
            <rect x="398" y="276" width="108" height="108" rx="22" fill="rgba(2,6,23,0.88)" stroke="#22d3ee" strokeWidth="2" />
            <text x="452" y="326" textAnchor="middle" fill="#e5e7eb" fontSize="16" fontWeight="800">SemiNexus</text>
            <text x="452" y="350" textAnchor="middle" fill="#94a3b8" fontSize="12">产业中枢</text>
          </g>

          {chainOverviewEdges.map((edge) => {
            const source = positionedNodes.find((node) => node.id === edge.source);
            const target = positionedNodes.find((node) => node.id === edge.target);
            if (!source || !target) return null;
            const highlighted = !effectiveId || edge.source === effectiveId || edge.target === effectiveId;
            return (
              <path
                key={edge.id}
                className={highlighted ? "energy-line" : ""}
                d={`M ${source.x + 92} ${source.y} C ${source.x + 180} ${source.y} ${target.x - 180} ${target.y} ${target.x - 92} ${target.y}`}
                fill="none"
                stroke="url(#semi-flow)"
                strokeWidth={highlighted ? 2.8 : 1.4}
                opacity={highlighted ? 0.78 : 0.18}
                markerEnd={highlighted ? "url(#semi-arrow)" : undefined}
              />
            );
          })}

          {positionedNodes.map((node) => (
            <HeroNode
              key={node.id}
              node={node}
              active={node.id === effectiveId}
              dimmed={Boolean(effectiveId) && !relatedIds.has(node.id)}
              expanded={node.id === effectiveId}
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

      <div className="mt-4 rounded-2xl border border-cyan-300/15 bg-slate-950/40 px-4 py-3 text-sm leading-6 text-slate-300 lg:hidden">
        当前视图：{activeNode?.label ?? "半导体产业链总览"}。手机端点击节点展开，再点击空白区域解除锁定。
      </div>
    </div>
  );
}

function HeroNode({
  node,
  active,
  dimmed,
  expanded,
  onEnter,
  onLeave,
  onClick,
}: {
  node: PositionedNode;
  active: boolean;
  dimmed: boolean;
  expanded: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: (event: React.MouseEvent<SVGGElement>) => void;
}) {
  const childStartX = node.category === "downstream" ? node.x - 96 : node.x + 96;
  const childAnchor = node.category === "downstream" ? "end" : "start";
  const childBaseY = node.y - Math.min(node.children.length * 13, 92);

  return (
    <g
      className={cn("cursor-pointer transition-opacity duration-200", dimmed && "opacity-35")}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ transformOrigin: `${node.x}px ${node.y}px` }}
    >
      <rect
        className={active ? "pulse-node" : ""}
        x={node.x - 88}
        y={node.y - 32}
        width="176"
        height="64"
        rx="22"
        fill={active ? "rgba(34,211,238,0.2)" : "rgba(15,23,42,0.86)"}
        stroke={active ? "rgba(34,211,238,0.82)" : "rgba(56,189,248,0.28)"}
        strokeWidth={active ? 2.4 : 1.4}
        filter={active ? "url(#semi-glow)" : undefined}
      />
      <text x={node.x} y={node.y - 4} textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="800">
        {node.label}
      </text>
      <text x={node.x} y={node.y + 19} textAnchor="middle" fill="#94a3b8" fontSize="11">
        {node.locationLabel}
      </text>

      {expanded
        ? node.children.map((child, index) => {
            const y = childBaseY + index * 27;
            return (
              <g key={child}>
                <line
                  className="energy-line"
                  x1={node.x + (node.category === "downstream" ? -88 : 88)}
                  y1={node.y}
                  x2={childStartX + (node.category === "downstream" ? -8 : 8)}
                  y2={y - 4}
                  stroke="rgba(34,211,238,0.5)"
                  strokeWidth="1.2"
                />
                <rect
                  x={node.category === "downstream" ? childStartX - 112 : childStartX}
                  y={y - 19}
                  width="112"
                  height="24"
                  rx="12"
                  fill="rgba(2,6,23,0.88)"
                  stroke="rgba(34,211,238,0.38)"
                />
                <text x={childStartX + (node.category === "downstream" ? -10 : 10)} y={y - 2} textAnchor={childAnchor} fill="#cbd5e1" fontSize="11" fontWeight="600">
                  {child}
                </text>
              </g>
            );
          })
        : null}
    </g>
  );
}
