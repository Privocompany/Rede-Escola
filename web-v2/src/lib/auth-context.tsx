'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// ── TYPES ────────────────────────────────────────────────────
export type UserRole = 'aluno' | 'professor' | 'admin' | 'responsavel' | null;

export interface AuthUser {
  role: UserRole;
  name: string;
  avatar: string;
  class?: string;
  subject?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole;
  isLoading: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

// ── MOCK USERS PER ROLE ──────────────────────────────────────
export const MOCK_USERS: Record<Exclude<UserRole, null>, AuthUser> = {
  aluno: {
    role: 'aluno',
    name: 'Matheus Silva',
    avatar: 'https://i.pravatar.cc/150?u=matheus',
    class: '9º Ano A',
  },
  professor: {
    role: 'professor',
    name: 'Prof. Ana Clara',
    avatar: 'https://i.pravatar.cc/150?u=ana',
    subject: 'Ciências',
  },
  admin: {
    role: 'admin',
    name: 'Diretora Lucia',
    avatar: 'https://i.pravatar.cc/150?u=lucia',
  },
  responsavel: {
    role: 'responsavel',
    name: 'Roberto Silva',
    avatar: 'https://i.pravatar.cc/150?u=roberto_pai',
  },
};

// ── ROLE HOME MAP ─────────────────────────────────────────────
export const ROLE_HOME: Record<Exclude<UserRole, null>, string> = {
  aluno:       '/aluno',
  professor:   '/professor',
  admin:       '/admin',
  responsavel: '/responsavel',
};

// ── CONTEXT ───────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]       = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem('redeescola_role') as UserRole;
    if (storedRole && MOCK_USERS[storedRole]) {
      setUser(MOCK_USERS[storedRole]);
    }
    setIsLoading(false);
  }, []);

  const login = (role: UserRole) => {
    if (!role) return;
    localStorage.setItem('redeescola_auth', 'true');
    localStorage.setItem('redeescola_role', role);
    setUser(MOCK_USERS[role]);
  };

  const logout = () => {
    localStorage.removeItem('redeescola_auth');
    localStorage.removeItem('redeescola_role');
    setUser(null);
    window.location.replace('/login');
  };

  return (
    <AuthContext.Provider value={{ user, role: user?.role ?? null, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
