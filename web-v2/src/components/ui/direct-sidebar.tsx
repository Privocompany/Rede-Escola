"use client";

import React, { useState } from "react";
import { Search, Edit, ChevronDown, Info, Phone, Video, Image as ImageIcon, Heart, Smile, Paperclip, Send, Sparkles, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Message, MessageContent, MessageAvatar } from "@/components/ui/message";
import { motion, AnimatePresence } from "framer-motion";

// Personagens/Contatos Estilo MessageDock
const DOCK_CHARACTERS = [
  { id: "1", emoji: "👨‍🏫", name: "Prof. Ricardo", online: true, color: "bg-brand-purple/10", unread: true, lastMsg: "Seu protótipo ficou excelente!" },
  { id: "2", emoji: "🎓", name: "Mentor Bruno", online: true, color: "bg-brand-blue/10", unread: false, lastMsg: "Podemos marcar a call amanhã?" },
  { id: "3", emoji: "📚", name: "Biblioteca", online: false, color: "bg-brand-yellow/10", unread: false, lastMsg: "O livro 'Design System' foi devolvido." },
  { id: "4", emoji: "💡", name: "Clube de Ideias", online: true, color: "bg-brand-orange/10", unread: true, lastMsg: "Que tal usarmos Framer no projeto?" },
  { id: "5", emoji: "👩‍💻", name: "Dev Support", online: false, color: "bg-ui-wash", unread: false, lastMsg: "Sua chave de API foi atualizada." },
];

export function DirectSidebarLayout() {
  const [selectedCharacter, setSelectedCharacter] = useState(DOCK_CHARACTERS[0]);
  const [input, setInput] = useState("");

  return (
    <div className="flex h-[calc(100vh-120px)] w-full max-w-6xl mx-auto bg-white border border-ui-divider/40 rounded-[2.5rem] overflow-hidden shadow-float">
      
      {/* SIDEBAR: Inspirada no MessageDock (Retrátil/Ícones) */}
      <div className="w-[80px] md:w-[320px] flex flex-col border-r border-ui-divider/30 bg-white transition-all duration-500 ease-in-out group">
        
        {/* Header Lateral */}
        <div className="p-6 flex items-center justify-center md:justify-between h-20 border-b border-ui-divider/20">
          <div className="hidden md:flex items-center gap-2">
            <div className="size-8 bg-brand-purple rounded-xl flex items-center justify-center shadow-lg shadow-brand-purple/20">
              <Sparkles className="size-4 text-white" />
            </div>
            <span className="font-black text-lg tracking-tight text-text-primary">Directs</span>
          </div>
          <button className="p-3 hover:bg-ui-wash rounded-2xl transition-all text-text-primary">
            <Edit className="size-5" />
          </button>
        </div>

        {/* Lista de Contatos Estilo Dock */}
        <div className="flex-1 overflow-y-auto scroll-hide py-4 px-3 space-y-3">
          {DOCK_CHARACTERS.map((char) => (
            <motion.div
              key={char.id}
              onClick={() => setSelectedCharacter(char)}
              whileHover={{ x: 4 }}
              className={cn(
                "flex items-center gap-4 p-3 rounded-3xl cursor-pointer transition-all relative group/item",
                selectedCharacter.id === char.id 
                  ? "bg-brand-purple shadow-lg shadow-brand-purple/20 text-white" 
                  : "hover:bg-ui-wash text-text-primary"
              )}
            >
              <div className={cn(
                "size-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-110 shadow-sm",
                selectedCharacter.id === char.id ? "bg-white/20" : char.color
              )}>
                {char.emoji}
                {char.online && (
                  <span className="absolute -top-1 -right-1 size-3.5 bg-brand-blue border-2 border-white rounded-full" />
                )}
              </div>

              <div className="hidden md:block flex-1 min-w-0">
                <p className={cn("text-sm font-black tracking-tight truncate", selectedCharacter.id === char.id ? "text-white" : "text-text-primary")}>
                  {char.name}
                </p>
                <p className={cn("text-[11px] truncate font-medium", selectedCharacter.id === char.id ? "text-white/70" : "text-text-secondary")}>
                  {char.lastMsg}
                </p>
              </div>

              {char.unread && selectedCharacter.id !== char.id && (
                <div className="absolute right-4 size-2.5 bg-brand-purple rounded-full ring-4 ring-white" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer Lateral (Menu) */}
        <div className="p-4 border-t border-ui-divider/20 flex justify-center">
           <button className="p-3 hover:bg-ui-wash rounded-full transition-all text-text-secondary">
             <MoreVertical className="size-5" />
           </button>
        </div>
      </div>

      {/* ÁREA DIREITA: Chat Ativo */}
      <div className="flex-1 flex flex-col bg-[#FAFAFA]">
        {/* Header do Chat */}
        <div className="h-20 flex items-center justify-between px-8 bg-white border-b border-ui-divider/30 z-10">
          <div className="flex items-center gap-4">
             <div className={cn("size-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm", selectedCharacter.color)}>
                {selectedCharacter.emoji}
             </div>
             <div>
                <h3 className="font-black text-text-primary text-base tracking-tight leading-none mb-1">{selectedCharacter.name}</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-blue">Educador Certificado • Ativo</p>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <button className="p-3 hover:bg-ui-wash rounded-2xl text-text-primary transition-all"><Search className="size-5" /></button>
             <button className="p-3 hover:bg-ui-wash rounded-2xl text-text-primary transition-all"><Phone className="size-5" /></button>
             <button className="p-3 hover:bg-ui-wash rounded-2xl text-text-primary transition-all"><Video className="size-5" /></button>
          </div>
        </div>

        {/* Área de Conversa */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 scroll-hide">
           <Message from="assistant">
              <MessageAvatar name={selectedCharacter.name} />
              <MessageContent from="assistant">
                Olá! Sigo analisando seus últimos envios. Gostaria de tirar alguma dúvida agora?
              </MessageContent>
           </Message>

           <Message from="user">
              <MessageAvatar name="EU" />
              <MessageContent from="user">
                Sim! Tenho dúvida no uso de animações do Framer Motion no novo chat flutuante.
              </MessageContent>
           </Message>

           <Message from="assistant">
              <MessageAvatar name={selectedCharacter.name} />
              <MessageContent from="assistant">
                Bacana! O segredo está no `AnimatePresence`. Vamos ver um exemplo?
              </MessageContent>
           </Message>
        </div>

        {/* Input de Mensagem */}
        <div className="p-6 pt-2 bg-[#FAFAFA]">
           <div className="bg-white border border-ui-divider/60 rounded-[2rem] p-2 flex items-center gap-3 shadow-lg shadow-black/[0.02]">
              <button className="p-3 text-text-placeholder hover:text-brand-purple transition-all sm:flex hidden">
                <Smile className="size-6" />
              </button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Mandar mensagem para ${selectedCharacter.name}...`}
                className="flex-1 bg-transparent border-none outline-none py-3 px-2 text-sm font-bold text-text-primary placeholder:text-text-placeholder"
              />
              <div className="flex items-center gap-1 pr-1">
                <button className="p-3 text-text-placeholder hover:text-brand-purple transition-all sm:flex hidden"><Paperclip className="size-5" /></button>
                <button className={cn(
                  "size-12 rounded-full flex items-center justify-center transition-all",
                  input.trim() === "" ? "bg-ui-wash text-text-placeholder" : "bg-brand-purple text-white shadow-lg shadow-brand-purple/20"
                )}>
                  <Send className="size-5 -ml-0.5 mt-0.5" />
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
