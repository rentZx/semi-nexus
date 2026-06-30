import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { GlassCard } from "../components/ui/GlassCard";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { cn } from "../utils/cn";

const routes = [
  { id: "beginner", title: "新手入门路线", steps: ["半导体是什么", "集成电路是什么", "设计、制造、封测区别", "设备和材料为什么重要", "下游应用有哪些"] },
  { id: "research", title: "投资研究路线", steps: ["产业链位置", "技术壁垒", "需求驱动", "国产替代", "财务观察指标", "风险因素"] },
  { id: "ai", title: "AI算力路线", steps: ["AI芯片", "HBM", "先进封装", "IC载板", "PCB", "光模块", "AI服务器"] },
  { id: "localization", title: "国产替代路线", steps: ["设备", "材料", "EDA/IP", "制造", "封测", "关键零部件"] },
];

export function LearnPage() {
  const [completed, setCompleted] = useLocalStorage<string[]>("learning.completed", []);
  function toggle(id: string) {
    setCompleted((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <div>
      <PageHeader eyebrow="学习路线" title="按目标选择学习路径" description="点击模块即可标记完成，学习进度会保存在 localStorage 中。" />
      <div className="grid gap-5 lg:grid-cols-2">
        {routes.map((route) => (
          <GlassCard key={route.id}>
            <h2 className="text-xl font-semibold text-slate-50">{route.title}</h2>
            <div className="mt-5 space-y-3">
              {route.steps.map((step, index) => {
                const id = `${route.id}-${index}`;
                const done = completed.includes(id);
                return (
                  <button key={id} type="button" onClick={() => toggle(id)} className={cn("flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition", done ? "bg-cyan-300/14 text-cyan-100 ring-1 ring-cyan-300/35" : "bg-slate-950/45 text-slate-300 ring-1 ring-cyan-300/15 hover:bg-cyan-300/8")}>
                    <CheckCircle2 className={cn("h-5 w-5", done ? "text-cyan-300" : "text-slate-600")} />
                    <span className="font-medium">{step}</span>
                  </button>
                );
              })}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
