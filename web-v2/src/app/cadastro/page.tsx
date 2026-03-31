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

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Cadastro submetido");
    // Simular cadastro bem sucedido
    router.push('/');
  };

  const handleGoToLogin = () => {
    router.push('/login');
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

  const registerFields = {
    header: "Crie sua conta",
    subHeader: "Comece sua jornada de ensino e aprendizado conectando-se à melhor plataforma.",
    fields: [
      {
        label: "Seu Nome Completo",
        id: "name",
        type: "text" as const,
        required: true,
        placeholder: "Ex: Ana Beatriz",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {}
      },
      {
        label: "Endereço de Email",
        id: "email",
        type: "email" as const,
        required: true,
        placeholder: "seu@email.com",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {}
      },
      {
        label: "Crie uma Senha",
        id: "password",
        type: "password" as const,
        required: true,
        placeholder: "••••••••",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {}
      }
    ],
    submitButton: "Criar Conta Agora",
    textVariantButton: "Já tem uma conta? Fazer Login",
  };

  return (
    <main className="relative flex h-screen w-full overflow-hidden bg-ui-wash">
      {/* Background Decorativo - Apenas desktop */}
      <div className="absolute inset-0 pointer-events-none opacity-20 hidden lg:block overflow-hidden">
        <Ripple />
      </div>

      {/* Lado Esquerdo - Formulário */}
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center bg-ui-wash px-6 md:px-12 relative z-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-12 flex justify-center">
            <div className="p-4 bg-brand-purple rounded-3xl shadow-float flex items-center justify-center text-white font-black text-2xl w-16 h-16">
              RE
            </div>
          </div>

          <AuthTabs 
            formFields={registerFields} 
            handleSubmit={handleSubmit} 
            goTo={handleGoToLogin} 
          />
        </div>
      </div>

      {/* Lado Direito - Visual (Apenas Desktop) */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center relative p-12 bg-white rounded-l-[3rem] shadow-[-10px_0_30px_rgba(0,0,0,0.03)] border-l border-ui-divider/40">
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
           <Ripple mainCircleSize={300} numCircles={8} />
        </div>
        
        <div className="relative z-10 w-full max-w-lg aspect-square">
          <TechOrbitDisplay 
            iconsArray={orbitIcons} 
            text="Junte-se\na nós" 
          />
        </div>

        <div className="relative z-10 mt-12 text-center max-w-sm">
          <BoxReveal boxColor="#00B2F7" duration={0.6}>
            <h3 className="text-2xl font-black text-text-primary mb-4 tracking-tight">Crescimento coletivo</h3>
          </BoxReveal>
          <BoxReveal boxColor="#6835D6" duration={0.6} delay={0.2}>
            <p className="text-text-secondary font-medium">Faça parte do maior hub educacional do país. Descubra trilhas, compartilhe ideias e ganhe EduCoins participando!</p>
          </BoxReveal>
        </div>
      </div>
    </main>
  );
}
