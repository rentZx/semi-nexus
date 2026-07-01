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
  { name: "AI算力", text: "从 AI 芯片、HBM 到先进封装、PCB 和服务器整机。", links: ["AI芯片", "HBM相关封装", "PCB"] },
  { name: "国产替代", text: "设备、材料、EDA/IP 和制造环节的长期学习主线。", links: ["半导体设备", "半导体材料", "EDA/IP"] },
  { name: "先进封装", text: "Chiplet、2.5D/3D、CoWoS 让算力系统更高效。", links: ["先进封装", "Chiplet", "IC载板"] },
  { name: "存储周期", text: "DRAM、NAND、HBM 与服务器和终端需求相关。", links: ["存储芯片", "HBM相关封装"] },
  { name: "功率半导体", text: "新能源、汽车和工业控制中的电能转换基础。", links: ["功率半导体", "汽车电子"] },
];

const quickLinks = [
  { to: "/chain", label: "产业链地图", icon: GitBranch, text: "先看上下游关系" },
  { to: "/process", label: "制造流程", icon: Cpu, text: "理解芯片如何造出来" },
  { to: "/companies", label: "A股映射", icon: Building2, text: "查公司所处环节" },
  { to: "/ai-computing", label: "AI算力专题", icon: BrainCircuit, text: "看 AI 如何拉动链条" },
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
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[0.65fr_1.65fr_0.85fr]">
        <GlassCard className="overflow-hidden p-7 sm:p-9">
          <p className="mb-4 text-sm font-semibold text-cyan-300">Semiconductor & AI Industry Cockpit</p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-normal text-slate-50 sm:text-6xl">
            SemiNexus
          </h1>
          <p className="mt-3 text-xl font-semibold text-cyan-100">半导体与 AI 产业链交互式驾驶舱</p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
            从设备、材料、设计、制造、封测到 AI 算力基础设施，用一张动态产业链地图建立完整认知。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/chain" icon={<GitBranch className="h-4 w-4" />}>进入产业链地图</Button>
            <Button to="/ai-computing" variant="secondary" icon={<BrainCircuit className="h-4 w-4" />}>查看 AI 全景图</Button>
            <Button to="/companies" variant="ghost" icon={<Building2 className="h-4 w-4" />}>查看 A股映射</Button>
          </div>
          <div className="mt-8 rounded-2xl border border-cyan-300/15 bg-slate-950/42 p-4 text-sm leading-7 text-slate-300">
            操作提示：移动鼠标到任一产业模块，可展开细分方向；点击节点可锁定详情，点击空白区域解除锁定。
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

      <section className="grid gap-4 md:grid-cols-3">
        {(["上游支撑", "中游核心", "下游应用"] as const).map((category) => (
          <GlassCard key={category}>
            <p className="text-sm font-semibold text-cyan-300">{category}</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-50">
              {category === "上游支撑" ? "设备、材料、EDA/IP" : category === "中游核心" ? "设计、制造、封测" : "AI服务器、汽车、工业"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              共 {segments.filter((segment) => segment.category === category).length} 个学习节点，覆盖作用、壁垒、驱动和风险。
            </p>
          </GlassCard>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <GlassCard className="hud-grid min-h-[320px] overflow-hidden p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-cyan-300">AI Landscape Preview</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-50">AI算力全景图预览</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                AI芯片、HBM、先进封装、IC载板、PCB、光模块、液冷、电源、服务器、数据中心和应用共同形成算力基础设施。
              </p>
            </div>
            <Button to="/ai-computing" icon={<ArrowRight className="h-4 w-4" />}>进入 AI 作战图</Button>
          </div>
          <svg viewBox="0 0 920 220" className="mt-6 h-auto w-full min-w-[720px]" role="img" aria-label="AI产业链预览">
            <defs>
              <linearGradient id="home-ai-flow" x1="0" x2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="60%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            {["AI芯片", "HBM", "先进封装", "IC载板", "PCB", "AI服务器", "数据中心"].map((label, index) => {
              const x = 70 + index * 128;
              return (
                <g key={label}>
                  {index < 6 ? (
                    <path className="energy-line" d={`M ${x + 48} 105 C ${x + 72} 105 ${x + 92} 105 ${x + 116} 105`} stroke="url(#home-ai-flow)" strokeWidth="2.4" fill="none" />
                  ) : null}
                  <rect className="pulse-node" x={x - 48} y="74" width="96" height="62" rx="20" fill="rgba(15,23,42,0.84)" stroke="rgba(34,211,238,0.45)" />
                  <text x={x} y="110" textAnchor="middle" fill="#e5e7eb" fontSize="13" fontWeight="800">{label}</text>
                </g>
              );
            })}
          </svg>
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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {themes.map((theme) => (
            <GlassCard key={theme.name} className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
              <h3 className="text-lg font-semibold text-slate-50">{theme.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{theme.text}</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan-300 to-violet-400 shadow-[0_0_16px_rgba(34,211,238,0.32)]" />
              </div>
              <p className="mt-4 text-xs text-slate-400">关联环节：{theme.links.join(" / ")}</p>
              <Link to="/segments" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-cyan-300">
                查看详情 <ArrowRight className="h-4 w-4" />
              </Link>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.to} to={item.to} className="soft-card rounded-3xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/45 hover:shadow-[0_0_34px_rgba(34,211,238,0.12)]">
              <Icon className="h-5 w-5 text-cyan-300" />
              <h3 className="mt-4 text-lg font-semibold text-slate-50">{item.label}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.text}</p>
            </Link>
          );
        })}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
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
