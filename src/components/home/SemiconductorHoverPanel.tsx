import { Link } from "react-router-dom";
import { ArrowRight, Building2, Cpu, Layers3 } from "lucide-react";
import type { ChainOverviewNode } from "../../data/chainOverview";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

type SemiconductorHoverPanelProps = {
  node: ChainOverviewNode | null;
  locked: boolean;
};

const overview = {
  label: "半导体产业链总览",
  locationLabel: "全景驾驶舱",
  summary:
    "半导体产业链由上游设备、材料、EDA/IP，中游设计、制造、封测，以及下游 AI服务器、汽车电子、消费电子等应用共同构成。",
  children: ["上游支撑", "中游核心", "下游应用", "AI算力", "国产替代"],
  barriers: ["技术积累", "客户验证", "良率控制", "供应链协同"],
  drivers: ["AI算力", "国产替代", "先进封装", "存储周期"],
  exampleCompanies: [],
  relatedThemes: ["产业学习", "公司映射", "术语理解"],
};

export function SemiconductorHoverPanel({ node, locked }: SemiconductorHoverPanelProps) {
  const view = node ?? overview;

  return (
    <aside className="glass rounded-[1.65rem] p-5 transition-all duration-300 lg:min-h-[620px]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-cyan-300">{view.locationLabel}</p>
        <Badge tone={locked ? "amber" : "cyan"}>{locked ? "已锁定" : node ? "悬停详情" : "默认视图"}</Badge>
      </div>
      <h2 className="mt-3 text-2xl font-semibold text-slate-50">{view.label}</h2>
      <p className="mt-4 text-sm leading-7 text-slate-300">{view.summary}</p>

      <PanelSection icon={<Layers3 className="h-4 w-4" />} title="主要细分方向">
        <div className="flex flex-wrap gap-2">
          {view.children.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
      </PanelSection>

      <PanelSection icon={<Cpu className="h-4 w-4" />} title="关键技术壁垒">
        <div className="space-y-2">
          {view.barriers.map((item) => (
            <div key={item} className="rounded-2xl border border-cyan-300/15 bg-slate-950/42 px-3 py-2 text-sm text-slate-300">
              {item}
            </div>
          ))}
        </div>
      </PanelSection>

      <PanelSection icon={<ArrowRight className="h-4 w-4" />} title="需求驱动因素">
        <div className="flex flex-wrap gap-2">
          {view.drivers.map((item) => (
            <Badge key={item} tone="blue">{item}</Badge>
          ))}
        </div>
      </PanelSection>

      <PanelSection icon={<Building2 className="h-4 w-4" />} title="代表公司">
        {view.exampleCompanies.length ? (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {view.exampleCompanies.map((company) =>
              company.code ? (
                <Link
                  key={`${company.name}-${company.code}`}
                  to={`/companies/${company.code}`}
                  className="rounded-2xl border border-cyan-300/15 bg-slate-950/42 px-3 py-2 text-sm text-slate-200 transition hover:border-cyan-300/45 hover:bg-cyan-300/10"
                >
                  {company.name} <span className="text-slate-500">{company.code}</span>
                </Link>
              ) : (
                <span key={company.name} className="rounded-2xl border border-cyan-300/15 bg-slate-950/42 px-3 py-2 text-sm text-slate-200">
                  {company.name}
                </span>
              )
            )}
          </div>
        ) : (
          <p className="text-sm text-slate-400">移动鼠标到任一产业模块，可展开细分方向并查看详细介绍。</p>
        )}
      </PanelSection>

      <div className="mt-5 flex flex-wrap gap-2">
        {view.relatedThemes.map((theme) => (
          <Badge key={theme} tone="violet">{theme}</Badge>
        ))}
      </div>

      {node?.segmentId ? (
        <div className="mt-6">
          <Button to={`/segments/${node.segmentId}`} icon={<ArrowRight className="h-4 w-4" />}>
            查看产业链详情
          </Button>
        </div>
      ) : null}
    </aside>
  );
}

function PanelSection({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-100">
        <span className="text-cyan-300">{icon}</span>
        {title}
      </h3>
      {children}
    </section>
  );
}
