"use client";

import {
  Copy,
  Flag,
  MoreHorizontal,
  MoreVertical,
  Reply,
  Trash2,
  UserMinus2,
  X,
  Send,
  Smile,
  Paperclip
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const DEMO_USER = {
  id: "user-123",
  name: "Você",
  avatar: "https://api.dicebear.com/9.x/glass/svg?seed=you",
};

type StatusType = "online" | "dnd" | "offline";
const DEMO_OTHER = {
  id: "user-456",
  name: "Prof. Ana Clara",
  avatar: "https://i.pravatar.cc/150?u=ana_clara",
  status: "online" as StatusType,
};

const STATUS_COLORS: Record<StatusType, string> = {
  online: "bg-green-500",
  dnd: "bg-red-500",
  offline: "bg-gray-400",
};

function StatusBadge({ status }: { status: StatusType }) {
  return (
    <span
      className={cn(
        "inline-block size-2.5 rounded-full border-2 border-white",
        STATUS_COLORS[status]
      )}
    />
  );
}

const DEMO_MESSAGES = [
  { id: 1, text: "Olá! Tudo bem? 👋", sender: DEMO_OTHER, time: "09:00" },
  { id: 2, text: "Oi professora! Tudo ótimo por aqui.", sender: DEMO_USER, time: "09:01" },
  { id: 3, text: "Já viu os novos componentes da Rede Escola?", sender: DEMO_OTHER, time: "09:02" },
  { id: 4, text: "Ainda não! O que tem de novo?", sender: DEMO_USER, time: "09:03" },
  { id: 5, text: "O chat flutuante agora tem histórico e pesquisa!", sender: DEMO_OTHER, time: "09:04" },
];

export function ChatConversationScreen({
  className,
  onClose,
}: {
  className?: string;
  onClose?: () => void;
}) {
  const [input, setInput] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col h-[600px] w-full bg-white rounded-[2.5rem] shadow-float border border-ui-divider/40 overflow-hidden",
        className
      )}
    >
      {/* Header Estilo Premium */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-ui-divider/20 bg-white shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer">
            <div className="size-11 rounded-2xl overflow-hidden border border-ui-divider/40 group-hover:scale-105 transition-transform shadow-sm">
              <img alt={DEMO_OTHER.name} src={DEMO_OTHER.avatar} className="size-full object-cover" />
            </div>
            <span className="absolute -bottom-1 -right-1">
              <StatusBadge status={DEMO_OTHER.status} />
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-sm text-text-primary tracking-tight leading-none mb-1">{DEMO_OTHER.name}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue">{DEMO_OTHER.status} agora</span>
          </div>
        </div>

        <div className="flex items-center gap-1 relative">
           <button 
             onClick={() => setShowUserMenu(!showUserMenu)}
             className="p-2.5 hover:bg-ui-wash rounded-xl transition-all text-text-secondary"
           >
             <MoreVertical className="size-5" />
           </button>
           {onClose && (
             <button onClick={onClose} className="p-2.5 hover:bg-ui-wash rounded-xl transition-all text-text-secondary">
               <X className="size-5" />
             </button>
           )}

           {/* Menu Dropdown Manual Premium */}
           {showUserMenu && (
             <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-float border border-ui-divider/40 p-1.5 z-30 animate-in fade-in zoom-in-95 duration-200">
               <button className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-ui-wash rounded-xl text-xs font-bold text-rose-600 transition-all">
                  <UserMinus2 className="size-4" /> Bloquear Usuário
               </button>
               <button className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-ui-wash rounded-xl text-xs font-bold text-destructive transition-all">
                  <Trash2 className="size-4" /> Excluir Conversa
               </button>
               <button className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-ui-wash rounded-xl text-xs font-bold text-yellow-600 transition-all">
                  <Flag className="size-4" /> Denunciar
               </button>
             </div>
           )}
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-ui-wash/30 scroll-hide">
         {DEMO_MESSAGES.map((msg) => {
           const isMe = msg.sender.id === DEMO_USER.id;
           return (
             <div key={msg.id} className={cn("flex group animate-in slide-in-from-bottom-2 duration-300", isMe ? "justify-end" : "justify-start")}>
                <div className={cn("flex max-w-[85%] gap-2.5", isMe ? "flex-row-reverse" : "flex-row")}>
                   <div className="size-8 rounded-xl overflow-hidden border border-ui-divider/40 flex-shrink-0 animate-in zoom-in duration-500">
                      <img src={msg.sender.avatar} alt={msg.sender.name} className="size-full object-cover" />
                   </div>
                   
                   <div className={cn("flex flex-col", isMe ? "items-end" : "items-start")}>
                      <div className={cn(
                        "px-4 py-2.5 text-[13px] leading-relaxed shadow-sm relative group/msg transition-all",
                        isMe 
                          ? "bg-brand-purple text-white font-bold rounded-2xl rounded-tr-none" 
                          : "bg-white text-text-primary font-bold rounded-2xl rounded-tl-none border border-ui-divider/20"
                      )}>
                         {msg.text}
                         
                         {/* Ações Rápidas de Mensagem Hover */}
                         <div className={cn(
                           "absolute top-0 opacity-0 group-hover/msg:opacity-100 transition-all duration-200",
                           isMe ? "right-full mr-2" : "left-full ml-2"
                         )}>
                            <div className="bg-white border border-ui-divider/40 rounded-xl shadow-float p-1 flex gap-0.5">
                               <button className="p-1.5 hover:bg-ui-wash rounded-lg text-text-secondary"><Reply className="size-3.5" /></button>
                               <button className="p-1.5 hover:bg-ui-wash rounded-lg text-text-secondary"><Copy className="size-3.5" /></button>
                            </div>
                         </div>
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-tighter text-text-placeholder mt-1.5 opacity-60">
                         {msg.time}
                      </span>
                   </div>
                </div>
             </div>
           );
         })}
      </div>

      {/* Input de Mensagem Estilo Premium */}
      <div className="p-5 bg-white border-t border-ui-divider/10 shrink-0">
          <div className="flex items-center gap-3 bg-ui-wash/50 border border-ui-divider/60 rounded-[1.5rem] p-1.5 px-3 focus-within:border-brand-purple/40 focus-within:bg-white transition-all shadow-sm">
             <button className="p-2 hover:scale-110 transition-all text-text-secondary"><Smile className="size-5" /></button>
             <input 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Mandar mensagem..."
               className="flex-1 bg-transparent border-none outline-none py-2 text-sm font-bold text-text-primary placeholder:text-text-placeholder"
             />
             <div className="flex items-center gap-1">
                <button className="p-2 hover:scale-110 transition-all text-text-secondary"><Paperclip className="size-5" /></button>
                <button className={cn(
                  "size-10 rounded-2xl flex items-center justify-center transition-all",
                  input.trim() === "" ? "bg-ui-wash text-text-placeholder" : "bg-brand-purple text-white shadow-lg shadow-brand-purple/20 active:scale-90"
                )}>
                   <Send className="size-4.5 -ml-0.5 mt-0.5" />
                </button>
             </div>
          </div>
      </div>
    </div>
  );
}
