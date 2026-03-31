"use client";

import { Search, Flame, Clock, Hash, ChevronRight, User, BookOpen, MessageSquare, Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const mockTrending = ["#Matemática", "#Maker", "#Robotica", "#CopaEscola", "#EduCoins"];

const mockRecent = [
  { id: "r1", title: "Prof. Ana Clara", type: "Pessoa", icon: User },
  { id: "r2", title: "Curso de Inglês", type: "Curso", icon: BookOpen },
  { id: "r3", title: "Trabalho de Biologia", type: "Post", icon: MessageSquare },
];

export default function BuscarPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex-1 min-h-screen bg-ui-wash p-8 pt-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Search Input Large */}
        <div className="relative mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-purple">
            <Search size={32} />
          </div>
          <input 
            type="text" 
            placeholder="O que você quer aprender ou encontrar hoje?" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-20 bg-white rounded-3xl shadow-nav border border-ui-divider px-20 text-xl font-black text-text-primary placeholder:text-text-secondary/40 outline-none focus:border-brand-purple/50 smooth"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block">
            <button className="bg-brand-purple text-white px-8 py-3 rounded-2xl font-black shadow-float smooth active:scale-95">
              Buscar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Trending Section */}
          <section>
            <h2 className="text-xl font-black text-text-primary flex items-center gap-2 mb-6">
              <Flame className="text-brand-orange" size={24} />
              Em Alta na Escola
            </h2>
            <div className="flex flex-wrap gap-3">
              {mockTrending.map(tag => (
                <button 
                  key={tag} 
                  className="bg-white px-6 py-3 rounded-2xl border border-ui-divider font-black text-sm text-text-secondary hover:border-brand-purple hover:text-brand-purple smooth flex items-center gap-2 shadow-card"
                >
                  <Hash size={16} className="text-brand-purple" /> {tag.replace('#', '')}
                </button>
              ))}
            </div>
            
            <div className="mt-12 bg-white rounded-[2.5rem] p-8 border border-ui-divider shadow-card relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Star size={100} className="text-brand-yellow fill-current" />
               </div>
               <h3 className="font-black text-xl text-text-primary mb-2">Descubra novos cursos!</h3>
               <p className="text-sm font-medium text-text-secondary mb-6 leading-relaxed">Com base no que você busca, recomendamos o curso de Robótica Maker Nível 2.</p>
               <button className="text-brand-purple font-black flex items-center gap-2 group-hover:gap-4 smooth">
                 Ver Recomendações <ChevronRight size={18} />
               </button>
            </div>
          </section>

          {/* Recent Searches */}
          <section>
            <h2 className="text-xl font-black text-text-primary flex items-center gap-2 mb-6">
              <Clock className="text-brand-blue" size={24} />
              Minhas Buscas Recentes
            </h2>
            <div className="space-y-4">
              {mockRecent.map(item => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.id} 
                    className="bg-white p-4 rounded-2xl flex items-center gap-4 hover:border-brand-purple/20 border border-ui-divider smooth group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-ui-wash flex items-center justify-center text-brand-purple">
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-text-primary group-hover:text-brand-purple smooth">{item.title}</p>
                      <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">{item.type}</p>
                    </div>
                    <button className="p-2 text-text-secondary hover:text-red-500 smooth">
                      <Clock size={16} className="opacity-0 group-hover:opacity-100" />
                    </button>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 text-center py-8">
               <p className="text-sm font-bold text-text-secondary/50">Não encontrou o que procurava?</p>
               <button className="text-brand-purple font-black hover:underline mt-2">Dê uma sugestão de conteúdo</button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
