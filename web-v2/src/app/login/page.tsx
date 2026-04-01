'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  AuthTabs, 
  Ripple, 
  TechOrbitDisplay, 
  BoxReveal 
} from '@/components/auth/AuthComponents';
import { Book, GraduationCap, Users, Trophy, Star, Lightbulb, Bell, Calendar } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login submitted");
    // Simular o "token" de login no navegador
    localStorage.setItem('redeescola_auth', 'true');
    // Simular login bem sucedido
    router.push('/');
  };

  const handleGoToRegister = () => {
    router.push('/cadastro');
  };

  const orbitIcons = [
    { radius: 60, duration: 20, delay: 0, component: () => <Book size={20} className="text-brand-purple" /> },
    { radius: 80, duration: 25, delay: 5, reverse: true, component: () => <GraduationCap size={24} className="text-brand-blue" /> },
    { radius: 110, duration: 30, delay: 10, component: () => <Users size={20} className="text-brand-purple" /> },
    { radius: 140, duration: 35, delay: 15, reverse: true, component: () => <Trophy size={26} className="text-brand-yellow" /> },
    { radius: 170, duration: 40, delay: 20, component: () => <Star size={20} className="text-brand-orange" /> },
    { radius: 200, duration: 45, delay: 25, reverse: true, component: () => <Lightbulb size={24} className="text-brand-purple" /> },
    { radius: 230, duration: 50, delay: 30, component: () => <Bell size={20} className="text-brand-blue" /> },
    { radius: 260, duration: 55, delay: 35, reverse: true, component: () => <Calendar size={20} className="text-white" /> },
  ];

  const loginFields = {
    header: "Bem-vindo de volta",
    subHeader: "Entre na sua conta para continuar sua jornada educacional.",
    fields: [
      {
        label: "Endereço de Email",
        id: "email",
        type: "email" as const,
        required: true,
        placeholder: "seu@email.com",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {}
      },
      {
        label: "Sua Senha",
        id: "password",
        type: "password" as const,
        required: true,
        placeholder: "••••••••",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {}
      }
    ],
    submitButton: "Entrar na Plataforma",
    textVariantButton: "Não tem uma conta? Crie uma agora",
  };

  return (
    <main className="relative flex h-screen w-full overflow-hidden bg-ui-wash">
      {/* Background Decorativo - Apenas desktop */}
      <div className="absolute inset-0 pointer-events-none opacity-20 hidden lg:block overflow-hidden">
        <Ripple />
      </div>

      {/* Lado Esquerdo - Visual (Apenas Desktop) */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center relative p-12 bg-white">
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
           <Ripple mainCircleSize={300} numCircles={8} />
        </div>
        
        <div className="relative z-10 w-full max-w-lg aspect-square">
          <TechOrbitDisplay 
            iconsArray={orbitIcons} 
            text="Rede Escola" 
          />
        </div>

        <div className="relative z-10 mt-12 text-center max-w-sm">
          <BoxReveal boxColor="#6835D6" duration={0.6}>
            <h3 className="text-2xl font-black text-text-primary mb-4 tracking-tight">Expandindo horizontes</h3>
          </BoxReveal>
          <BoxReveal boxColor="#00B2F7" duration={0.6} delay={0.2}>
            <p className="text-text-secondary font-medium">Conectando mentes curiosas, professores inspiradores e as melhores oportunidades educacionais em um só lugar.</p>
          </BoxReveal>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center bg-ui-wash px-6 md:px-12 relative z-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-12 flex justify-center">
            <div className="p-4 bg-brand-purple rounded-3xl shadow-float flex items-center justify-center text-white font-black text-2xl w-16 h-16">
              RE
            </div>
          </div>

          <AuthTabs 
            formFields={loginFields} 
            handleSubmit={handleSubmit} 
            goTo={handleGoToRegister} 
          />
        </div>
      </div>
    </main>
  );
}
