'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthTabs, Ripple, TechOrbitDisplay, BoxReveal } from '@/components/auth/AuthComponents';
import { Book, GraduationCap, Users, Trophy, Star, Lightbulb, Bell, Calendar, Info } from 'lucide-react';
import { useAuth, UserRole, ROLE_HOME } from '@/lib/auth-context';
import { cn } from '@/lib/utils';

// ── MOCK EMAIL ROLE MAPPING ──────────────────────────────────
const MOCK_CREDENTIALS: Record<string, UserRole> = {
  'aluno@escola.com':     'aluno',
  'professor@escola.com': 'professor',
  'pai@escola.com':       'responsavel',
  'admin@escola.com':     'admin',
};

export default function LoginPage() {
  const router   = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Identificação por Email (Conforme solicitado pelo usuário)
    const detectedRole = MOCK_CREDENTIALS[email.toLowerCase().trim()];

    if (!detectedRole) {
      setError('E-mail não reconhecido. Use os e-mails de teste (aluno@escola.com, professor@escola.com, etc).');
      return;
    }

    login(detectedRole);
    router.push(ROLE_HOME[detectedRole]);
  };

  const orbitIcons = [
    { radius: 60,  duration: 20, delay: 0,  component: () => <Book size={20} className="text-brand-purple" /> },
    { radius: 80,  duration: 25, delay: 5,  reverse: true, component: () => <GraduationCap size={24} className="text-brand-blue" /> },
    { radius: 110, duration: 30, delay: 10, component: () => <Users size={20} className="text-brand-purple" /> },
    { radius: 140, duration: 35, delay: 15, reverse: true, component: () => <Trophy size={26} className="text-brand-yellow" /> },
    { radius: 170, duration: 40, delay: 20, component: () => <Star size={20} className="text-brand-orange" /> },
    { radius: 200, duration: 45, delay: 25, reverse: true, component: () => <Lightbulb size={24} className="text-brand-purple" /> },
    { radius: 230, duration: 50, delay: 30, component: () => <Bell size={20} className="text-brand-blue" /> },
    { radius: 260, duration: 55, delay: 35, reverse: true, component: () => <Calendar size={20} className="text-white" /> },
  ];

  const loginFields = {
    header: "Bem-vindo de volta",
    subHeader: "O sistema identificará seu perfil automaticamente pelo e-mail.",
    fields: [
      { 
        label: "Endereço de Email", 
        id: "email",    
        type: "email" as const, 
        required: true, 
        placeholder: "aluno@escola.com", 
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
          setError('');
        }
      },
      { 
        label: "Sua Senha",         
        id: "password", 
        type: "password" as const, 
        required: true, 
        placeholder: "••••••••",      
        onChange: () => {} 
      },
    ],
    submitButton: "Entrar na Plataforma",
    textVariantButton: "Não tem uma conta? Crie uma agora",
  };

  return (
    <main className="relative flex h-screen w-full overflow-hidden bg-ui-wash">
      <div className="absolute inset-0 pointer-events-none opacity-20 hidden lg:block overflow-hidden">
        <Ripple />
      </div>

      {/* Left - Visual */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center relative p-12 bg-white border-r border-ui-divider">
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <Ripple mainCircleSize={300} numCircles={8} />
        </div>
        <div className="relative z-10 w-full max-w-lg aspect-square">
          <TechOrbitDisplay iconsArray={orbitIcons} text="Rede Escola" />
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

      {/* Right - Form */}
      <div className="w-full lg:w-1/2 h-screen flex flex-col justify-center items-center bg-ui-wash px-6 md:px-12 relative z-10 overflow-y-auto scrollbar-hide py-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8 flex justify-center">
            <div className="p-4 bg-brand-purple rounded-3xl shadow-float flex items-center justify-center text-white font-black text-2xl w-16 h-16">RE</div>
          </div>

          <AuthTabs
            formFields={loginFields}
            handleSubmit={handleSubmit}
            goTo={() => router.push('/cadastro')}
          />

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl animate-in fade-in slide-in-from-top-2">
              <p className="text-xs text-red-600 font-bold leading-relaxed">{error}</p>
            </div>
          )}

          {/* Test Info */}
          <div className="mt-10 p-5 bg-ui-surface rounded-3xl border border-ui-divider/50 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="flex items-center gap-2 mb-3">
              <Info size={16} className="text-brand-purple" />
              <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Contas de Teste (Identificação Automática)</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { email: 'aluno@escola.com', label: 'Aluno' },
                { email: 'professor@escola.com', label: 'Professor' },
                { email: 'pai@escola.com', label: 'Responsável' },
                { email: 'admin@escola.com', label: 'Admin' },
              ].map(t => (
                <div key={t.email} className="bg-ui-wash p-2 rounded-xl border border-ui-divider/30">
                  <p className="text-[10px] font-black text-text-primary">{t.label}</p>
                  <p className="text-[9px] font-bold text-text-secondary truncate">{t.email}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
