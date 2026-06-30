import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { Badge } from "../components/ui/Badge";
import { GlassCard } from "../components/ui/GlassCard";
import { SearchInput } from "../components/ui/SearchInput";
import { glossary } from "../data/glossary";
import { includesSearch } from "../hooks/useSearch";

export function GlossaryPage() {
  const [params] = useSearchParams();
  const initial = params.get("term") ?? "";
  const [query, setQuery] = useState(initial);
  const [category, setCategory] = useState("全部");
  const categories = ["全部", ...Array.from(new Set(glossary.map((term) => term.category)))];
  const filtered = useMemo(
    () => glossary.filter((term) => (category === "全部" || term.category === category) && includesSearch([term.term, term.category, term.plainExplanation], query)),
    [category, query]
  );

  return (
    <div>
      <PageHeader eyebrow="术语词典" title="把半导体黑话翻译成人话" description="每个术语都包含通俗解释、技术解释、关联环节、相关术语和使用场景。" />
      <div className="mb-5 grid gap-3 lg:grid-cols-[1fr_auto]">
        <SearchInput value={query} onChange={setQuery} placeholder="搜索术语，例如 HBM、光刻、Foundry、PCB" />
        <div className="flex flex-wrap gap-2">{categories.map((item) => <Badge key={item} active={category === item} onClick={() => setCategory(item)}>{item}</Badge>)}</div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((term) => (
          <GlassCard key={term.id}>
            <p className="text-sm font-semibold text-cyan-300">{term.category}</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-50">{term.term}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{term.plainExplanation}</p>
            <p className="mt-3 rounded-2xl border border-cyan-300/15 bg-slate-950/42 p-3 text-sm leading-6 text-slate-300">{term.technicalExplanation}</p>
            <div className="mt-4 flex flex-wrap gap-2">{term.relatedTerms.map((item) => <Badge key={item} tone="blue">{item}</Badge>)}</div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
