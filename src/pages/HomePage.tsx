import { ArrowRight, BookOpen, BrainCircuit, Building2, Cpu, GitBranch, Radar, Route, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Disclaimer } from "../components/Disclaimer";
import { Button } from "../components/ui/Button";
import { GlassCard } from "../components/ui/GlassCard";
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
  const done = Math.min(progress.length, 12);
  const chartData = [
    { name: "已完成", value: done },
    { name: "未完成", value: Math.max(12 - done, 0) },
  ];

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1fr_1.25fr_0.85fr]">
        <GlassCard className="overflow-hidden p-7 sm:p-9">
          <p className="mb-4 text-sm font-semibold text-cyan-300">AI 算力产业指挥中心</p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-normal text-slate-50 sm:text-6xl">
            半导体产业链学习地图
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            从材料、设备、设计、制造、封测到 AI 算力应用，建立一套清晰的产业链认知框架。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/chain" icon={<GitBranch className="h-4 w-4" />}>开始学习产业链</Button>
            <Button to="/companies" variant="secondary" icon={<Building2 className="h-4 w-4" />}>查看A股映射</Button>
            <Button to="/ai-computing" variant="ghost" icon={<BrainCircuit className="h-4 w-4" />}>进入AI算力专题</Button>
          </div>
        </GlassCard>
        <CockpitCore />
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

function CockpitCore() {
  const nodes = [
    ["设备", 80, 88],
    ["材料", 72, 188],
    ["EDA/IP", 134, 268],
    ["设计", 310, 86],
    ["制造", 336, 270],
    ["封测", 468, 188],
    ["AI算力", 586, 92],
    ["应用", 590, 272],
  ] as const;

  return (
    <GlassCard className="hud-grid flex min-h-[420px] items-center justify-center overflow-hidden p-3">
      <svg viewBox="0 0 680 380" className="h-full min-h-[360px] w-full" role="img" aria-label="半导体产业链驾驶舱核心">
        <defs>
          <radialGradient id="chipGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#2563eb" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="flowGradient" x1="0" x2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="55%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <circle cx="340" cy="190" r="148" fill="none" stroke="rgba(56,189,248,0.18)" strokeWidth="1.5" />
        <circle cx="340" cy="190" r="110" fill="none" stroke="rgba(139,92,246,0.22)" strokeWidth="1.5" />
        <path className="radar-sweep" style={{ transformOrigin: "340px 190px" }} d="M340 190 L340 42 A148 148 0 0 1 445 86 Z" fill="rgba(34,211,238,0.08)" />
        {nodes.map(([label, x, y]) => (
          <g key={label}>
            <path className="energy-line" d={`M ${x} ${y} C 220 ${y} 250 190 310 190`} fill="none" stroke="url(#flowGradient)" strokeWidth="2" opacity="0.6" />
            <rect className="pulse-node" x={x - 42} y={y - 18} width="84" height="36" rx="18" fill="rgba(15,23,42,0.92)" stroke="rgba(56,189,248,0.55)" />
            <text x={x} y={y + 5} textAnchor="middle" fill="#e5e7eb" fontSize="13" fontWeight="700">{label}</text>
          </g>
        ))}
        <rect x="272" y="122" width="136" height="136" rx="24" fill="url(#chipGlow)" opacity="0.85" />
        <rect x="292" y="142" width="96" height="96" rx="18" fill="rgba(2,6,23,0.82)" stroke="#22d3ee" strokeWidth="2" />
        {Array.from({ length: 6 }).map((_, i) => (
          <g key={i}>
            <line x1={286 + i * 18} y1="132" x2={286 + i * 18} y2="112" stroke="#38bdf8" strokeWidth="2" opacity="0.65" />
            <line x1={286 + i * 18} y1="268" x2={286 + i * 18} y2="248" stroke="#38bdf8" strokeWidth="2" opacity="0.65" />
          </g>
        ))}
        <Zap x={318} y={164} width="42" height="42" color="#22d3ee" />
        <text x="340" y="226" textAnchor="middle" fill="#e5e7eb" fontSize="15" fontWeight="700">产业链核心</text>
      </svg>
    </GlassCard>
  );
}
