'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Bell,
  FileText,
  Shield,
  Search,
  Plus,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronRight,
  UserCheck,
  AlertTriangle,
  Download,
  Filter,
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Share2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// ── TIPOS (Alinhados com o Sistema) ───────────────────────────
type UserRole = 'admin' | 'teacher' | 'student' | 'parent';
type UserStatus = 'active' | 'inactive' | 'pending';

interface SchoolUser {
  id: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  email: string;
  avatar: string;
  lastSeen: string;
  class?: string;
}

// ── MOCK DATA ──────────────────────────────────────────────────
const MOCK_USERS: SchoolUser[] = [
  { id: '1', name: 'Prof. Ana Clara', role: 'teacher', status: 'active', email: 'ana.clara@escola.com', avatar: 'https://i.pravatar.cc/150?img=47', lastSeen: 'agora', class: 'Ciências • 9º Ano' },
  { id: '2', name: 'Matheus Silva', role: 'student', status: 'active', email: 'mat.silva@aluno.com', avatar: 'https://i.pravatar.cc/150?img=12', lastSeen: '5min', class: '9º Ano A' },
  { id: '3', name: 'Carlos Responsável', role: 'parent', status: 'active', email: 'carlos.pai@gmail.com', avatar: 'https://i.pravatar.cc/150?img=33', lastSeen: '1h' },
  { id: '4', name: 'Diretora Lucia', role: 'admin', status: 'active', email: 'lucia@escola.com', avatar: 'https://i.pravatar.cc/150?img=49', lastSeen: 'agora' },
  { id: '5', name: 'Beatriz Santos', role: 'student', status: 'pending', email: 'bia.santos@aluno.com', avatar: 'https://i.pravatar.cc/150?img=45', lastSeen: 'nunca', class: '8º Ano B' },
];

// ── CONFIGURAÇÕES VISUAIS (DESIGN SYSTEM @assets) ──────────────
const ROLE_THEME = {
  admin:   { label: 'Admin',      className: 'bg-brand-purple/10 text-brand-purple border-brand-purple/20' },
  teacher: { label: 'Professor',  className: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20' },
  student: { label: 'Aluno',      className: 'bg-green-100 text-green-700 border-green-200' },
  parent:  { label: 'Responsável',className: 'bg-brand-orange/10 text-brand-orange border-brand-orange/20' },
};

const STATUS_THEME = {
  active:   { label: 'Ativo',    icon: CheckCircle2, color: 'text-green-500' },
  inactive: { label: 'Inativo',  icon: XCircle,      color: 'text-text-placeholder' },
  pending:  { label: 'Pendente', icon: Clock,        color: 'text-brand-orange' },
};

// ── COMPONENTES REUTILIZÁVEIS ──────────────────────────────────
function Badge({ role }: { role: UserRole }) {
  const theme = ROLE_THEME[role];
  return (
    <span className={cn('text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border', theme.className)}>
      {theme.label}
    </span>
  );
}

function MetricCard({ label, value, sub, colorClass, icon: Icon }: { label: string; value: string; sub: string; colorClass: string; icon: any }) {
  return (
    <div className="bg-ui-surface p-6 rounded-2xl shadow-card border border-ui-divider/50 hover:shadow-soft smooth transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={cn('p-3 rounded-xl bg-opacity-10', colorClass.replace('text-', 'bg-'))}>
          <Icon className={cn('size-6', colorClass)} />
        </div>
        <span className="text-[10px] font-bold text-text-placeholder uppercase tracking-wider">Métrica</span>
      </div>
      <h4 className="text-text-secondary text-sm font-bold truncate uppercase tracking-tight">{label}</h4>
      <div className={cn('text-3xl font-black tracking-tight my-1', colorClass)}>{value}</div>
      <p className="text-xs text-text-placeholder font-semibold">{sub}</p>
    </div>
  );
}

// ── PÁGINA PRINCIPAL ──────────────────────────────────────────
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'announcements' | 'audit'>('dashboard');
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-ui-wash text-text-primary selection:bg-brand-purple/20">
      {/* Header Admin (Clean & Rounded) */}
      <header className="sticky top-0 z-50 bg-ui-surface border-b border-ui-divider px-6 py-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-10 bg-brand-purple rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-float">
              RE
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight text-brand-purple leading-none">Rede Escola</h1>
              <p className="text-[11px] font-bold text-text-secondary uppercase tracking-widest mt-1">Admin Central</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Mock Admin Profile */}
          <div className="hidden sm:flex flex-col items-end">
            <span className="font-bold text-sm leading-none">Diretora Lucia</span>
            <span className="text-[10px] font-black text-brand-purple uppercase tracking-wider mt-1">Gestão Escolar</span>
          </div>
          <img src="https://i.pravatar.cc/150?img=49" alt="User" className="size-10 rounded-2xl border-2 border-ui-divider shadow-card" />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto flex gap-8 p-8">
        
        {/* Sub-menu Lateral (Estilo App) */}
        <nav className="w-64 flex flex-col gap-2 shrink-0 h-fit sticky top-28">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'users', label: 'Gestão de Usuários', icon: Users },
            { id: 'announcements', label: 'Comunicados', icon: Bell },
            { id: 'audit', label: 'Auditoria & Logs', icon: Shield },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                'flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-[15px] smooth-transition text-left group',
                activeTab === item.id 
                  ? 'bg-brand-purple text-white shadow-float' 
                  : 'text-text-secondary hover:bg-ui-surface hover:text-text-primary'
              )}
            >
              <item.icon size={22} className={cn('smooth-transition', activeTab === item.id ? 'scale-110' : 'group-hover:scale-110')} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Dynamic Section */}
        <main className="flex-1 min-w-0">
          
          {/* Dashboard View */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="mb-2">
                <h2 className="text-3xl font-black text-text-primary tracking-tight">Bem-vinda, Lucia 👋</h2>
                <p className="text-text-secondary font-semibold">Tudo sob controle hoje. Confira as métricas da escola.</p>
              </div>

              {/* Grid de Métricas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard icon={Users} label="Alunos Ativos" value="489" sub="Meta mensal: 500" colorClass="text-brand-purple" />
                <MetricCard icon={Filter} label="Engajamento" value="78%" sub="Posts / Professor" colorClass="text-brand-blue" />
                <MetricCard icon={ArrowUp} label="Interações" value="1.2k" sub="+12% que ontem" colorClass="text-green-500" />
                <MetricCard icon={Bell} label="Alertas" value="03" sub="Aguardando ação" colorClass="text-brand-orange" />
              </div>

              {/* Atividade & Feed Admin */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Atividade Recente */}
                <div className="lg:col-span-2 bg-ui-surface rounded-3xl shadow-card border border-ui-divider/50 p-8">
                  <h3 className="font-black text-lg text-text-primary mb-6 flex items-center gap-3">
                    <Clock className="text-brand-purple" size={20} />
                    Linha do Tempo Admin
                  </h3>
                  <div className="space-y-6">
                    {[
                      { type: 'post', user: 'Prof. Ana Clara', detail: 'Publicou Novo Conteúdo na Turma A', time: 'Há 5 min' },
                      { type: 'user', user: 'Matheus Silva', detail: 'Realizou login em novo dispositivo', time: 'Há 15 min' },
                      { type: 'alert', user: 'Sistema', detail: 'Alerta de Baixa Frequência: Beatriz Santos', time: 'Há 1h' },
                    ].map((log, i) => (
                      <div key={i} className="flex gap-4 items-start pb-6 border-b border-ui-divider last:border-0 last:pb-0">
                        <div className="size-10 rounded-2xl bg-ui-wash flex items-center justify-center shrink-0">
                          {log.type === 'post' ? '📝' : log.type === 'user' ? '👤' : '⚠️'}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-text-primary text-[15px]">{log.user}</p>
                          <p className="text-text-secondary text-sm font-medium">{log.detail}</p>
                        </div>
                        <span className="text-xs font-bold text-text-placeholder uppercase">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col gap-6">
                  <div className="bg-brand-purple rounded-3xl shadow-float p-6 text-white relative overflow-hidden group">
                    <Plus className="absolute -bottom-4 -right-4 size-24 opacity-20 rotate-12 group-hover:scale-110 smooth-transition" />
                    <h4 className="font-black text-xl mb-2">Ações Rápidas</h4>
                    <p className="text-sm font-semibold opacity-80 mb-6 leading-snug">Crie um comunicado importante para todos agora.</p>
                    <button className="w-full bg-white text-brand-purple font-black py-3 rounded-2xl shadow-card hover:scale-[1.02] smooth-transition">
                      Novo Comunicado
                    </button>
                  </div>
                  
                  <div className="bg-ui-surface rounded-3xl shadow-card border border-ui-divider/50 p-6">
                    <h4 className="font-black text-sm text-text-secondary uppercase tracking-widest mb-4">Meta do MVP</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span>Onboarding Escolar</span>
                          <span>85%</span>
                        </div>
                        <div className="h-2 bg-ui-wash rounded-full overflow-hidden">
                          <div className="h-full bg-brand-purple rounded-full" style={{ width: '85%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users View */}
          {activeTab === 'users' && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center bg-ui-surface p-6 rounded-3xl shadow-card border border-ui-divider/50">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-placeholder size-5" />
                  <input 
                    type="text" 
                    placeholder="Pesquisar por nome, RA ou e-mail..."
                    className="w-full bg-ui-wash border-none rounded-2xl py-3 pl-12 pr-4 text-text-primary placeholder-text-placeholder focus:ring-2 focus:ring-brand-purple/30 outline-none smooth-transition font-bold text-sm"
                  />
                </div>
                <div className="flex gap-3 ml-4">
                  <button className="bg-ui-wash text-text-primary px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-ui-divider smooth-transition">
                    <Download size={18} /> Exportar
                  </button>
                  <button className="bg-brand-purple text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-float hover:scale-[1.02] active:scale-95 smooth-transition">
                    <Plus size={18} /> Novo Usuário
                  </button>
                </div>
              </div>

              <div className="bg-ui-surface rounded-3xl shadow-card border border-ui-divider/50 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-ui-divider bg-ui-wash/50">
                      {['Usuário', 'Cargo', 'Status', 'Turma / Disciplina', 'Ações'].map((h) => (
                        <th key={h} className="px-6 py-4 text-[11px] font-black uppercase text-text-secondary tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ui-divider">
                    {MOCK_USERS.map((user) => (
                      <tr key={user.id} className="hover:bg-ui-wash/30 smooth-transition cursor-pointer group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <img src={user.avatar} className="size-10 rounded-2xl shadow-card border border-ui-divider" alt={user.name} />
                            <div>
                              <p className="font-bold text-[15px] text-text-primary leading-tight">{user.name}</p>
                              <p className="text-xs text-text-secondary font-medium tracking-tight truncate max-w-[150px]">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5"><Badge role={user.role} /></td>
                        <td className="px-6 py-5">
                          <div className={cn('flex items-center gap-1.5 text-xs font-bold capitalize', STATUS_THEME[user.status].color)}>
                            <div className={cn('size-2 rounded-full', STATUS_THEME[user.status].color.replace('text-', 'bg-'))} />
                            {user.status}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm font-bold text-text-secondary">{user.class || 'N/A'}</td>
                        <td className="px-6 py-5">
                          <button className="p-2 rounded-xl hover:bg-ui-wash text-text-placeholder hover:text-text-primary opacity-0 group-hover:opacity-100 smooth-transition">
                            <MoreHorizontal size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Announcements View (Placeholder luxuoso) */}
          {activeTab === 'announcements' && (
            <div className="bg-ui-surface rounded-[40px] shadow-card border border-ui-divider/50 p-12 text-center flex flex-col items-center animate-in zoom-in-95 duration-500">
               <div className="size-24 bg-brand-orange/10 rounded-3xl flex items-center justify-center mb-6">
                  <Bell className="text-brand-orange" size={48} strokeWidth={1.5} />
               </div>
               <h3 className="text-2xl font-black text-text-primary mb-2 tracking-tight">Comunicados Oficiais</h3>
               <p className="text-text-secondary max-w-sm mb-8 font-semibold">Crie avisos importantes que aparecem no topo do feed de todos os alunos e pais automaticamente.</p>
               <button className="bg-brand-orange text-white px-8 py-4 rounded-3xl font-black shadow-float hover:scale-105 active:scale-95 smooth-transition flex items-center gap-3">
                  <Plus /> Criar Novo Comunicado
               </button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
