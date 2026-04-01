'use client';

import { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  GraduationCap, 
  UserCircle2, 
  Users, 
  ShieldCheck,
  CreditCard,
  UserPlus,
  ArrowRight,
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// ── CONFIGURAÇÕES VISUAIS (DESIGN SYSTEM OFICIAL) ─────────────
const COLORS = {
  purple: '#6835D6',
  blue: '#00B2F7',
  yellow: '#FFCA28',
  orange: '#FF4500',
};

// ── ETAPAS DO CADASTRO ────────────────────────────────────────
type Step = 'role' | 'validate' | 'profile' | 'success';
type Role = 'student' | 'teacher' | 'parent' | 'admin';

export default function RegisterPage() {
  const [step, setStep] = useState<Step>('role');
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    registration: '', // RA ou RP
    birthDate: '',
    username: '',
    password: '',
    fullName: ''
  });

  // ── LÓGICA DE VALIDAÇÃO (SIMULADA PARA O FRONT-END) ──────────
  const handleValidate = () => {
    setLoading(true);
    setError(null);

    // Simulação de delay de rede
    setTimeout(() => {
      setLoading(false);
      
      // Lógica de "Match" mockada para o usuário testar:
      // Se RA for "123456", simula um aluno encontrado.
      // Se RP for "987654", simula um professor encontrado.
      const isStudentMatch = role === 'student' && formData.registration === '123456';
      const isTeacherMatch = role === 'teacher' && formData.registration === '987654';

      if (isStudentMatch || isTeacherMatch || role === 'parent' || role === 'admin') {
         // Mock de dados encontrados no banco da escola
         setFormData(prev => ({ 
           ...prev, 
           fullName: isStudentMatch ? 'Matheus Silva' : isTeacherMatch ? 'Prof. Ana Clara' : 'Cadastro Manual'
         }));
         setStep('profile');
      } else {
        setError('Matrícula não encontrada. Verifique o número ou fale com a secretaria.');
      }
    }, 1500);
  };

  const handleFinish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-ui-wash flex items-center justify-center p-6 selection:bg-brand-purple/20">
      
      {/* Container Principal (Clean & Rounded) */}
      <div className="w-full max-w-xl bg-ui-surface rounded-[40px] shadow-soft border border-ui-divider/50 overflow-hidden relative">
        
        {/* Progress Bar (Sutil) */}
        <div className="absolute top-0 left-0 w-full h-1.5 flex gap-1 px-1 mt-1">
          {(['role', 'validate', 'profile', 'success'] as Step[]).map((s, i) => (
            <div key={s} className={cn(
              'h-full flex-1 rounded-full smooth-transition',
              (['role', 'validate', 'profile', 'success'].indexOf(step) >= i) ? 'bg-brand-purple' : 'bg-ui-divider'
            )} />
          ))}
        </div>

        {/* ── ETAPA 1: ESCOLHA DE CARGO (ROLE) ──────────────────── */}
        {step === 'role' && (
          <div className="p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="text-center mb-10">
              <div className="size-16 bg-brand-purple rounded-3xl mx-auto flex items-center justify-center text-white font-black text-2xl shadow-float mb-4">RE</div>
              <h1 className="text-3xl font-black text-text-primary tracking-tight">Crie sua conta</h1>
              <p className="text-text-secondary font-bold mt-1 leading-snug">Selecione quem você é na escola para começar.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'student', label: 'Sou Aluno', icon: GraduationCap, color: 'text-brand-purple', bg: 'bg-brand-purple/5' },
                { id: 'teacher', label: 'Sou Professor', icon: UserCircle2, color: 'text-brand-blue', bg: 'bg-brand-blue/5' },
                { id: 'parent', label: 'Sou Responsável', icon: Users, color: 'text-brand-orange', bg: 'bg-brand-orange/5' },
                { id: 'admin', label: 'Diretoria', icon: ShieldCheck, color: 'text-brand-purple', bg: 'bg-brand-purple/5' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setRole(item.id as Role); setStep('validate'); }}
                  className="p-6 rounded-3xl border-2 border-ui-divider hover:border-brand-purple hover:bg-ui-wash group smooth-transition text-left flex flex-col items-start gap-4 active:scale-95"
                >
                  <div className={cn('size-12 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 smooth-transition', item.bg)}>
                    <item.icon className={item.color} size={28} />
                  </div>
                  <span className="font-black text-lg text-text-primary">{item.label}</span>
                </button>
              ))}
            </div>
            
            <p className="text-center mt-8 text-sm font-bold text-text-secondary">
              Já tem uma conta? <Link href="/login" className="text-brand-purple hover:underline">Entre aqui</Link>
            </p>
          </div>
        )}

        {/* ── ETAPA 2: VALIDAÇÃO DE MATRÍCULA (A CHAVE) ────────── */}
        {step === 'validate' && (
          <div className="p-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <button onClick={() => setStep('role')} className="text-text-secondary hover:text-brand-purple flex items-center gap-2 font-bold mb-8 smooth-transition">
              <ArrowLeft size={18} /> Voltar
            </button>

            <header className="mb-8">
              <h2 className="text-2xl font-black text-text-primary tracking-tight">
                {role === 'student' ? 'Valide seu RA' : role === 'teacher' ? 'Valide seu RP' : 'Identificação'}
              </h2>
              <p className="text-text-secondary font-bold mt-1">Insira seu número de registro oficial fornecido pela escola.</p>
            </header>

            <div className="space-y-6">
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-text-placeholder size-5" />
                <input 
                  type="text" 
                  placeholder={role === 'student' ? 'Número do RA (Ex: 123456)' : 'Número de Matrícula / RP (Ex: 987654)'}
                  value={formData.registration}
                  onChange={(e) => setFormData({...formData, registration: e.target.value})}
                  className="w-full bg-ui-wash border-none rounded-2xl py-4 pl-12 pr-4 text-text-primary placeholder-text-placeholder focus:ring-2 focus:ring-brand-purple/30 outline-none smooth-transition font-bold tracking-widest text-lg"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-200 animate-in shake-200">
                  <ShieldAlert size={18} /> {error}
                </div>
              )}

              <div className="bg-ui-wash/50 p-4 rounded-2xl border border-ui-divider/50 mb-6">
                <p className="text-xs text-text-secondary font-semibold leading-relaxed">
                  🛡️ <strong className="text-text-primary">Dica de Segurança:</strong> Se você não tem seu número de registro, procure a diretoria da escola. Somente usuários autorizados podem se cadastrar.
                </p>
              </div>

              <button 
                onClick={handleValidate}
                disabled={!formData.registration || loading}
                className="w-full bg-brand-purple text-white py-4 rounded-2xl font-black shadow-float hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100 smooth-transition flex items-center justify-center gap-3"
              >
                {loading ? <Loader2 className="animate-spin" /> : <>Validar Matrícula <ArrowRight size={20} /></>}
              </button>
            </div>
          </div>
        )}

        {/* ── ETAPA 3: CRIAÇÃO DE PERFIL (@USERNAME) ───────────── */}
        {step === 'profile' && (
          <div className="p-10 animate-in fade-in zoom-in-95 duration-500">
            <header className="mb-10 text-center">
              <div className="size-20 bg-green-100 border-4 border-white rounded-full mx-auto flex items-center justify-center shadow-soft mb-4">
                 <CheckCircle2 className="text-green-600" size={40} />
              </div>
              <h2 className="text-2xl font-black text-text-primary tracking-tight">Matrícula Validada! 🎉</h2>
              <p className="text-text-secondary font-bold mt-1">Olá, <span className="text-brand-purple">{formData.fullName}</span>. Agora defina como você aparecerá na Rede Escola.</p>
            </header>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-text-secondary uppercase tracking-widest px-1">Seu @nickname único</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-brand-purple text-lg">@</span>
                  <input 
                    type="text" 
                    placeholder="escolhaum-nome"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="w-full bg-ui-wash border-none rounded-2xl py-4 pl-10 pr-4 text-text-primary placeholder-text-placeholder focus:ring-2 focus:ring-brand-purple/30 outline-none smooth-transition font-bold text-lg"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-text-secondary uppercase tracking-widest px-1">Criar Senha</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-ui-wash border-none rounded-2xl py-4 px-4 text-text-primary placeholder-text-placeholder focus:ring-2 focus:ring-brand-purple/30 outline-none smooth-transition font-bold text-lg tracking-[0.2em]"
                />
              </div>

              <button 
                onClick={handleFinish}
                disabled={!formData.username || !formData.password || loading}
                className="w-full bg-brand-purple text-white py-4 rounded-2xl font-black shadow-float hover:scale-[1.02] active:scale-95 disabled:opacity-50 smooth-transition flex items-center justify-center mt-6"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Finalizar Cadastro'}
              </button>
            </div>
          </div>
        )}

        {/* ── ETAPA 4: SUCESSO FINAL ─────────────────────────── */}
        {step === 'success' && (
          <div className="p-12 text-center animate-in zoom-in-95 duration-700">
             <div className="size-32 bg-brand-purple rounded-[40px] mx-auto flex items-center justify-center text-white shadow-float mb-8 animate-bounce">
                <CheckCircle2 size={64} />
             </div>
             <h2 className="text-3xl font-black text-text-primary tracking-tight mb-3">Bem-vindo(a) à Rede!</h2>
             <p className="text-text-secondary font-bold text-lg mb-10 leading-relaxed">
               Parabéns, seu perfil <span className="text-brand-purple">@{formData.username}</span> foi criado com sucesso. A escola te espera!
             </p>
             <Link 
              href="/" 
              className="w-full bg-ui-wash text-text-primary py-5 rounded-3xl font-black hover:bg-ui-divider smooth-transition flex items-center justify-center gap-3 active:scale-95"
             >
                Entrar no Feed Social <ArrowRight size={22} />
             </Link>
          </div>
        )}

      </div>
    </div>
  );
}
