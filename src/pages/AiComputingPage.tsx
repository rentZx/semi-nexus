import { useState } from "react";
import { Cpu, Network, Thermometer, X } from "lucide-react";
import { Disclaimer } from "../components/Disclaimer";
import { AiHoverPanel } from "../components/ai/AiHoverPanel";
import { AiLandscapeMap } from "../components/ai/AiLandscapeMap";
import { PageHeader } from "../components/PageHeader";
import { getAiLandscapeNode } from "../data/aiLandscape";

const focusPaths = [
  {
    title: "核心算力链",
    desc: "AI芯片 → HBM → 先进封装 → IC载板/ABF → PCB/高速板 → AI服务器 → 数据中心",
    icon: Cpu,
    color: "accent" as const,
  },
  {
    title: "光通信链",
    desc: "AI服务器 → 光模块/CPO → 数据中心互联 → 数据中心",
    icon: Network,
    color: "violet" as const,
  },
  {
    title: "散热电源链",
    desc: "AI服务器 → 液冷散热 → 服务器电源 → 功率器件",
    icon: Thermometer,
    color: "amber" as const,
  },
];

const colorMap = {
  accent: { border: "border-l-accent", bg: "bg-accent-soft", text: "text-accent" },
  violet: { border: "border-l-violet", bg: "bg-violet-soft", text: "text-violet" },
  amber: { border: "border-l-amber", bg: "bg-amber-soft", text: "text-amber" },
};

export function AiComputingPage() {
  const [activeNodeId, setActiveNodeId] = useState<string | null>("ai-server");
  const [lockedNodeId, setLockedNodeId] = useState<string | null>(null);
  const detailOpen = lockedNodeId !== null;  // panel only opens on click-lock, never on hover
  const selectedNode = getAiLandscapeNode(lockedNodeId) ?? null;

  return (
    <div className="page-enter min-w-0 overflow-x-hidden">
      <PageHeader
        eyebrow="AI 产业链核心图"
        title="三条链看懂 AI 算力基础设施"
        description="hover 节点高亮相关链路，点击锁定查看详情。每条链代表算力从芯片到数据中心的完整传导路径。"
      />

      {/* Three chain cards */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {focusPaths.map((item) => {
          const Icon = item.icon;
          const c = colorMap[item.color];
          return (
            <section
              key={item.title}
              className={`surface rounded-2xl border-l-[3px] ${c.border} overflow-hidden`}
            >
              <div className="flex items-center gap-3 p-5 pb-3">
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${c.bg} ${c.text}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-sm font-semibold text-heading">{item.title}</h3>
              </div>
              <p className="px-5 pb-4 text-sm leading-7 text-body">{item.desc}</p>
            </section>
          );
        })}
      </div>

      {/* Map + Side Panel — grid layout, no overlap */}
      <div className={`grid min-w-0 gap-4 ${detailOpen ? 'grid-cols-[1fr_380px]' : 'grid-cols-1'} transition-[grid-template-columns] duration-300`}>
        <AiLandscapeMap
          activeId={activeNodeId}
          lockedId={lockedNodeId}
          onActiveChange={(id) => {
            setActiveNodeId(id);
            // No layout change on hover — only highlight
          }}
          onLockChange={(id) => {
            // Click toggles lock: lock→panel opens, unlock→panel closes
            setLockedNodeId(id);
            if (id) setActiveNodeId(id);
          }}
        />

        {/* Side panel — takes its own column, never overlaps the map */}
        {detailOpen && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setLockedNodeId(null)}
              className="absolute right-0 top-0 z-10 grid h-8 w-8 place-items-center rounded-full border border-line bg-card text-muted shadow-sm transition hover:bg-card-hover hover:text-body"
              aria-label="关闭详情"
            >
              <X className="h-4 w-4" />
            </button>
            <AiHoverPanel node={selectedNode} locked={true} />
          </div>
        )}
      </div>

      <div className="mt-6">
        <Disclaimer />
      </div>
    </div>
  );
}
