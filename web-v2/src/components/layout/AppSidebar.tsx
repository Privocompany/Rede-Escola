"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import {
  Home, Search, CalendarDays, Coins, DoorOpen, Bell,
  GraduationCap, Shield, LogOut, Users, ClipboardList,
  PenSquare, CheckSquare, BarChart2, FileText, Thermometer,
  MessageCircle, LayoutDashboard, BookOpen, Trophy, ShoppingBag,
  Compass,
} from "lucide-react";

// ── NAV POR ROLE ─────────────────────────────────────────────
const NAV_BY_ROLE = {
  aluno: [
    { href: '/aluno',          icon: Home,          label: 'Feed'          },
    { href: '/aluno#cart',     icon: DoorOpen,      label: 'Carteirinha'   },
    { href: '/aluno#notas',    icon: BarChart2,     label: 'Notas'         },
    { href: '/aluno#agenda',   icon: CalendarDays,  label: 'Agenda'        },
    { href: '/aluno#explore',  icon: Compass,       label: 'Explorar'      },
    { href: '/aluno#coins',    icon: Coins,         label: 'EduCoins'      },
    { href: '/aluno#ranking',  icon: Trophy,        label: 'Ranking'       },
    { href: '/notificacoes',   icon: Bell,          label: 'Notificações', badge: true },
  ],
  professor: [
    { href: '/professor',          icon: LayoutDashboard, label: 'Visão Geral'   },
    { href: '/professor#posts',    icon: PenSquare,       label: 'Nova Postagem' },
    { href: '/professor#chamada',  icon: CheckSquare,     label: 'Chamada'       },
    { href: '/professor#notas',    icon: ClipboardList,   label: 'Notas'         },
    { href: '/professor#turmas',   icon: Users,           label: 'Turmas'        },
    { href: '/professor#agenda',   icon: CalendarDays,    label: 'Agenda'        },
    { href: '/notificacoes',       icon: Bell,            label: 'Notificações', badge: true },
  ],
  admin: [
    { href: '/admin',              icon: LayoutDashboard, label: 'Dashboard'      },
    { href: '/admin#usuarios',     icon: Users,           label: 'Usuários'       },
    { href: '/admin#comunicados',  icon: Bell,            label: 'Comunicados'    },
    { href: '/admin#secretaria',   icon: FileText,        label: 'Secretaria'     },
    { href: '/admin#relatorios',   icon: BarChart2,       label: 'Relatórios'     },
    { href: '/admin#cursos',       icon: BookOpen,        label: 'Cursos'         },
  ],
  responsavel: [
    { href: '/responsavel',             icon: Home,         label: 'Comunicados'   },
    { href: '/responsavel#filho',       icon: Thermometer,  label: 'Meu Filho'     },
    { href: '/responsavel#notas',       icon: BarChart2,    label: 'Notas'         },
    { href: '/responsavel#agenda',      icon: CalendarDays, label: 'Agenda'        },
    { href: '/responsavel#secretaria',  icon: FileText,     label: 'Secretaria'    },
    { href: '/responsavel#catraca',     icon: DoorOpen,     label: 'Catraca'       },
    { href: '/responsavel#chat',        icon: MessageCircle,label: 'Chat'          },
  ],
};

// ── ROLE COLORS ───────────────────────────────────────────────
const ROLE_CONFIG = {
  aluno:       { color: 'bg-green-500',       active: 'bg-green-500/10 text-green-600',      hover: 'hover:bg-green-50 hover:text-green-700'       },
  professor:   { color: 'bg-brand-blue',      active: 'bg-brand-blue/10 text-brand-blue',    hover: 'hover:bg-brand-blue/5 hover:text-brand-blue'  },
  admin:       { color: 'bg-brand-purple',    active: 'bg-brand-purple/10 text-brand-purple',hover: 'hover:bg-brand-purple/5 hover:text-brand-purple'},
  responsavel: { color: 'bg-brand-orange',    active: 'bg-brand-orange/10 text-brand-orange',hover: 'hover:bg-brand-orange/5 hover:text-brand-orange'},
};

const ROLE_LABELS = {
  aluno:       '🎒 Aluno',
  professor:   '👩‍🏫 Professor',
  admin:       '🏫 Admin',
  responsavel: '👨‍👩‍👧 Responsável',
};

export default function AppSidebar() {
  const pathname = usePathname();
  const { user, role, isLoading, logout } = useAuth();

  // Skeleton enquanto carrega o role do localStorage
  if (isLoading) {
    return (
      <aside className="fixed left-0 top-0 h-screen w-[72px] xl:w-[260px] bg-ui-surface border-r border-ui-divider hidden md:flex flex-col z-[9999] shadow-nav">
        <div className="p-4 xl:p-6 flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-ui-wash animate-pulse" />
          <div className="hidden xl:flex flex-col gap-2">
            <div className="w-24 h-4 rounded bg-ui-wash animate-pulse" />
            <div className="w-16 h-3 rounded bg-ui-wash animate-pulse" />
          </div>
        </div>
        <div className="flex-1 px-2 xl:px-4 flex flex-col gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-3 py-3">
              <div className="w-6 h-6 rounded bg-ui-wash animate-pulse shrink-0" />
              <div className="hidden xl:block w-20 h-4 rounded bg-ui-wash animate-pulse" />
            </div>
          ))}
        </div>
      </aside>
    );
  }

  if (!role || !user) return null;

  const navItems = NAV_BY_ROLE[role] ?? [];
  const cfg      = ROLE_CONFIG[role];
  const homeHref = navItems[0]?.href ?? '/';

  // Active: compare apenas o pathname base (sem hash)
  const isActive = (href: string) => pathname === href.split('#')[0];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[72px] xl:w-[260px] bg-ui-surface border-r border-ui-divider hidden md:flex flex-col z-[9999] shadow-nav transition-all duration-300 pointer-events-auto">

      {/* ── LOGO ─────────────────────────────────────────────── */}
      <Link href={homeHref} className="p-4 xl:p-6 flex items-center gap-3 mb-2 group">
        <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-float flex-shrink-0 group-hover:scale-110 smooth", cfg.color)}>
          RE
        </div>
        <div className="hidden xl:block min-w-0">
          <span className="font-extrabold text-xl text-text-primary tracking-tight block leading-none">Rede Escola</span>
          <span className={cn("text-[11px] font-black uppercase tracking-widest block mt-1", role === 'aluno' ? 'text-green-600' : role === 'professor' ? 'text-brand-blue' : role === 'admin' ? 'text-brand-purple' : 'text-brand-orange')}>
            {ROLE_LABELS[role]}
          </span>
        </div>
      </Link>

      {/* ── NAV ITEMS ─────────────────────────────────────────── */}
      <nav className="flex-1 px-2 xl:px-4 flex flex-col gap-1 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label, badge }: any) => {
          const active = isActive(href);
          return (
            <Link
              key={href + label}
              href={href}
              className={cn(
                "flex items-center gap-4 px-3 py-3 xl:px-4 rounded-2xl smooth group relative",
                active ? cfg.active : `text-text-secondary ${cfg.hover}`
              )}
            >
              <div className="relative flex-shrink-0">
                <Icon size={22} className={cn("smooth group-hover:scale-110", active ? "stroke-[2.5px]" : "stroke-[1.8px]")} />
                {badge && (
                  <span className={cn("absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-ui-surface", cfg.color)} />
                )}
              </div>
              <span className={cn("hidden xl:block text-[15px]", active ? "font-bold" : "font-semibold")}>
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* ── USER PROFILE + LOGOUT ─────────────────────────────── */}
      <div className="p-2 xl:p-4 border-t border-ui-divider">
        <Link href={`${homeHref}#perfil`} className="flex items-center gap-3 px-3 py-3 xl:px-4 rounded-2xl hover:bg-ui-wash smooth cursor-pointer group mb-1">
          <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full border-2 border-ui-divider flex-shrink-0 group-hover:scale-105 smooth" />
          <div className="hidden xl:block min-w-0">
            <p className="font-bold text-[14px] text-text-primary truncate leading-tight">{user.name}</p>
            <p className="text-xs text-text-secondary truncate">{ROLE_LABELS[role]}</p>
          </div>
        </Link>

        <button
          onClick={logout}
          className="w-full flex items-center gap-4 px-3 py-2 xl:px-4 rounded-2xl text-text-secondary hover:text-red-500 hover:bg-red-50 smooth mt-1 transition-all active:scale-95 group"
        >
          <LogOut size={18} className="flex-shrink-0 group-hover:-translate-x-1 smooth" />
          <span className="hidden xl:block text-sm font-semibold">Sair</span>
        </button>
      </div>
    </aside>
  );
}
