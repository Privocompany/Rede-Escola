"use client";

import { CalendarDays, Clock, MapPin, Search, Filter, Plus, ChevronRight, Bell, Calendar as CalendarIcon, ClipboardCheck, AlertCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  time: string;
  date: string;
  location: string;
  type: "exam" | "holiday" | "event" | "task";
  description: string;
}

const mockEvents: Event[] = [
  {
    id: "e1",
    title: "Prova de Matemática - 2º Bimestre",
    time: "08:30 - 10:00",
    date: "2026-04-05",
    location: "Sala 12",
    type: "exam",
    description: "Conteúdo: Geometria Espacial e Polinômios. Trazer calculadora científica.",
  },
  {
    id: "e2",
    title: "Recesso Escolar (Páscoa)",
    time: "O dia todo",
    date: "2026-04-10",
    location: "Toda a escola",
    type: "holiday",
    description: "Feriado antecipado. Não haverá aulas presenciais nem atividades extras.",
  },
  {
    id: "e3",
    title: "Entrega: Trabalho de Biologia",
    time: "Até 23:59",
    date: "2026-04-07",
    location: "Ambiente Virtual / Portal",
    type: "task",
    description: "Pesquisa sobre a fauna local do Cerrado. PDF com no mínimo 5 páginas.",
  },
  {
    id: "e4",
    title: "Reunião de Pais e Mestres",
    time: "19:00 - 20:30",
    date: "2026-04-12",
    location: "Auditório Principal",
    type: "event",
    description: "Entrega de boletins parciais e discussão sobre o novo Hub de Cursos.",
  },
];

export default function AgendaPage() {
  const [filter, setFilter] = useState<string>("all");

  const filteredEvents = filter === "all" ? mockEvents : mockEvents.filter(e => e.type === filter);

  return (
    <div className="flex-1 min-h-screen bg-ui-wash">
      {/* Header */}
      <div className="bg-brand-yellow p-8 pt-12 pb-24 text-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2 flex items-center gap-3">
              <div className="bg-black/10 p-2 rounded-2xl backdrop-blur-sm">
                <CalendarDays size={36} />
              </div>
              Agenda Escolar
            </h1>
            <p className="text-black/60 font-medium text-lg">
              Sincronize-se com tudo que acontece na Rede Escola.
            </p>
          </div>

          <button className="bg-black text-white px-8 py-4 rounded-2xl font-black shadow-float hover:scale-[1.02] active:scale-[0.98] smooth flex items-center gap-2">
            <Plus size={20} /> Adicionar Lembrete
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto -mt-12 px-4 pb-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Calendar Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-[2.5rem] shadow-nav border border-ui-divider">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-lg text-text-primary">Abril 2026</h3>
                <div className="flex items-center gap-2">
                   <button className="p-2 hover:bg-ui-wash rounded-xl smooth text-text-secondary"><ChevronRight className="rotate-180" size={18} /></button>
                   <button className="p-2 hover:bg-ui-wash rounded-xl smooth text-text-secondary"><ChevronRight size={18} /></button>
                </div>
              </div>
              
              {/* Simple Calendar Grid Mock */}
              <div className="grid grid-cols-7 gap-2 text-center mb-6">
                {["D","S","T","Q","Q","S","S"].map(d => (
                  <span key={d} className="text-[10px] font-black text-text-secondary uppercase">{d}</span>
                ))}
                {Array.from({ length: 30 }).map((_, i) => (
                  <button 
                    key={i} 
                    className={cn(
                      "w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold smooth group",
                      i + 1 === 5 ? "bg-brand-purple text-white shadow-nav" : "hover:bg-ui-wash text-text-primary"
                    )}
                  >
                    <span className="relative">
                      {i + 1}
                      {(i + 1 === 5 || i + 1 === 10 || i+1 === 12) && (
                        <span className={cn(
                          "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                          i + 1 === 5 ? "bg-white" : "bg-brand-purple"
                        )} />
                      )}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-6 border-t border-ui-divider space-y-4">
                 <h4 className="text-xs font-black text-text-secondary uppercase tracking-widest">Legenda</h4>
                 <div className="flex items-center gap-4 flex-wrap">
                   <div className="flex items-center gap-2 text-xs font-bold text-text-primary">
                     <span className="w-3 h-3 rounded-md bg-brand-orange shadow-sm" /> Provas
                   </div>
                   <div className="flex items-center gap-2 text-xs font-bold text-text-primary">
                     <span className="w-3 h-3 rounded-md bg-brand-yellow shadow-sm" /> Feriados
                   </div>
                   <div className="flex items-center gap-2 text-xs font-bold text-text-primary">
                     <span className="w-3 h-3 rounded-md bg-brand-blue shadow-sm" /> Tarefas
                   </div>
                 </div>
              </div>
            </div>

            <div className="bg-brand-purple p-8 rounded-[2.5rem] text-white shadow-float relative overflow-hidden group">
               <div className="absolute -bottom-10 -right-10 opacity-20 group-hover:scale-110 smooth">
                 <Bell size={120} />
               </div>
               <h3 className="font-black text-2xl mb-2 leading-tight">Mantenha as notificações ativas!</h3>
               <p className="text-white/70 font-medium text-sm mb-6">Receba lembretes 1 hora antes de cada prova ou entrega importante.</p>
               <button className="bg-white text-brand-purple px-6 py-3 rounded-xl font-black text-sm hover:shadow-nav smooth">
                 Ativar Alertas
               </button>
            </div>
          </div>

          {/* Timeline Feed */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3 overflow-x-auto pb-4 scroll-hide no-scrollbar">
              {[
                { label: "Tudo", id: "all" },
                { label: "Provas", id: "exam" },
                { label: "Tarefas", id: "task" },
                { label: "Eventos", id: "event" },
                { label: "Feriados", id: "holiday" },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setFilter(item.id)}
                  className={cn(
                    "px-6 py-3 rounded-2xl font-black text-sm flex-shrink-0 smooth",
                    filter === item.id ? "bg-black text-white shadow-nav" : "bg-white text-text-secondary hover:bg-ui-divider border border-ui-divider"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {filteredEvents.map(event => (
                <div key={event.id} className="bg-white p-8 rounded-[3rem] border border-ui-divider shadow-card group hover:border-brand-purple/20 smooth flex flex-col md:flex-row gap-8">
                  <div className="md:w-24 text-center border-r border-ui-divider pr-8 hidden md:block">
                    <p className="text-4xl font-black text-text-primary mb-1">
                      {new Date(event.date).getDate()}
                    </p>
                    <p className="text-[10px] font-black uppercase text-brand-purple tracking-widest">
                      {new Date(event.date).toLocaleString('pt-BR', { month: 'short' })}
                    </p>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div className={cn(
                        "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2",
                        event.type === 'exam' ? "bg-red-100 text-red-600" :
                        event.type === 'holiday' ? "bg-brand-yellow/20 text-brand-orange" :
                        event.type === 'task' ? "bg-blue-100 text-brand-blue" :
                        "bg-brand-purple/10 text-brand-purple"
                      )}>
                        {event.type === 'exam' ? <AlertCircle size={12} /> :
                         event.type === 'task' ? <ClipboardCheck size={12} /> :
                         <CalendarIcon size={12} />}
                        {event.type === 'exam' ? 'Importante: Prova' :
                         event.type === 'holiday' ? 'Feriado' :
                         event.type === 'task' ? 'Tarefa Pendente' : 'Evento Social'}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-text-secondary md:hidden">
                        <CalendarIcon size={14} /> 05 de Abril
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-text-primary mb-3 leading-tight group-hover:text-brand-purple smooth">
                      {event.title}
                    </h3>
                    <p className="text-sm text-text-secondary font-medium leading-relaxed mb-6">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-8 border-t border-ui-wash pt-6 mt-auto">
                      <div className="flex items-center gap-2 text-sm font-bold text-text-primary">
                        <Clock size={16} className="text-brand-purple" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-bold text-text-primary">
                        <MapPin size={16} className="text-brand-purple" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
