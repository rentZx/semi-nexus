import { useState } from "react";
import { Disclaimer } from "../components/Disclaimer";
import { AiHoverPanel } from "../components/ai/AiHoverPanel";
import { AiLandscapeMap } from "../components/ai/AiLandscapeMap";
import { PageHeader } from "../components/PageHeader";
import { Badge } from "../components/ui/Badge";
import { getAiLandscapeNode } from "../data/aiLandscape";

const focusPaths = [
  {
    title: "AI 核心算力链",
    path: "AI芯片 → HBM → 先进封装 → IC载板 → PCB → AI服务器 → 数据中心",
    tone: "cyan" as const,
  },
  {
    title: "光通信链",
    path: "AI服务器 → 数据中心 → 光模块 → CPO → 高速互联",
    tone: "blue" as const,
  },
  {
    title: "散热电源链",
    path: "AI服务器 → 高功耗 → 液冷散热 → 服务器电源 → 功率器件",
    tone: "amber" as const,
  },
  {
    title: "应用链",
    path: "数据中心 → 大模型训练 → 推理部署 → AIGC / 机器人 / 智能驾驶 / 企业AI",
    tone: "violet" as const,
  },
];

export function AiComputingPage() {
  const [activeNodeId, setActiveNodeId] = useState<string | null>("hbm");
  const [lockedNodeId, setLockedNodeId] = useState<string | null>(null);
  const selectedNode = getAiLandscapeNode(lockedNodeId ?? activeNodeId) ?? null;

  return (
    <div>
      <PageHeader
        eyebrow="AI 产业链全景图"
        title="一图看懂 AI 算力基础设施"
        description="从算力芯片、HBM、先进封装、IC载板、PCB、光模块、液冷、电源、AI服务器、数据中心到模型和应用，展示 AI 产业链的关键联动。"
      />

      <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {focusPaths.map((item) => (
          <section key={item.title} className="soft-card rounded-3xl p-5">
            <Badge tone={item.tone}>{item.title}</Badge>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.path}</p>
          </section>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_390px]">
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
