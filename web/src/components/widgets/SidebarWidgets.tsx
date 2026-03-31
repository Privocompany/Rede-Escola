"use client";

import { currentUser, mockCheckIns } from "@/lib/mock-data";
import {
  Coins,
  Trophy,
  CheckCircle2,
  XCircle,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

// ── EduCoins Widget ────────────────────────────────
function EduCoinsWidget() {
  return (
    <div className="bg-ui-surface rounded-2xl shadow-card border border-ui-divider/50 p-5">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-text-primary text-[14px]">Gamificação</h4>
        <Trophy size={18} className="text-brand-yellow" />
      </div>

      {/* Card Gradient */}
      <div className="bg-gradient-to-br from-brand-purple via-[#5429c4] to-brand-blue rounded-xl p-4 text-white shadow-float relative overflow-hidden">
        <div className="absolute -bottom-5 -right-5 opacity-10">
          <Coins size={80} />
        </div>
        <p className="text-xs font-semibold opacity-80 mb-1">Seus EduCoins</p>
        <p className="text-3xl font-black tracking-tight">
          {currentUser.eduCoins?.toLocaleString("pt-BR")}{" "}
          <span className="text-sm font-normal opacity-70">EC</span>
        </p>
        <div className="flex items-center gap-1 mt-2 text-xs opacity-80">
          <TrendingUp size={12} />
          <span>+150 esta semana</span>
        </div>
      </div>

      <button className="w-full mt-3 text-sm text-center font-bold text-brand-purple hover:text-brand-purple_hover smooth flex items-center justify-center gap-1">
        Ver Recompensas
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

// ── Catraca Widget ─────────────────────────────────
function CatracaWidget() {
  return (
    <div className="bg-ui-surface rounded-2xl shadow-card border border-ui-divider/50 p-5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-text-primary text-[14px]">
          Catraca Virtual
        </h4>
        <span className="flex items-center gap-1 text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse inline-block" />
          Ao Vivo
        </span>
      </div>

      <div className="space-y-2">
        {mockCheckIns.map((checkIn) => (
          <div
            key={checkIn.id}
            className="flex items-center gap-3 bg-ui-wash p-3 rounded-xl border border-ui-divider/50"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                checkIn.type === "entrada"
                  ? "bg-green-500 text-white"
                  : "bg-red-400 text-white"
              }`}
            >
              {checkIn.type === "entrada" ? (
                <CheckCircle2 size={18} />
              ) : (
                <XCircle size={18} />
              )}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-[13px] text-text-primary leading-tight">
                {checkIn.studentName}{" "}
                <span className="text-text-secondary font-normal">
                  ({checkIn.relation})
                </span>
              </p>
              <p className="text-[11px] text-text-secondary mt-0.5">
                {checkIn.type === "entrada" ? "Entrada" : "Saída"} às{" "}
                {checkIn.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-3 text-sm text-center font-bold text-brand-blue hover:text-brand-blue_hover smooth flex items-center justify-center gap-1">
        Ver histórico
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

// ── Agenda Rápida Widget ───────────────────────────
function AgendaWidget() {
  const events = [
    {
      id: 1,
      title: "Prova de Matemática",
      date: "Quinta, 03 Abr",
      color: "bg-brand-orange",
    },
    {
      id: 2,
      title: "Recesso Escolar",
      date: "Sexta, 04 Abr",
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "Reunião de Pais",
      date: "Seg, 07 Abr",
      color: "bg-brand-purple",
    },
  ];

  return (
    <div className="bg-ui-surface rounded-2xl shadow-card border border-ui-divider/50 p-5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-text-primary text-[14px]">
          Próximos Eventos
        </h4>
        <span className="text-[11px] font-bold text-brand-purple hover:underline cursor-pointer">
          Ver tudo
        </span>
      </div>
      <div className="space-y-2.5">
        {events.map((ev) => (
          <div key={ev.id} className="flex items-start gap-3">
            <div
              className={`w-2 h-2 rounded-full ${ev.color} mt-1.5 flex-shrink-0`}
            />
            <div>
              <p className="text-[13px] font-semibold text-text-primary leading-tight">
                {ev.title}
              </p>
              <p className="text-[11px] text-text-secondary">{ev.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Footer Links ───────────────────────────────────
function FooterLinks() {
  const links = ["Sobre", "Ajuda", "Privacidade", "Termos"];
  return (
    <div className="text-[11px] text-text-placeholder leading-relaxed">
      <div className="flex flex-wrap gap-x-2 gap-y-1 mb-2">
        {links.map((l) => (
          <a key={l} href="#" className="hover:underline smooth">
            {l}
          </a>
        ))}
      </div>
      <p>© 2026 REDE ESCOLA</p>
    </div>
  );
}

// ── Main Export ────────────────────────────────────
export default function SidebarWidgets() {
  return (
    <div className="space-y-4">
      {/* Mini profile */}
      <div className="flex items-center gap-3 px-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-12 h-12 rounded-full border-2 border-ui-divider shadow-sm flex-shrink-0"
        />
        <div className="min-w-0">
          <p className="font-bold text-[14px] text-text-primary truncate">
            {currentUser.name}
          </p>
          <p className="text-[12px] text-text-secondary truncate">
            @{currentUser.username}
          </p>
        </div>
      </div>

      <EduCoinsWidget />
      <CatracaWidget />
      <AgendaWidget />
      <FooterLinks />
    </div>
  );
}
