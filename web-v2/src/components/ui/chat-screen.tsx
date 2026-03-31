"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  content: string;
  sender: "me" | "other";
}

export interface ChatScreenProps {
  userName: string;
  userAvatar?: string;
  userOnline?: boolean;
}

export function ChatScreen({
  userName,
  userAvatar,
  userOnline = false,
}: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", content: "Olá! Tudo bem?", sender: "other" },
    { id: "2", content: "Oii! Tudo ótimo. Vi que você gostou da última aula.", sender: "me" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "me",
    };
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  return (
    <div className="w-full max-w-md h-[600px] flex flex-col rounded-3xl bg-white shadow-float border border-ui-divider/40 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-ui-divider/50 bg-white">
        <div className="relative w-11 h-11 rounded-full bg-ui-wash border border-ui-divider flex items-center justify-center text-brand-purple font-black uppercase overflow-hidden shrink-0">
          {userAvatar ? (
            <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
          ) : (
            (userName?.charAt(0) || "U")
          )}
          
          {userOnline && (
            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-white bg-brand-blue" />
          )}
        </div>
        <div className="flex flex-col">
          <p className="font-black text-[15px] text-text-primary tracking-tight leading-none mb-1">{userName}</p>
          {userOnline ? (
            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest leading-none">Online</span>
          ) : (
             <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest leading-none">Offline</span>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-5 space-y-4 overflow-y-auto bg-ui-wash scroll-hide">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "other" && (
              <div className="w-8 h-8 rounded-full bg-white border border-ui-divider/40 flex items-center justify-center text-text-primary font-bold text-xs shrink-0 shadow-sm overflow-hidden">
                {userAvatar ? (
                  <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                ) : (
                  (userName?.charAt(0) || "U")
                )}
              </div>
            )}

            <div
              className={cn(
                "px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed max-w-[75%] break-words transition-all duration-200 transform-gpu hover:scale-[1.02]",
                msg.sender === "me"
                  ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20 rounded-br-none"
                  : "bg-white text-text-primary shadow-sm border border-ui-divider/40 rounded-bl-none"
              )}
            >
              <p className={cn(msg.sender === "me" ? "font-medium" : "font-semibold")}>
                 {msg.content}
              </p>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-ui-divider/50 flex items-center gap-3 bg-white">
        <input
          placeholder="Digite uma mensagem..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          className="flex-1 bg-ui-wash border border-ui-divider/40 text-text-primary rounded-full px-4 h-12 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/20 placeholder:text-text-placeholder font-medium"
        />
        <button
          onClick={sendMessage}
          className="shrink-0 h-12 w-12 rounded-full bg-brand-blue hover:bg-brand-blue-hover text-white flex items-center justify-center shadow-md shadow-brand-blue/20 transition-all active:scale-95"
          aria-label="Enviar mensagem"
        >
          <Send className="h-5 w-5 -ml-0.5 mt-0.5" />
        </button>
      </div>
    </div>
  );
}

export default ChatScreen;
