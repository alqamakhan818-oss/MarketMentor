import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  ChartNoAxesCombined,
  Check,
  Lightbulb,
  ListChecks,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const journey = [
  {
    label: "Learn",
    detail: "Understand the basics",
    icon: BookOpen,
    color: "bg-[#EAF3FF] text-[#007AFF]",
  },
  {
    label: "Plan",
    detail: "Choose your next action",
    icon: CalendarDays,
    color: "bg-[#FFF3E3] text-[#D97200]",
  },
  {
    label: "Apply",
    detail: "Use simple practical tools",
    icon: Target,
    color: "bg-[#EAF8EE] text-[#248A3D]",
  },
  {
    label: "Track",
    detail: "See what you complete",
    icon: ChartNoAxesCombined,
    color: "bg-[#F2ECFF] text-[#7B4FC6]",
  },
];

const features = [
  {
    id: "learn",
    title: "Digital Marketing Lessons",
    description:
      "Learn social media, Google, SEO, WhatsApp and online reviews in simple language.",
    action: "Browse lessons",
    href: "/learn",
    icon: BookOpen,
    tone: "blue",
  },
  {
    id: "planner",
    title: "Marketing Planner",
    description:
      "Create a practical plan based on your business, goal and monthly budget.",
    action: "Build a plan",
    href: "/planner",
    icon: CalendarDays,
    tone: "orange",
  },
  {
    id: "content",
    title: "Content Ideas",
    description:
      "Get ready-to-use ideas for products, offers, festivals and customer stories.",
    action: "Find ideas",
    href: "/content-ideas",
    icon: Lightbulb,
    tone: "yellow",
  },
  {
    id: "checklist",
    title: "Business Checklist",
    description:
      "Check whether your business profile, social pages and customer channels are ready.",
    action: "Check readiness",
    href: "/checklist",
    icon: ListChecks,
    tone: "green",
  },
  {
    id: "quiz",
    title: "Knowledge Quiz",
    description:
      "Test your understanding with short questions and clear explanations.",
    action: "Take the quiz",
    href: "/quiz",
    icon: BrainCircuit,
    tone: "purple",
  },
  {
    id: "progress",
    title: "Progress Tracking",
    description:
      "Keep your lessons, quiz score, checklist and marketing plan in one place.",
    action: "View progress",
    href: "/progress",
    icon: ChartNoAxesCombined,
    tone: "pink",
  },
];

export default function Home() {
  return (
    <main id="home" className="min-h-screen overflow-x-hidden bg-[#F5F5F7] text-[#1D1D1F]">
      <SiteHeader active="home" />

      <section className="relative isolate">
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />
        <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-24">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D7E8FF] bg-[#EDF5FF] px-3.5 py-2 text-sm font-semibold text-[#0064D8]">
              <Sparkles aria-hidden="true" className="size-4" />
              Practical skills for local businesses
            </div>
            <h1 className="max-w-[760px] text-[clamp(2.75rem,6vw,5.35rem)] font-semibold leading-[0.98] tracking-[-0.062em] text-[#1D1D1F]">
              Grow your business with
              <span className="block text-[#007AFF]">digital marketing.</span>
            </h1>
            <p className="mt-7 max-w-[650px] text-lg leading-8 text-[#6E6E73] sm:text-xl">
              Learn practical digital marketing skills and create a simple marketing strategy for your small business.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/learn"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#007AFF] px-6 py-3.5 text-base font-semibold text-white shadow-[0_12px_28px_rgba(0,122,255,0.24)] transition hover:-translate-y-0.5 hover:bg-[#006FE6] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#007AFF]/25"
              >
                Start Learning
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                to="/planner"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#E5E5EA] bg-white px-6 py-3.5 text-base font-semibold text-[#1D1D1F] shadow-[0_8px_24px_rgba(29,29,31,0.08)] transition hover:-translate-y-0.5 hover:border-[#D1D1D6] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#007AFF]/20"
              >
                Create Marketing Plan
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#6E6E73]">
              <span className="flex items-center gap-2">
                <Check aria-hidden="true" className="size-4 text-[#34C759]" strokeWidth={2.8} />
                Beginner friendly
              </span>
              <span className="flex items-center gap-2">
                <Check aria-hidden="true" className="size-4 text-[#34C759]" strokeWidth={2.8} />
                Simple English
              </span>
              <span className="flex items-center gap-2">
                <Check aria-hidden="true" className="size-4 text-[#34C759]" strokeWidth={2.8} />
                Practical tools
              </span>
            </div>
          </div>

          <div id="growth-path" className="relative mx-auto w-full max-w-[510px] lg:justify-self-end">
            <div className="rounded-[32px] bg-[#F1F1F4] p-3 shadow-[inset_3px_3px_8px_rgba(29,29,31,0.08),inset_-3px_-3px_8px_rgba(255,255,255,0.9)]">
              <div className="rounded-[25px] bg-white p-6 shadow-[0_18px_46px_rgba(29,29,31,0.11)] sm:p-8">
                <div className="mb-8 flex items-start justify-between gap-6">
                  <div>
                    <p className="text-sm font-semibold text-[#007AFF]">Your growth path</p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-[#1D1D1F] sm:text-[1.75rem]">
                      One clear step at a time
                    </h2>
                  </div>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#007AFF]">
                    <TrendingUp aria-hidden="true" className="size-5" />
                  </span>
                </div>

                <ol className="relative space-y-3 before:absolute before:bottom-9 before:left-[23px] before:top-9 before:w-px before:bg-[#E5E5EA]">
                  {journey.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <li
                        key={step.label}
                        className="relative flex items-center gap-4 rounded-[20px] border border-[#ECECEF] bg-[#FAFAFC] p-3.5 transition-transform hover:translate-x-1"
                      >
                        <span className={`z-10 flex size-12 shrink-0 items-center justify-center rounded-2xl ${step.color}`}>
                          <Icon aria-hidden="true" className="size-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-base font-semibold text-[#1D1D1F]">{step.label}</span>
                          <span className="mt-0.5 block text-sm text-[#6E6E73]">{step.detail}</span>
                        </span>
                        <span className="text-sm font-semibold tabular-nums text-[#AEAEB2]">
                          0{index + 1}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_14px_34px_rgba(29,29,31,0.12)] sm:flex">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#EAF8EE] text-[#248A3D]">
                <Check aria-hidden="true" className="size-4" strokeWidth={3} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-[#1D1D1F]">Made to be useful</span>
                <span className="block text-xs text-[#6E6E73]">No difficult marketing terms</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-[#E5E5EA] bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#007AFF]">Everything you need to begin</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[#1D1D1F] sm:text-5xl">
              Learn it. Plan it. Use it.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#6E6E73]">
              Short lessons and practical tools help you move from understanding marketing to using it for your business.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  id={feature.id}
                  className="feature-card group scroll-mt-28 rounded-[26px] border border-[#ECECEF] bg-[#F8F8FA] p-6 sm:p-7"
                >
                  <span className={`feature-icon feature-icon-${feature.tone}`}>
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold tracking-[-0.025em] text-[#1D1D1F]">{feature.title}</h3>
                  <p className="mt-3 min-h-[72px] text-base leading-6 text-[#6E6E73]">{feature.description}</p>
                  <Link
                    to={feature.href}
                    className="mt-6 inline-flex items-center gap-1.5 rounded-lg text-sm font-semibold text-[#007AFF] outline-none transition-all group-hover:gap-2.5 focus-visible:ring-4 focus-visible:ring-[#007AFF]/20"
                  >
                    {feature.action}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
