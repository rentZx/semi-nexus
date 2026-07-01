import { useMemo, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Badge } from "../components/ui/Badge";
import { GlassCard } from "../components/ui/GlassCard";
import { SearchInput } from "../components/ui/SearchInput";
import { chainGroups, segments } from "../data/segments";
import { includesSearch } from "../hooks/useSearch";

export function ChainPage() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(segments.find((segment) => segment.name === "刻蚀设备")?.id ?? segments[0].id);
  const selected = segments.find((segment) => segment.id === selectedId) ?? segments[0];
  const filtered = useMemo(
    () => segments.filter((segment) => includesSearch([segment.name, segment.summary, segment.parent ?? ""], query)),
    [query]
  );

  return (
    <div>
      <PageHeader
        eyebrow="产业链交互地图"
        title="一张图看清上游支撑、中游核心和下游应用"
        description="节点全部由 React 组件绘制，点击节点后查看通俗解释、核心壁垒、需求驱动、代表公司、观察指标和风险提示。"
      />
      <div className="mb-5 max-w-xl">
        <SearchInput value={query} onChange={setQuery} placeholder="搜索节点，例如 刻蚀、HBM、PCB、AI服务器" />
      </div>
      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <GlassCard className="hud-grid min-w-0 overflow-hidden">
          <div className="min-w-0">
            <svg viewBox="0 0 920 520" preserveAspectRatio="xMidYMid meet" className="block h-auto w-full" role="img" aria-label="半导体产业链地图">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#22d3ee" />
                </marker>
                <linearGradient id="chainFlow" x1="0" x2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="60%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              {[220, 460, 700].map((x, index) => (
                <path key={x} className="energy-line" d={`M ${x} 260 C ${x + 70} 260 ${x + 90} 260 ${x + 140} 260`} stroke="url(#chainFlow)" strokeWidth="2.5" fill="none" markerEnd="url(#arrow)" opacity={index === 2 ? 0 : 0.75} />
              ))}
              {chainGroups.map((group, groupIndex) => {
                const x = 40 + groupIndex * 300;
                return (
                  <g key={group.title}>
                    <rect x={x} y="34" width="240" height="452" rx="26" fill="rgba(15,23,42,0.72)" stroke="rgba(56,189,248,0.28)" />
                    <text x={x + 22} y="72" fill="#e5e7eb" fontSize="20" fontWeight="700">{group.title}</text>
                    <text x={x + 22} y="98" fill="#94a3b8" fontSize="12">{group.description.slice(0, 22)}</text>
                    {filtered
                      .filter((segment) => {
                        const parents = [...group.parents] as string[];
                        return parents.includes(segment.parent ?? segment.name) || parents.includes(segment.name);
                      })
                      .slice(0, 11)
                      .map((segment, index) => {
                        const y = 126 + index * 31;
                        const active = segment.id === selectedId;
                        return (
                          <g key={segment.id} onClick={() => setSelectedId(segment.id)} className="cursor-pointer">
                            <rect className={active ? "pulse-node" : ""} x={x + 18} y={y} width="204" height="24" rx="12" fill={active ? "rgba(34,211,238,0.22)" : "rgba(2,6,23,0.55)"} stroke={active ? "#22d3ee" : "rgba(56,189,248,0.24)"} />
                            <text x={x + 32} y={y + 17} fill={active ? "#e0faff" : "#cbd5e1"} fontSize="12" fontWeight={active ? "700" : "500"}>{segment.name}</text>
                          </g>
                        );
                      })}
                  </g>
                );
              })}
            </svg>
          </div>
        </GlassCard>

        <GlassCard className="sticky top-24 self-start transition-all duration-300">
          <p className="text-sm font-semibold text-cyan-300">{selected.category} / {selected.parent ?? "一级节点"}</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-50">{selected.name}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">{selected.whatItDoes}</p>
          <InfoBlock title="核心壁垒" items={selected.coreBarriers} />
          <InfoBlock title="需求驱动" items={selected.demandDrivers} />
          <InfoBlock title="代表公司" items={selected.exampleCompanies.map((company) => `${company.name} ${company.code}`)} />
          <InfoBlock title="投资观察指标" items={selected.keyMetrics} />
          <InfoBlock title="风险提示" items={selected.riskFactors} />
          <div className="mt-5 flex flex-wrap gap-2">
            {selected.relatedTerms.map((term) => <Badge key={term} tone="blue">{term}</Badge>)}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-5">
      <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.length ? items.map((item) => <Badge key={item}>{item}</Badge>) : <span className="text-sm text-slate-400">暂无示例</span>}
      </div>
    </div>
  );
}
