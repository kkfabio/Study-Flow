"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { MockUser, mockUsers } from "@/data/mockData";

interface AuthContextType {
  user: MockUser | null;
  login: (matricula: string, senha: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);

  const login = (matricula: string, senha: string): boolean => {
    const found = mockUsers.find(
      (u) => u.matricula === matricula && u.senha === senha
    );
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
