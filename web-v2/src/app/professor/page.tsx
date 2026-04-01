'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  PenSquare,
  CalendarDays,
  Users,
  MessageCircle,
  BookOpen,
  CheckSquare,
  ClipboardList,
  Star,
  ArrowLeft,
  Plus,
  Search,
  Image as ImageIcon,
  Video,
  FileText,
  MoreHorizontal,
  Send,
  CheckCircle2,
  XCircle,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ── TYPES ────────────────────────────────────────────────────
type Tab = 'dashboard' | 'posts' | 'chamada' | 'notas' | 'turmas' | 'agenda' | 'chat';

// ── MOCK DATA ────────────────────────────────────────────────
const TEACHER = {
  name: 'Prof. Ana Clara',
  subject: 'Ciências',
  avatar: 'https://i.pravatar.cc/150?u=ana',
  classes: ['9º Ano A', '9º Ano B', '8º Ano C'],
};

const STUDENTS = [
  { id: 's1', name: 'Matheus Silva',    avatar: 'https://i.pravatar.cc/150?u=mat',   present: true,  grade: 8.5 },
  { id: 's2', name: 'Beatriz Santos',   avatar: 'https://i.pravatar.cc/150?u=bia',   present: false, grade: 7.0 },
  { id: 's3', name: 'Carlos Mendes',    avatar: 'https://i.pravatar.cc/150?u=carl',  present: true,  grade: 9.5 },
  { id: 's4', name: 'Larissa Ferreira', avatar: 'https://i.pravatar.cc/150?u=lari',  present: true,  grade: 6.0 },
  { id: 's5', name: 'Rafael Costa',     avatar: 'https://i.pravatar.cc/150?u=rafa',  present: true,  grade: 8.0 },
  { id: 's6', name: 'Sofia Almeida',    avatar: 'https://i.pravatar.cc/150?u=sofia', present: false, grade: 9.0 },
];

const EVENTS = [
  { id: 'e1', day: '04', month: 'Abr', title: 'Prova de Ciências — 9º A', type: 'prova' },
  { id: 'e2', day: '07', month: 'Abr', title: 'Entrega Trabalho Sistema Solar', type: 'tarefa' },
  { id: 'e3', day: '09', month: 'Abr', title: 'Reunião Pedagógica', type: 'evento' },
];

// ── METRIC CARD ──────────────────────────────────────────────
function MetricCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <div className="bg-ui-surface rounded-2xl border border-ui-divider/50 p-5 shadow-card group hover:shadow-soft smooth">
      <div className={cn('size-10 rounded-xl flex items-center justify-center mb-3', color.replace('text-', 'bg-') + '/10')}>
        <Icon className={cn('size-5', color)} />
      </div>
      <div className={cn('text-2xl font-black tracking-tight', color)}>{value}</div>
      <div className="text-xs font-bold text-text-secondary uppercase tracking-widest mt-1">{label}</div>
    </div>
  );
}

// ── MAIN PAGE ────────────────────────────────────────────────
export default function ProfessorPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [selectedClass, setSelectedClass] = useState('9º Ano A');
  const [attendance, setAttendance] = useState<Record<string, boolean>>(
    Object.fromEntries(STUDENTS.map(s => [s.id, s.present]))
  );
  const [postContent, setPostContent] = useState('');

  const presentCount = Object.values(attendance).filter(Boolean).length;
  const absentCount = STUDENTS.length - presentCount;

  const tabs = [
    { id: 'dashboard', label: 'Visão Geral',  icon: LayoutDashboard },
    { id: 'posts',     label: 'Nova Postagem', icon: PenSquare },
    { id: 'chamada',   label: 'Chamada',       icon: CheckSquare },
    { id: 'notas',     label: 'Notas',         icon: ClipboardList },
    { id: 'turmas',    label: 'Turmas',        icon: Users },
    { id: 'agenda',    label: 'Agenda',        icon: CalendarDays },
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
            <div className="size-10 bg-brand-blue rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-float">RE</div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight text-brand-blue leading-none">Rede Escola</h1>
              <p className="text-[11px] font-bold text-text-secondary uppercase tracking-widest mt-1">Área do Professor</p>
            </div>
          </div>
        </div>

        {/* Class Selector */}
        <div className="flex items-center gap-3">
          <select
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
            className="bg-ui-wash border-none rounded-2xl px-4 py-2 font-bold text-sm text-text-primary focus:ring-2 focus:ring-brand-blue/30 outline-none smooth cursor-pointer"
          >
            {TEACHER.classes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <div className="hidden sm:flex flex-col items-end">
            <span className="font-bold text-sm leading-none">{TEACHER.name}</span>
            <span className="text-[10px] font-black text-brand-blue uppercase tracking-wider mt-1">{TEACHER.subject}</span>
          </div>
          <img src={TEACHER.avatar} alt={TEACHER.name} className="size-10 rounded-2xl border-2 border-ui-divider shadow-card" />
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex gap-8 p-8">

        {/* ── SIDEBAR NAV ────────────────────────────────────── */}
        <nav className="w-56 shrink-0 flex flex-col gap-1.5 sticky top-28 h-fit">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-[14px] smooth text-left group',
                activeTab === tab.id
                  ? 'bg-brand-blue text-white shadow-float'
                  : 'text-text-secondary hover:bg-ui-surface hover:text-text-primary'
              )}
            >
              <tab.icon size={20} className="group-hover:scale-110 smooth shrink-0" />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* ── MAIN CONTENT ───────────────────────────────────── */}
        <main className="flex-1 min-w-0">

          {/* ── DASHBOARD ────────────────────────────────────── */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div>
                <h2 className="text-2xl font-black text-text-primary tracking-tight">Bom dia, Ana Clara! 👋</h2>
                <p className="text-text-secondary font-semibold">Turma {selectedClass} · {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard icon={Users}         label="Alunos"      value={`${STUDENTS.length}`}        color="text-brand-blue" />
                <MetricCard icon={CheckCircle2}  label="Presentes"   value={`${presentCount}`}           color="text-green-500" />
                <MetricCard icon={XCircle}       label="Ausentes"    value={`${absentCount}`}            color="text-brand-orange" />
                <MetricCard icon={Star}          label="Média Turma" value="8.2"                         color="text-brand-purple" />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-ui-surface rounded-3xl border border-ui-divider/50 shadow-card p-6">
                  <h3 className="font-black text-text-primary mb-5 flex items-center gap-2">
                    <CalendarDays size={18} className="text-brand-blue" /> Próximos Eventos
                  </h3>
                  <div className="space-y-3">
                    {EVENTS.map(event => (
                      <div key={event.id} className="flex items-center gap-4 p-3 rounded-xl bg-ui-wash hover:bg-ui-divider smooth cursor-pointer">
                        <div className="text-center bg-brand-blue/10 rounded-xl px-3 py-2 shrink-0">
                          <div className="text-lg font-black text-brand-blue leading-none">{event.day}</div>
                          <div className="text-[10px] font-bold text-brand-blue uppercase">{event.month}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-text-primary truncate">{event.title}</p>
                          <span className={cn(
                            'text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded',
                            event.type === 'prova'  && 'bg-brand-orange/10 text-brand-orange',
                            event.type === 'tarefa' && 'bg-brand-purple/10 text-brand-purple',
                            event.type === 'evento' && 'bg-brand-blue/10 text-brand-blue',
                          )}>{event.type}</span>
                        </div>
                        <ChevronRight size={16} className="text-text-placeholder" />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTab('agenda')}
                    className="w-full mt-4 text-sm font-bold text-brand-blue hover:underline text-center"
                  >
                    Ver agenda completa →
                  </button>
                </div>

                {/* Recent Students */}
                <div className="bg-ui-surface rounded-3xl border border-ui-divider/50 shadow-card p-6">
                  <h3 className="font-black text-text-primary mb-5 flex items-center gap-2">
                    <Users size={18} className="text-brand-blue" /> Alunos — {selectedClass}
                  </h3>
                  <div className="space-y-3">
                    {STUDENTS.slice(0, 4).map(s => (
                      <div key={s.id} className="flex items-center gap-3 group">
                        <img src={s.avatar} alt={s.name} className="size-9 rounded-xl border border-ui-divider group-hover:scale-105 smooth" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-text-primary truncate">{s.name}</p>
                          <p className="text-xs text-text-secondary">Nota: <span className={cn('font-black', s.grade >= 7 ? 'text-green-600' : 'text-brand-orange')}>{s.grade}</span></p>
                        </div>
                        <div className={cn('size-2.5 rounded-full', s.present ? 'bg-green-500' : 'bg-gray-300')} title={s.present ? 'Presente' : 'Ausente'} />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTab('chamada')}
                    className="w-full mt-4 text-sm font-bold text-brand-blue hover:underline text-center"
                  >
                    Fazer chamada agora →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── NOVA POSTAGEM ─────────────────────────────────── */}
          {activeTab === 'posts' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black text-text-primary mb-6 tracking-tight">Nova Publicação</h2>
              <div className="bg-ui-surface rounded-3xl border border-ui-divider/50 shadow-card p-8">
                {/* Author */}
                <div className="flex items-center gap-3 mb-6">
                  <img src={TEACHER.avatar} className="size-12 rounded-2xl border-2 border-brand-blue/30" alt={TEACHER.name} />
                  <div>
                    <p className="font-black text-text-primary">{TEACHER.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-brand-blue/10 text-brand-blue font-bold px-2 py-0.5 rounded">Prof</span>
                      <span className="text-xs text-text-secondary font-semibold">Publicando em <strong>{selectedClass}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Text Area */}
                <textarea
                  value={postContent}
                  onChange={e => setPostContent(e.target.value)}
                  placeholder={`O que você quer compartilhar com a turma ${selectedClass}?`}
                  rows={5}
                  className="w-full bg-ui-wash rounded-2xl px-5 py-4 text-text-primary placeholder-text-placeholder font-medium text-sm outline-none focus:ring-2 focus:ring-brand-blue/30 smooth resize-none border-none leading-relaxed"
                />

                {/* Media Buttons */}
                <div className="flex items-center gap-3 mt-4 pb-4 border-b border-ui-divider">
                  {[
                    { icon: ImageIcon, label: 'Foto',   color: 'text-green-600 hover:bg-green-50' },
                    { icon: Video,     label: 'Vídeo',  color: 'text-brand-blue hover:bg-brand-blue/5' },
                    { icon: FileText,  label: 'Arquivo', color: 'text-brand-orange hover:bg-brand-orange/5' },
                  ].map(({ icon: Icon, label, color }) => (
                    <button key={label} className={cn('flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm smooth', color)}>
                      <Icon size={18} /> {label}
                    </button>
                  ))}
                </div>

                {/* Flair Selector */}
                <div className="mt-4 mb-6">
                  <p className="text-xs font-black text-text-secondary uppercase tracking-widest mb-3">Categoria do Post</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: 'Atividade',   color: 'bg-brand-purple/10 text-brand-purple border-brand-purple/20' },
                      { label: 'Aviso',       color: 'bg-brand-orange/10 text-brand-orange border-brand-orange/20' },
                      { label: 'Tarefa',      color: 'bg-brand-blue/10   text-brand-blue   border-brand-blue/20'   },
                      { label: 'Celebração',  color: 'bg-yellow-100      text-yellow-700   border-yellow-200'       },
                    ].map(({ label, color }) => (
                      <button key={label} className={cn('px-3 py-1.5 rounded text-xs font-black uppercase tracking-wider border smooth hover:scale-105 active:scale-95', color)}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button
                  disabled={!postContent.trim()}
                  className="w-full bg-brand-blue text-white py-4 rounded-2xl font-black shadow-float hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100 smooth flex items-center justify-center gap-3"
                >
                  <Send size={18} /> Publicar para {selectedClass}
                </button>
              </div>
            </div>
          )}

          {/* ── CHAMADA ──────────────────────────────────────── */}
          {activeTab === 'chamada' && (
            <div className="animate-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-text-primary tracking-tight">Chamada — {selectedClass}</h2>
                  <p className="text-text-secondary font-semibold">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                </div>
                <div className="flex gap-3 text-sm font-bold">
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-2xl">✓ {presentCount} presentes</span>
                  <span className="px-4 py-2 bg-red-50 text-red-600 rounded-2xl">✗ {absentCount} ausentes</span>
                </div>
              </div>

              <div className="bg-ui-surface rounded-3xl border border-ui-divider/50 shadow-card overflow-hidden">
                <div className="p-4 bg-ui-wash/50 border-b border-ui-divider flex items-center gap-3">
                  <Search size={18} className="text-text-placeholder" />
                  <input type="text" placeholder="Buscar aluno..." className="bg-transparent outline-none font-bold text-sm text-text-primary placeholder-text-placeholder flex-1" />
                </div>
                <div className="divide-y divide-ui-divider">
                  {STUDENTS.map(student => (
                    <div key={student.id} className="flex items-center gap-4 px-6 py-4 hover:bg-ui-wash/30 smooth">
                      <img src={student.avatar} alt={student.name} className="size-10 rounded-xl border border-ui-divider shrink-0" />
                      <div className="flex-1">
                        <p className="font-bold text-text-primary">{student.name}</p>
                        <p className="text-xs text-text-secondary font-medium">{selectedClass}</p>
                      </div>

                      {/* Toggle Present/Absent */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setAttendance(prev => ({ ...prev, [student.id]: true }))}
                          className={cn(
                            'px-4 py-2 rounded-xl text-sm font-black smooth',
                            attendance[student.id] === true
                              ? 'bg-green-500 text-white shadow-sm'
                              : 'bg-ui-wash text-text-secondary hover:bg-green-50 hover:text-green-600'
                          )}
                        >
                          ✓ Presente
                        </button>
                        <button
                          onClick={() => setAttendance(prev => ({ ...prev, [student.id]: false }))}
                          className={cn(
                            'px-4 py-2 rounded-xl text-sm font-black smooth',
                            attendance[student.id] === false
                              ? 'bg-red-500 text-white shadow-sm'
                              : 'bg-ui-wash text-text-secondary hover:bg-red-50 hover:text-red-600'
                          )}
                        >
                          ✗ Ausente
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-ui-wash/50 border-t border-ui-divider">
                  <button className="w-full bg-brand-blue text-white py-4 rounded-2xl font-black shadow-float hover:scale-[1.02] active:scale-95 smooth">
                    Confirmar Chamada do Dia ✓
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── NOTAS ───────────────────────────────────────── */}
          {activeTab === 'notas' && (
            <div className="animate-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-text-primary tracking-tight">Notas — {selectedClass}</h2>
                  <p className="text-text-secondary font-semibold">Bimestre atual · {TEACHER.subject}</p>
                </div>
                <button className="bg-brand-blue text-white px-5 py-3 rounded-2xl font-black text-sm shadow-float hover:scale-[1.02] active:scale-95 smooth flex items-center gap-2">
                  <Plus size={16} /> Nova Avaliação
                </button>
              </div>

              <div className="bg-ui-surface rounded-3xl border border-ui-divider/50 shadow-card overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-ui-wash/50 border-b border-ui-divider">
                      <th className="text-left px-6 py-4 text-[11px] font-black text-text-secondary uppercase tracking-widest">Aluno</th>
                      <th className="text-center px-4 py-4 text-[11px] font-black text-text-secondary uppercase tracking-widest">Prova 1</th>
                      <th className="text-center px-4 py-4 text-[11px] font-black text-text-secondary uppercase tracking-widest">Trabalho</th>
                      <th className="text-center px-4 py-4 text-[11px] font-black text-text-secondary uppercase tracking-widest">Média</th>
                      <th className="text-center px-4 py-4 text-[11px] font-black text-text-secondary uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ui-divider">
                    {STUDENTS.map(student => {
                      const p1 = student.grade;
                      const trab = Math.min(10, p1 + 0.5);
                      const media = ((p1 + trab) / 2).toFixed(1);
                      const aprovado = parseFloat(media) >= 6;
                      return (
                        <tr key={student.id} className="hover:bg-ui-wash/30 smooth group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img src={student.avatar} alt={student.name} className="size-9 rounded-xl border border-ui-divider" />
                              <span className="font-bold text-text-primary">{student.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <input
                              type="number"
                              defaultValue={p1}
                              min={0} max={10} step={0.5}
                              className="w-16 bg-ui-wash rounded-xl text-center font-black text-sm py-2 focus:ring-2 focus:ring-brand-blue/30 outline-none smooth border-none"
                            />
                          </td>
                          <td className="px-4 py-4 text-center">
                            <input
                              type="number"
                              defaultValue={trab}
                              min={0} max={10} step={0.5}
                              className="w-16 bg-ui-wash rounded-xl text-center font-black text-sm py-2 focus:ring-2 focus:ring-brand-blue/30 outline-none smooth border-none"
                            />
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className={cn('text-lg font-black', parseFloat(media) >= 7 ? 'text-green-600' : parseFloat(media) >= 6 ? 'text-brand-orange' : 'text-red-500')}>
                              {media}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className={cn('text-xs font-black px-3 py-1.5 rounded-full', aprovado ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600')}>
                              {aprovado ? '✓ Aprovado' : '✗ Em Risco'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── TURMAS ──────────────────────────────────────── */}
          {activeTab === 'turmas' && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-2xl font-black text-text-primary mb-6 tracking-tight">Minhas Turmas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TEACHER.classes.map((cls, i) => (
                  <div key={cls} className="bg-ui-surface rounded-3xl border border-ui-divider/50 shadow-card p-6 hover:shadow-soft smooth group cursor-pointer">
                    <div className="size-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 smooth">
                      <BookOpen className="text-brand-blue" size={28} />
                    </div>
                    <h3 className="font-black text-xl text-text-primary tracking-tight">{cls}</h3>
                    <p className="text-text-secondary text-sm font-semibold mb-4">{TEACHER.subject} · {STUDENTS.length} alunos</p>
                    <div className="flex -space-x-2 mb-5">
                      {STUDENTS.slice(0, 5).map(s => (
                        <img key={s.id} src={s.avatar} alt={s.name} className="size-8 rounded-full border-2 border-white" />
                      ))}
                    </div>
                    <button className="w-full bg-brand-blue/10 text-brand-blue font-black text-sm py-3 rounded-2xl hover:bg-brand-blue hover:text-white smooth">
                      Ver Turma →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── AGENDA ──────────────────────────────────────── */}
          {activeTab === 'agenda' && (
            <div className="animate-in fade-in duration-500">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-text-primary tracking-tight">Agenda da Turma</h2>
                <button className="bg-brand-blue text-white px-5 py-3 rounded-2xl font-black text-sm shadow-float hover:scale-[1.02] smooth flex items-center gap-2">
                  <Plus size={16} /> Novo Evento
                </button>
              </div>

              <div className="space-y-4">
                {EVENTS.map(event => (
                  <div key={event.id} className="bg-ui-surface p-6 rounded-3xl border border-ui-divider/50 shadow-card flex items-center gap-5 group hover:shadow-soft smooth">
                    <div className="size-14 bg-brand-blue/10 rounded-2xl flex flex-col items-center justify-center shrink-0 group-hover:scale-110 smooth">
                      <span className="text-xl font-black text-brand-blue leading-none">{event.day}</span>
                      <span className="text-xs font-bold text-brand-blue">{event.month}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-text-primary text-lg">{event.title}</p>
                      <span className={cn(
                        'text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded mt-1 inline-block',
                        event.type === 'prova'  && 'bg-brand-orange/10 text-brand-orange',
                        event.type === 'tarefa' && 'bg-brand-purple/10 text-brand-purple',
                        event.type === 'evento' && 'bg-brand-blue/10 text-brand-blue',
                      )}>{event.type}</span>
                    </div>
                    <button className="p-2 rounded-xl hover:bg-ui-wash text-text-placeholder smooth opacity-0 group-hover:opacity-100">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                ))}

                {/* Empty Placeholder */}
                <div className="border-2 border-dashed border-ui-divider rounded-3xl p-10 text-center">
                  <CalendarDays className="text-text-placeholder mx-auto mb-3" size={40} strokeWidth={1.5} />
                  <p className="font-black text-text-secondary">Adicione provas, tarefas e eventos aqui</p>
                  <button className="mt-4 bg-brand-blue/10 text-brand-blue px-5 py-2.5 rounded-2xl font-black text-sm hover:bg-brand-blue hover:text-white smooth">
                    + Criar Evento
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
