"use client";

import { currentUser } from "@/lib/mock-data";
import { User, Mail, Shield, Award, Edit3, Settings, LogOut, ChevronRight, GraduationCap, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  return (
    <div className="flex-1 min-h-screen bg-ui-wash">
      {/* Profile Header Hero */}
      <div className="h-64 bg-gradient-to-r from-brand-purple to-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-4xl mx-auto h-full flex items-end px-8 pb-8 relative z-10">
          <div className="relative group">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img 
               src={currentUser.avatar} 
               alt={currentUser.name} 
               className="w-32 h-32 rounded-[2.5rem] border-8 border-ui-surface shadow-float smooth group-hover:scale-105" 
             />
             <button className="absolute bottom-2 right-2 bg-brand-purple text-white p-2 rounded-xl shadow-nav opacity-0 group-hover:opacity-100 smooth">
               <Edit3 size={16} />
             </button>
          </div>
          <div className="ml-8 pb-4 text-white">
            <h1 className="text-4xl font-black tracking-tight">{currentUser.name}</h1>
            <p className="text-white/80 font-bold flex items-center gap-2">
              @{currentUser.username} <span className="px-2 py-0.5 bg-white/20 rounded-full text-[10px] uppercase font-black tracking-widest">Aluno Elite</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto -mt-10 px-8 pb-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Stats Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-[2.5rem] border border-ui-divider shadow-card text-center">
              <div className="flex items-center justify-around mb-6">
                 <div>
                   <p className="text-2xl font-black text-brand-purple">2.4k</p>
                   <p className="text-[10px] uppercase font-black text-text-secondary tracking-widest">Seguidores</p>
                 </div>
                 <div className="w-px h-10 bg-ui-divider" />
                 <div>
                   <p className="text-2xl font-black text-brand-purple">150</p>
                   <p className="text-[10px] uppercase font-black text-text-secondary tracking-widest">Seguindo</p>
                 </div>
              </div>
              <button className="w-full bg-brand-purple text-white py-4 rounded-2xl font-black shadow-float hover:scale-[1.02] active:scale-[0.98] smooth">
                Seguir
              </button>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-ui-divider shadow-card">
              <h3 className="font-black text-text-primary mb-6 flex items-center gap-2">
                <Shield className="text-brand-blue" size={20} />
                Bio & Info
              </h3>
              <p className="text-sm font-medium text-text-secondary leading-relaxed mb-8 italic">
                "Aprendendo robótica e tentando não explodir os laboratórios da escola. 🤖⚡️"
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-bold text-text-secondary">
                  <Mail size={16} className="text-brand-purple" /> {currentUser.username}@escola.com
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-text-secondary">
                   <Shield size={16} className="text-brand-purple" /> Aluno do 3º Ano - EM
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-yellow/10 to-orange-50 p-6 rounded-[2.5rem] border border-brand-yellow/20">
               <h4 className="font-black text-brand-orange mb-4 flex items-center gap-2 uppercase tracking-widest text-[10px]">
                 <Award size={14} /> Badges Conquistados
               </h4>
               <div className="flex flex-wrap gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-yellow flex items-center justify-center text-white shadow-nav" title="Mestre em Quiz">
                    🏆
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center text-white shadow-nav" title="Presença Perfeita">
                    📅
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-brand-purple flex items-center justify-center text-white shadow-nav" title="Amigo da Galera">
                    🤝
                  </div>
               </div>
            </div>
          </div>

          {/* Main Action Area */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-ui-divider shadow-card">
              <h2 className="text-xl font-black text-text-primary mb-8">Gerenciar Conta</h2>
              <div className="space-y-4">
                {[
                  { label: "Configurações de Perfil", icon: Settings, desc: "Alterar nome, bio e foto.", color: "purple" },
                  { label: "Meus Certificados", icon: GraduationCap, desc: "Acessar e baixar diplomas.", color: "blue" },
                  { label: "Carteira EduCoins", icon: Coins, desc: "Ver histórico completo de ganhos.", color: "yellow" },
                ].map(item => (
                  <button 
                  key={item.label}
                  className="w-full flex items-center justify-between p-6 rounded-3xl bg-ui-wash hover:bg-white border border-transparent hover:border-ui-divider hover:shadow-card group smooth"
                  >
                    <div className="flex items-center gap-6">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                        item.color === 'purple' ? "bg-brand-purple/10 text-brand-purple" :
                        item.color === 'blue' ? "bg-brand-blue/10 text-brand-blue" :
                        "bg-brand-yellow/10 text-brand-orange"
                      )}>
                        <item.icon size={24} />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-text-primary group-hover:text-brand-purple smooth">{item.label}</p>
                        <p className="text-xs text-text-secondary font-medium">{item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="text-text-secondary/30 group-hover:text-brand-purple" />
                  </button>
                ))}
              </div>

              <button className="w-full mt-12 flex items-center justify-center gap-3 p-6 rounded-[2rem] border border-red-100 text-red-500 font-bold hover:bg-red-50 smooth">
                <LogOut size={20} /> Encerrar Sessão
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
