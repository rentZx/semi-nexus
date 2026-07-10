import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { Badge } from "../components/ui/Badge";
import { GlassCard } from "../components/ui/GlassCard";
import { SearchInput } from "../components/ui/SearchInput";
import { segments } from "../data/segments";
import { includesSearch } from "../hooks/useSearch";
import { useState } from "react";

const categories = ["全部", "上游支撑", "中游核心", "下游应用"] as const;

export function SegmentsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("全部");
  const [theme, setTheme] = useState("全部");
  const themes = ["全部", "AI算力", "国产替代", "先进封装", "存储周期", "功率半导体"];
  const filtered = segments.filter((segment) => {
    const categoryMatch = category === "全部" || segment.category === category;
    const themeMatch = theme === "全部" || [segment.name, segment.parent ?? "", ...segment.demandDrivers].some((item) => item.includes(theme.replace("算力", "")));
    return categoryMatch && themeMatch && includesSearch([segment.name, segment.summary, segment.parent ?? ""], query);
  });

  return (
    <div>
      <PageHeader eyebrow="细分环节知识库" title="把每个环节拆成能读懂的卡片" description="支持搜索、分类筛选和主题筛选。每个详情页都会说明做什么、为什么重要、看什么、风险是什么。" />
      <div className="mb-5 grid gap-3 lg:grid-cols-[1fr_auto]">
        <SearchInput value={query} onChange={setQuery} placeholder="搜索环节，例如 光刻胶、先进封装、AI服务器" />
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => <Badge key={item} active={category === item} onClick={() => setCategory(item)}>{item}</Badge>)}
        </div>
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {themes.map((item) => <Badge key={item} tone="blue" active={theme === item} onClick={() => setTheme(item)}>{item}</Badge>)}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((segment) => (
          <Link key={segment.id} to={`/segments/${segment.id}`} className="surface-interactive p-5">
            <p className="text-sm font-semibold text-accent">{segment.category} {segment.parent ? `/ ${segment.parent}` : ""}</p>
            <h2 className="mt-2 text-xl font-semibold text-heading">{segment.name}</h2>
            <p className="mt-3 text-sm leading-6 text-body">{segment.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {segment.demandDrivers.slice(0, 3).map((driver) => <Badge key={driver}>{driver}</Badge>)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
