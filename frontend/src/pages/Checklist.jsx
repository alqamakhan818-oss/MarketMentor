import { useEffect, useMemo, useState } from "react";
import {
  BadgeIndianRupee,
  BriefcaseBusiness,
  Camera,
  CheckCircle2,
  Clock3,
  ListChecks,
  MapPin,
  Megaphone,
  MessageCircle,
  Search,
  Share2,
  Sparkles,
} from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { syncChecklistProgress } from "@/services/api";

const checklistGroups = [
  {
    id: "business-basics",
    title: "Business Basics",
    description: "Keep your main business details ready and consistent.",
    icon: BriefcaseBusiness,
    tone: "bg-[#EAF3FF] text-[#007AFF]",
    items: [
      { id: "business-name", label: "Business name finalized" },
      { id: "contact-number", label: "Contact number available" },
      { id: "business-address", label: "Business address available" },
      { id: "business-logo", label: "Business logo available" },
      { id: "business-hours", label: "Business hours finalized" },
      { id: "products-listed", label: "Products or services listed clearly" },
    ],
  },
  {
    id: "google-presence",
    title: "Google Presence",
    description: "Help nearby customers find and trust your business.",
    icon: MapPin,
    tone: "bg-[#EAF8EE] text-[#248A3D]",
    items: [
      { id: "google-profile", label: "Google Business Profile created" },
      { id: "google-information", label: "Correct business information added" },
      { id: "google-photos", label: "Business photos uploaded" },
      { id: "google-reviews", label: "Customer reviews collected" },
    ],
  },
  {
    id: "social-media",
    title: "Social Media",
    description: "Create complete profiles and post useful updates regularly.",
    icon: Share2,
    tone: "bg-[#F2ECFF] text-[#7B4FC6]",
    items: [
      { id: "instagram-account", label: "Instagram business account created" },
      { id: "facebook-page", label: "Facebook page created" },
      { id: "social-bio", label: "Business bio completed" },
      { id: "social-contact", label: "Contact information added" },
      { id: "regular-posts", label: "Posts uploaded regularly" },
    ],
  },
  {
    id: "customer-communication",
    title: "Customer Communication",
    description: "Make it easy to answer questions and show what you offer.",
    icon: MessageCircle,
    tone: "bg-[#FFF3E3] text-[#D97200]",
    items: [
      { id: "whatsapp-business", label: "WhatsApp Business configured" },
      { id: "product-catalogue", label: "Product catalogue added" },
      { id: "quick-replies", label: "Quick replies configured" },
    ],
  },
];

const checklistItems = checklistGroups.flatMap((group) => group.items);
const checklistStorageKey = "marketmentor.completedChecklistItems";
const budgetStorageKey = "marketmentor.monthlyBudget";

const budgetCategories = [
  {
    id: "social-media-ads",
    label: "Social Media Ads",
    percentage: 40,
    color: "#007AFF",
    icon: Megaphone,
  },
  {
    id: "google-ads",
    label: "Google Ads",
    percentage: 30,
    color: "#34C759",
    icon: Search,
  },
  {
    id: "content-creation",
    label: "Content Creation",
    percentage: 20,
    color: "#FF9500",
    icon: Camera,
  },
  {
    id: "other-marketing",
    label: "Other Marketing",
    percentage: 10,
    color: "#AF52DE",
    icon: Sparkles,
  },
];

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

function formatRupees(value) {
  return `₹${currencyFormatter.format(value)}`;
}

function calculateAllocation(total) {
  const social = Math.floor(total * 0.4);
  const google = Math.floor(total * 0.3);
  const content = Math.floor(total * 0.2);
  const other = total - social - google - content;
  const amounts = [social, google, content, other];

  return budgetCategories.map((category, index) => ({
    ...category,
    amount: amounts[index],
  }));
}

function getReadinessMessage(progress) {
  if (progress <= 30) {
    return {
      title: "You're just getting started.",
      detail: "Complete the business basics first, then build your Google and social presence.",
      tone: "border-[#D7E8FF] bg-[#F0F7FF] text-[#0064D8]",
    };
  }

  if (progress <= 70) {
    return {
      title: "Good progress. Keep improving your online presence.",
      detail: "Focus on the remaining profiles, customer details and regular updates.",
      tone: "border-[#FFE0B5] bg-[#FFF8EC] text-[#B75E00]",
    };
  }

  return {
    title: "Your business has a strong digital marketing foundation.",
    detail: "Keep your information updated and continue communicating consistently.",
    tone: "border-[#CFEED7] bg-[#EFFAF2] text-[#1C7D36]",
  };
}

export default function BusinessMarketingChecklistPage() {
  const [completedItems, setCompletedItems] = useState([]);
  const [budgetInput, setBudgetInput] = useState("5000");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const savedItems = JSON.parse(
          localStorage.getItem(checklistStorageKey) ?? "[]",
        );
        if (Array.isArray(savedItems)) {
          const validIds = new Set(checklistItems.map((item) => item.id));
          setCompletedItems(
            savedItems.filter((id) => typeof id === "string" && validIds.has(id)),
          );
        }
      } catch {
        // Keep the empty initial state when saved checklist data is invalid.
      }

      const savedBudget = localStorage.getItem(budgetStorageKey);
      if (savedBudget && /^\d{1,9}$/.test(savedBudget)) {
        setBudgetInput(savedBudget);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const setChecklistCompletion = (itemId, completed) => {
    setCompletedItems((current) => {
      const next = completed
        ? Array.from(new Set([...current, itemId]))
        : current.filter((id) => id !== itemId);
      localStorage.setItem(checklistStorageKey, JSON.stringify(next));
      syncChecklistProgress(next);
      return next;
    });
  };

  const setMonthlyBudget = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 9);
    setBudgetInput(digits);
    localStorage.setItem(budgetStorageKey, digits || "0");
  };

  const completedCount = completedItems.length;
  const progress = Math.round((completedCount / checklistItems.length) * 100);
  const readiness = getReadinessMessage(progress);
  const monthlyBudget = Math.min(
    Number.parseInt(budgetInput || "0", 10) || 0,
    999999999,
  );
  const allocation = useMemo(
    () => calculateAllocation(monthlyBudget),
    [monthlyBudget],
  );

  return (
    <main className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F]">
      <SiteHeader active="checklist" />

      <section className="border-b border-[#E5E5EA] bg-white">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1fr_380px] lg:items-end lg:px-10">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#EAF8EE] px-3.5 py-2 text-sm font-semibold text-[#248A3D]">
              <ListChecks aria-hidden="true" className="size-4" />
              Business Marketing Checklist
            </div>
            <h1 className="text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">
              Is Your Business Ready for Digital Marketing?
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6E6E73]">
              Tick each task you have completed. Your progress is saved on this device so you can continue later.
            </p>
          </div>

          <aside className="rounded-[26px] border border-[#E5E5EA] bg-[#F8F8FA] p-6 shadow-[7px_7px_18px_rgba(29,29,31,0.06),-7px_-7px_18px_rgba(255,255,255,0.9)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#6E6E73]">
                  Digital Marketing Readiness
                </p>
                <p className="mt-1 text-2xl font-semibold tracking-[-0.03em]">
                  {completedCount} / {checklistItems.length} Tasks
                </p>
              </div>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF8EE] text-[#248A3D]">
                <CheckCircle2 aria-hidden="true" className="size-6" />
              </span>
            </div>
            <Progress
              value={progress}
              aria-label={`${completedCount} of ${checklistItems.length} tasks completed`}
              className="mt-5 h-3 bg-[#E5E5EA] [&_[data-slot=progress-indicator]]:bg-[#34C759]"
            />
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-[#6E6E73]">Completed</span>
              <span className="font-semibold tabular-nums text-[#248A3D]">
                {progress}%
              </span>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <div
          aria-live="polite"
          className={`mb-8 rounded-[22px] border px-5 py-4 ${readiness.tone}`}
        >
          <p className="font-semibold">{readiness.title}</p>
          <p className="mt-1 text-sm leading-6 opacity-80">{readiness.detail}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-start">
          <div className="grid gap-5 md:grid-cols-2">
            {checklistGroups.map((group) => {
              const Icon = group.icon;
              const groupCompleted = group.items.filter((item) =>
                completedItems.includes(item.id),
              ).length;

              return (
                <section
                  key={group.id}
                  aria-labelledby={`${group.id}-title`}
                  className="rounded-[28px] border border-[#E5E5EA] bg-white p-6 shadow-[0_14px_36px_rgba(29,29,31,0.06)] sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${group.tone}`}
                    >
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="rounded-full bg-[#F1F1F4] px-3 py-1.5 text-sm font-semibold tabular-nums text-[#6E6E73]">
                      {groupCompleted}/{group.items.length}
                    </span>
                  </div>
                  <h2
                    id={`${group.id}-title`}
                    className="mt-5 text-xl font-semibold tracking-[-0.025em]"
                  >
                    {group.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#6E6E73]">
                    {group.description}
                  </p>

                  <div className="mt-5 space-y-2.5">
                    {group.items.map((item) => {
                      const checked = completedItems.includes(item.id);
                      return (
                        <label
                          key={item.id}
                          className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition-colors focus-within:ring-4 focus-within:ring-[#007AFF]/15 ${
                            checked
                              ? "border-[#CFEED7] bg-[#F2FBF4]"
                              : "border-[#ECECEF] bg-[#FAFAFC] hover:border-[#D1D1D6]"
                          }`}
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(value) =>
                              setChecklistCompletion(item.id, value === true)
                            }
                            className="mt-0.5 size-5 rounded-md border-[#C7C7CC] data-[state=checked]:border-[#34C759] data-[state=checked]:bg-[#34C759]"
                            aria-label={item.label}
                          />
                          <span
                            className={`text-sm font-medium leading-5 ${
                              checked
                                ? "text-[#3A3A3C] line-through decoration-[#8E8E93]"
                                : "text-[#1D1D1F]"
                            }`}
                          >
                            {item.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          <aside
            id="budget-planner"
            className="rounded-[30px] border border-[#E5E5EA] bg-white p-6 shadow-[0_18px_46px_rgba(29,29,31,0.09)] sm:p-8 lg:sticky lg:top-24"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-[#FFF3E3] text-[#D97200]">
                <BadgeIndianRupee aria-hidden="true" className="size-6" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#D97200]">
                  Marketing Budget Planner
                </p>
                <h2 className="mt-0.5 text-2xl font-semibold tracking-[-0.035em]">
                  Plan a monthly budget
                </h2>
              </div>
            </div>

            <label
              htmlFor="monthly-budget"
              className="mt-7 block text-sm font-semibold text-[#3A3A3C]"
            >
              Monthly Marketing Budget
            </label>
            <div className="relative mt-2">
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-lg font-semibold text-[#6E6E73]">
                ₹
              </span>
              <Input
                id="monthly-budget"
                type="text"
                inputMode="numeric"
                value={budgetInput}
                onChange={(event) => setMonthlyBudget(event.target.value)}
                placeholder="5000"
                aria-describedby="budget-help"
                className="h-14 rounded-2xl border-[#D1D1D6] bg-[#FAFAFC] pl-9 text-lg font-semibold tabular-nums shadow-none focus-visible:border-[#007AFF] focus-visible:ring-[#007AFF]/20"
              />
            </div>
            <p id="budget-help" className="mt-2 text-sm leading-5 text-[#6E6E73]">
              Enter any monthly amount to see an example allocation.
            </p>

            <div className="mt-7 flex justify-center">
              <div
                role="img"
                aria-label="Budget allocation chart: 40 percent social media ads, 30 percent Google ads, 20 percent content creation and 10 percent other marketing"
                className="relative size-52 rounded-full"
                style={{
                  background:
                    "conic-gradient(#007AFF 0% 40%, #34C759 40% 70%, #FF9500 70% 90%, #AF52DE 90% 100%)",
                }}
              >
                <div className="absolute inset-[26px] flex flex-col items-center justify-center rounded-full bg-white text-center shadow-[inset_0_0_0_1px_#ECECEF]">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8E8E93]">
                    Total
                  </span>
                  <strong className="mt-1 max-w-[145px] break-words text-2xl font-semibold tracking-[-0.04em]">
                    {formatRupees(monthlyBudget)}
                  </strong>
                  <span className="mt-1 text-xs text-[#8E8E93]">per month</span>
                </div>
              </div>
            </div>

            <div className="mt-7 space-y-3">
              {allocation.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-2xl border border-[#ECECEF] bg-[#FAFAFC] p-3.5"
                  >
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-xl text-white"
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon aria-hidden="true" className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{item.label}</p>
                      <p className="mt-0.5 text-xs text-[#8E8E93]">
                        {item.percentage}% of the monthly budget
                      </p>
                    </div>
                    <strong className="shrink-0 text-sm font-semibold tabular-nums">
                      {formatRupees(item.amount)}
                    </strong>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#F1F1F4] p-4 text-sm leading-6 text-[#6E6E73]">
              <Clock3
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-[#007AFF]"
              />
              <p>
                <strong className="font-semibold text-[#3A3A3C]">
                  Educational example only.
                </strong>{" "}
                Actual marketing budgets should depend on your business goals,
                audience and results.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
