"use client";

import { FilterType, TaskStats } from "@/types";
import { cn } from "@/utils/cn";

interface FilterButtonsProps {
  filter: FilterType;
  onFilter: (f: FilterType) => void;
  stats: TaskStats;
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "pending", label: "Pendentes" },
  { value: "completed", label: "Concluídas" },
];

export function FilterButtons({ filter, onFilter, stats }: FilterButtonsProps) {
  const counts: Record<FilterType, number> = {
    all: stats.total,
    pending: stats.pending,
    completed: stats.completed,
  };

  return (
    <div className="flex gap-2 p-1 bg-[var(--card)] border border-[var(--card-border)] rounded-xl">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilter(f.value)}
          className={cn(
            "flex-1 py-2 px-3 rounded-lg text-xs font-600 transition-all duration-200 flex items-center justify-center gap-1.5",
            filter === f.value
              ? "bg-blue-500 text-white shadow-sm shadow-blue-500/30"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
          )}
        >
          {f.label}
          <span
            className={cn(
              "px-1.5 py-0.5 rounded-md text-[10px] font-700",
              filter === f.value
                ? "bg-blue-400/30 text-white"
                : "bg-[var(--background)] text-[var(--muted)]"
            )}
          >
            {counts[f.value]}
          </span>
        </button>
      ))}
    </div>
  );
}
