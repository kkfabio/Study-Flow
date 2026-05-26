"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, Eye, EyeOff, Lock, IdCard, ArrowRight, MessageCircle } from "lucide-react";

const DEMO_USERS = [
  { mat: "2024001", pw: "estudo123", nome: "Ana Souza", curso: "Eng. de Software", periodo: "4º período" },
  { mat: "2023042", pw: "flow456",   nome: "Carlos Lima", curso: "Ciência da Computação", periodo: "6º período" },
  { mat: "2024099", pw: "123456",    nome: "Mariana Costa", curso: "Sistemas de Informação", periodo: "2º período" },
];

const INITIALS: Record<string, string> = {
  "2024001": "AS",
  "2023042": "CL",
  "2024099": "MC",
};

const COLORS: Record<string, string> = {
  "2024001": "from-blue-400 to-blue-600",
  "2023042": "from-violet-400 to-violet-600",
  "2024099": "from-emerald-400 to-emerald-600",
};

export function LoginPage() {
  const { login } = useAuth();
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matricula || !senha) { setError("Preencha sua matrícula e senha."); return; }
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 800));
    const ok = login(matricula, senha);
    setLoading(false);
    if (!ok) {
      setError("Matrícula ou senha inválidos. Tente uma conta de demonstração abaixo.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const fillDemo = (mat: string, pw: string) => {
    setMatricula(mat);
    setSenha(pw);
    setError("");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-6 md:p-8">

      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:"absolute", top:"-10%", left:"-5%", width:"45vw", height:"45vw", background:"radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", borderRadius:"50%" }} />
        <div style={{ position:"absolute", bottom:"-10%", right:"-5%", width:"40vw", height:"40vw", background:"radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)", borderRadius:"50%" }} />
      </div>

      <div className={`w-full max-w-[480px] relative transition-all duration-200 ${shake ? "animate-shake" : ""}`}>

        {/* CARD PRINCIPAL */}
        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-3xl shadow-2xl shadow-black/8 overflow-hidden">

          {/* Top gradient stripe */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500" />

          {/* Content Wrapper com paddings garantidos */}
          <div className="p-8 sm:p-12">

            {/* Logo */}
            <div className="flex flex-col items-center gap-3 mb-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/30">
                <BookOpen size={28} className="text-white" strokeWidth={1.8} />
              </div>
              <div className="text-center">
                <h1 className="text-[26px] font-700 text-[var(--foreground)] tracking-tight leading-none">StudyFlow</h1>
                <p className="text-sm text-[var(--muted)] mt-1.5 leading-relaxed">
                  Acesse com sua matrícula institucional
                </p>
              </div>
            </div>

            {/* Form usando flex e gap para espaçamento robusto */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              {/* Matrícula */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-600 text-[var(--muted)] uppercase tracking-widest">
                  Matrícula
                </label>
                <div className="relative flex items-center">
                  {/* Ícone fixado à esquerda com pointer-events-none para não bloquear o clique */}
                  <div className="absolute left-4 text-[var(--muted)] pointer-events-none flex items-center justify-center">
                    <IdCard size={18} />
                  </div>
                  <input
                    type="text"
                    value={matricula}
                    onChange={(e) => { setMatricula(e.target.value); setError(""); }}
                    placeholder="Ex: 2024001"
                    className="w-full pl-[46px] pr-4 py-3.5 rounded-2xl border border-[var(--card-border)] bg-[var(--background)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted)]/60 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-600 text-[var(--muted)] uppercase tracking-widest">
                  Senha
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-[var(--muted)] pointer-events-none flex items-center justify-center">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showSenha ? "text" : "password"}
                    value={senha}
                    onChange={(e) => { setSenha(e.target.value); setError(""); }}
                    placeholder="Sua senha"
                    className="w-full pl-[46px] pr-[46px] py-3.5 rounded-2xl border border-[var(--card-border)] bg-[var(--background)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted)]/60 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSenha((v) => !v)}
                    className="absolute right-3 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors p-2 flex items-center justify-center"
                  >
                    {showSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-3 px-4 py-3.5 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200/70 dark:border-red-800/30">
                  <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-1" />
                  <p className="text-xs text-red-600 dark:text-red-400 leading-relaxed">{error}</p>
                </div>
              )}

              {/* Submit - Corrigido para py-4 */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-600 transition-all duration-200 hover:scale-[1.015] active:scale-[0.985] shadow-lg shadow-blue-500/25 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2.5 mt-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Entrando...</span>
                  </>
                ) : (
                  <>
                    <span>Entrar na plataforma</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-8">
              <span className="flex-1 h-px bg-[var(--card-border)]" />
              <span className="text-[11px] text-[var(--muted)] font-500 tracking-wide text-center">CONTAS DE DEMONSTRAÇÃO</span>
              <span className="flex-1 h-px bg-[var(--card-border)]" />
            </div>

            {/* Demo accounts - Usando flex e gap */}
            <div className="flex flex-col gap-3">
              {DEMO_USERS.map((u) => (
                <button
                  key={u.mat}
                  type="button"
                  onClick={() => fillDemo(u.mat, u.pw)}
                  className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl border border-[var(--card-border)] bg-[var(--background)] hover:border-blue-400/60 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all duration-150 text-left group"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${COLORS[u.mat]} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <span className="text-xs font-700 text-white">{INITIALS[u.mat]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-600 text-[var(--foreground)] truncate leading-snug">{u.nome}</p>
                    <p className="text-xs text-[var(--muted)] truncate mt-0.5">{u.curso} · {u.periodo}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-150 translate-x-1 group-hover:translate-x-0 flex-shrink-0">
                    <span className="text-xs font-600">usar</span>
                    <ArrowRight size={14} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <p className="text-center text-xs text-[var(--muted)]/70 tracking-wide">
            StudyFlow · ODS 4 — Educação de Qualidade
          </p>
          
          <a
            href="https://wa.me/5581900000000?text=Ol%C3%A1%21%20Preciso%20de%20ajuda%20com%20o%20acesso%20ao%20StudyFlow."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] font-600 text-[#25D366] hover:text-[#1EBE5D] transition-colors"
          >
            <MessageCircle size={16} />
            Precisa de ajuda? Fale conosco
          </a>
        </div>

      </div>

      <style jsx>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-7px)}
          40%{transform:translateX(7px)}
          60%{transform:translateX(-4px)}
          80%{transform:translateX(4px)}
        }
        .animate-shake{animation:shake 0.45s ease}
      `}</style>
    </div>
  );
}