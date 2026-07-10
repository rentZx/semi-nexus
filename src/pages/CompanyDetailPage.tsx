import { useParams } from "react-router-dom";
import { Disclaimer } from "../components/Disclaimer";
import { PageHeader } from "../components/PageHeader";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { GlassCard } from "../components/ui/GlassCard";
import { getCompany } from "../data/companies";
import { segments } from "../data/segments";

export function CompanyDetailPage() {
  const { code = "" } = useParams();
  const company = getCompany(code);
  if (!company) return <PageHeader title="未找到公司" description="这个公司不在首批学习映射数据中。" />;
  const segmentNames = company.segmentIds
    .map((id) => segments.find((segment) => segment.id === id)?.name)
    .filter((name): name is string => Boolean(name));

  return (
    <div>
      <PageHeader eyebrow={`${company.code} · ${company.market}`} title={company.name} description={company.mainBusiness} />
      <div className="mb-6 flex flex-wrap gap-3">
        <Button to="/companies" variant="secondary">返回公司列表</Button>
        <Disclaimer />
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
        <GlassCard className="p-7">
          <List title="所属环节" items={segmentNames} />
          <List title="关键产品" items={company.keyProducts} />
          <List title="相关主题" items={company.relatedThemes} />
          <List title="上游关联" items={company.upstream ?? []} />
          <List title="下游关联" items={company.downstream ?? []} />
          <List title="观察指标" items={company.observationMetrics} />
          <List title="风险提示" items={company.risks} />
        </GlassCard>
        <GlassCard>
          <h2 className="text-xl font-semibold text-heading">它不是做什么？</h2>
          <p className="mt-2 text-sm leading-6 text-body">这个模块用于防止把公司概念误读成其它产业链环节。</p>
          <div className="mt-4 space-y-2">
            {company.notThis.map((item) => (
              <div key={item} className="rounded-2xl border border-amber/20 bg-amber-soft px-4 py-3 text-sm text-amber">{item}</div>
            ))}
          </div>
          <p className="mt-6 rounded-2xl border border-accent/20 bg-accent-soft p-4 text-sm leading-7 text-accent">{company.note}</p>
        </GlassCard>
      </div>
    </div>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mb-7">
      <h2 className="text-lg font-semibold text-heading">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">{items.map((item) => <Badge key={item}>{item}</Badge>)}</div>
    </section>
  );
}
