"use client";

import { Moon, Sun, BookOpen } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import { ReactNode } from "react";

interface HeaderProps {
  rightSlot?: ReactNode;
}

export function Header({ rightSlot }: HeaderProps) {
  const { isDark, toggle } = useDarkMode();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[var(--card)] backdrop-blur-sm bg-opacity-90">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <BookOpen size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-700 text-[var(--foreground)] leading-none">
              StudyFlow
            </h1>
            <p className="text-xs text-[var(--muted)] leading-none mt-0.5">
              ODS 4 — Educação de Qualidade
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {rightSlot}
          <button
            onClick={toggle}
            aria-label="Alternar tema"
            className="w-9 h-9 rounded-xl border border-[var(--card-border)] bg-[var(--background)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] hover:border-blue-400 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}
