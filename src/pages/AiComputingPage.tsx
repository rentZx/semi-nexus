import { useState } from "react";
import { X } from "lucide-react";
import { Disclaimer } from "../components/Disclaimer";
import { AiHoverPanel } from "../components/ai/AiHoverPanel";
import { AiLandscapeMap } from "../components/ai/AiLandscapeMap";
import { PageHeader } from "../components/PageHeader";
import { Badge } from "../components/ui/Badge";
import { getAiLandscapeNode } from "../data/aiLandscape";

const focusPaths = [
  {
    title: "核心算力链",
    path: "AI芯片 -> HBM -> 先进封装 -> IC载板/ABF -> PCB/高速板 -> AI服务器 -> 数据中心",
    tone: "cyan" as const,
  },
  {
    title: "光通信链",
    path: "AI服务器 -> 光模块/CPO -> 数据中心互联 -> 数据中心",
    tone: "violet" as const,
  },
  {
    title: "散热电源链",
    path: "AI服务器 -> 液冷散热 -> 服务器电源 -> 功率器件",
    tone: "amber" as const,
  },
];

export function AiComputingPage() {
  const [activeNodeId, setActiveNodeId] = useState<string | null>("ai-server");
  const [lockedNodeId, setLockedNodeId] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(true);
  const selectedNode = getAiLandscapeNode(lockedNodeId ?? activeNodeId) ?? null;

  return (
    <div className="min-w-0 overflow-x-hidden">
      <PageHeader
        eyebrow="AI 产业链核心图"
        title="三条链看懂 AI 算力基础设施"
        description="默认只展示核心算力链、光通信链和散热电源链，hover 节点时只高亮相关链路，详细解释放在悬浮面板。"
      />

      <div className="mb-6 grid min-w-0 gap-4 md:grid-cols-3">
        {focusPaths.map((item) => (
          <section key={item.title} className="soft-card rounded-2xl p-5">
            <Badge tone={item.tone}>{item.title}</Badge>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.path}</p>
          </section>
        ))}
      </div>

      <div className="relative min-w-0">
        <AiLandscapeMap
          activeId={activeNodeId}
          lockedId={lockedNodeId}
          onActiveChange={(id) => {
            setActiveNodeId(id);
            if (id) setDetailOpen(true);
          }}
          onLockChange={(id) => {
            setLockedNodeId(id);
            if (id) setDetailOpen(true);
          }}
        />
        {detailOpen ? (
          <div className="absolute right-4 top-4 z-20 w-[min(390px,calc(100vw-2rem))]">
            <button
              type="button"
              onClick={() => setDetailOpen(false)}
              className="absolute -right-2 -top-2 z-10 grid h-9 w-9 place-items-center rounded-full border border-cyan-300/20 bg-slate-950/90 text-slate-200 shadow-lg"
              aria-label="关闭详情"
            >
              <X className="h-4 w-4" />
            </button>
            <AiHoverPanel node={selectedNode} locked={Boolean(lockedNodeId)} />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setDetailOpen(true)}
            className="absolute right-4 top-4 z-20 rounded-2xl border border-cyan-300/20 bg-slate-950/78 px-4 py-3 text-sm font-semibold text-cyan-100 shadow-xl backdrop-blur-xl"
          >
            打开详情
          </button>
        )}
      </div>

      <div className="mt-6">
        <Disclaimer />
      </div>
    </div>
  );
}
