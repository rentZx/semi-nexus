import { ArrowRight, BookOpen, BrainCircuit, Building2, Cpu, GitBranch, Radar, Route } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Disclaimer } from "../components/Disclaimer";
import { SemiconductorHeroMap } from "../components/home/SemiconductorHeroMap";
import { SemiconductorHoverPanel } from "../components/home/SemiconductorHoverPanel";
import { Button } from "../components/ui/Button";
import { GlassCard } from "../components/ui/GlassCard";
import { getChainOverviewNode } from "../data/chainOverview";
import { glossary } from "../data/glossary";
import { segments } from "../data/segments";
import { useLocalStorage } from "../hooks/useLocalStorage";

const themes = [
  { name: "AI算力", text: "从 AI 芯片、HBM、先进封装、PCB 到服务器整机。", links: ["AI芯片", "HBM", "PCB"] },
  { name: "国产替代", text: "设备、材料、EDA/IP 和制造能力的长期学习主线。", links: ["半导体设备", "半导体材料", "EDA/IP"] },
  { name: "先进封装", text: "Chiplet、2.5D/3D 和高密度互连提升系统效率。", links: ["先进封装", "Chiplet", "IC载板"] },
  { name: "存储周期", text: "DRAM、NAND、HBM 与服务器和终端需求相关。", links: ["存储芯片", "HBM相关封装"] },
  { name: "功率半导体", text: "新能源、汽车和工业控制中的电能转换基础。", links: ["功率半导体", "汽车电子"] },
];

const quickLinks = [
  { to: "/chain", label: "产业链地图", icon: GitBranch, text: "先看上下游关系" },
  { to: "/process", label: "制造流程", icon: Cpu, text: "理解芯片如何造出来" },
  { to: "/companies", label: "A股映射", icon: Building2, text: "查公司所处环节" },
  { to: "/ai-computing", label: "AI算力", icon: BrainCircuit, text: "看 AI 如何拉动链条" },
  { to: "/glossary", label: "术语词典", icon: BookOpen, text: "快速降低门槛" },
  { to: "/learn", label: "学习路线", icon: Route, text: "按路径推进" },
];

export function HomePage() {
  const [progress] = useLocalStorage<string[]>("learning.completed", []);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [lockedNodeId, setLockedNodeId] = useState<string | null>(null);
  const selectedNode = getChainOverviewNode(lockedNodeId ?? activeNodeId) ?? null;
  const done = Math.min(progress.length, 12);
  const chartData = [
    { name: "已完成", value: done },
    { name: "未完成", value: Math.max(12 - done, 0) },
  ];

  return (
    <div className="min-w-0 space-y-8 overflow-x-hidden">
      <section className="grid min-h-[calc(100dvh-6rem)] min-w-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-4 overflow-hidden lg:min-h-[calc(100dvh-5rem)] xl:h-[calc(100dvh-4rem)] xl:min-h-0 xl:grid-cols-[0.72fr_minmax(0,1.58fr)_0.86fr] xl:grid-rows-1">
        <GlassCard className="flex min-h-0 min-w-0 flex-col justify-center overflow-hidden p-6 sm:p-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">SemiNexus V2.1</p>
          <h1 className="text-4xl font-semibold tracking-normal text-slate-50 sm:text-5xl">
            半导体产业链动态驾驶舱
          </h1>
          <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
            首屏聚焦一张主图：设备、材料、EDA/IP、设计、制造、封测和下游应用。移动到节点查看细分方向，点击可锁定详情。
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button to="/chain" icon={<GitBranch className="h-4 w-4" />}>完整地图</Button>
            <Button to="/ai-computing" variant="secondary" icon={<BrainCircuit className="h-4 w-4" />}>AI 核心链</Button>
          </div>
        </GlassCard>

        <SemiconductorHeroMap
          activeId={activeNodeId}
          lockedId={lockedNodeId}
          onActiveChange={setActiveNodeId}
          onLockChange={setLockedNodeId}
        />

        <SemiconductorHoverPanel node={selectedNode} locked={Boolean(lockedNodeId)} />
      </section>

      <section className="grid min-w-0 gap-5 lg:grid-cols-[1fr_340px]">
        <GlassCard className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-cyan-300">第二屏学习入口</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-50">从主图进入具体学习任务</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                首页首屏只承担驾驶舱总览；术语、学习路线、主题雷达和公司映射下移到这里，避免抢占主视觉。
              </p>
            </div>
            <Button to="/ai-computing" icon={<ArrowRight className="h-4 w-4" />}>查看 AI 产业链</Button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.to} to={item.to} className="soft-card rounded-2xl p-4 transition hover:border-cyan-300/45 hover:bg-cyan-300/8">
                  <Icon className="h-5 w-5 text-cyan-300" />
                  <h3 className="mt-3 text-base font-semibold text-slate-50">{item.label}</h3>
                  <p className="mt-2 text-sm text-slate-300">{item.text}</p>
                </Link>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="text-lg font-semibold text-slate-50">学习进度</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">完成学习路线中的模块后，这里会自动更新。</p>
          <div className="mt-5 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} dataKey="value" innerRadius={54} outerRadius={74} startAngle={90} endAngle={450}>
                  <Cell fill="#22d3ee" />
                  <Cell fill="rgba(148,163,184,0.18)" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-3xl font-semibold text-cyan-100">{done}/12</p>
        </GlassCard>
      </section>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold text-slate-50"><Radar className="h-6 w-6 text-cyan-300" /> 当前主线雷达</h2>
        <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {themes.map((theme) => (
            <GlassCard key={theme.name} className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
              <h3 className="text-lg font-semibold text-slate-50">{theme.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{theme.text}</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan-300 to-violet-400 shadow-[0_0_16px_rgba(34,211,238,0.22)]" />
              </div>
              <p className="mt-4 text-xs text-slate-400">关联环节：{theme.links.join(" / ")}</p>
              <Link to="/segments" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-cyan-300">
                查看详情 <ArrowRight className="h-4 w-4" />
              </Link>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="grid min-w-0 gap-4 md:grid-cols-3">
        {(["上游支撑", "中游核心", "下游应用"] as const).map((category) => (
          <GlassCard key={category}>
            <p className="text-sm font-semibold text-cyan-300">{category}</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-50">
              {category === "上游支撑" ? "设备、材料、EDA/IP" : category === "中游核心" ? "设计、制造、封测" : "AI服务器、汽车、终端"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              共 {segments.filter((segment) => segment.category === category).length} 个学习节点，覆盖作用、壁垒、驱动和风险。
            </p>
          </GlassCard>
        ))}
      </section>

      <section className="grid min-w-0 gap-4 lg:grid-cols-[1fr_1fr]">
        <GlassCard>
          <h2 className="text-xl font-semibold text-slate-50">知识芯片库</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {glossary.slice(0, 16).map((term) => (
              <Link key={term.id} to={`/glossary?term=${term.id}`} className="rounded-full border border-cyan-300/20 bg-slate-900/70 px-3 py-1 text-sm text-cyan-100">
                {term.term}
              </Link>
            ))}
          </div>
        </GlassCard>
        <Disclaimer />
      </section>
    </div>
  );
}
