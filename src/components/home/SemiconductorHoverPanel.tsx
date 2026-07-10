import { ArrowRight, Building2, Cpu, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";
import type { ChainOverviewNode } from "../../data/chainOverview";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

type SemiconductorHoverPanelProps = {
  node: ChainOverviewNode | null;
  locked: boolean;
};

const overview = {
  label: "半导体产业链总览",
  locationLabel: "默认视图",
  summary: "主图只保留设备、材料、EDA/IP、设计、制造、封测和下游应用七个核心节点。",
  children: ["设备与材料支撑制造", "EDA/IP支撑设计", "设计交付制造", "制造交付封测", "下游需求反馈设计"],
  childNodes: [],
  barriers: ["工艺积累", "客户验证", "良率控制", "供应链协同"],
  drivers: ["AI算力", "国产替代", "先进封装", "汽车电子"],
  exampleCompanies: [],
  relatedThemes: ["产业学习", "公司映射", "术语理解"],
};

export function SemiconductorHoverPanel({ node, locked }: SemiconductorHoverPanelProps) {
  const view = node ?? overview;

  return (
    <aside className="glass max-h-[calc(100dvh-8rem)] min-w-0 overflow-y-auto rounded-[1.75rem] p-4 shadow-2xl sm:p-5">
      <div className="flex items-center justify-between gap-3 pr-7">
        <p className="truncate text-sm font-semibold text-accent">{view.locationLabel}</p>
        <Badge tone={locked ? "amber" : "cyan"}>{locked ? "已锁定" : node ? "节点详情" : "总览"}</Badge>
      </div>
      <h2 className="mt-3 text-2xl font-semibold text-heading">{view.label}</h2>
      <p className="mt-4 text-sm leading-7 text-body">{view.summary}</p>

      <PanelSection icon={<Layers3 className="h-4 w-4" />} title="细分方向">
        <div className="flex flex-wrap gap-2">
          {view.children.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
      </PanelSection>

      {view.childNodes.length ? (
        <PanelSection icon={<ArrowRight className="h-4 w-4" />} title="对应关系">
          <div className="grid gap-2">
            {view.childNodes.map((child) => (
              <div key={child.label} className="rounded-2xl border border-accent/15 bg-card-hover px-3 py-2 text-sm leading-6 text-body">
                <span className="font-semibold text-heading">{child.label}</span>
                {child.targets.length ? <span className="text-muted"> {"->"} {child.targets.map(formatTarget).join(" / ")}</span> : null}
              </div>
            ))}
          </div>
        </PanelSection>
      ) : null}

      <PanelSection icon={<Cpu className="h-4 w-4" />} title="关键壁垒">
        <div className="grid gap-2">
          {view.barriers.slice(0, 4).map((item) => (
            <div key={item} className="rounded-2xl border border-accent/15 bg-card-hover px-3 py-2 text-sm text-body">
              {item}
            </div>
          ))}
        </div>
      </PanelSection>

      <PanelSection icon={<ArrowRight className="h-4 w-4" />} title="需求驱动">
        <div className="flex flex-wrap gap-2">
          {view.drivers.map((item) => (
            <Badge key={item} tone="blue">{item}</Badge>
          ))}
        </div>
      </PanelSection>

      <PanelSection icon={<Building2 className="h-4 w-4" />} title="代表公司">
        {view.exampleCompanies.length ? (
          <div className="grid gap-2">
            {view.exampleCompanies.slice(0, 4).map((company) =>
              company.code ? (
                <Link
                  key={`${company.name}-${company.code}`}
                  to={`/companies/${company.code}`}
                  className="rounded-2xl border border-accent/15 bg-card-hover px-3 py-2 text-sm text-body transition hover:border-cyan-300/45 hover:bg-accent-soft"
                >
                  {company.name} <span className="text-heading0">{company.code}</span>
                </Link>
              ) : (
                <span key={company.name} className="rounded-2xl border border-accent/15 bg-card-hover px-3 py-2 text-sm text-body">
                  {company.name}
                </span>
              )
            )}
          </div>
        ) : (
          <p className="text-sm leading-6 text-muted">移动鼠标到主节点查看细分方向；手机端点击节点查看。</p>
        )}
      </PanelSection>

      <div className="mt-5">
        {node?.segmentId ? (
          <Button to={`/segments/${node.segmentId}`} icon={<ArrowRight className="h-4 w-4" />}>
            查看环节详情
          </Button>
        ) : (
          <Button to="/chain" icon={<ArrowRight className="h-4 w-4" />}>
            进入完整学习地图
          </Button>
        )}
      </div>
    </aside>
  );
}

function PanelSection({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-heading">
        <span className="text-accent">{icon}</span>
        {title}
      </h3>
      {children}
    </section>
  );
}

function formatTarget(target: string) {
  const labels: Record<string, string> = {
    design: "芯片设计",
    manufacturing: "晶圆制造",
    packaging: "封装测试",
    downstream: "下游应用",
  };
  return labels[target] ?? target;
}
