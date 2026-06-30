import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { Badge } from "../components/ui/Badge";
import { GlassCard } from "../components/ui/GlassCard";
import { aiNodes, aiQuestions } from "../data/aiComputing";
import { companies } from "../data/companies";

export function AiComputingPage() {
  const related = companies.filter((company) => company.relatedThemes.includes("AI算力")).slice(0, 12);

  return (
    <div>
      <PageHeader eyebrow="AI算力专题" title="AI 芯片如何牵动半导体产业链" description="从 AI 芯片、HBM、先进封装、IC 载板、PCB、光模块、散热、电源到 AI 服务器，理解需求如何层层传导。" />
      <GlassCard className="hud-grid mb-6 overflow-x-auto">
        <div className="min-w-[860px]">
          <svg viewBox="0 0 960 300" className="h-auto w-full" role="img" aria-label="AI算力链条">
            <defs>
              <marker id="ai-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#2563eb" />
              </marker>
              <linearGradient id="aiFlow" x1="0" x2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="55%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            {aiNodes.map((node, index) => {
              const x = 28 + (index % 5) * 184;
              const y = index < 5 ? 36 : 176;
              return (
                <g key={node.id}>
                  {index < aiNodes.length - 1 ? <path className="energy-line" d={`M ${x + 150} ${y + 44} C ${x + 170} ${y + 44} ${x + 166} ${index === 4 ? 198 : y + 44} ${index === 4 ? 56 : x + 184} ${index === 4 ? 220 : y + 44}`} stroke="url(#aiFlow)" strokeWidth="2.4" fill="none" markerEnd="url(#ai-arrow)" opacity="0.72" /> : null}
                  <rect className="pulse-node" x={x} y={y} width="150" height="88" rx="22" fill="rgba(15,23,42,0.82)" stroke="rgba(56,189,248,0.46)" />
                  <text x={x + 16} y={y + 31} fill="#e5e7eb" fontSize="15" fontWeight="700">{node.title}</text>
                  <text x={x + 16} y={y + 56} fill="#94a3b8" fontSize="11">{node.text.slice(0, 15)}</text>
                  <text x={x + 16} y={y + 73} fill="#94a3b8" fontSize="11">{node.text.slice(15, 29)}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </GlassCard>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {aiQuestions.map(([question, answer]) => (
            <GlassCard key={question}>
              <h2 className="text-xl font-semibold text-slate-50">{question}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{answer}</p>
            </GlassCard>
          ))}
        </div>
        <GlassCard className="self-start">
          <h2 className="text-lg font-semibold text-slate-50">相关公司与环节</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {["AI芯片", "HBM相关封装", "先进封装", "IC载板", "PCB", "AI服务器"].map((item) => <Badge key={item} tone="blue">{item}</Badge>)}
          </div>
          <div className="mt-5 space-y-2">
            {related.map((company) => (
              <Link key={company.code} to={`/companies/${company.code}`} className="block rounded-2xl bg-slate-950/50 px-4 py-3 text-sm font-medium text-slate-200 ring-1 ring-cyan-300/20 transition hover:bg-cyan-300/10">
                {company.name} <span className="text-slate-500">{company.code}</span>
              </Link>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
