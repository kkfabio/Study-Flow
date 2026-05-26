export type Priority = "high" | "medium" | "low";
export type FilterType = "all" | "pending" | "completed";

export interface Task {
  id: string;
  title: string;
  subject?: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  percentage: number;
}
