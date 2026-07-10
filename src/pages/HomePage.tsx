import { ArrowRight, BookOpen, BrainCircuit, Building2, Cpu, GitBranch, Route } from "lucide-react";
import { Link } from "react-router-dom";
import { Disclaimer } from "../components/Disclaimer";
import { Button } from "../components/ui/Button";
import { GlassCard } from "../components/ui/GlassCard";
import { segments } from "../data/segments";
import { glossary } from "../data/glossary";
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
  const done = Math.min(progress.length, 12);
  const pct = Math.round((done / 12) * 100);

  return (
    <div className="min-w-0 space-y-8">
      {/* Hero */}
      <section className="surface px-6 py-10 sm:px-10 sm:py-14">
        <p className="text-sm font-semibold text-accent">SemiNexus V3.0</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-heading sm:text-5xl">
          半导体产业链学习地图
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-body">
          从产业链全景到每个细分环节，从制造流程到 A 股映射，系统理解半导体与 AI 算力的上下游关系。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button to="/chain" icon={<ArrowRight className="h-4 w-4" />}>
            进入产业链地图
          </Button>
          <Button to="/ai-computing" variant="secondary">
            查看 AI 产业链
          </Button>
        </div>
      </section>

      {/* Quick links + progress */}
      <section className="grid min-w-0 gap-5 lg:grid-cols-[1fr_320px]">
        <GlassCard>
          <h2 className="text-xl font-semibold text-heading">学习入口</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="surface-flat p-4 transition hover:border-line-strong hover:bg-card-hover"
                >
                  <Icon className="h-5 w-5 text-accent" />
                  <h3 className="mt-3 text-base font-semibold text-heading">{item.label}</h3>
                  <p className="mt-1.5 text-sm text-muted">{item.text}</p>
                </Link>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="text-lg font-semibold text-heading">学习进度</h2>
          <p className="mt-2 text-sm text-muted">完成学习路线中的模块后自动更新。</p>
          <div className="mt-6 flex items-end gap-2">
            <span className="text-4xl font-bold text-accent">{done}</span>
            <span className="pb-1 text-lg text-muted">/ 12</span>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-card-hover">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-muted">{pct}% 完成</p>
          <Button to="/learn" variant="ghost" className="mt-4 px-0">
            继续学习 <ArrowRight className="h-4 w-4" />
          </Button>
        </GlassCard>
      </section>

      {/* Themes */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold text-heading">当前主线</h2>
        <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {themes.map((theme) => (
            <GlassCard key={theme.name} interactive>
              <h3 className="text-lg font-semibold text-heading">{theme.name}</h3>
              <p className="mt-2 text-sm leading-6 text-body">{theme.text}</p>
              <p className="mt-4 text-xs text-muted">{theme.links.join(" / ")}</p>
              <Link to="/segments" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                查看详情 <ArrowRight className="h-4 w-4" />
              </Link>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Chain overview cards */}
      <section className="grid min-w-0 gap-4 md:grid-cols-3">
        {(["上游支撑", "中游核心", "下游应用"] as const).map((category) => (
          <GlassCard key={category}>
            <p className="text-sm font-semibold text-accent">{category}</p>
            <h2 className="mt-2 text-xl font-semibold text-heading">
              {category === "上游支撑" ? "设备、材料、EDA/IP" : category === "中游核心" ? "设计、制造、封测" : "AI服务器、汽车、终端"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-body">
              共 {segments.filter((s) => s.category === category).length} 个学习节点。
            </p>
          </GlassCard>
        ))}
      </section>

      {/* Glossary chips + disclaimer */}
      <section className="grid min-w-0 gap-4 lg:grid-cols-[1fr_1fr]">
        <GlassCard>
          <h2 className="text-xl font-semibold text-heading">知识芯片库</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {glossary.slice(0, 16).map((term) => (
              <Link
                key={term.id}
                to={`/glossary?term=${term.id}`}
                className="rounded-lg border border-line bg-card-hover px-3 py-1 text-sm text-accent transition hover:border-accent/30"
              >
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
