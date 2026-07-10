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
    <aside className="surface max-h-[calc(100dvh-10rem)] min-w-0 overflow-y-auto rounded-[1.5rem] p-5 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <p className="truncate text-xs font-semibold uppercase tracking-[0.12em] text-muted">{view.category}</p>
        <Badge tone={locked ? "amber" : "accent"}>{locked ? "已锁定" : node ? "节点详情" : "总览"}</Badge>
      </div>
      <h2 className="mt-2 text-xl font-semibold text-heading">{view.label}</h2>
      <p className="mt-3 text-sm leading-7 text-body">{view.summary}</p>

      {/* Why important */}
      <section className="mt-5 rounded-xl bg-card-hover p-4">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-heading">
          <span className="text-accent"><Cpu className="h-4 w-4" /></span>
          为什么重要
        </h3>
        <p className="text-sm leading-7 text-body">{view.whyImportant}</p>
      </section>

      {/* Related nodes */}
      <section className="mt-4">
        <h3 className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-heading">
          <span className="text-accent"><LinkIcon className="h-4 w-4" /></span>
          强相关节点
        </h3>
        <div className="flex flex-wrap gap-2">
          {view.relatedNodes.map((item) => (
            <Badge key={item} tone="blue">{item}</Badge>
          ))}
        </div>
      </section>

      {/* Benefit logic */}
      <section className="mt-4">
        <h3 className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-heading">
          <span className="text-accent"><ArrowRight className="h-4 w-4" /></span>
          需求传导
        </h3>
        <p className="rounded-xl border border-line bg-card-hover p-3 text-sm leading-7 text-body">
          {view.benefitLogic}
        </p>
      </section>

      {/* Related companies */}
      <section className="mt-4">
        <h3 className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-heading">
          <span className="text-accent"><Building2 className="h-4 w-4" /></span>
          相关公司
        </h3>
        {view.relatedCompanies.length ? (
          <div className="grid gap-2">
            {view.relatedCompanies.slice(0, 4).map((company) =>
              company.code ? (
                <Link
                  key={`${company.name}-${company.code}`}
                  to={`/companies/${company.code}`}
                  className="flex items-center justify-between rounded-xl border border-line bg-card-hover px-3 py-2.5 text-sm transition hover:border-accent/40 hover:bg-accent-soft"
                >
                  <span className="text-body">{company.name}</span>
                  <span className="text-xs font-mono text-muted">{company.code}</span>
                </Link>
              ) : (
                <span key={company.name} className="rounded-xl border border-line bg-card-hover px-3 py-2.5 text-sm text-body">
                  {company.name}
                </span>
              )
            )}
          </div>
        ) : (
          <p className="text-sm text-muted">该节点更偏产业环节或基础设施，暂不展开公司映射。</p>
        )}
      </section>

      {/* Risks */}
      <section className="mt-4">
        <h3 className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-heading">
          <span className="text-amber"><ShieldAlert className="h-4 w-4" /></span>
          观察风险
        </h3>
        <div className="flex flex-wrap gap-2">
          {view.risks.map((risk) => (
            <Badge key={risk} tone="amber">{risk}</Badge>
          ))}
        </div>
      </section>

      {/* Related terms */}
      <div className="mt-5 flex flex-wrap gap-2">
        {view.relatedTerms.map((term) => (
          <Link key={term} to={`/glossary?term=${encodeURIComponent(term)}`}>
            <Badge tone="violet">{term}</Badge>
          </Link>
        ))}
      </div>

      {/* View detail button */}
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
