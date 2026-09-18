import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#E5E5EA] bg-[#F5F5F7]">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-5 py-8 text-sm text-[#6E6E73] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <Link
          to="/"
          className="flex w-fit items-center gap-2.5 rounded-lg font-semibold text-[#3A3A3C] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#007AFF]/20"
        >
          <span className="flex size-8 items-center justify-center rounded-[10px] bg-[#007AFF] text-white">
            <TrendingUp aria-hidden="true" className="size-4" />
          </span>
          MarketMentor
        </Link>
        <p>Digital marketing training for small businesses.</p>
      </div>
    </footer>
  );
}
