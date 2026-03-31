"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Search, CalendarDays, Coins, DoorOpen, Bell, GraduationCap } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Início" },
  { href: "/agenda", icon: CalendarDays, label: "Agenda" },
  { href: "/cursos", icon: GraduationCap, label: "Cursos" },
  { href: "/educoins", icon: Coins, label: "EduCoins" },
  { href: "/catraca", icon: DoorOpen, label: "Catraca" },
  { href: "/notificacoes", icon: Bell, label: "Avisos" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-ui-surface border-t border-ui-divider z-50 flex md:hidden justify-around items-center px-2 shadow-nav">
      {navItems.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center gap-0.5 flex-1 py-2 smooth",
              isActive ? "text-brand-purple" : "text-text-secondary"
            )}
          >
            <Icon
              size={22}
              className={cn(
                isActive ? "stroke-[2.5px]" : "stroke-[1.8px]"
              )}
            />
            <span className="text-[9px] font-bold">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
