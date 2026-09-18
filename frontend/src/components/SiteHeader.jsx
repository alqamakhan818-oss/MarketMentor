import { ArrowRight, ChevronRight, Menu, TrendingUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { label: "Home", href: "/", id: "home" },
  { label: "Learn", href: "/learn", id: "learn" },
  { label: "Marketing Planner", href: "/planner", id: "planner" },
  { label: "Content Ideas", href: "/content-ideas", id: "content" },
  { label: "Checklist", href: "/checklist", id: "checklist" },
  { label: "Quiz", href: "/quiz", id: "quiz" },
  { label: "Progress", href: "/progress", id: "progress" },
];

export function SiteHeader({ active }) {
  const location = useLocation();

  const isItemActive = (item) =>
    item.id === active || item.href === location.pathname;

  return (
    <header className="sticky top-0 z-40 border-b border-[#E5E5EA] bg-[#F5F5F7]">
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          to="/"
          className="group flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#007AFF]/20"
          aria-label="MarketMentor home"
        >
          <span className="flex size-10 items-center justify-center rounded-[13px] bg-[#007AFF] text-white shadow-[0_8px_18px_rgba(0,122,255,0.24)] transition-transform group-hover:-translate-y-0.5">
            <TrendingUp aria-hidden="true" className="size-5" strokeWidth={2.4} />
          </span>
          <span className="text-[1.05rem] font-semibold tracking-[-0.025em]">
            Market<span className="text-[#007AFF]">Mentor</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden xl:block">
          <ul className="flex items-center gap-1 rounded-2xl bg-[#ECECEF] p-1.5 shadow-[inset_2px_2px_5px_rgba(29,29,31,0.08),inset_-2px_-2px_5px_rgba(255,255,255,0.9)]">
            {navItems.map((item) => {
              const isActive = isItemActive(item);
              return (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`block rounded-xl px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]/35 ${
                      isActive
                        ? "bg-white text-[#1D1D1F] shadow-[0_2px_8px_rgba(29,29,31,0.08)]"
                        : "text-[#6E6E73] hover:bg-white/70 hover:text-[#1D1D1F]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          to="/learn"
          className="hidden items-center gap-2 rounded-full bg-[#1D1D1F] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(29,29,31,0.16)] transition hover:-translate-y-0.5 hover:bg-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#007AFF]/25 sm:flex xl:hidden"
        >
          Start learning
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>

        <Sheet>
          <SheetTrigger
            className="flex size-11 items-center justify-center rounded-[14px] bg-white text-[#1D1D1F] shadow-[4px_4px_12px_rgba(29,29,31,0.08),-4px_-4px_12px_rgba(255,255,255,0.9)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#007AFF]/20 sm:hidden"
            aria-label="Open navigation menu"
          >
            <Menu aria-hidden="true" className="size-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[88%] border-l border-[#E5E5EA] bg-[#F5F5F7] px-2 sm:max-w-sm"
          >
            <SheetHeader className="px-5 pb-4 pt-7 text-left">
              <div className="mb-5 flex size-11 items-center justify-center rounded-[14px] bg-[#007AFF] text-white shadow-[0_8px_18px_rgba(0,122,255,0.22)]">
                <TrendingUp aria-hidden="true" className="size-5" />
              </div>
              <SheetTitle className="text-2xl tracking-[-0.03em]">MarketMentor</SheetTitle>
              <SheetDescription className="text-base leading-6 text-[#6E6E73]">
                Simple digital marketing guidance for small businesses.
              </SheetDescription>
            </SheetHeader>
            <nav aria-label="Mobile navigation" className="px-3">
              <ul className="space-y-1.5">
                {navItems.map((item) => {
                  const isActive = isItemActive(item);
                  return (
                    <li key={item.id}>
                      <SheetClose asChild>
                        <Link
                          to={item.href}
                          aria-current={isActive ? "page" : undefined}
                          className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition-colors ${
                            isActive
                              ? "bg-white text-[#007AFF] shadow-[0_4px_14px_rgba(29,29,31,0.07)]"
                              : "text-[#3A3A3C] hover:bg-white"
                          }`}
                        >
                          {item.label}
                          <ChevronRight aria-hidden="true" className="size-4 text-[#8E8E93]" />
                        </Link>
                      </SheetClose>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
