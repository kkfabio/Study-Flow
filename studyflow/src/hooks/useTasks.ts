"use client";

import { useState, useEffect, useCallback } from "react";
import { Task, Priority, FilterType, TaskStats } from "@/types";
import { generateId } from "@/utils/localStorage";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const addTask = useCallback(
    (title: string, priority: Priority, subject?: string) => {
      const newTask: Task = {
        id: generateId(),
        title: title.trim(),
        subject: subject?.trim() || undefined,
        priority,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [newTask, ...prev]);
    },
    []
  );

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const filteredTasks = tasks.filter((t) => {
    if (filter === "pending") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const stats: TaskStats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
    percentage:
      tasks.length === 0
        ? 0
        : Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100),
  };

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    filter,
    setFilter,
    addTask,
    deleteTask,
    toggleTask,
    stats,
    isLoaded,
    setTasks,
  };
}
