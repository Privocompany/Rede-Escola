"use client";

import { Bell, Check, Trash2, Clock, Info, AlertTriangle, MessageSquare, Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "info" | "warning" | "success" | "social";
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "Novo comentário no seu post",
    description: "A Prof. Ana Clara comentou: 'Excelente iniciativa, Gabriel!'",
    time: "5 min atrás",
    type: "social",
    read: false,
  },
  {
    id: "n2",
    title: "EduCoins Recebidos!",
    description: "Você ganhou 15 EC por engajamento no feed.",
    time: "1 hora atrás",
    type: "success",
    read: false,
  },
  {
    id: "n3",
    title: "Lembrete: Prova de Matemática",
    description: "Sua prova de Geometria começa em 24 horas. Prepare-se!",
    time: "3 horas atrás",
    type: "warning",
    read: true,
  },
  {
    id: "n4",
    title: "Atualização de Sistema",
    description: "O módulo de Catraca Virtual agora suporta biometria facial.",
    time: "Ontem",
    type: "info",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="flex-1 min-h-screen bg-ui-wash p-8 pt-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black text-text-primary flex items-center gap-3">
              <Bell className="text-brand-purple" size={32} />
              Notificações
            </h1>
            <p className="text-text-secondary font-medium">Fique por dentro de tudo o que acontece.</p>
          </div>
          <button 
            onClick={markAllRead}
            className="text-sm font-black text-brand-purple hover:bg-brand-purple/5 px-4 py-2 rounded-xl smooth"
          >
            Marcar todas como lidas
          </button>
        </div>

        <div className="space-y-4">
          {notifications.map((n) => (
            <div 
              key={n.id}
              className={cn(
                "bg-white p-6 rounded-[2rem] border border-ui-divider shadow-card smooth flex items-start gap-6 group hover:border-brand-purple/20",
                !n.read && "border-l-4 border-l-brand-purple"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 animate-in zoom-in duration-300",
                n.type === "success" ? "bg-green-100 text-green-600" :
                n.type === "warning" ? "bg-brand-yellow/20 text-brand-orange" :
                n.type === "social" ? "bg-brand-purple/10 text-brand-purple" :
                "bg-brand-blue/10 text-brand-blue"
              )}>
                {n.type === "success" ? <Check size={24} /> :
                 n.type === "warning" ? <AlertTriangle size={24} /> :
                 n.type === "social" ? <MessageSquare size={24} /> :
                 <Info size={24} />}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <h3 className={cn("font-black text-lg", !n.read ? "text-text-primary" : "text-text-secondary")}>
                    {n.title}
                  </h3>
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest flex items-center gap-1">
                    <Clock size={12} /> {n.time}
                  </span>
                </div>
                <p className="text-sm font-medium text-text-secondary leading-relaxed mb-4">
                  {n.description}
                </p>
                
                <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 smooth">
                   <button className="text-[10px] font-black uppercase tracking-widest text-brand-purple hover:underline">Ver Detalhes</button>
                   <button className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:underline">Excluir</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-20">
             <div className="w-20 h-20 bg-ui-divider rounded-full flex items-center justify-center mx-auto mb-6 text-text-secondary opacity-30">
               <Bell size={40} />
             </div>
             <p className="font-black text-text-secondary text-xl">Nenhuma notificação por aqui.</p>
          </div>
        )}
      </div>
    </div>
  );
}
