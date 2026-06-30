import { Disclaimer } from "../components/Disclaimer";
import { PageHeader } from "../components/PageHeader";
import { GlassCard } from "../components/ui/GlassCard";

export function AboutPage() {
  return (
    <div>
      <PageHeader eyebrow="关于本项目" title="半导体产业链学习地图" description="一个面向个人投资者、产业学习者和半导体初学者的中文交互式知识网页。" />
      <div className="grid gap-5 lg:grid-cols-2">
        <GlassCard>
          <h2 className="text-xl font-semibold text-slate-50">项目定位</h2>
          <p className="mt-3 text-base leading-8 text-slate-300">
            本项目用于系统理解半导体上下游结构、核心技术环节、公司所处产业链位置以及 AI 算力、先进封装、国产替代、存储周期等研究主线。
          </p>
        </GlassCard>
        <GlassCard>
          <h2 className="text-xl font-semibold text-slate-50">V1.0 范围</h2>
          <p className="mt-3 text-base leading-8 text-slate-300">
            已覆盖首页、产业链地图、制造流程、细分环节、公司映射、AI 算力专题、术语词典、学习路线、小测验、收藏和学习进度。
          </p>
        </GlassCard>
      </div>
      <div className="mt-5"><Disclaimer /></div>
    </div>
  );
}
