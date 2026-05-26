"use client";

import { useState } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { Priority } from "@/types";
import { cn } from "@/utils/cn";

interface TaskFormProps {
  onAdd: (title: string, priority: Priority, subject?: string) => void;
}

const PRIORITIES: { value: Priority; label: string; color: string }[] = [
  { value: "high", label: "Alta", color: "text-red-500" },
  { value: "medium", label: "Média", color: "text-amber-500" },
  { value: "low", label: "Baixa", color: "text-emerald-500" },
];

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 200));
    onAdd(title, priority, subject || undefined);
    setTitle("");
    setSubject("");
    setPriority("medium");
    setIsExpanded(false);
    setIsSubmitting(false);
  };

  return (
    <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-5 shadow-sm">
      <div
        className="flex items-center gap-2 mb-4 cursor-pointer select-none"
        onClick={() => setIsExpanded((p) => !p)}
      >
        <div className="w-6 h-6 rounded-lg bg-blue-500 flex items-center justify-center">
          <Plus size={14} className="text-white" />
        </div>
        <span className="text-sm font-600 text-[var(--foreground)]">Nova Tarefa</span>
        <ChevronDown
          size={14}
          className={cn(
            "ml-auto text-[var(--muted)] transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          placeholder="Nome da tarefa de estudo..."
          className="w-full px-4 py-3 text-sm rounded-xl border border-[var(--card-border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
          required
        />

        {isExpanded && (
          <div className="space-y-3 animate-fade-in-up">
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Matéria (opcional)"
              className="w-full px-4 py-3 text-sm rounded-xl border border-[var(--card-border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
            />

            <div className="flex gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={cn(
                    "flex-1 py-2 px-3 rounded-xl text-xs font-600 border transition-all duration-200",
                    priority === p.value
                      ? "border-blue-400 bg-[var(--accent-blue-light)] text-blue-500"
                      : "border-[var(--card-border)] bg-[var(--background)] text-[var(--muted)] hover:border-blue-300"
                  )}
                >
                  <span className={p.color}>●</span>{" "}
                  <span className="text-[var(--foreground)]">{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!title.trim() || isSubmitting}
          className={cn(
            "w-full py-3 rounded-xl text-sm font-600 flex items-center justify-center gap-2 transition-all duration-200",
            "bg-blue-500 text-white hover:bg-blue-600 active:scale-[0.98]",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500",
            "shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
          )}
        >
          {isSubmitting ? (
            <span className="animate-pulse-soft">Adicionando...</span>
          ) : (
            <>
              <Plus size={16} />
              Adicionar Tarefa
            </>
          )}
        </button>
      </form>
    </div>
  );
}
