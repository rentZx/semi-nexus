import { ArrowRight, BookOpen, BrainCircuit, Building2, Cpu, GitBranch, Radar, Route, X } from "lucide-react";
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
  const [detailOpen, setDetailOpen] = useState(true);
  const selectedNode = getChainOverviewNode(lockedNodeId ?? activeNodeId) ?? null;
  const done = Math.min(progress.length, 12);
  const chartData = [
    { name: "已完成", value: done },
    { name: "未完成", value: Math.max(12 - done, 0) },
  ];

  return (
    <div className="min-w-0 overflow-x-hidden">
      <section className="fullscreen-cockpit -mx-4 -mt-6 sm:-mx-6 lg:-mx-20 lg:-mt-8">
        <div className="absolute inset-0 p-4 sm:p-6 lg:p-8">
          <SemiconductorHeroMap
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
        </div>

        <div className="pointer-events-none absolute left-6 top-6 z-20 max-w-[520px] sm:left-8 sm:top-8 lg:left-28">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/90">SemiNexus V2.2</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-50 sm:text-4xl">半导体产业链动态主图</h1>
        </div>

        {detailOpen ? (
          <div className="absolute right-4 top-24 z-30 max-h-[calc(100dvh-8rem)] w-[min(390px,calc(100vw-2rem))] sm:right-6 lg:right-8">
            <button
              type="button"
              onClick={() => setDetailOpen(false)}
              className="absolute -right-2 -top-2 z-10 grid h-9 w-9 place-items-center rounded-full border border-cyan-300/20 bg-slate-950/90 text-slate-200 shadow-lg"
              aria-label="关闭详情"
            >
              <X className="h-4 w-4" />
            </button>
            <SemiconductorHoverPanel node={selectedNode} locked={Boolean(lockedNodeId)} />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setDetailOpen(true)}
            className="absolute right-5 top-24 z-30 rounded-2xl border border-cyan-300/20 bg-slate-950/78 px-4 py-3 text-sm font-semibold text-cyan-100 shadow-xl backdrop-blur-xl"
          >
            打开详情
          </button>
        )}
      </section>

      <section className="grid min-w-0 gap-5 pt-8 lg:grid-cols-[1fr_340px]">
        <GlassCard className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-cyan-300">从主图进入学习</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-50">半导体与 AI 产业链学习入口</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                说明、功能入口、术语和学习路线全部下移，首屏只让产业链动态主图承担视觉重点。
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

      <section className="pt-8">
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

      <section className="grid min-w-0 gap-4 pt-8 md:grid-cols-3">
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

      <section className="grid min-w-0 gap-4 py-8 lg:grid-cols-[1fr_1fr]">
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
