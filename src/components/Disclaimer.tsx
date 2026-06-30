import { ShieldCheck } from "lucide-react";

export function Disclaimer() {
  return (
    <div className="flex gap-3 rounded-2xl border border-amber-300/25 bg-amber-400/10 px-4 py-3 text-sm leading-6 text-amber-100 shadow-[0_0_24px_rgba(245,158,11,0.08)]">
      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
      <p>
        本项目仅作半导体产业链学习映射，不接入实时行情，不构成投资建议，不提供交易决策依据。
      </p>
    </div>
  );
}
