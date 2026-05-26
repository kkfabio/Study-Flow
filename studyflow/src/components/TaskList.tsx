"use client";

import { Task, FilterType } from "@/types";
import { TaskCard } from "./TaskCard";
import { ClipboardList, Inbox } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  filter: FilterType;
  isLoaded: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const EMPTY_MESSAGES: Record<FilterType, { title: string; desc: string }> = {
  all: {
    title: "Nenhuma tarefa ainda",
    desc: "Adicione sua primeira tarefa de estudo acima!",
  },
  pending: {
    title: "Sem tarefas pendentes",
    desc: "Você está em dia! Adicione mais tarefas.",
  },
  completed: {
    title: "Nenhuma tarefa concluída",
    desc: "Complete suas tarefas para vê-las aqui.",
  },
};

export function TaskList({
  tasks,
  filter,
  isLoaded,
  onToggle,
  onDelete,
}: TaskListProps) {
  if (!isLoaded) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 bg-[var(--card)] border border-[var(--card-border)] rounded-2xl animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    const msg = EMPTY_MESSAGES[filter];
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in-up">
        <div className="w-14 h-14 rounded-2xl bg-[var(--card)] border border-[var(--card-border)] flex items-center justify-center mb-4 shadow-sm">
          {filter === "all" ? (
            <ClipboardList size={24} className="text-[var(--muted)]" />
          ) : (
            <Inbox size={24} className="text-[var(--muted)]" />
          )}
        </div>
        <p className="text-sm font-600 text-[var(--foreground)] mb-1">{msg.title}</p>
        <p className="text-xs text-[var(--muted)]">{msg.desc}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task, i) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
        />
      ))}
    </div>
  );
}
