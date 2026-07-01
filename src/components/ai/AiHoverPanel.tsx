import { ArrowRight, Building2, Cpu, LinkIcon, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import type { AiLandscapeNode } from "../../data/aiLandscape";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

type AiHoverPanelProps = {
  node: AiLandscapeNode | null;
  locked: boolean;
};

const overview = {
  label: "AI 算力产业链总览",
  category: "默认视图",
  summary: "默认只展示三条核心链路：核心算力链、光通信链、散热电源链。",
  whyImportant: "AI 基础设施不是单一芯片，而是芯片、存储、封装、载板、PCB、服务器、互联、散热、电源和数据中心共同联动。",
  relatedNodes: ["AI芯片", "HBM", "先进封装", "AI服务器", "数据中心"],
  benefitLogic: "从算力需求出发，观察它如何向上游器件、材料、制造和系统集成环节传导。",
  relatedCompanies: [],
  relatedTerms: ["AI服务器", "HBM", "先进封装", "PCB", "液冷"],
  risks: ["资本开支波动", "技术路线变化", "供应链节奏"],
};

export function AiHoverPanel({ node, locked }: AiHoverPanelProps) {
  const view = node ?? overview;

  return (
    <aside className="glass max-h-[calc(100dvh-10rem)] min-w-0 overflow-y-auto rounded-[1.75rem] p-5 shadow-2xl">
      <div className="flex items-center justify-between gap-3 pr-7">
        <p className="truncate text-sm font-semibold text-cyan-300">{view.category}</p>
        <Badge tone={locked ? "amber" : "cyan"}>{locked ? "已锁定" : node ? "节点详情" : "总览"}</Badge>
      </div>
      <h2 className="mt-3 text-2xl font-semibold text-slate-50">{view.label}</h2>
      <p className="mt-4 text-sm leading-7 text-slate-300">{view.summary}</p>

      <PanelBlock icon={<Cpu className="h-4 w-4" />} title="为什么重要">
        <p className="text-sm leading-7 text-slate-300">{view.whyImportant}</p>
      </PanelBlock>

      <PanelBlock icon={<LinkIcon className="h-4 w-4" />} title="强相关节点">
        <div className="flex flex-wrap gap-2">
          {view.relatedNodes.map((item) => (
            <Badge key={item} tone="blue">{item}</Badge>
          ))}
        </div>
      </PanelBlock>

      <PanelBlock icon={<ArrowRight className="h-4 w-4" />} title="需求传导">
        <p className="rounded-2xl border border-cyan-300/12 bg-slate-950/34 p-3 text-sm leading-7 text-slate-300">{view.benefitLogic}</p>
      </PanelBlock>

      <PanelBlock icon={<Building2 className="h-4 w-4" />} title="相关公司">
        {view.relatedCompanies.length ? (
          <div className="grid gap-2">
            {view.relatedCompanies.slice(0, 4).map((company) =>
              company.code ? (
                <Link
                  key={`${company.name}-${company.code}`}
                  to={`/companies/${company.code}`}
                  className="rounded-2xl border border-cyan-300/12 bg-slate-950/34 px-3 py-2 text-sm text-slate-200 transition hover:border-cyan-300/45 hover:bg-cyan-300/10"
                >
                  {company.name} <span className="text-slate-500">{company.code}</span>
                </Link>
              ) : (
                <span key={company.name} className="rounded-2xl border border-cyan-300/12 bg-slate-950/34 px-3 py-2 text-sm text-slate-200">
                  {company.name}
                </span>
              )
            )}
          </div>
        ) : (
          <p className="text-sm leading-6 text-slate-400">该节点更偏产业环节或基础设施，暂不展开公司映射。</p>
        )}
      </PanelBlock>

      <PanelBlock icon={<ShieldAlert className="h-4 w-4" />} title="观察风险">
        <div className="flex flex-wrap gap-2">
          {view.risks.map((risk) => (
            <Badge key={risk} tone="amber">{risk}</Badge>
          ))}
        </div>
      </PanelBlock>

      <div className="mt-5 flex flex-wrap gap-2">
        {view.relatedTerms.map((term) => (
          <Link key={term} to={`/glossary?term=${encodeURIComponent(term)}`}>
            <Badge tone="violet">{term}</Badge>
          </Link>
        ))}
      </div>

      {node?.segmentId ? (
        <div className="mt-5">
          <Button to={`/segments/${node.segmentId}`} icon={<ArrowRight className="h-4 w-4" />}>
            查看环节详情
          </Button>
        </div>
      ) : null}
    </aside>
  );
}

function PanelBlock({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-100">
        <span className="text-cyan-300">{icon}</span>
        {title}
      </h3>
      {children}
    </section>
  );
}
