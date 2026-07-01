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
  "compute-design": { x: 120, y: 120 },
  "memory-base": { x: 120, y: 260 },
  "equipment-materials": { x: 120, y: 400 },
  gpu: { x: 360, y: 80 },
  asic: { x: 520, y: 80 },
  npu: { x: 680, y: 80 },
  hbm: { x: 360, y: 205 },
  dram: { x: 520, y: 205 },
  nand: { x: 680, y: 205 },
  "advanced-packaging": { x: 360, y: 330 },
  chiplet: { x: 520, y: 330 },
  cowos: { x: 680, y: 330 },
  "ic-substrate": { x: 360, y: 455 },
  pcb: { x: 520, y: 455 },
  "optical-module": { x: 680, y: 455 },
  "thermal-power": { x: 360, y: 580 },
  "ai-server": { x: 600, y: 580 },
  "data-center": { x: 900, y: 145 },
  cloud: { x: 900, y: 260 },
  training: { x: 900, y: 375 },
  inference: { x: 900, y: 490 },
  applications: { x: 900, y: 605 },
  "edge-ai": { x: 1080, y: 490 },
  "enterprise-ai": { x: 1080, y: 605 },
};

const layerLabels = {
  upstream: "上游基础支撑",
  infrastructure: "中游算力基础设施",
  application: "下游模型与应用",
};

const corePath = new Set(["gpu", "hbm", "advanced-packaging", "ic-substrate", "pcb", "ai-server", "data-center"]);

export function AiLandscapeMap({ activeId, lockedId, onActiveChange, onLockChange }: AiLandscapeMapProps) {
  const effectiveId = lockedId ?? activeId;
  const positionedNodes = useMemo<PositionedAiNode[]>(
    () => aiLandscapeNodes.map((node) => ({ ...node, ...positions[node.id] })),
    []
  );
  const relatedIds = new Set<string>([
    ...(effectiveId ? [effectiveId] : []),
    ...aiLandscapeEdges.filter((edge) => edge.source === effectiveId || edge.target === effectiveId).flatMap((edge) => [edge.source, edge.target]),
    ...(aiLandscapeNodes.find((node) => node.id === effectiveId)?.relatedNodes ?? []),
  ]);

  function handleLeave() {
    if (!lockedId) onActiveChange(null);
  }

  function handleCanvasClick() {
    if (lockedId) onLockChange(null);
  }

  return (
    <div className="glass hud-grid min-h-[690px] overflow-hidden rounded-[2rem] p-4 sm:p-5" onClick={handleCanvasClick}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2">
        <div>
          <p className="text-sm font-semibold text-cyan-300">AI Industry Landscape</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-50">AI 产业链全景作战图</h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-400">
          <span className="rounded-full border border-cyan-300/20 px-3 py-1">核心算力链</span>
          <span className="rounded-full border border-violet-300/20 px-3 py-1">光通信链</span>
          <span className="rounded-full border border-amber-300/20 px-3 py-1">散热电源链</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 1160 720" className="min-h-[600px] min-w-[1120px] w-full" role="img" aria-label="AI 产业链全景图">
          <defs>
            <linearGradient id="ai-landscape-flow" x1="0" x2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="58%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <filter id="ai-landscape-glow">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <marker id="ai-landscape-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#22d3ee" />
            </marker>
          </defs>

          <rect x="20" y="26" width="1120" height="660" rx="34" fill="rgba(2,6,23,0.42)" stroke="rgba(56,189,248,0.16)" />
          <rect x="48" y="56" width="180" height="594" rx="28" fill="rgba(15,23,42,0.38)" stroke="rgba(56,189,248,0.16)" />
          <rect x="272" y="56" width="500" height="594" rx="28" fill="rgba(15,23,42,0.38)" stroke="rgba(56,189,248,0.16)" />
          <rect x="830" y="56" width="280" height="594" rx="28" fill="rgba(15,23,42,0.38)" stroke="rgba(56,189,248,0.16)" />
          <text x="68" y="92" fill="#22d3ee" fontSize="14" fontWeight="800">{layerLabels.upstream}</text>
          <text x="292" y="92" fill="#22d3ee" fontSize="14" fontWeight="800">{layerLabels.infrastructure}</text>
          <text x="850" y="92" fill="#22d3ee" fontSize="14" fontWeight="800">{layerLabels.application}</text>

          <g className="pulse-node" filter="url(#ai-landscape-glow)">
            <circle cx="600" cy="355" r="70" fill="rgba(34,211,238,0.08)" stroke="rgba(34,211,238,0.35)" />
            <text x="600" y="350" textAnchor="middle" fill="#e5e7eb" fontSize="18" fontWeight="900">AI 算力核心</text>
            <text x="600" y="374" textAnchor="middle" fill="#94a3b8" fontSize="12">芯片 · 存储 · 封装 · 互连</text>
          </g>

          {aiLandscapeEdges.map((edge) => {
            const source = positionedNodes.find((node) => node.id === edge.source);
            const target = positionedNodes.find((node) => node.id === edge.target);
            if (!source || !target) return null;
            const highlighted = !effectiveId || edge.source === effectiveId || edge.target === effectiveId;
            const strong = edge.strength === "strong";
            return (
              <path
                key={edge.id}
                className={highlighted ? "energy-line" : ""}
                d={`M ${source.x + 56} ${source.y} C ${(source.x + target.x) / 2} ${source.y} ${(source.x + target.x) / 2} ${target.y} ${target.x - 56} ${target.y}`}
                fill="none"
                stroke="url(#ai-landscape-flow)"
                strokeWidth={highlighted ? (strong ? 2.8 : 2.1) : 1}
                opacity={highlighted ? (strong ? 0.78 : 0.55) : 0.12}
                markerEnd={highlighted ? "url(#ai-landscape-arrow)" : undefined}
              />
            );
          })}

          {positionedNodes.map((node) => (
            <AiNode
              key={node.id}
              node={node}
              active={node.id === effectiveId}
              dimmed={Boolean(effectiveId) && !relatedIds.has(node.id)}
              core={corePath.has(node.id)}
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
    </div>
  );
}

function AiNode({
  node,
  active,
  dimmed,
  core,
  onEnter,
  onLeave,
  onClick,
}: {
  node: PositionedAiNode;
  active: boolean;
  dimmed: boolean;
  core: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: (event: React.MouseEvent<SVGGElement>) => void;
}) {
  const width = node.layer === "application" ? 142 : 124;
  const x = node.x - width / 2;
  const fill = active ? "rgba(34,211,238,0.22)" : core ? "rgba(30,41,59,0.92)" : "rgba(15,23,42,0.84)";
  const stroke = active ? "rgba(34,211,238,0.85)" : core ? "rgba(139,92,246,0.48)" : "rgba(56,189,248,0.25)";

  return (
    <g
      className={cn("cursor-pointer transition-opacity duration-200", dimmed && "opacity-30")}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <rect
        className={active ? "pulse-node" : ""}
        x={x}
        y={node.y - 27}
        width={width}
        height="54"
        rx="18"
        fill={fill}
        stroke={stroke}
        strokeWidth={active ? 2.3 : 1.2}
        filter={active ? "url(#ai-landscape-glow)" : undefined}
      />
      <text x={node.x} y={node.y - 4} textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="800">
        {node.label}
      </text>
      <text x={node.x} y={node.y + 15} textAnchor="middle" fill="#94a3b8" fontSize="10">
        {node.layer === "upstream" ? "支撑" : node.layer === "infrastructure" ? "基础设施" : "应用"}
      </text>
    </g>
  );
}
