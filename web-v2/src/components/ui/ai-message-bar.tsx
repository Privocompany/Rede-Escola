"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AIMessageBarProps {
  className?: string;
  initialWelcome?: string;
}

export function AIMessageBar({ 
  className, 
  initialWelcome = "Olá! Eu sou o assistente de IA da Rede Escola. Como posso te ajudar hoje?" 
}: AIMessageBarProps) {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Simulate AI typing effect
  const simulateResponse = (userMessage: string) => {
    setIsTyping(true);
    
    let response = "Interessante! Posso te ajudar a encontrar cursos, tirar dúvidas sobre a plataforma ou sugerir mentores. O que prefere?";
    
    const msg = userMessage.toLowerCase();
    if (msg.includes("olá") || msg.includes("oi") || msg.includes("bom dia")) {
      response = "Olá! É um prazer conversar com você. Como está indo sua jornada de aprendizado na Rede Escola?";
    } else if (msg.includes("ajuda") || msg.includes("socorro")) {
      response = "Estou aqui para ajudar! Você pode me perguntar sobre cursos, como ganhar EduCoins ou como falar com um professor.";
    } else if (msg.includes("obrigado") || msg.includes("valeu")) {
      response = "De nada! Sempre que precisar de uma faísca de inspiração, é só me chamar. ✨";
    } else if (msg.includes("quem é você")) {
      response = "Eu sou o Assistente Inteligente da Rede Escola, projetado para tornar sua experiência educacional mais fluida e divertida!";
    }
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { text: response, isUser: false }]);
    }, 1500);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() === "") return;
    
    const userMessage = input;
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setInput("");
    simulateResponse(userMessage);
  };

  const clearChat = () => {
    setMessages([]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={cn(
      "w-full max-w-xl mx-auto h-[600px] flex flex-col bg-white rounded-3xl overflow-hidden shadow-float border border-ui-divider/40 transition-all duration-300",
      className
    )}>
      {/* Header - Identidade Rede Escola */}
      <div className="bg-brand-purple p-5 flex justify-between items-center shadow-md relative z-10">
        <div className="flex items-center space-x-3 text-white">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-black text-lg tracking-tight leading-none mb-1">Assistente IA</h2>
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/70">Rede Escola • Online</span>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors text-white"
          title="Limpar conversa"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 p-5 overflow-y-auto bg-ui-wash scroll-hide">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-20 h-20 bg-brand-purple/10 rounded-3xl flex items-center justify-center mb-6 animate-bounce transition-all duration-[2s]">
              <Sparkles className="h-10 w-10 text-brand-purple" />
            </div>
            <h3 className="text-text-primary text-2xl font-black mb-3 tracking-tight">{initialWelcome.split('?')[0]}?</h3>
            <p className="text-text-secondary text-sm font-medium leading-relaxed max-w-xs">
              Tire dúvidas sobre cursos, mentores ou aprenda a usar a plataforma agora mesmo.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isUser ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                    msg.isUser
                      ? "bg-brand-purple text-white font-medium rounded-tr-none"
                      : "bg-white text-text-primary font-semibold rounded-tl-none border border-ui-divider/40"
                  )}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="p-4 rounded-2xl bg-white border border-ui-divider/40 rounded-tl-none pr-8">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2 h-2 rounded-full bg-brand-purple/40 animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 rounded-full bg-brand-purple/40 animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 rounded-full bg-brand-purple/40 animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Input form */}
      <form 
        onSubmit={handleSubmit}
        className={cn(
          "p-5 border-t transition-all duration-300 bg-white",
          isFocused ? 'border-brand-purple/40 ring-1 ring-brand-purple/5' : 'border-ui-divider/50'
        )}
      >
        <div className="relative flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Pergunte qualquer coisa..."
            className="flex-1 bg-ui-wash border border-ui-divider/40 rounded-full py-3.5 px-5 text-text-primary font-medium placeholder:text-text-placeholder focus:outline-none transition-all"
          />
          <button
            type="submit"
            disabled={input.trim() === "" || isTyping}
            className={cn(
              "shrink-0 rounded-full w-12 h-12 flex items-center justify-center transition-all shadow-md active:scale-95",
              input.trim() === "" || isTyping
                ? "text-text-placeholder bg-ui-wash cursor-not-allowed shadow-none"
                : "text-white bg-brand-purple hover:bg-brand-purple-hover shadow-brand-purple/20"
            )}
          >
            {isTyping ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5 -ml-0.5 mt-0.5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
