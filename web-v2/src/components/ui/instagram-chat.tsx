"use client";

import React, { useState } from "react";
import { Search, Edit, ChevronDown, Info, Phone, Video, Image as ImageIcon, Heart, Smile, Paperclip, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Message, MessageContent, MessageAvatar } from "@/components/ui/message";

// Mock de Conversas (Lateral Esquerda)
const MOCK_CHATS = [
  { id: "1", name: "Gabriel Silva", lastMsg: "Você enviou uma mensagem", time: "1h", avatar: "https://i.pravatar.cc/150?u=gabriel", online: true, unread: false },
  { id: "2", name: "Prof. Ricardo Silva", lastMsg: "Entendido! Vou analisar isso e...", time: "2h", avatar: "https://i.pravatar.cc/150?u=ricardo", online: true, unread: true },
  { id: "3", name: "Diretora Lucia", lastMsg: "Lembrando que na próxima sexta...", time: "5h", avatar: "https://i.pravatar.cc/150?u=lucia", online: false, unread: false },
  { id: "4", name: "Matheus Silva", lastMsg: "Pai, esqueci minha lancheira!", time: "1d", avatar: "https://i.pravatar.cc/150?u=matheus", online: true, unread: false },
  { id: "5", name: "Ana Clara", lastMsg: "Adorei a aula de hoje!", time: "2d", avatar: "https://i.pravatar.cc/150?u=ana", online: false, unread: false },
];

export function InstagramWebChat() {
  const [selectedChat, setSelectedChat] = useState(MOCK_CHATS[1]); // Começa com o Prof. Ricardo selecionado
  const [input, setInput] = useState("");

  return (
    <div className="flex h-[calc(100vh-100px)] w-full max-w-6xl mx-auto bg-white border border-ui-divider/40 rounded-xl overflow-hidden shadow-soft">
      
      {/* Lateral Esquerda: Lista de Conversas */}
      <div className="w-full max-w-[350px] border-r border-ui-divider/40 flex flex-col bg-white">
        {/* Header da Lista */}
        <div className="p-5 flex items-center justify-between border-b border-ui-divider/20">
          <div className="flex items-center gap-1 cursor-pointer group">
            <span className="font-black text-lg tracking-tight text-text-primary">gabriel.psi</span>
            <ChevronDown className="size-4 text-text-primary group-hover:text-brand-purple transition-colors" />
          </div>
          <button className="p-2 hover:bg-ui-wash rounded-full transition-all">
            <Edit className="size-5 text-text-primary" />
          </button>
        </div>

        {/* Lista Scrollável */}
        <div className="flex-1 overflow-y-auto scroll-hide">
          <div className="px-5 py-4 flex justify-between items-center">
            <span className="font-black text-sm text-text-primary uppercase tracking-widest">Mensagens</span>
            <span className="text-xs font-bold text-text-secondary cursor-pointer hover:text-brand-purple">Solicitações</span>
          </div>

          {MOCK_CHATS.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={cn(
                "flex items-center gap-3 px-5 py-3 cursor-pointer transition-all hover:bg-ui-wash/50",
                selectedChat.id === chat.id && "bg-ui-wash border-r-2 border-brand-purple"
              )}
            >
              <div className="relative shrink-0">
                <div className="size-14 rounded-full overflow-hidden border border-ui-divider/40">
                  <img src={chat.avatar} alt={chat.name} className="size-full object-cover" />
                </div>
                {chat.online && (
                  <span className="absolute bottom-0 right-0 size-4 bg-brand-blue border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm tracking-tight truncate", chat.unread ? "font-black text-text-primary" : "text-text-primary font-medium")}>
                  {chat.name}
                </p>
                <p className={cn("text-xs truncate", chat.unread ? "font-bold text-text-primary" : "text-text-secondary font-medium")}>
                  {chat.lastMsg} <span className="opacity-50 ml-1">• {chat.time}</span>
                </p>
              </div>
              {chat.unread && (
                <div className="size-2 bg-brand-purple rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* área Direita: Conversa Ativa */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header do Chat */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-ui-divider/20 shrink-0">
          <div className="flex items-center gap-3 cursor-pointer">
             <div className="size-8 rounded-full overflow-hidden border border-ui-divider/40">
                <img src={selectedChat.avatar} alt={selectedChat.name} className="size-full object-cover" />
             </div>
             <div>
               <p className="text-sm font-black text-text-primary tracking-tight leading-none">{selectedChat.name}</p>
               <p className="text-[10px] font-bold text-brand-blue uppercase tracking-widest mt-1">Ativo agora</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <button className="text-text-primary hover:text-brand-purple transition-colors"><Phone className="size-5" /></button>
             <button className="text-text-primary hover:text-brand-purple transition-colors"><Video className="size-5" /></button>
             <button className="text-text-primary hover:text-brand-purple transition-colors"><Info className="size-5" /></button>
          </div>
        </div>

        {/* Área de Mensagens Scrollável */}
        <div className="flex-1 overflow-y-auto p-6 scroll-hide bg-[#fafafa]">
           <div className="flex flex-col items-center py-8 mb-12">
              <div className="size-24 rounded-full overflow-hidden border border-ui-divider/40 mb-3">
                <img src={selectedChat.avatar} alt={selectedChat.name} className="size-full object-cover" />
              </div>
              <h2 className="font-black text-xl text-text-primary">{selectedChat.name}</h2>
              <p className="text-xs font-bold text-text-secondary tracking-wide mt-1">Rede Escola • {selectedChat.id === "2" ? "Professor" : "Aluno"}</p>
              <button className="mt-4 bg-ui-wash hover:bg-ui-divider px-4 py-1.5 rounded-lg text-xs font-black text-text-primary transition-all">Ver Perfil</button>
           </div>

           <div className="space-y-2">
              <Message from="assistant">
                <MessageAvatar src={selectedChat.avatar} name={selectedChat.name} />
                <MessageContent from="assistant">Olá! Como posso te ajudar hoje?</MessageContent>
              </Message>

              <Message from="user">
                <MessageAvatar name="EU" />
                <MessageContent from="user">Oi! Queria tirar uma dúvida sobre o trabalho de UI Design.</MessageContent>
              </Message>

              <Message from="assistant">
                <MessageAvatar src={selectedChat.avatar} name={selectedChat.name} />
                <MessageContent from="assistant">Claro! Pode perguntar. Estou analisando seu protótipo agora mesmo.</MessageContent>
              </Message>
           </div>
        </div>

        {/* Input de Mensagem Estilo Instagram */}
        <div className="p-4 px-6 shrink-0 border-t border-ui-divider/10 bg-white">
           <div className="flex items-center gap-3 px-4 py-1 border border-ui-divider/60 rounded-full bg-ui-wash/30 focus-within:border-ui-divider transition-all">
              <button className="p-1 hover:scale-110 transition-transform"><Smile className="size-6 text-text-primary" /></button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enviar mensagem..."
                className="flex-1 bg-transparent border-none outline-none py-3 text-sm font-medium text-text-primary placeholder:text-text-placeholder"
              />
              <div className="flex items-center gap-3 shrink-0">
                 {input.trim() === "" ? (
                   <>
                    <button className="p-1 hover:scale-110 transition-transform"><Paperclip className="size-5 text-text-primary rotate-45" /></button>
                    <button className="p-1 hover:scale-110 transition-transform"><ImageIcon className="size-5 text-text-primary" /></button>
                    <button className="p-1 hover:scale-110 transition-transform"><Heart className="size-5 text-text-primary" /></button>
                   </>
                 ) : (
                   <button className="font-black text-sm text-brand-blue hover:text-brand-blue-hover px-2 transition-all">Enviar</button>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
