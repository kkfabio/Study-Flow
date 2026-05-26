"use client";

import { Task } from "@/types";
import { cn } from "@/utils/cn";
import { Trash2, CheckCircle2, Circle, BookOpen } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  style?: React.CSSProperties;
}

const PRIORITY_CONFIG = {
  high: {
    label: "Alta",
    dot: "bg-red-500",
    badge: "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400",
    ring: "hover:ring-red-200 dark:hover:ring-red-900",
  },
  medium: {
    label: "Média",
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
    ring: "hover:ring-amber-200 dark:hover:ring-amber-900",
  },
  low: {
    label: "Baixa",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
    ring: "hover:ring-emerald-200 dark:hover:ring-emerald-900",
  },
};

export function TaskCard({ task, onToggle, onDelete, style }: TaskCardProps) {
  const config = PRIORITY_CONFIG[task.priority];
  const date = new Date(task.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });

  return (
    <div
      style={style}
      className={cn(
        "group relative bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-4 shadow-sm",
        "transition-all duration-200 hover:shadow-md hover:ring-2 hover:ring-offset-0 task-card-enter",
        config.ring,
        task.completed && "opacity-60"
      )}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className="mt-0.5 flex-shrink-0 text-[var(--muted)] hover:text-blue-500 transition-colors duration-200 hover:scale-110 active:scale-95"
          aria-label={task.completed ? "Marcar como pendente" : "Marcar como concluída"}
        >
          {task.completed ? (
            <CheckCircle2 size={20} className="text-blue-500" />
          ) : (
            <Circle size={20} />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "text-sm font-500 text-[var(--foreground)] leading-snug transition-all duration-200",
              task.completed && "line-through text-[var(--muted)]"
            )}
          >
            {task.title}
          </p>

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {task.subject && (
              <span className="flex items-center gap-1 text-[10px] font-500 text-[var(--muted)] bg-[var(--background)] px-2 py-0.5 rounded-full border border-[var(--card-border)]">
                <BookOpen size={9} />
                {task.subject}
              </span>
            )}

            <span
              className={cn(
                "flex items-center gap-1 text-[10px] font-600 px-2 py-0.5 rounded-full",
                config.badge
              )}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
              {config.label}
            </span>

            <span className="text-[10px] text-[var(--muted)] ml-auto">
              {date}
            </span>
          </div>
        </div>

        <button
          onClick={() => onDelete(task.id)}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-[var(--muted)] hover:text-red-500 transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Excluir tarefa"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}
