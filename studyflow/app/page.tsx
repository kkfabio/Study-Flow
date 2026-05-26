"use client";

import { useEffect } from "react";
import { Header } from "@/components/Header";
import { ProgressBar } from "@/components/ProgressBar";
import { TaskForm } from "@/components/TaskForm";
import { FilterButtons } from "@/components/FilterButtons";
import { TaskList } from "@/components/TaskList";
import { LoginPage } from "@/components/LoginPage";
import { useTasks } from "@/hooks/useTasks";
import { useAuth } from "@/context/AuthContext";
import { mockTasksByUser } from "@/data/mockData";
import { LogOut, GraduationCap, MessageCircle } from "lucide-react";

function Dashboard() {
  const { user, logout } = useAuth();
  const { tasks, allTasks, filter, setFilter, addTask, deleteTask, toggleTask, stats, isLoaded, setTasks } = useTasks();

  useEffect(() => {
    if (user && isLoaded) {
      const mockTasks = mockTasksByUser[user.matricula] ?? [];
      setTasks(mockTasks);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.matricula, isLoaded]);

  const whatsappLink = `https://wa.me/?text=${encodeURIComponent("Olá! Estou usando o StudyFlow e gostaria de falar sobre minhas tarefas de estudo.")}`;

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col justify-center items-center p-4 sm:p-8">
      <div className="w-full max-w-4xl bg-[#f8fafc] dark:bg-[#0a0a0a] shadow-2xl rounded-3xl overflow-hidden border border-[var(--card-border)] ring-1 ring-black/5">

        <Header
          rightSlot={
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl border border-[var(--card-border)] bg-gray-50 dark:bg-[#1a1a1a]">
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shadow-inner">
                  <GraduationCap size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)] leading-none">{user?.nome}</p>
                  <p className="text-xs text-[var(--muted)] leading-none mt-1">Mat. {user?.matricula}</p>
                </div>
              </div>
              <button onClick={logout} title="Sair" className="w-10 h-10 rounded-xl border border-[var(--card-border)] bg-gray-50 dark:bg-[#1a1a1a] flex items-center justify-center text-[var(--muted)] hover:text-red-500 hover:border-red-300 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm">
                <LogOut size={20} />
              </button>
            </div>
          }
        />

        <main className="px-6 py-8 space-y-8">
          <div className="flex justify-between items-center animate-fade-in-up bg-white dark:bg-[#121212] p-6 rounded-2xl border border-[var(--card-border)] shadow-sm">
            <div>
              <h2 className="text-3xl font-bold text-[var(--foreground)] tracking-tight">
                Bom estudo, <span className="text-blue-500 drop-shadow-sm">{user?.nome.split(" ")[0]}!</span>
              </h2>
              <p className="text-base text-[var(--muted)] mt-1.5 font-medium">
                {user?.curso} · {user?.periodo}º período
              </p>
            </div>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#1EBE57] text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
              <MessageCircle size={20} />
              <span className="hidden sm:inline">Ajuda</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="animate-fade-in-up delay-75 bg-white dark:bg-[#121212] p-6 rounded-2xl border border-[var(--card-border)] shadow-sm flex flex-col justify-center">
              <h3 className="text-sm font-semibold text-[var(--muted)] mb-4 uppercase tracking-wider">Seu Progresso</h3>
              <ProgressBar stats={stats} />
            </div>
            <div className="animate-fade-in-up delay-100 bg-white dark:bg-[#121212] p-6 rounded-2xl border border-[var(--card-border)] shadow-sm">
              <h3 className="text-sm font-semibold text-[var(--muted)] mb-4 uppercase tracking-wider">Nova Tarefa</h3>
              <TaskForm onAdd={addTask} />
            </div>
          </div>

          <div className="animate-fade-in-up delay-150 bg-white dark:bg-[#121212] p-8 rounded-2xl border border-[var(--card-border)] shadow-sm min-h-[400px] flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h3 className="text-lg font-bold text-[var(--foreground)]">Suas Tarefas</h3>
              <FilterButtons filter={filter} onFilter={setFilter} stats={stats} />
            </div>
            <div className="flex-1">
              <TaskList tasks={tasks} filter={filter} isLoaded={isLoaded} onToggle={toggleTask} onDelete={deleteTask} />
            </div>
          </div>
        </main>

        <footer className="text-center pt-6 pb-8 bg-white dark:bg-[#121212] border-t border-[var(--card-border)]">
          <p className="text-xs font-medium text-[var(--muted)]">
            StudyFlow · ODS 4 Educação de Qualidade · {allTasks.length} tarefa{allTasks.length !== 1 ? "s" : ""} no total
          </p>
        </footer>
      </div>
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();
  return user ? <Dashboard /> : <LoginPage />;
}