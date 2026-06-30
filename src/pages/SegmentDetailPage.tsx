import { Link, useParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { GlassCard } from "../components/ui/GlassCard";
import { getSegment } from "../data/segments";

export function SegmentDetailPage() {
  const { id = "" } = useParams();
  const segment = getSegment(id);

  if (!segment) {
    return <PageHeader title="未找到环节" description="这个细分环节不存在，返回知识库重新选择。" />;
  }

  return (
    <div>
      <PageHeader eyebrow={`${segment.category}${segment.parent ? ` / ${segment.parent}` : ""}`} title={segment.name} description={segment.summary} />
      <div className="mb-6">
        <Button to="/segments" variant="secondary">返回知识库</Button>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <GlassCard className="p-7">
          <Section title="它做什么" text={segment.whatItDoes} />
          <Section title="为什么重要" text={segment.whyImportant} />
          <List title="核心壁垒" items={segment.coreBarriers} />
          <List title="关键设备" items={segment.keyEquipment ?? []} />
          <List title="关键材料" items={segment.keyMaterials ?? []} />
          <List title="观察指标" items={segment.keyMetrics} />
          <List title="需求驱动" items={segment.demandDrivers} />
          <List title="风险因素" items={segment.riskFactors} />
        </GlassCard>
        <GlassCard>
          <h2 className="text-lg font-semibold text-slate-50">关联跳转</h2>
          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold text-slate-200">相关术语</p>
            <div className="flex flex-wrap gap-2">{segment.relatedTerms.map((term) => <Badge key={term} tone="blue">{term}</Badge>)}</div>
          </div>
          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold text-slate-200">代表公司</p>
            <div className="space-y-2">
              {segment.exampleCompanies.length ? segment.exampleCompanies.map((company) => (
                <Link key={company.code} to={`/companies/${company.code}`} className="block rounded-2xl bg-slate-950/48 px-4 py-3 text-sm font-medium text-slate-200 ring-1 ring-cyan-300/20">
                  {company.name} <span className="text-slate-500">{company.code}</span>
                </Link>
              )) : <p className="text-sm text-slate-400">暂无首批公司示例</p>}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function Section({ title, text }: { title: string; text: string }) {
  return (
    <section className="mb-7">
      <h2 className="text-xl font-semibold text-slate-50">{title}</h2>
      <p className="mt-3 text-base leading-8 text-slate-300">{text}</p>
    </section>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mb-7">
      <h2 className="text-lg font-semibold text-slate-50">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">{items.map((item) => <Badge key={item}>{item}</Badge>)}</div>
    </section>
  );
}
