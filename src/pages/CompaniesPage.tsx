import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Disclaimer } from "../components/Disclaimer";
import { PageHeader } from "../components/PageHeader";
import { Badge } from "../components/ui/Badge";
import { GlassCard } from "../components/ui/GlassCard";
import { SearchInput } from "../components/ui/SearchInput";
import { companies } from "../data/companies";
import { segments } from "../data/segments";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { includesSearch } from "../hooks/useSearch";
import { useState } from "react";

export function CompaniesPage() {
  const [query, setQuery] = useState("");
  const [segmentId, setSegmentId] = useState("全部");
  const [theme, setTheme] = useState("全部");
  const [onlyFav, setOnlyFav] = useState(false);
  const [favorites, setFavorites] = useLocalStorage<string[]>("company.favorites", []);
  const themes = ["全部", "AI算力", "国产替代", "先进封装", "存储周期", "功率半导体"];
  const filtered = companies.filter((company) => {
    const segMatch = segmentId === "全部" || company.segmentIds.includes(segmentId);
    const themeMatch = theme === "全部" || company.relatedThemes.includes(theme);
    const favMatch = !onlyFav || favorites.includes(company.code);
    return segMatch && themeMatch && favMatch && includesSearch([company.name, company.code, company.mainBusiness], query);
  });

  function toggleFavorite(code: string) {
    setFavorites((current) => current.includes(code) ? current.filter((item) => item !== code) : [...current, code]);
  }

  return (
    <div>
      <PageHeader eyebrow="A股产业链映射" title="查公司处在哪个产业链环节" description="页面重点是产业链位置、主营业务、相关主题、观察指标和风险提示，不包含实时行情和交易决策内容。" />
      <GlassCard className="mb-6">
        <div className="grid gap-4 xl:grid-cols-[1fr_0.95fr]">
          <SearchInput value={query} onChange={setQuery} placeholder="搜索公司雷达库：公司名称或股票代码" />
          <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/42 px-4 py-3 text-sm text-slate-300">
            当前筛选：{filtered.length} 家公司 · 收藏 {favorites.length} 家 · 仅作产业链学习映射
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge active={segmentId === "全部"} onClick={() => setSegmentId("全部")}>全部环节</Badge>
          {segments.slice(0, 18).map((segment) => <Badge key={segment.id} active={segmentId === segment.id} onClick={() => setSegmentId(segment.id)}>{segment.name}</Badge>)}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {themes.map((item) => <Badge key={item} tone="blue" active={theme === item} onClick={() => setTheme(item)}>{item}</Badge>)}
          <Badge tone="amber" active={onlyFav} onClick={() => setOnlyFav(!onlyFav)}>只看收藏</Badge>
        </div>
      </GlassCard>
      <div className="my-6"><Disclaimer /></div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((company) => {
          const segmentNames = company.segmentIds.map((id) => segments.find((segment) => segment.id === id)?.name).filter(Boolean).join(" / ");
          return (
            <GlassCard key={company.code} className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex items-start justify-between gap-3">
                <Link to={`/companies/${company.code}`}>
                  <p className="text-sm font-semibold text-cyan-300">{company.code} · {company.market}</p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-50">{company.name}</h2>
                </Link>
                <button type="button" onClick={() => toggleFavorite(company.code)} className="rounded-full bg-slate-950/70 p-2 text-amber-300 ring-1 ring-amber-300/25 transition hover:ring-amber-300/65" aria-label="收藏公司">
                  <Star className="h-4 w-4" fill={favorites.includes(company.code) ? "currentColor" : "none"} />
                </button>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{company.mainBusiness}</p>
              <p className="mt-3 text-xs text-slate-500">所属环节：{segmentNames}</p>
              <p className="mt-3 text-xs text-amber-200/85">它不是：{company.notThis[0]}</p>
              <div className="mt-4 flex flex-wrap gap-2">{company.relatedThemes.map((item) => <Badge key={item}>{item}</Badge>)}</div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
