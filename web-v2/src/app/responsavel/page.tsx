'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  Users,
  BarChart2,
  CalendarDays,
  FileText,
  MessageCircle,
  Bell,
  DoorOpen,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Package,
  Plus,
  Send,
  Thermometer,
  Calendar,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ── TYPES ────────────────────────────────────────────────────
type Tab = 'feed' | 'filho' | 'notas' | 'agenda' | 'secretaria' | 'catraca' | 'chat';

// ── MOCK DATA ────────────────────────────────────────────────
const PARENT = {
  name: 'Roberto Silva',
  avatar: 'https://i.pravatar.cc/150?u=roberto_pai',
};

const CHILDREN = [
  {
    id: 'c1',
    name: 'Matheus Silva',
    class: '9º Ano A',
    ra: '123456',
    avatar: 'https://i.pravatar.cc/150?u=matheus',
    attendance: 92,
    avgGrade: 7.9,
    absences: 3,
    engagement: 88,
    lastEntry: '07:14',
    lastExit: '12:48',
    enteredToday: true,
  },
  {
    id: 'c2',
    name: 'Isabela Silva',
    class: '6º Ano B',
    ra: '789012',
    avatar: 'https://i.pravatar.cc/150?u=isabela',
    attendance: 97,
    avgGrade: 9.1,
    absences: 1,
    engagement: 95,
    lastEntry: '07:08',
    lastExit: null,
    enteredToday: true,
  },
];

const FEED_POSTS = [
  {
    id: 'f1',
    author: 'Diretora Lucia',
    avatar: 'https://i.pravatar.cc/150?u=lucia',
    role: 'Direção',
    time: 'há 2h',
    urgent: true,
    content: '🚨 URGENTE: Saída antecipada hoje às 11h por reunião pedagógica. Por favor, organize a busca dos alunos.',
  },
  {
    id: 'f2',
    author: 'Prof. Ana Clara',
    avatar: 'https://i.pravatar.cc/150?u=ana',
    role: 'Ciências',
    time: 'há 5h',
    urgent: false,
    content: '📚 Turma 9º A tem prova de Ciências na sexta (04/04). Incentive a revisão do capítulo 7 em casa!',
  },
  {
    id: 'f3',
    author: 'Coordenação',
    avatar: 'https://i.pravatar.cc/150?u=coord',
    role: 'Escola',
    time: 'há 1d',
    urgent: false,
    content: '🎉 Semana Cultural acontece nos dias 14–18 de abril. Cada turma preparará uma apresentação. Mais detalhes em breve!',
  },
];

const GRADES_MATHEUS = [
  { subject: 'Ciências',   p1: 8.5, p2: 9.0, media: 8.8, ok: true  },
  { subject: 'Matemática', p1: 7.0, p2: 6.5, media: 6.8, ok: false },
  { subject: 'Português',  p1: 9.5, p2: 8.5, media: 9.0, ok: true  },
  { subject: 'História',   p1: 6.0, p2: 7.0, media: 6.5, ok: false },
];

const DOCUMENTS = [
  { id: 'd1', name: 'Declaração de Matrícula', status: 'pronto',      date: '28 Mar' },
  { id: 'd2', name: 'Histórico Escolar',        status: 'processando', date: '31 Mar' },
  { id: 'd3', name: 'Atestado de Frequência',   status: 'solicitado',  date: '01 Abr' },
];

const GATE_LOGS = [
  { child: 'Matheus',  action: 'entrada', time: '07:14', date: 'Hoje' },
  { child: 'Isabela',  action: 'entrada', time: '07:08', date: 'Hoje' },
  { child: 'Matheus',  action: 'saída',   time: '12:48', date: 'Ontem' },
  { child: 'Isabela',  action: 'saída',   time: '12:50', date: 'Ontem' },
  { child: 'Matheus',  action: 'entrada', time: '07:20', date: '31 Mar' },
];

const EVENTS = [
  { day: '04', month: 'Abr', title: 'Prova de Ciências — Matheus',   type: 'prova'   },
  { day: '07', month: 'Abr', title: 'Entrega de Trabalho — Isabela', type: 'tarefa'  },
  { day: '10', month: 'Abr', title: 'Excursão ao Planetário',        type: 'evento'  },
  { day: '15', month: 'Abr', title: 'Reunião de Pais e Mestres',     type: 'reuniao' },
];

// ── SCORE BAR ────────────────────────────────────────────────
function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs font-bold mb-1">
        <span className="text-text-secondary">{label}</span>
        <span className={color}>{value}%</span>
      </div>
      <div className="h-2 bg-ui-wash rounded-full overflow-hidden">
        <div className={cn('h-full rounded-full smooth', color.replace('text-', 'bg-'))} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

// ── STATUS BADGE ─────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    pronto:       { label: '✓ Pronto',       cls: 'bg-green-100 text-green-700' },
    processando:  { label: '⏳ Em Processo', cls: 'bg-brand-yellow/10 text-yellow-700' },
    solicitado:   { label: '📨 Solicitado',  cls: 'bg-brand-blue/10 text-brand-blue' },
  };
  const s = map[status] ?? { label: status, cls: 'bg-ui-wash text-text-secondary' };
  return <span className={cn('text-xs font-black px-3 py-1.5 rounded-full', s.cls)}>{s.label}</span>;
}

// ── MAIN PAGE ────────────────────────────────────────────────
export default function ResponsavelPage() {
  const [activeTab, setActiveTab] = useState<Tab>('feed');
  const [selectedChild, setSelectedChild] = useState(CHILDREN[0]);
  const [docType, setDocType] = useState('');
  const [chatMsg, setChatMsg] = useState('');

  const tabs = [
    { id: 'feed',       label: 'Comunicados', icon: Home },
    { id: 'filho',      label: 'Meu Filho',   icon: Users },
    { id: 'notas',      label: 'Notas',       icon: BarChart2 },
    { id: 'agenda',     label: 'Agenda',      icon: CalendarDays },
    { id: 'secretaria', label: 'Secretaria',  icon: FileText },
    { id: 'catraca',    label: 'Catraca',     icon: DoorOpen },
    { id: 'chat',       label: 'Chat',        icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-ui-wash">
      {/* ── HEADER ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-ui-surface border-b border-ui-divider shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 rounded-xl hover:bg-ui-wash smooth text-text-secondary hover:text-text-primary">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <div className="size-10 bg-brand-orange rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-float">RE</div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight text-brand-orange leading-none">Rede Escola</h1>
              <p className="text-[11px] font-bold text-text-secondary uppercase tracking-widest mt-1">Área do Responsável</p>
            </div>
          </div>
        </div>

        {/* Child Selector */}
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            {CHILDREN.map(child => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-2xl font-bold text-sm smooth',
                  selectedChild.id === child.id
                    ? 'bg-brand-orange text-white shadow-float'
                    : 'bg-ui-wash text-text-secondary hover:bg-ui-surface'
                )}
              >
                <img src={child.avatar} alt={child.name} className="size-6 rounded-lg" />
                <span className="hidden sm:block">{child.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
          <img src={PARENT.avatar} alt={PARENT.name} className="size-10 rounded-2xl border-2 border-ui-divider shadow-card" />
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex gap-8 p-8">

        {/* ── SIDEBAR NAV ──────────────────────────────────── */}
        <nav className="w-52 shrink-0 flex flex-col gap-1 sticky top-28 h-fit">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-[14px] smooth text-left group',
                activeTab === tab.id
                  ? 'bg-brand-orange text-white shadow-float'
                  : 'text-text-secondary hover:bg-ui-surface hover:text-text-primary'
              )}
            >
              <tab.icon size={19} className="group-hover:scale-110 smooth shrink-0" />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* ── MAIN CONTENT ─────────────────────────────────── */}
        <main className="flex-1 min-w-0">

          {/* ── FEED / COMUNICADOS ───────────────────────────── */}
          {activeTab === 'feed' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div>
                <h2 className="text-2xl font-black text-text-primary tracking-tight">Comunicados da Escola</h2>
                <p className="text-text-secondary font-semibold">Acompanhando: {selectedChild.name}</p>
              </div>

              {FEED_POSTS.map(post => (
                <div key={post.id} className={cn(
                  'bg-ui-surface rounded-3xl border shadow-card p-6 smooth',
                  post.urgent ? 'border-red-200 ring-1 ring-red-100' : 'border-ui-divider/50'
                )}>
                  <div className="flex items-start gap-4">
                    <img src={post.avatar} alt={post.author} className="size-11 rounded-2xl border border-ui-divider shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-black text-text-primary">{post.author}</span>
                        <span className="text-[10px] bg-brand-orange/10 text-brand-orange font-black px-2 py-0.5 rounded-full uppercase">{post.role}</span>
                        {post.urgent && (
                          <span className="text-[10px] bg-red-100 text-red-600 font-black px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                            <AlertTriangle size={10} /> Urgente
                          </span>
                        )}
                        <span className="text-xs text-text-secondary ml-auto">{post.time}</span>
                      </div>
                      <p className="text-text-primary text-[14px] leading-relaxed">{post.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── TERMÔMETRO DO FILHO ───────────────────────────── */}
          {activeTab === 'filho' && (
            <div className="animate-in fade-in duration-500 space-y-6">
              {/* Child Card */}
              <div className="bg-gradient-to-r from-brand-orange to-orange-500 rounded-3xl p-8 text-white shadow-float relative overflow-hidden">
                <div className="absolute -bottom-8 -right-8 size-40 bg-white/10 rounded-full" />
                <div className="flex items-center gap-5">
                  <img src={selectedChild.avatar} alt={selectedChild.name} className="size-20 rounded-2xl border-4 border-white/30 shadow-lg" />
                  <div>
                    <p className="text-white/70 font-bold text-sm">Acompanhando</p>
                    <h2 className="text-3xl font-black tracking-tight">{selectedChild.name}</h2>
                    <p className="text-white/70 font-semibold">{selectedChild.class} · RA {selectedChild.ra}</p>
                  </div>
                  <div className="ml-auto text-right hidden md:block">
                    <div className="flex items-center gap-2 justify-end">
                      <Thermometer size={20} className="text-white/80" />
                      <span className="font-black text-3xl">{selectedChild.engagement}%</span>
                    </div>
                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Engajamento</p>
                  </div>
                </div>
              </div>

              {/* Termômetro Metrics */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Frequência', value: `${selectedChild.attendance}%`, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle2 },
                  { label: 'Média Geral', value: `${selectedChild.avgGrade}`,    color: 'text-brand-blue', bg: 'bg-brand-blue/5', border: 'border-brand-blue/20', icon: BarChart2 },
                  { label: 'Faltas',      value: `${selectedChild.absences}`,    color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100', icon: AlertTriangle },
                ].map(stat => (
                  <div key={stat.label} className={cn('rounded-2xl border p-5', stat.bg, stat.border)}>
                    <stat.icon className={cn('mb-2', stat.color)} size={22} />
                    <div className={cn('text-3xl font-black', stat.color)}>{stat.value}</div>
                    <div className="text-xs font-bold text-text-secondary uppercase tracking-widest mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Score bars */}
              <div className="bg-ui-surface rounded-3xl border border-ui-divider/50 shadow-card p-6 space-y-5">
                <h3 className="font-black text-text-primary text-lg flex items-center gap-2">
                  <Thermometer size={18} className="text-brand-orange" /> Termômetro de Desempenho
                </h3>
                <ScoreBar label="Frequência" value={selectedChild.attendance} color="text-green-600" />
                <ScoreBar label="Engajamento" value={selectedChild.engagement} color="text-brand-blue" />
                <ScoreBar label="Desempenho Geral" value={Math.round(selectedChild.avgGrade * 10)} color="text-brand-purple" />
              </div>

              {/* Status do filho hoje */}
              <div className={cn(
                'rounded-3xl border p-6 flex items-center gap-4',
                selectedChild.enteredToday ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
              )}>
                {selectedChild.enteredToday
                  ? <CheckCircle2 className="text-green-600 shrink-0" size={36} />
                  : <AlertTriangle className="text-red-500 shrink-0" size={36} />
                }
                <div>
                  <p className={cn('font-black text-lg', selectedChild.enteredToday ? 'text-green-700' : 'text-red-600')}>
                    {selectedChild.enteredToday ? `${selectedChild.name.split(' ')[0]} está na escola hoje` : `${selectedChild.name.split(' ')[0]} não entrou hoje`}
                  </p>
                  {selectedChild.enteredToday && (
                    <p className="text-green-600 font-semibold text-sm">Entrada registrada às {selectedChild.lastEntry} · Catraca Principal</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── NOTAS ───────────────────────────────────────── */}
          {activeTab === 'notas' && (
            <div className="animate-in slide-in-from-right-4 duration-500 space-y-6">
              <div>
                <h2 className="text-2xl font-black text-text-primary tracking-tight">Notas de {selectedChild.name.split(' ')[0]}</h2>
                <p className="text-text-secondary font-semibold">{selectedChild.class} · Bimestre atual</p>
              </div>

              {/* Alerta atenção */}
              {GRADES_MATHEUS.some(g => !g.ok) && (
                <div className="bg-brand-orange/10 border border-brand-orange/30 rounded-2xl p-4 flex items-start gap-3">
                  <AlertTriangle className="text-brand-orange shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-black text-brand-orange">Atenção necessária</p>
                    <p className="text-sm text-text-secondary font-semibold">
                      {GRADES_MATHEUS.filter(g => !g.ok).map(g => g.subject).join(' e ')} estão abaixo da média. Considere solicitar reforço.
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-ui-surface rounded-3xl border border-ui-divider/50 shadow-card overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-ui-wash/50 border-b border-ui-divider">
                      {['Disciplina', 'P1', 'P2', 'Média', 'Status'].map(h => (
                        <th key={h} className="text-left px-6 py-4 text-[11px] font-black text-text-secondary uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ui-divider">
                    {GRADES_MATHEUS.map(g => (
                      <tr key={g.subject} className="hover:bg-ui-wash/30 smooth">
                        <td className="px-6 py-4 font-bold text-text-primary">{g.subject}</td>
                        <td className="px-6 py-4 font-bold text-text-secondary">{g.p1}</td>
                        <td className="px-6 py-4 font-bold text-text-secondary">{g.p2}</td>
                        <td className="px-6 py-4">
                          <span className={cn('font-black text-lg', g.media >= 7 ? 'text-green-600' : 'text-brand-orange')}>{g.media}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn('text-xs font-black px-3 py-1.5 rounded-full', g.ok ? 'bg-green-100 text-green-700' : 'bg-brand-orange/10 text-brand-orange')}>
                            {g.ok ? '✓ Ok' : '⚠ Em Risco'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── AGENDA ───────────────────────────────────────── */}
          {activeTab === 'agenda' && (
            <div className="animate-in fade-in duration-500 space-y-6">
              <div>
                <h2 className="text-2xl font-black text-text-primary tracking-tight">Agenda de {selectedChild.name.split(' ')[0]}</h2>
                <p className="text-text-secondary font-semibold">Próximos eventos e avaliações</p>
              </div>

              <div className="space-y-4">
                {EVENTS.map((ev, i) => {
                  const typeConfig: Record<string, string> = {
                    prova:   'bg-brand-orange/10 text-brand-orange',
                    tarefa:  'bg-brand-purple/10 text-brand-purple',
                    evento:  'bg-green-100 text-green-600',
                    reuniao: 'bg-brand-blue/10 text-brand-blue',
                  };
                  return (
                    <div key={i} className="bg-ui-surface p-6 rounded-3xl border border-ui-divider/50 shadow-card flex items-center gap-5 group hover:shadow-soft smooth">
                      <div className={cn('size-14 rounded-2xl flex flex-col items-center justify-center shrink-0 group-hover:scale-110 smooth', typeConfig[ev.type])}>
                        <span className="text-xl font-black leading-none">{ev.day}</span>
                        <span className="text-[10px] font-bold">{ev.month}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-black text-text-primary text-lg">{ev.title}</p>
                        <span className={cn('text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded mt-1 inline-block', typeConfig[ev.type])}>{ev.type}</span>
                      </div>
                      <ChevronRight size={18} className="text-text-placeholder" />
                    </div>
                  );
                })}
              </div>

              {/* Agendar Reunião */}
              <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-3xl p-6">
                <h3 className="font-black text-brand-orange mb-3 flex items-center gap-2">
                  <Calendar size={18} /> Agendar Reunião com Professor
                </h3>
                <p className="text-text-secondary text-sm font-semibold mb-4">Solicite uma conversa diretamente com o professor da disciplina desejada.</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <select className="bg-ui-surface border border-ui-divider rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-brand-orange/30 smooth">
                    <option>Ciências — Prof. Ana Clara</option>
                    <option>Matemática — Prof. Carlos</option>
                    <option>Português — Prof. Maria</option>
                  </select>
                  <input type="date" className="bg-ui-surface border border-ui-divider rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-brand-orange/30 smooth" />
                </div>
                <button className="w-full bg-brand-orange text-white py-4 rounded-2xl font-black shadow-float hover:scale-[1.02] active:scale-95 smooth">
                  Solicitar Reunião
                </button>
              </div>
            </div>
          )}

          {/* ── SECRETARIA DIGITAL ───────────────────────────── */}
          {activeTab === 'secretaria' && (
            <div className="animate-in fade-in duration-500 space-y-6">
              <div>
                <h2 className="text-2xl font-black text-text-primary tracking-tight">Secretaria Digital</h2>
                <p className="text-text-secondary font-semibold">Solicite documentos sem precisar ir à escola</p>
              </div>

              {/* Solicitação */}
              <div className="bg-ui-surface rounded-3xl border border-ui-divider/50 shadow-card p-6">
                <h3 className="font-black text-text-primary mb-4 flex items-center gap-2">
                  <Plus size={18} className="text-brand-orange" /> Nova Solicitação
                </h3>
                <div className="space-y-3">
                  <select
                    value={docType}
                    onChange={e => setDocType(e.target.value)}
                    className="w-full bg-ui-wash border-none rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-brand-orange/30 smooth"
                  >
                    <option value="">Selecione o Documento...</option>
                    <option>Declaração de Matrícula</option>
                    <option>Histórico Escolar</option>
                    <option>Atestado de Frequência</option>
                    <option>Boletim Escolar</option>
                    <option>Declaração para INSS</option>
                  </select>
                  <select className="w-full bg-ui-wash border-none rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-brand-orange/30 smooth">
                    {CHILDREN.map(c => <option key={c.id}>{c.name} — {c.class}</option>)}
                  </select>
                  <button
                    disabled={!docType}
                    className="w-full bg-brand-orange text-white py-4 rounded-2xl font-black shadow-float hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100 smooth"
                  >
                    Solicitar Documento
                  </button>
                </div>
              </div>

              {/* Pedidos em andamento */}
              <div className="bg-ui-surface rounded-3xl border border-ui-divider/50 shadow-card p-6">
                <h3 className="font-black text-text-primary mb-4 flex items-center gap-2">
                  <Package size={18} className="text-brand-orange" /> Meus Pedidos
                </h3>
                <div className="space-y-3">
                  {DOCUMENTS.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-4 bg-ui-wash rounded-2xl group hover:bg-ui-divider smooth">
                      <div className="flex items-center gap-3">
                        <FileText size={18} className="text-brand-orange shrink-0" />
                        <div>
                          <p className="font-bold text-text-primary text-sm">{doc.name}</p>
                          <p className="text-xs text-text-secondary">Solicitado em {doc.date}</p>
                        </div>
                      </div>
                      <StatusBadge status={doc.status} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── CATRACA ──────────────────────────────────────── */}
          {activeTab === 'catraca' && (
            <div className="animate-in fade-in duration-500 space-y-6">
              <div>
                <h2 className="text-2xl font-black text-text-primary tracking-tight">Controle de Entrada · Catraca</h2>
                <p className="text-text-secondary font-semibold">Movimentação em tempo real dos seus filhos</p>
              </div>

              {/* Status hoje */}
              {CHILDREN.map(child => (
                <div key={child.id} className={cn(
                  'rounded-3xl border p-6 flex items-center gap-5 shadow-card',
                  child.enteredToday ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-100'
                )}>
                  <img src={child.avatar} alt={child.name} className="size-14 rounded-2xl border-2 border-white shadow-card" />
                  <div className="flex-1">
                    <p className="font-black text-text-primary text-lg">{child.name}</p>
                    <p className="text-text-secondary font-semibold text-sm">{child.class}</p>
                    {child.enteredToday ? (
                      <p className="text-green-600 font-bold text-sm mt-1">✓ Entrada às {child.lastEntry} hoje</p>
                    ) : (
                      <p className="text-red-500 font-bold text-sm mt-1">⚠ Não entrou hoje</p>
                    )}
                  </div>
                  <div className={cn('size-4 rounded-full', child.enteredToday ? 'bg-green-500 animate-pulse' : 'bg-gray-300')} />
                </div>
              ))}

              {/* Log */}
              <div className="bg-ui-surface rounded-3xl border border-ui-divider/50 shadow-card overflow-hidden">
                <div className="p-5 border-b border-ui-divider bg-ui-wash/50">
                  <h3 className="font-black text-text-primary">Histórico de Movimentação</h3>
                </div>
                <div className="divide-y divide-ui-divider">
                  {GATE_LOGS.map((log, i) => (
                    <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-ui-wash/30 smooth">
                      <div className={cn('size-8 rounded-xl flex items-center justify-center shrink-0', log.action === 'entrada' ? 'bg-green-100' : 'bg-brand-orange/10')}>
                        <DoorOpen size={16} className={log.action === 'entrada' ? 'text-green-600' : 'text-brand-orange'} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-text-primary text-sm">{log.child}</p>
                        <p className="text-xs text-text-secondary capitalize font-medium">{log.action} às {log.time}</p>
                      </div>
                      <span className="text-xs font-bold text-text-secondary">{log.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── CHAT COM PROFESSOR ───────────────────────────── */}
          {activeTab === 'chat' && (
            <div className="animate-in fade-in duration-500 space-y-6">
              <div>
                <h2 className="text-2xl font-black text-text-primary tracking-tight">Mensagens</h2>
                <p className="text-text-secondary font-semibold">Chat auditado · Apenas professores e coordenação</p>
              </div>

              {/* Teacher list */}
              <div className="bg-ui-surface rounded-3xl border border-ui-divider/50 shadow-card divide-y divide-ui-divider overflow-hidden">
                {[
                  { name: 'Prof. Ana Clara',  subject: 'Ciências',   avatar: 'https://i.pravatar.cc/150?u=ana',         unread: 2, last: 'A prova será na sexta...' },
                  { name: 'Prof. Carlos',     subject: 'Matemática', avatar: 'https://i.pravatar.cc/150?u=carlos_mat', unread: 0, last: 'Ok! Obrigado pela resposta.' },
                  { name: 'Coordenação',      subject: 'Escola',     avatar: 'https://i.pravatar.cc/150?u=coord',       unread: 1, last: 'Reunião confirmada para...' },
                ].map((contact, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 hover:bg-ui-wash/30 smooth cursor-pointer group">
                    <div className="relative shrink-0">
                      <img src={contact.avatar} alt={contact.name} className="size-12 rounded-2xl border border-ui-divider" />
                      {contact.unread > 0 && (
                        <span className="absolute -top-1 -right-1 size-5 bg-brand-orange text-white text-xs font-black rounded-full flex items-center justify-center">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-black text-text-primary">{contact.name}</p>
                        <span className="text-[10px] bg-brand-orange/10 text-brand-orange font-black px-2 py-0.5 rounded-full uppercase">{contact.subject}</span>
                      </div>
                      <p className="text-xs text-text-secondary font-medium truncate mt-0.5">{contact.last}</p>
                    </div>
                    <ChevronRight size={18} className="text-text-placeholder" />
                  </div>
                ))}
              </div>

              {/* Input de mensagem rápida */}
              <div className="bg-ui-surface rounded-3xl border border-ui-divider/50 shadow-card p-5">
                <p className="text-xs font-black text-text-secondary uppercase tracking-widest mb-3">Mensagem Rápida — Prof. Ana Clara</p>
                <div className="flex gap-3">
                  <input
                    value={chatMsg}
                    onChange={e => setChatMsg(e.target.value)}
                    placeholder="Escreva sua mensagem..."
                    className="flex-1 bg-ui-wash rounded-2xl px-4 py-3 text-sm font-medium text-text-primary placeholder-text-placeholder outline-none focus:ring-2 focus:ring-brand-orange/30 smooth border-none"
                  />
                  <button
                    disabled={!chatMsg.trim()}
                    className="bg-brand-orange text-white px-5 rounded-2xl font-black shadow-float hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 smooth"
                  >
                    <Send size={18} />
                  </button>
                </div>
                <p className="text-[11px] text-text-placeholder font-semibold mt-2 text-center">
                  🛡️ Todas as mensagens são auditadas pela escola por segurança
                </p>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
