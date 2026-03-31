"use client";

import { DoorOpen, ArrowRightLeft, ShieldCheck, MapPin, Clock, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { accessHistory } from "@/lib/mock-access";
import { cn } from "@/lib/utils";

export default function CatracaPage() {
  const isInside = accessHistory[0]?.type === "entry";

  return (
    <div className="flex-1 min-h-screen bg-ui-wash">
      {/* Header */}
      <div className="bg-brand-blue p-8 pt-12 pb-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse" />
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2 flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-2xl backdrop-blur-sm">
                <DoorOpen size={36} />
              </div>
              Catraca Virtual
            </h1>
            <p className="text-white/80 font-medium text-lg">
              Segurança e tranquilidade para sua família.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-float flex items-center gap-6 group hover:bg-white/20 smooth">
            <div className="text-right">
              <p className="text-white/60 text-sm font-bold uppercase tracking-wider">Status Atual</p>
              <p className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                {isInside ? (
                  <>
                    <span className="w-3 h-3 bg-green-400 rounded-full animate-ping" />
                    Dentro da Escola
                  </>
                ) : (
                   <>
                    <span className="w-3 h-3 bg-brand-orange rounded-full" />
                    Buscado / Saiu
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto -mt-12 px-4 pb-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Activity Feed */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-nav border border-ui-divider">
              <h2 className="text-xl font-black text-text-primary mb-8 flex items-center gap-2">
                <ArrowRightLeft className="text-brand-blue" />
                Atividades Recentes
              </h2>

              <div className="space-y-0 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-ui-divider">
                {accessHistory.map((log, idx) => (
                  <div key={log.id} className="relative pl-16 pb-12 last:pb-0 group">
                    {/* Entry/Exit Icon Circle */}
                    <div className={cn(
                      "absolute left-0 top-0 w-12 h-12 rounded-2xl flex items-center justify-center z-10 shadow-card border-4 border-white smooth group-hover:scale-110",
                      log.type === "entry" ? "bg-green-100 text-green-600" : "bg-brand-blue/10 text-brand-blue"
                    )}>
                      {log.type === "entry" ? <CheckCircle2 size={24} /> : <ArrowRightLeft size={24} />}
                    </div>

                    <div className="bg-ui-wash/50 p-6 rounded-3xl group-hover:bg-white border border-transparent group-hover:border-ui-divider smooth group-hover:shadow-card">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                        <h3 className="font-black text-lg text-text-primary">
                          {log.type === "entry" ? "Entrada Registrada" : "Saída Registrada"}
                        </h3>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          log.status === "success" ? "bg-green-100 text-green-700" : "bg-brand-yellow/20 text-brand-orange"
                        )}>
                          {log.status === "success" ? "Normal" : "Horário Especial"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-text-secondary">
                          <Clock size={16} className="text-brand-blue" />
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}h
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-text-secondary">
                          <Calendar size={16} className="text-brand-blue" />
                          {new Date(log.timestamp).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-text-secondary col-span-2">
                          <MapPin size={16} className="text-brand-blue" />
                          {log.location}
                        </div>
                      </div>

                      {log.notificationSent && (
                        <div className="mt-4 pt-4 border-t border-ui-divider flex items-center gap-2 text-xs font-bold text-brand-purple italic">
                          <ShieldCheck size={14} />
                          Notificação enviada em tempo real para os responsáveis.
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-[2.5rem] border border-ui-divider shadow-card text-center">
              <div className="w-20 h-20 bg-brand-blue/10 rounded-3xl flex items-center justify-center mx-auto mb-4 text-brand-blue">
                <ShieldCheck size={40} />
              </div>
              <h3 className="font-black text-xl text-text-primary mb-2">Monitoramento Ativo</h3>
              <p className="text-sm text-text-secondary font-medium leading-relaxed">
                Nosso sistema utiliza identificação facial e RFID para garantir registros 100% precisos.
              </p>
            </div>

            <div className="bg-brand-orange/10 p-6 rounded-[2.5rem] border border-brand-orange/20">
               <div className="flex items-center gap-3 mb-4">
                 <AlertCircle className="text-brand-orange" size={24} />
                 <h4 className="font-black text-brand-orange">Avisos</h4>
               </div>
               <p className="text-sm font-bold text-brand-orange/80 leading-relaxed">
                 O portão secundário estará fechado para reformas entre 01/04 e 05/04. Utilize a portaria principal.
               </p>
            </div>

            <button className="w-full bg-brand-purple text-white p-6 rounded-[2.5rem] font-black shadow-float hover:scale-[1.02] active:scale-[0.98] smooth flex items-center justify-center gap-3">
              <ShieldCheck size={24} />
              Configurar Alertas
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
