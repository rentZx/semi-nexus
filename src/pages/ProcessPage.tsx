import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Badge } from "../components/ui/Badge";
import { GlassCard } from "../components/ui/GlassCard";
import { processSteps } from "../data/processSteps";
import { cn } from "../utils/cn";

export function ProcessPage() {
  const [selectedId, setSelectedId] = useState(processSteps[6].id);
  const selected = processSteps.find((step) => step.id === selectedId) ?? processSteps[0];

  return (
    <div>
      <PageHeader
        eyebrow="制造工艺流程"
        title="从硅材料到成品芯片"
        description="按真实制造链条拆解每一步：通俗解释、技术解释、涉及设备材料、难点和 A 股观察方向。"
      />
      <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <GlassCard>
          <div className="space-y-2">
            {processSteps.map((step) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setSelectedId(step.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition",
                  selectedId === step.id ? "bg-accent-soft text-accent ring-1 ring-accent/20" : "bg-card-hover text-body hover:bg-accent-soft"
                )}
              >
                <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold", selectedId === step.id ? "bg-accent text-heading" : "bg-line-strong text-body")}>
                  {step.order}
                </span>
                <span className="text-sm font-medium">{step.title}</span>
              </button>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-7">
          <p className="text-sm font-semibold text-accent">第 {selected.order} 步</p>
          <h2 className="mt-2 text-3xl font-semibold text-heading">{selected.title}</h2>
          <p className="mt-4 text-base leading-8 text-body">{selected.plainExplanation}</p>
          <p className="mt-4 rounded-2xl border border-accent/20 bg-card-hover p-4 text-sm leading-7 text-body">{selected.technicalExplanation}</p>
          <Detail title="涉及设备" items={selected.relatedEquipment} />
          <Detail title="涉及材料" items={selected.relatedMaterials} />
          <Detail title="为什么难" items={selected.difficulty} />
          <Detail title="A股观察方向" items={selected.aShareObservation} />
        </GlassCard>
      </div>
    </div>
  );
}

function Detail({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-6">
      <h3 className="mb-3 text-sm font-semibold text-heading">{title}</h3>
      <div className="flex flex-wrap gap-2">{items.map((item) => <Badge key={item}>{item}</Badge>)}</div>
    </div>
  );
}
