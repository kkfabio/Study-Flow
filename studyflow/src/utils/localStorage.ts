import { Task } from "@/types";

const STORAGE_KEY = "studyflow_tasks";

export function loadTasks(): Task[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    console.error("Failed to save tasks");
  }
}

export function generateId(): string {
  return `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}
