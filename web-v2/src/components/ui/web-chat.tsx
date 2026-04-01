"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, X, Loader2, MoreVertical, Phone, Video, Search, Image as ImageIcon, Smile, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

import { Message, MessageContent, MessageAvatar } from "./message";

export interface ChatMessage {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: string;
}

export interface WebChatProps {
  userName: string;
  userAvatar?: string;
  userRole?: string;
  isOnline?: boolean;
  className?: string;
}

export function WebChat({
  userName = "Prof. Ricardo Silva",
  userAvatar,
  userRole = "Mentor de Design",
  isOnline = true,
  className,
}: WebChatProps) {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "1", text: "Olá! Vi seu progresso no curso de UI Design. Ficou excelente!", sender: "other", timestamp: "10:30" },
    { id: "2", text: "Muito obrigado, professor! Estou me esforçando bastante nas cores.", sender: "me", timestamp: "10:32" },
    { id: "3", text: "Dá pra notar! Se tiver alguma dúvida sobre o módulo de Figma, pode me chamar.", sender: "other", timestamp: "10:33" },
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() === "") return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    
    // Simular resposta rápida automática
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "Entendido! Vou analisar isso e te respondo em breve. 🚀",
        sender: "other",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    }, 2000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={cn(
      "w-full h-[700px] flex flex-col bg-white rounded-3xl overflow-hidden shadow-float border border-ui-divider/40",
      className
    )}>
      {/* Header */}
      <div className="bg-white p-4 border-b border-ui-divider/50 flex justify-between items-center z-10 px-6">
        <div className="flex items-center space-x-4">
          <div className="relative shrink-0">
            <MessageAvatar src={userAvatar} name={userName} className="size-12 ring-2 ring-ui-divider/30" />
            {isOnline && (
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-brand-blue border-2 border-white rounded-full animate-pulse" />
            )}
          </div>
          <div>
            <h2 className="font-black text-text-primary text-[16px] tracking-tight leading-none mb-1">{userName}</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">{userRole}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-full hover:bg-ui-wash text-text-secondary transition-all">
            <Search className="h-5 w-5" />
          </button>
          <button className="p-2.5 rounded-full hover:bg-ui-wash text-text-secondary transition-all">
            <Phone className="h-5 w-5" />
          </button>
          <button className="p-2.5 rounded-full hover:bg-ui-wash text-text-secondary transition-all">
            <Video className="h-5 w-5" />
          </button>
          <div className="w-px h-6 bg-ui-divider/60 mx-1" />
          <button className="p-2.5 rounded-full hover:bg-ui-wash text-text-secondary transition-all">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Área de Mensagens */}
      <div className="flex-1 p-6 overflow-y-auto bg-ui-wash/60 relative scroll-hide">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
          <span className="text-8xl font-black rotate-[-45deg]">REDE ESCOLA</span>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="flex justify-center mb-6">
            <span className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-text-secondary uppercase tracking-widest shadow-sm border border-ui-divider/40">
              Hoje
            </span>
          </div>

          {messages.map((msg) => (
            <Message key={msg.id} from={msg.sender === "me" ? "user" : "assistant"}>
              <MessageAvatar 
                src={msg.sender === "me" ? undefined : userAvatar} 
                name={msg.sender === "me" ? "EU" : userName} 
              />
              <MessageContent from={msg.sender === "me" ? "user" : "assistant"}>
                {msg.text}
                <span className={cn(
                  "text-[9px] font-bold block mt-1 uppercase tracking-tighter opacity-70 text-right",
                  msg.sender === "me" ? "text-white/80" : "text-text-secondary"
                )}>
                  {msg.timestamp}
                </span>
              </MessageContent>
            </Message>
          ))}

          {isTyping && (
            <Message from="assistant">
              <MessageAvatar src={userAvatar} name={userName} />
              <MessageContent from="assistant">
                <div className="flex items-center gap-1.5 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-purple/40 animate-bounce"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-purple/40 animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-purple/40 animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </MessageContent>
            </Message>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Footer com Input Completo de Chat Social */}
      <div className="p-4 bg-white border-t border-ui-divider/50 shadow-lg relative z-20">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <div className="flex items-center gap-1 shrink-0">
             <button className="p-2.5 text-text-placeholder hover:text-brand-purple transition-all">
               <Smile className="h-6 w-6" />
             </button>
             <button className="p-2.5 text-text-placeholder hover:text-brand-purple transition-all">
               <Paperclip className="h-6 w-6" />
             </button>
             <button className="p-2.5 text-text-placeholder hover:text-brand-purple transition-all">
               <ImageIcon className="h-6 w-6" />
             </button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escreva uma mensagem..."
              className="flex-1 bg-ui-wash border-none py-3.5 px-6 rounded-full text-sm font-semibold text-text-primary placeholder:text-text-placeholder focus:ring-2 focus:ring-brand-purple/10 transition-all outline-none"
            />
            <button
              type="submit"
              disabled={input.trim() === ""}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md active:scale-90",
                input.trim() === ""
                   ? "bg-ui-wash text-text-placeholder cursor-not-allowed"
                   : "bg-brand-purple text-white hover:bg-brand-purple-hover shadow-brand-purple/20"
              )}
            >
              <Send className="h-5 w-5 -ml-0.5 mt-0.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
