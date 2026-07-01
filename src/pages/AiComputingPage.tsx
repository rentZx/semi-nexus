import { useState } from "react";
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
  const selectedNode = getAiLandscapeNode(lockedNodeId ?? activeNodeId) ?? null;

  return (
    <div className="min-w-0 overflow-x-hidden">
      <PageHeader
        eyebrow="AI 产业链核心图"
        title="三条链看懂 AI 算力基础设施"
        description="默认只展示核心算力链、光通信链和散热电源链，hover 节点时只高亮相关链路，详细解释放在右侧面板。"
      />

      <div className="mb-6 grid min-w-0 gap-4 md:grid-cols-3">
        {focusPaths.map((item) => (
          <section key={item.title} className="soft-card rounded-2xl p-5">
            <Badge tone={item.tone}>{item.title}</Badge>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.path}</p>
          </section>
        ))}
      </div>

      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
        <AiLandscapeMap
          activeId={activeNodeId}
          lockedId={lockedNodeId}
          onActiveChange={setActiveNodeId}
          onLockChange={setLockedNodeId}
        />
        <AiHoverPanel node={selectedNode} locked={Boolean(lockedNodeId)} />
      </div>

      <div className="mt-6">
        <Disclaimer />
      </div>
    </div>
  );
}
