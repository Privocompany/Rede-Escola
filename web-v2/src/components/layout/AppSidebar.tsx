"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { currentUser } from "@/lib/mock-data";
import {
  Home,
  Search,
  CalendarDays,
  Coins,
  DoorOpen,
  Bell,
  LogOut,
  GraduationCap,
} from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Página Inicial" },
  { href: "/buscar", icon: Search, label: "Pesquisar" },
  { href: "/agenda", icon: CalendarDays, label: "Agenda", badge: true },
  { href: "/cursos", icon: GraduationCap, label: "Meus Cursos" },
  { href: "/educoins", icon: Coins, label: "EduCoins" },
  { href: "/catraca", icon: DoorOpen, label: "Catraca Virtual" },
  { href: "/notificacoes", icon: Bell, label: "Notificações", badge: true },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[72px] xl:w-[260px] bg-ui-surface border-r border-ui-divider hidden md:flex flex-col z-50 shadow-nav transition-all duration-300">
      {/* Logo */}
      <div className="p-4 xl:p-6 flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-brand-purple rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-float flex-shrink-0">
          RE
        </div>
        <span className="font-extrabold text-xl text-brand-purple hidden xl:block tracking-tight">
          Rede Escola
        </span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-2 xl:px-4 flex flex-col gap-1">
        {navItems.map(({ href, icon: Icon, label, badge }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-4 px-3 py-3 xl:px-4 rounded-2xl smooth group relative",
                isActive
                  ? "bg-brand-purple/10 text-brand-purple"
                  : "text-text-secondary hover:bg-ui-wash hover:text-text-primary"
              )}
            >
              <div className="relative flex-shrink-0">
                <Icon
                  size={22}
                  className={cn(
                    "smooth group-hover:scale-110",
                    isActive ? "stroke-[2.5px]" : "stroke-[1.8px]"
                  )}
                />
                {badge && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-purple rounded-full border-2 border-ui-surface" />
                )}
              </div>
              <span
                className={cn(
                  "hidden xl:block text-[15px]",
                  isActive ? "font-bold" : "font-semibold"
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-2 xl:p-4 border-t border-ui-divider">
        <Link href="/perfil" className="flex items-center gap-3 px-3 py-3 xl:px-4 rounded-2xl hover:bg-ui-wash smooth cursor-pointer group mb-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-9 h-9 rounded-full border-2 border-ui-divider flex-shrink-0 group-hover:scale-105 smooth"
          />
          <div className="hidden xl:block min-w-0">
            <p className="font-bold text-[14px] text-text-primary truncate leading-tight">
              {currentUser.name}
            </p>
            <p className="text-xs text-text-secondary truncate">
              @{currentUser.username}
            </p>
          </div>
        </Link>

        <button className="w-full flex items-center gap-4 px-3 py-2 xl:px-4 rounded-2xl text-text-secondary hover:text-red-500 hover:bg-red-50 smooth mt-1">
          <LogOut size={18} className="flex-shrink-0" />
          <span className="hidden xl:block text-sm font-semibold">Sair</span>
        </button>
      </div>
    </aside>
  );
}
