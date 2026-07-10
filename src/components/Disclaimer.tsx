import { ShieldCheck } from "lucide-react";

export function Disclaimer() {
  return (
    <div className="flex gap-3 rounded-xl border border-amber/20 bg-amber-soft px-4 py-3 text-sm leading-6 text-amber">
      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
      <p>
        本项目仅作半导体产业链学习映射，不接入实时行情，不构成投资建议，不提供交易决策依据。
      </p>
    </div>
  );
}
