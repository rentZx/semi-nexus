import { useMemo, useState } from "react";
import { Badge } from "../components/ui/Badge";
import { GlassCard } from "../components/ui/GlassCard";
import { SearchInput } from "../components/ui/SearchInput";
import { chainGroups, segments } from "../data/segments";
import { includesSearch } from "../hooks/useSearch";

export function ChainPage() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(segments[0].id);
  const selected = segments.find((segment) => segment.id === selectedId) ?? segments[0];
  const filtered = useMemo(
    () => segments.filter((segment) => includesSearch([segment.name, segment.summary, segment.parent ?? ""], query)),
    [query]
  );

  return (
    <div className="min-w-0 overflow-x-hidden">
      <header className="mb-8 max-w-5xl">
        <p className="mb-3 text-sm font-semibold text-cyan-300">产业链交互地图</p>
        <h1 className="text-4xl font-semibold tracking-normal text-slate-50 sm:text-[42px]">一张图看清上游支撑、中游核心和下游应用</h1>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-300">
          点击节点查看通俗解释、核心壁垒、需求驱动、代表公司、观察指标和风险提示。三栏内容已放大并支持自动换行。
        </p>
      </header>

      <div className="mb-5 max-w-xl">
        <SearchInput value={query} onChange={setQuery} placeholder="搜索节点，例如：刻蚀、HBM、PCB、AI服务器" />
      </div>

      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_370px]">
        <GlassCard className="hud-grid min-w-0 overflow-hidden p-5">
          <div className="grid min-h-[640px] min-w-0 gap-5 lg:grid-cols-3">
            {chainGroups.map((group) => {
              const groupSegments = filtered
                .filter((segment) => {
                  const parents = [...group.parents] as string[];
                  return parents.includes(segment.parent ?? segment.name) || parents.includes(segment.name);
                })
                .slice(0, 7);

              return (
                <section key={group.title} className="min-w-0 rounded-[1.65rem] border border-cyan-300/18 bg-slate-950/42 p-5">
                  <h2 className="text-[28px] font-semibold leading-tight text-slate-50">{group.title}</h2>
                  <p className="mt-3 max-w-full break-words text-[15px] leading-7 text-slate-300">{group.description}</p>
                  <div className="mt-6 grid gap-3">
                    {groupSegments.map((segment) => {
                      const active = segment.id === selectedId;
                      return (
                        <button
                          key={segment.id}
                          type="button"
                          onClick={() => setSelectedId(segment.id)}
                          className={[
                            "min-w-0 rounded-2xl border px-4 py-3 text-left transition",
                            active
                              ? "border-cyan-300/70 bg-cyan-300/14 shadow-[0_0_18px_rgba(34,211,238,0.16)]"
                              : "border-cyan-300/14 bg-slate-950/46 hover:border-cyan-300/42 hover:bg-cyan-300/8",
                          ].join(" ")}
                        >
                          <span className="block break-words text-[17px] font-semibold leading-6 text-slate-50">{segment.name}</span>
                          <span className="mt-1 block overflow-hidden text-ellipsis break-words text-sm leading-6 text-slate-400">
                            {segment.summary}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard className="sticky top-8 self-start transition-all duration-300">
          <p className="break-words text-sm font-semibold text-cyan-300">{selected.category} / {selected.parent ?? "一级节点"}</p>
          <h2 className="mt-2 break-words text-2xl font-semibold leading-tight text-slate-50">{selected.name}</h2>
          <p className="mt-3 break-words text-sm leading-7 text-slate-300">{selected.whatItDoes}</p>
          <InfoBlock title="核心壁垒" items={selected.coreBarriers} />
          <InfoBlock title="需求驱动" items={selected.demandDrivers} />
          <InfoBlock title="代表公司" items={selected.exampleCompanies.map((company) => `${company.name} ${company.code}`)} />
          <InfoBlock title="观察指标" items={selected.keyMetrics} />
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
