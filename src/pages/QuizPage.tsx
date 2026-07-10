import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { GlassCard } from "../components/ui/GlassCard";
import { quizQuestions } from "../data/quiz";
import { cn } from "../utils/cn";

export function QuizPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const score = quizQuestions.reduce((sum, question) => sum + (answers[question.id] === question.answerIndex ? 1 : 0), 0);
  const finished = Object.keys(answers).length === quizQuestions.length;

  return (
    <div>
      <PageHeader eyebrow="产业链小测验" title="15 道题检查理解程度" description="选择后立即显示解释，最后给出得分。题目围绕产业链、制造流程、设备材料、AI 算力和术语理解。" />
      <GlassCard className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted">当前得分</p>
          <p className="text-3xl font-semibold text-accent">{score}/{quizQuestions.length}</p>
        </div>
        <Button variant="secondary" icon={<RotateCcw className="h-4 w-4" />} onClick={() => setAnswers({})}>重新作答</Button>
      </GlassCard>
      <div className="space-y-4">
        {quizQuestions.map((question, index) => {
          const selected = answers[question.id];
          return (
            <GlassCard key={question.id}>
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-heading">{index + 1}. {question.question}</h2>
                {selected !== undefined ? <Badge tone={selected === question.answerIndex ? "blue" : "amber"}>{selected === question.answerIndex ? "正确" : "再想想"}</Badge> : null}
              </div>
              <div className="mt-4 grid gap-2 md:grid-cols-2">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAnswers((current) => ({ ...current, [question.id]: optionIndex }))}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-left text-sm ring-1 transition",
                      selected === optionIndex ? "bg-accent-soft text-accent ring-accent/20" : "bg-card-hover text-body ring-accent/15 hover:bg-accent-soft"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {selected !== undefined ? <p className="mt-4 rounded-2xl border border-accent/20 bg-card-hover p-4 text-sm leading-7 text-body">{question.explanation}</p> : null}
            </GlassCard>
          );
        })}
      </div>
      {finished ? <GlassCard className="mt-5"><p className="text-lg font-semibold text-heading">完成：{score >= 12 ? "基础框架已经比较清楚。" : "可以回到学习路线补一补薄弱环节。"}</p></GlassCard> : null}
    </div>
  );
}
