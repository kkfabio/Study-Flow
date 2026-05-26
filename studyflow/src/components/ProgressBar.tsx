"use client";

import { TaskStats } from "@/types";
import { Trophy, Target, CheckCircle2, Clock } from "lucide-react";

interface ProgressBarProps {
  stats: TaskStats;
}

export function ProgressBar({ stats }: ProgressBarProps) {
  const { total, completed, pending, percentage } = stats;

  const getMessage = () => {
    if (total === 0) return "Adicione suas primeiras tarefas!";
    if (percentage === 100) return "Parabéns! Todas as tarefas concluídas! 🎉";
    if (percentage >= 75) return "Quase lá! Continue assim!";
    if (percentage >= 50) return "Metade do caminho percorrido!";
    if (percentage >= 25) return "Bom progresso! Continue estudando!";
    return "Vamos começar! Você consegue!";
  };

  return (
    <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-blue-500" />
          <span className="text-sm font-600 text-[var(--foreground)]">
            Progresso Geral
          </span>
        </div>
        <span className="text-2xl font-700 text-blue-500 tabular-nums">
          {percentage}%
        </span>
      </div>

      <div className="relative h-2.5 bg-[var(--background)] rounded-full overflow-hidden mb-4">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${percentage}%`,
            background:
              percentage === 100
                ? "linear-gradient(90deg, #22c55e, #16a34a)"
                : "linear-gradient(90deg, #3b82f6, #6366f1)",
          }}
        />
      </div>

      <p className="text-xs text-[var(--muted)] mb-4">{getMessage()}</p>

      <div className="grid grid-cols-3 gap-3">
        <StatChip icon={<Target size={13} />} label="Total" value={total} color="blue" />
        <StatChip icon={<CheckCircle2 size={13} />} label="Feitas" value={completed} color="green" />
        <StatChip icon={<Clock size={13} />} label="Pendentes" value={pending} color="amber" />
      </div>
    </div>
  );
}

function StatChip({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: "blue" | "green" | "amber";
}) {
  const colorMap = {
    blue: "text-blue-500 bg-blue-50 dark:bg-blue-950/40",
    green: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40",
    amber: "text-amber-500 bg-amber-50 dark:bg-amber-950/40",
  };

  return (
    <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-[var(--background)]">
      <div className={`p-1.5 rounded-lg ${colorMap[color]}`}>{icon}</div>
      <span className="text-xl font-700 text-[var(--foreground)] tabular-nums leading-none">
        {value}
      </span>
      <span className="text-[10px] font-500 text-[var(--muted)] uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}
