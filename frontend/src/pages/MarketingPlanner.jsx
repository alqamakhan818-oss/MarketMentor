import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarCheck2,
  CircleDollarSign,
  Goal,
  Image,
  Info,
  MapPin,
  MessageCircle,
  PlaySquare,
  Store,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { syncMarketingPlan } from "@/services/api";

const businessTypes = [
  "Clothing Store",
  "Restaurant",
  "Mobile Shop",
  "Salon",
  "Grocery Store",
  "Freelancer",
  "Home Business",
  "Coaching Classes",
  "Other",
];

const goals = [
  "Get more customers",
  "Increase local awareness",
  "Promote new products",
  "Increase online enquiries",
  "Build social media presence",
];

const budgets = [
  "₹0",
  "₹1–₹1,000",
  "₹1,000–₹5,000",
  "₹5,000–₹10,000",
  "₹10,000+",
];

const businessContent = {
  "Clothing Store": {
    subject: "new arrivals, colours and available sizes",
    video: "style one product in two or three simple ways",
    idea: "Create a “New Arrival of the Week” post.",
  },
  Restaurant: {
    subject: "popular dishes, today’s special and clean presentation",
    video: "show a short preparation or serving moment",
    idea: "Create a “Dish of the Week” post.",
  },
  "Mobile Shop": {
    subject: "phones, accessories, prices and useful features",
    video: "demonstrate one product feature or accessory",
    idea: "Create a simple product comparison post.",
  },
  Salon: {
    subject: "services, appointment availability and finished looks",
    video: "share a short service or care tip with permission",
    idea: "Create a weekly hair or skincare tip.",
  },
  "Grocery Store": {
    subject: "fresh stock, daily essentials and useful offers",
    video: "show a quick tour of newly stocked products",
    idea: "Create a “Fresh Stock Today” update.",
  },
  Freelancer: {
    subject: "your services, work examples and the problems you solve",
    video: "explain one useful tip from your area of work",
    idea: "Create a short before-and-after project story.",
  },
  "Home Business": {
    subject: "your products, ordering details and how items are made",
    video: "show a simple behind-the-scenes process",
    idea: "Create a “Made with Care” product story.",
  },
  "Coaching Classes": {
    subject: "courses, schedules, learning tips and student support",
    video: "teach one short concept or study technique",
    idea: "Create one helpful study tip every week.",
  },
  Other: {
    subject: "your products, services and the value they provide",
    video: "show how your main product or service works",
    idea: "Create a post answering one common customer question.",
  },
};

const budgetGuidance = {
  "₹0":
    "Focus on free tools: regular posts, WhatsApp updates, Google Business Profile and customer reviews.",
  "₹1–₹1,000":
    "Use mostly free methods. If suitable, test a very small local promotion on your best-performing post.",
  "₹1,000–₹5,000":
    "Keep most activity organic and reserve a small amount for one focused local ad test each month.",
  "₹5,000–₹10,000":
    "Split the budget between content creation and carefully targeted ad tests. Review results every week.",
  "₹10,000+":
    "Plan separate amounts for content and advertising, but increase spending only when results support it.",
};

const goalDirection = {
  "Get more customers": "Use clear calls to visit, enquire or place an order.",
  "Increase local awareness": "Mention your area and use location details consistently.",
  "Promote new products": "Make new products the main subject of this month’s posts.",
  "Increase online enquiries": "Keep contact details visible and reply quickly to questions.",
  "Build social media presence": "Follow a regular weekly posting routine and keep the visual style consistent.",
};

const iconMap = {
  social: Image,
  video: PlaySquare,
  whatsapp: MessageCircle,
  google: MapPin,
  content: Goal,
};

const storageKey = "marketmentor.marketingPlan";

function createMarketingPlan(businessType, goal, budget) {
  const content = businessContent[businessType];

  return {
    businessType,
    goal,
    budget,
    createdAt: new Date().toISOString(),
    budgetGuidance: budgetGuidance[budget],
    recommendations: [
      {
        channel: "Instagram & Facebook",
        action: `Post ${content.subject} about 3 times per week. ${goalDirection[goal]}`,
        icon: "social",
      },
      {
        channel: "Short Videos",
        action: `Create 1–2 simple Reels or short videos per week that ${content.video}.`,
        icon: "video",
      },
      {
        channel: "WhatsApp",
        action:
          "Share important offers or updates with existing customers who agreed to receive messages. Avoid repeated messages.",
        icon: "whatsapp",
      },
      {
        channel: "Google Business",
        action:
          "Keep contact details and opening hours correct, upload fresh photos and politely request genuine customer reviews.",
        icon: "google",
      },
      {
        channel: "Content Idea",
        action: content.idea,
        icon: "content",
      },
    ],
  };
}

export default function MarketingPlannerPage() {
  const [businessType, setBusinessType] = useState("");
  const [goal, setGoal] = useState("");
  const [budget, setBudget] = useState("");
  const [plan, setPlan] = useState(null);
  const [showErrors, setShowErrors] = useState(false);

  const savePlan = (selectedBusiness, selectedGoal, selectedBudget) => {
    const nextPlan = createMarketingPlan(selectedBusiness, selectedGoal, selectedBudget);
    setBusinessType(selectedBusiness);
    setGoal(selectedGoal);
    setBudget(selectedBudget);
    setPlan(nextPlan);
    localStorage.setItem(storageKey, JSON.stringify(nextPlan));
    syncMarketingPlan({
      businessType: nextPlan.businessType,
      goal: nextPlan.goal,
      budget: nextPlan.budget,
      recommendedPlan: {
        recommendations: nextPlan.recommendations,
        budgetGuidance: nextPlan.budgetGuidance,
      },
    });
    setShowErrors(false);
    return nextPlan;
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null");
        if (
          saved &&
          businessTypes.includes(saved.businessType) &&
          goals.includes(saved.goal) &&
          budgets.includes(saved.budget)
        ) {
          setBusinessType(saved.businessType);
          setGoal(saved.goal);
          setBudget(saved.budget);
          setPlan(saved);
        }
      } catch {
        // Keep the empty initial state when saved browser data is invalid.
      }
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!businessType || !goal || !budget) {
      setShowErrors(true);
      return;
    }
    savePlan(businessType, goal, budget);
  };

  return (
    <main className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F]">
      <SiteHeader active="planner" />

      <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#FFF3E3] px-3.5 py-2 text-sm font-semibold text-[#B75E00]">
            <CalendarCheck2 aria-hidden="true" className="size-4" />
            Marketing Planner
          </div>
          <h1 className="text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">
            Create a Simple Marketing Plan for Your Business
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6E6E73]">
            Choose three basic details. MarketMentor will suggest a practical starting plan that you can adjust for your business.
          </p>
        </div>

        <div className="mt-10 grid gap-7 lg:grid-cols-[420px_1fr] lg:items-start">
          <form
            onSubmit={handleSubmit}
            className="rounded-[28px] border border-[#E5E5EA] bg-white p-6 shadow-[0_16px_40px_rgba(29,29,31,0.08)] sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#007AFF]">
                <Store aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-[-0.025em]">Tell us about your business</h2>
                <p className="mt-1 text-sm text-[#6E6E73]">All three choices are required.</p>
              </div>
            </div>

            <div className="mt-7 space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#3A3A3C]">
                  Business category
                </label>
                <Select value={businessType} onValueChange={(value) => setBusinessType(value)}>
                  <SelectTrigger
                    aria-label="Business category"
                    className="h-12 w-full rounded-xl border-[#D1D1D6] bg-[#F8F8FA] px-4 text-base shadow-none"
                  >
                    <SelectValue placeholder="Select a business category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type} className="py-2.5 text-base">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#3A3A3C]">
                  What is your main marketing goal?
                </label>
                <Select value={goal} onValueChange={(value) => setGoal(value)}>
                  <SelectTrigger
                    aria-label="Main marketing goal"
                    className="h-12 w-full rounded-xl border-[#D1D1D6] bg-[#F8F8FA] px-4 text-base shadow-none"
                  >
                    <SelectValue placeholder="Select your main goal" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {goals.map((item) => (
                      <SelectItem key={item} value={item} className="py-2.5 text-base">
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#3A3A3C]">
                  Monthly marketing budget
                </label>
                <Select value={budget} onValueChange={(value) => setBudget(value)}>
                  <SelectTrigger
                    aria-label="Monthly marketing budget"
                    className="h-12 w-full rounded-xl border-[#D1D1D6] bg-[#F8F8FA] px-4 text-base shadow-none"
                  >
                    <SelectValue placeholder="Select a budget range" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {budgets.map((item) => (
                      <SelectItem key={item} value={item} className="py-2.5 text-base">
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {showErrors && (
              <p role="alert" className="mt-5 rounded-xl bg-[#FFF1F0] px-4 py-3 text-sm font-medium text-[#C7322B]">
                Please select your business category, goal and budget.
              </p>
            )}

            <Button
              type="submit"
              className="mt-7 h-12 w-full rounded-xl bg-[#007AFF] text-base font-semibold text-white shadow-[0_10px_24px_rgba(0,122,255,0.2)] hover:bg-[#006FE6]"
            >
              Generate My Plan
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </form>

          <section
            aria-live="polite"
            aria-label="Recommended marketing plan"
            className="min-h-[520px] rounded-[28px] border border-[#E5E5EA] bg-[#F8F8FA] p-6 shadow-[inset_3px_3px_8px_rgba(29,29,31,0.05),inset_-3px_-3px_8px_rgba(255,255,255,0.9)] sm:p-8"
          >
            {plan ? (
              <>
                <div className="flex flex-col gap-4 border-b border-[#E5E5EA] pb-6 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#007AFF]">Recommended Plan</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                      {plan.businessType}
                    </h2>
                    <p className="mt-2 text-base text-[#6E6E73]">{plan.goal}</p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-[#3A3A3C] shadow-[0_4px_12px_rgba(29,29,31,0.07)]">
                    <CircleDollarSign aria-hidden="true" className="size-4 text-[#34C759]" />
                    {plan.budget}
                  </span>
                </div>

                <div className="mt-6 grid gap-3">
                  {plan.recommendations.map((recommendation) => {
                    const Icon = iconMap[recommendation.icon];
                    return (
                      <article
                        key={recommendation.channel}
                        className="flex gap-4 rounded-2xl border border-[#E5E5EA] bg-white p-4"
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#007AFF]">
                          <Icon aria-hidden="true" className="size-4.5" />
                        </span>
                        <div>
                          <h3 className="font-semibold text-[#1D1D1F]">{recommendation.channel}</h3>
                          <p className="mt-1 text-sm leading-6 text-[#6E6E73]">{recommendation.action}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-2xl border border-[#D7E8FF] bg-[#EDF5FF] p-4">
                  <div className="flex gap-3">
                    <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#007AFF]" />
                    <div>
                      <h3 className="font-semibold text-[#1D1D1F]">Budget guidance</h3>
                      <p className="mt-1 text-sm leading-6 text-[#4B5563]">{plan.budgetGuidance}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex min-h-[455px] flex-col items-center justify-center px-4 text-center">
                <span className="flex size-16 items-center justify-center rounded-[22px] bg-white text-[#007AFF] shadow-[0_10px_28px_rgba(29,29,31,0.09)]">
                  <Goal aria-hidden="true" className="size-7" />
                </span>
                <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em]">
                  Your plan will appear here
                </h2>
                <p className="mt-3 max-w-md text-base leading-7 text-[#6E6E73]">
                  Select your business, goal and budget to receive a clear list of actions you can start with.
                </p>
              </div>
            )}
          </section>
        </div>

        <div className="mt-7 flex flex-col gap-4 rounded-[22px] border border-[#FFD8A3] bg-[#FFF7EA] p-5 text-[#6B4308] sm:flex-row sm:items-start">
          <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <p className="text-sm leading-6">
            These are educational recommendations, not guaranteed business results. Choose actions that suit your customers, available time and actual results.
          </p>
        </div>

        <div className="mt-9 flex justify-end">
          <Link
            to="/content-ideas"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-6 py-3 text-base font-semibold text-white shadow-[0_10px_24px_rgba(29,29,31,0.15)] transition hover:-translate-y-0.5 hover:bg-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#007AFF]/20"
          >
            Create social media content
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
