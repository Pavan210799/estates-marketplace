import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

export default function Pagination({ page, pageCount, onPage }) {
  if (pageCount <= 1) return null;
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
      aria-label="Pagination"
    >
      <button
        type="button"
        className="page-btn min-w-[5.5rem] flex-1 sm:flex-none"
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
      >
        <ChevronLeft size={16} />
        Prev
      </button>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {pages.map((number) => {
          const active = number === page;
          return (
            <button
              key={number}
              type="button"
              className={cn(
                "page-btn relative h-11 min-w-11 px-0 font-medium",
                active && "page-btn-active",
              )}
              aria-current={active ? "page" : undefined}
              aria-label={`Page ${number}`}
              onClick={() => onPage(number)}
            >
              {active ? (
                <motion.span
                  layoutId="pagination-active"
                  className="absolute inset-0 rounded-full bg-forest shadow-lg shadow-forest/30 ring-2 ring-gold-bright ring-offset-2 ring-offset-ivory"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : null}
              <span className={cn("relative", active ? "text-ivory" : "text-ink")}>{number}</span>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className="page-btn min-w-[5.5rem] flex-1 sm:flex-none"
        onClick={() => onPage(page + 1)}
        disabled={page === pageCount}
      >
        Next
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
