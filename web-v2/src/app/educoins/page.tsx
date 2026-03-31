"use client";

import { useState } from "react";
import { Coins, History, ShoppingBag, ArrowUpRight, ArrowDownLeft, Trophy, Star, Filter } from "lucide-react";
import { eduHistory, rewards } from "@/lib/mock-educoins";
import { cn } from "@/lib/utils";

export default function EduCoinsPage() {
  const [activeTab, setActiveTab] = useState<"history" | "store">("history");

  return (
    <div className="flex-1 min-h-screen bg-ui-wash">
      {/* Header & Balance Hero */}
      <div className="bg-brand-purple p-8 pt-12 pb-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse" />
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2 flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-2xl backdrop-blur-sm">
                <Coins size={36} />
              </div>
              EduCoins
            </h1>
            <p className="text-white/80 font-medium text-lg">
              Sua jornada, suas recompensas.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-float flex items-center gap-6 group hover:bg-white/20 smooth">
            <div className="text-right">
              <p className="text-white/60 text-sm font-bold uppercase tracking-wider">Saldo Atual</p>
              <p className="text-5xl font-black">2.450</p>
            </div>
            <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,202,40,0.5)] group-hover:scale-110 smooth">
              <Star size={32} className="text-black fill-current" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto -mt-12 px-4 pb-12 relative z-20">
        {/* Navigation Tabs */}
        <div className="flex bg-white p-1.5 rounded-2xl shadow-nav mb-8 w-fit border border-ui-divider">
          <button
            onClick={() => setActiveTab("history")}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm smooth",
              activeTab === "history"
                ? "bg-brand-purple text-white shadow-float"
                : "text-text-secondary hover:bg-ui-wash"
            )}
          >
            <History size={18} />
            Histórico
          </button>
          <button
            onClick={() => setActiveTab("store")}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm smooth",
              activeTab === "store"
                ? "bg-brand-purple text-white shadow-float"
                : "text-text-secondary hover:bg-ui-wash"
            )}
          >
            <ShoppingBag size={18} />
            Loja de Itens
          </button>
        </div>

        {activeTab === "history" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* History List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between px-2 mb-4">
                <h2 className="text-xl font-black text-text-primary">Movimentações Recentes</h2>
                <button className="text-sm font-bold text-brand-purple flex items-center gap-1 hover:underline">
                  <Filter size={16} /> Filtrar
                </button>
              </div>

              {eduHistory.map((tx) => (
                <div
                  key={tx.id}
                  className="bg-white p-4 rounded-3xl border border-ui-divider shadow-card flex items-center justify-between group hover:border-brand-purple/30 smooth"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center",
                      tx.type === "earn" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    )}>
                      {tx.type === "earn" ? <ArrowUpRight size={24} /> : <ArrowDownLeft size={24} />}
                    </div>
                    <div>
                      <p className="font-bold text-text-primary">{tx.description}</p>
                      <p className="text-xs text-text-secondary font-medium uppercase tracking-wide">
                        {new Date(tx.date).toLocaleDateString()} • {tx.category}
                      </p>
                    </div>
                  </div>
                  <div className={cn(
                    "font-black text-lg",
                    tx.type === "earn" ? "text-green-600" : "text-red-600"
                  )}>
                    {tx.type === "earn" ? "+" : "-"}{tx.amount}
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-brand-yellow/20 to-orange-100 p-6 rounded-[2.5rem] border border-brand-yellow/30">
                <Trophy size={48} className="text-brand-yellow mb-4" />
                <h3 className="text-2xl font-black text-brand-orange leading-tight mb-2">Engajamento Elite</h3>
                <p className="text-orange-900/70 font-medium text-sm leading-relaxed mb-4">
                  Você está entre os top 5% da turma este mês. Continue assim para ganhar o badge de Influencer Acadêmico!
                </p>
                <div className="w-full bg-orange-200 h-3 rounded-full overflow-hidden">
                  <div className="bg-brand-orange h-full w-[85%] rounded-full shadow-[0_0_10px_rgba(255,69,0,0.4)]" />
                </div>
                <p className="text-xs font-bold text-brand-orange mt-2 text-right">85% Completo</p>
              </div>

              <div className="bg-white p-6 rounded-[2.5rem] border border-ui-divider shadow-card overflow-hidden relative">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Star size={80} className="text-brand-purple fill-current" />
                 </div>
                 <h4 className="font-black text-text-primary mb-4">Como ganhar mais?</h4>
                 <ul className="space-y-3">
                   <li className="flex items-center gap-3 text-sm font-bold text-text-secondary">
                     <span className="w-2 h-2 rounded-full bg-brand-purple" /> Upvotes no Feed
                   </li>
                   <li className="flex items-center gap-3 text-sm font-bold text-text-secondary">
                     <span className="w-2 h-2 rounded-full bg-brand-blue" /> Presença (no horário!)
                   </li>
                   <li className="flex items-center gap-3 text-sm font-bold text-text-secondary">
                     <span className="w-2 h-2 rounded-full bg-brand-yellow" /> Entrega de Tarefas
                   </li>
                 </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className="bg-white rounded-[2.5rem] border border-ui-divider shadow-card overflow-hidden group hover:shadow-float smooth flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={reward.image}
                    alt={reward.title}
                    className="w-full h-full object-cover group-hover:scale-110 smooth"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-black text-brand-purple shadow-float flex items-center gap-1.5">
                    <Coins size={16} />
                    {reward.price}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue mb-1">
                    {reward.category}
                  </span>
                  <h3 className="text-xl font-black text-text-primary mb-2 leading-tight">
                    {reward.title}
                  </h3>
                  <p className="text-sm text-text-secondary font-medium leading-relaxed mb-6">
                    {reward.description}
                  </p>
                  <button className="mt-auto w-full bg-ui-wash hover:bg-brand-purple hover:text-white py-4 rounded-2xl font-black smooth flex items-center justify-center gap-2">
                    Resgatar Agora
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
