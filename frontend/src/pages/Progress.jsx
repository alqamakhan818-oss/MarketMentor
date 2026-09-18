import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CalendarCheck2,
  ChartNoAxesCombined,
  CheckCircle2,
  Circle,
  ListChecks,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Progress } from "@/components/ui/progress";

const initialData = {
  completedLessons: [],
  completedChecklistItems: [],
  quizResult: null,
  marketingPlan: null,
};

function readStringArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? "[]");
    return Array.isArray(value)
      ? value.filter((item) => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function readObject(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? "null");
    return value && typeof value === "object" ? value : null;
  } catch {
    return null;
  }
}

export default function LearningProgressPage() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const loadProgress = () => {
      setData({
        completedLessons: readStringArray("marketmentor.completedLessons").slice(0, 8),
        completedChecklistItems: readStringArray(
          "marketmentor.completedChecklistItems",
        ).slice(0, 18),
        quizResult: readObject("marketmentor.quizResult"),
        marketingPlan: readObject("marketmentor.marketingPlan"),
      });
    };

    const frame = requestAnimationFrame(loadProgress);
    window.addEventListener("focus", loadProgress);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("focus", loadProgress);
    };
  }, []);

  const lessonPercentage = Math.round((data.completedLessons.length / 8) * 100);
  const checklistPercentage = Math.round(
    (data.completedChecklistItems.length / 18) * 100,
  );
  const quizPercentage =
    typeof data.quizResult?.percentage === "number"
      ? Math.min(Math.max(data.quizResult.percentage, 0), 100)
      : 0;
  const planPercentage = data.marketingPlan ? 100 : 0;
  const overallProgress = Math.round(
    (lessonPercentage + checklistPercentage + quizPercentage + planPercentage) / 4,
  );

  const nextStep = useMemo(() => {
    if (data.completedLessons.length < 8) {
      return {
        title: "Continue your lessons",
        detail: `${8 - data.completedLessons.length} lesson${8 - data.completedLessons.length === 1 ? "" : "s"} still waiting for you.`,
        href: "/learn",
        action: "Open Learning Hub",
      };
    }
    if (data.completedChecklistItems.length < 18) {
      return {
        title: "Improve your business readiness",
        detail: `${18 - data.completedChecklistItems.length} checklist task${18 - data.completedChecklistItems.length === 1 ? "" : "s"} can still be completed.`,
        href: "/checklist",
        action: "Open Checklist",
      };
    }
    if (!data.marketingPlan) {
      return {
        title: "Create your first marketing plan",
        detail: "Choose your business, goal and budget to get a simple starting plan.",
        href: "/planner",
        action: "Create Plan",
      };
    }
    if (!data.quizResult) {
      return {
        title: "Test what you learned",
        detail: "Complete the quiz to check your digital marketing knowledge.",
        href: "/quiz",
        action: "Take the Quiz",
      };
    }
    return {
      title: "Keep your marketing information fresh",
      detail: "Review your profiles, content and results regularly as your business changes.",
      href: "/checklist",
      action: "Review Checklist",
    };
  }, [data]);

  const cards = [
    {
      title: "Lessons Completed",
      value: `${data.completedLessons.length} / 8`,
      percentage: lessonPercentage,
      detail:
        data.completedLessons.length === 8
          ? "All lessons completed"
          : "Continue learning at your pace",
      href: "/learn",
      icon: BookOpen,
      tone: "bg-[#EAF3FF] text-[#007AFF]",
      progressTone: "[&_[data-slot=progress-indicator]]:bg-[#007AFF]",
    },
    {
      title: "Latest Quiz Score",
      value: data.quizResult ? `${quizPercentage}%` : "Not taken",
      percentage: quizPercentage,
      detail: data.quizResult
        ? `${data.quizResult.score} of ${data.quizResult.totalQuestions} correct`
        : "Take the quiz when ready",
      href: "/quiz",
      icon: BrainCircuit,
      tone: "bg-[#F2ECFF] text-[#7B4FC6]",
      progressTone: "[&_[data-slot=progress-indicator]]:bg-[#AF52DE]",
    },
    {
      title: "Marketing Checklist",
      value: `${checklistPercentage}%`,
      percentage: checklistPercentage,
      detail: `${data.completedChecklistItems.length} of 18 tasks completed`,
      href: "/checklist",
      icon: ListChecks,
      tone: "bg-[#EAF8EE] text-[#248A3D]",
      progressTone: "[&_[data-slot=progress-indicator]]:bg-[#34C759]",
    },
    {
      title: "Marketing Plan",
      value: data.marketingPlan ? "Completed" : "Not started",
      percentage: planPercentage,
      detail: data.marketingPlan
        ? `${data.marketingPlan.businessType} · ${data.marketingPlan.goal}`
        : "Create a simple plan",
      href: "/planner",
      icon: CalendarCheck2,
      tone: "bg-[#FFF3E3] text-[#D97200]",
      progressTone: "[&_[data-slot=progress-indicator]]:bg-[#FF9500]",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F]">
      <SiteHeader active="progress" />

      <section className="border-b border-[#E5E5EA] bg-white">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1fr_320px] lg:items-center lg:px-10">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#FFEBF1] px-3.5 py-2 text-sm font-semibold text-[#C72552]">
              <ChartNoAxesCombined aria-hidden="true" className="size-4" />
              Progress Dashboard
            </div>
            <h1 className="text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">
              My Learning Progress
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6E6E73]">
              See your lessons, quiz, checklist and marketing plan in one place.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div
              role="img"
              aria-label={`Overall learning progress: ${overallProgress} percent`}
              className="relative size-56 rounded-full p-[18px]"
              style={{
                background: `conic-gradient(#007AFF 0% ${overallProgress}%, #E5E5EA ${overallProgress}% 100%)`,
              }}
            >
              <div className="flex size-full flex-col items-center justify-center rounded-full bg-white text-center shadow-[0_8px_25px_rgba(29,29,31,0.09)]">
                <span className="text-sm font-semibold text-[#8E8E93]">
                  Overall Progress
                </span>
                <strong className="mt-1 text-5xl font-semibold tracking-[-0.06em] text-[#007AFF]">
                  {overallProgress}%
                </strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="rounded-[26px] border border-[#E5E5EA] bg-white p-6 shadow-[0_12px_34px_rgba(29,29,31,0.06)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`flex size-12 items-center justify-center rounded-2xl ${card.tone}`}
                  >
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  {card.percentage === 100 ? (
                    <CheckCircle2
                      aria-label="Completed"
                      className="size-5 text-[#34C759]"
                    />
                  ) : (
                    <Circle
                      aria-label="In progress"
                      className="size-5 text-[#C7C7CC]"
                    />
                  )}
                </div>
                <h2 className="mt-5 text-sm font-semibold text-[#6E6E73]">
                  {card.title}
                </h2>
                <p className="mt-1 text-2xl font-semibold tracking-[-0.035em]">
                  {card.value}
                </p>
                <Progress
                  value={card.percentage}
                  aria-label={`${card.title}: ${card.percentage} percent`}
                  className={`mt-4 h-2 bg-[#E5E5EA] ${card.progressTone}`}
                />
                <p className="mt-3 min-h-10 text-sm leading-5 text-[#8E8E93]">
                  {card.detail}
                </p>
                <Link
                  to={card.href}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg text-sm font-semibold text-[#007AFF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#007AFF]/20"
                >
                  Open
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <section className="rounded-[28px] border border-[#E5E5EA] bg-white p-6 shadow-[0_14px_38px_rgba(29,29,31,0.06)] sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#007AFF]">
                <Target aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#007AFF]">
                  Recommended Next Step
                </p>
                <h2 className="mt-0.5 text-2xl font-semibold tracking-[-0.03em]">
                  {nextStep.title}
                </h2>
              </div>
            </div>
            <p className="mt-5 text-base leading-7 text-[#6E6E73]">
              {nextStep.detail}
            </p>
            <Link
              to={nextStep.href}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#007AFF] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_9px_22px_rgba(0,122,255,0.2)] transition hover:-translate-y-0.5 hover:bg-[#006FE6] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#007AFF]/25"
            >
              {nextStep.action}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </section>

          <section className="rounded-[28px] border border-[#E5E5EA] bg-[#F8F8FA] p-6 sm:p-8">
            <p className="text-sm font-semibold text-[#6E6E73]">
              Marketing Plan Status
            </p>
            {data.marketingPlan ? (
              <>
                <div className="mt-4 flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-[#EAF8EE] text-[#248A3D]">
                    <CheckCircle2 aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold">Plan created</h2>
                    <p className="mt-0.5 text-sm text-[#6E6E73]">
                      {data.marketingPlan.businessType}
                    </p>
                  </div>
                </div>
                <dl className="mt-5 grid gap-3 text-sm">
                  <div className="flex justify-between gap-4 rounded-2xl bg-white px-4 py-3">
                    <dt className="text-[#6E6E73]">Main goal</dt>
                    <dd className="text-right font-semibold">
                      {data.marketingPlan.goal}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 rounded-2xl bg-white px-4 py-3">
                    <dt className="text-[#6E6E73]">Monthly budget</dt>
                    <dd className="text-right font-semibold">
                      {data.marketingPlan.budget}
                    </dd>
                  </div>
                </dl>
              </>
            ) : (
              <div className="mt-5 rounded-2xl border border-dashed border-[#C7C7CC] bg-white p-5">
                <h2 className="text-lg font-semibold">No plan created yet</h2>
                <p className="mt-2 text-sm leading-6 text-[#6E6E73]">
                  Create a simple plan based on your business type, goal and budget.
                </p>
              </div>
            )}
          </section>
        </div>

        <p className="mt-7 text-center text-sm leading-6 text-[#8E8E93]">
          Progress is saved on this device. Clearing browser storage resets this dashboard.
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
