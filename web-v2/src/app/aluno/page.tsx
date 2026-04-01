'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  QrCode,
  BarChart2,
  CalendarDays,
  Compass,
  Coins,
  Trophy,
  ShoppingBag,
  GraduationCap,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Share2,
  Bookmark,
  Star,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Flame,
  Award,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ── TYPES ────────────────────────────────────────────────────
type Tab = 'feed' | 'carteirinha' | 'notas' | 'agenda' | 'explore' | 'educoins' | 'ranking';

// ── MOCK DATA ────────────────────────────────────────────────
const STUDENT = {
  name: 'Matheus Silva',
  nickname: '@matheus_silva',
  avatar: 'https://i.pravatar.cc/150?u=matheus',
  class: '9º Ano A',
  ra: '123456',
  eduCoins: 2450,
  streak: 12,
};

const FEED_POSTS = [
  {
    id: 'p1',
    author: 'Prof. Ana Clara',
    avatar: 'https://i.pravatar.cc/150?u=ana',
    role: 'Prof',
    roleColor: 'bg-brand-blue/10 text-brand-blue',
    flair: 'Ciências',
    flairColor: 'bg-brand-purple/10 text-brand-purple border-brand-purple/20',
    time: 'há 2h',
    content: 'Hoje exploramos o sistema solar! 🪐 As crianças construíram maquetes incríveis em grupo. Parabéns turma pelo engajamento e criatividade!',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80&auto=format&fit=crop',
    votes: 342, comments: 12, saved: false,
  },
  {
    id: 'p2',
    author: 'Diretora Lucia',
    avatar: 'https://i.pravatar.cc/150?u=lucia',
    role: 'Dir',
    roleColor: 'bg-brand-purple/10 text-brand-purple',
    flair: 'Aviso',
    flairColor: 'bg-brand-orange/10 text-brand-orange border-brand-orange/20',
    time: 'há 5h',
    content: '📢 Sexta-feira (04/04) NÃO haverá aulas — Dia Mundial da Educação. Aproveitem em família! 🎉',
    image: null,
    votes: 89, comments: 7, saved: true,
  },
  {
    id: 'p3',
    author: 'Prof. Carlos',
    avatar: 'https://i.pravatar.cc/150?u=carlos_mat',
    role: 'Prof',
    roleColor: 'bg-brand-blue/10 text-brand-blue',
    flair: 'Tarefa',
    flairColor: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
    time: 'há 1d',
    content: 'Tarefa para esta semana: Exercícios de frações, páginas 42–45. Prazo até quinta! 📐',
    image: null,
    votes: 45, comments: 3, saved: false,
  },
];

const GRADES = [
  { subject: 'Ciências',    p1: 8.5, p2: 9.0, media: 8.8, status: 'aprovado' },
  { subject: 'Matemática',  p1: 7.0, p2: 6.5, media: 6.8, status: 'atencao'  },
  { subject: 'Português',   p1: 9.5, p2: 8.5, media: 9.0, status: 'aprovado' },
  { subject: 'História',    p1: 6.0, p2: 7.0, media: 6.5, status: 'atencao'  },
  { subject: 'Geografia',   p1: 8.0, p2: 8.5, media: 8.3, status: 'aprovado' },
];

const EVENTS = [
  { day: '04', month: 'Abr', title: 'Prova de Ciências',         type: 'prova',  color: 'text-brand-orange bg-brand-orange/10' },
  { day: '07', month: 'Abr', title: 'Entrega Trabalho — Física', type: 'tarefa', color: 'text-brand-purple bg-brand-purple/10' },
  { day: '10', month: 'Abr', title: 'Excursão ao Planetário',    type: 'evento', color: 'text-green-600 bg-green-100' },
];

const RANKING = [
  { pos: 1, name: 'Sofia Almeida',    coins: 3200, avatar: 'https://i.pravatar.cc/150?u=sofia', isMe: false },
  { pos: 2, name: 'Carlos Mendes',    coins: 2900, avatar: 'https://i.pravatar.cc/150?u=carl',  isMe: false },
  { pos: 3, name: 'Matheus Silva',    coins: 2450, avatar: 'https://i.pravatar.cc/150?u=mat',   isMe: true  },
  { pos: 4, name: 'Larissa Ferreira', coins: 2100, avatar: 'https://i.pravatar.cc/150?u=lari',  isMe: false },
  { pos: 5, name: 'Rafael Costa',     coins: 1800, avatar: 'https://i.pravatar.cc/150?u=rafa',  isMe: false },
];

const REWARDS = [
  { id: 'r1', name: 'Lanche Grátis',      cost: 500,  icon: '🍔', stock: 10 },
  { id: 'r2', name: '+1 Ponto na Prova',  cost: 1000, icon: '⭐', stock: 5  },
  { id: 'r3', name: 'Dispensa de Tarefa', cost: 800,  icon: '📋', stock: 8  },
  { id: 'r4', name: 'Camiseta da Escola', cost: 2000, icon: '👕', stock: 3  },
];

// ── POST CARD ─────────────────────────────────────────────────
function PostCard({ post }: { post: typeof FEED_POSTS[0] }) {
  const [votes, setVotes]     = useState(post.votes);
  const [voted, setVoted]     = useState<'up' | 'down' | null>(null);
  const [saved, setSaved]     = useState(post.saved);

  return (
    <article className="bg-ui-surface rounded-2xl shadow-card border border-ui-divider/50 overflow-hidden">
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="rounded-full p-[2.5px] bg-gradient-to-tr from-brand-yellow via-brand-blue to-brand-purple">
            <div className="bg-white p-[2px] rounded-full">
              <img src={post.avatar} alt={post.author} className="w-9 h-9 rounded-full object-cover" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-[14px] text-text-primary">{post.author}</h3>
              <span className={cn('text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider', post.roleColor)}>{post.role}</span>
              {post.flair && (
                <span className={cn('text-[9px] px-2 py-0.5 rounded border font-bold uppercase tracking-wider', post.flairColor)}>{post.flair}</span>
              )}
            </div>
            <p className="text-[11px] text-text-secondary mt-0.5">{post.time}</p>
          </div>
        </div>
      </div>

      <div className="px-4 pb-3">
        <p className="text-[14px] text-text-primary leading-relaxed">{post.content}</p>
      </div>

      {post.image && (
        <div className="w-full aspect-video overflow-hidden bg-ui-wash">
          <img src={post.image} alt="Post" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-ui-wash rounded-full border border-ui-divider px-2 py-1">
            <button onClick={() => { setVotes(voted === 'up' ? votes - 1 : voted === 'down' ? votes + 2 : votes + 1); setVoted(voted === 'up' ? null : 'up'); }}
              className={cn('smooth rounded-full p-0.5', voted === 'up' ? 'text-brand-orange' : 'text-text-secondary hover:text-brand-orange')}>
              <ArrowUp size={16} strokeWidth={voted === 'up' ? 3 : 2} />
            </button>
            <span className={cn('text-xs font-bold px-1', voted === 'up' && 'text-brand-orange', voted === 'down' && 'text-brand-blue', !voted && 'text-text-primary')}>{votes}</span>
            <button onClick={() => { setVotes(voted === 'down' ? votes + 1 : voted === 'up' ? votes - 2 : votes - 1); setVoted(voted === 'down' ? null : 'down'); }}
              className={cn('smooth rounded-full p-0.5', voted === 'down' ? 'text-brand-blue' : 'text-text-secondary hover:text-brand-blue')}>
              <ArrowDown size={16} strokeWidth={voted === 'down' ? 3 : 2} />
            </button>
          </div>
          <button className="flex items-center gap-1.5 text-text-secondary hover:text-brand-blue smooth px-2 py-1 rounded-full hover:bg-brand-blue/10">
            <MessageSquare size={16} strokeWidth={1.8} />
            <span className="text-xs font-bold">{post.comments}</span>
          </button>
          <button className="text-text-secondary hover:text-brand-yellow smooth px-2 py-1 rounded-full hover:bg-brand-yellow/10">
            <Share2 size={16} strokeWidth={1.8} />
          </button>
        </div>
        <button onClick={() => setSaved(!saved)} className={cn('smooth px-2 py-1 rounded-full', saved ? 'text-brand-purple bg-brand-purple/10' : 'text-text-secondary hover:text-brand-purple hover:bg-brand-purple/10')}>
          <Bookmark size={16} strokeWidth={1.8} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
    </article>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────
export default function AlunoPage() {
  const [activeTab, setActiveTab] = useState<Tab>('feed');

  const tabs = [
    { id: 'feed',       label: 'Feed',        icon: Home },
    { id: 'carteirinha',label: 'Carteirinha', icon: QrCode },
    { id: 'notas',      label: 'Notas',       icon: BarChart2 },
    { id: 'agenda',     label: 'Agenda',      icon: CalendarDays },
    { id: 'explore',    label: 'Explorar',    icon: Compass },
    { id: 'educoins',   label: 'EduCoins',    icon: Coins },
    { id: 'ranking',    label: 'Ranking',     icon: Trophy },
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
            <div className="size-10 bg-green-500 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-float">RE</div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight text-green-600 leading-none">Rede Escola</h1>
              <p className="text-[11px] font-bold text-text-secondary uppercase tracking-widest mt-1">Área do Aluno</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* EduCoins badge */}
          <div className="hidden sm:flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/30 px-3 py-1.5 rounded-2xl">
            <Coins size={16} className="text-yellow-600" />
            <span className="font-black text-sm text-yellow-700">{STUDENT.eduCoins.toLocaleString()} EC</span>
          </div>
          <div className="hidden sm:flex flex-col items-end">
            <span className="font-bold text-sm leading-none">{STUDENT.name}</span>
            <span className="text-[10px] font-black text-green-600 uppercase tracking-wider mt-1">{STUDENT.class}</span>
          </div>
          <img src={STUDENT.avatar} alt={STUDENT.name} className="size-10 rounded-2xl border-2 border-ui-divider shadow-card" />
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
                  ? 'bg-green-500 text-white shadow-float'
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

          {/* ── FEED ───────────────────────────────────────── */}
          {activeTab === 'feed' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Welcome strip */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-6 text-white shadow-float relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 size-32 bg-white/10 rounded-full" />
                <div className="absolute -right-2 -top-4 size-20 bg-white/5 rounded-full" />
                <div className="flex items-center gap-4">
                  <img src={STUDENT.avatar} alt={STUDENT.name} className="size-14 rounded-2xl border-4 border-white/30" />
                  <div>
                    <p className="text-white/70 text-sm font-bold">Bem-vindo de volta,</p>
                    <h2 className="text-2xl font-black tracking-tight">{STUDENT.name} 👋</h2>
                    <p className="text-white/70 text-sm font-semibold">{STUDENT.nickname} · {STUDENT.class}</p>
                  </div>
                  <div className="ml-auto text-right hidden sm:block">
                    <div className="flex items-center gap-2 justify-end">
                      <Flame size={18} className="text-brand-yellow" />
                      <span className="font-black text-xl">{STUDENT.streak}</span>
                    </div>
                    <p className="text-white/70 text-xs font-bold">dias seguidos</p>
                  </div>
                </div>
              </div>

              {/* Feed posts */}
              {FEED_POSTS.map(post => <PostCard key={post.id} post={post} />)}
            </div>
          )}

          {/* ── CARTEIRINHA ──────────────────────────────────── */}
          {activeTab === 'carteirinha' && (
            <div className="animate-in zoom-in-95 duration-500 max-w-md mx-auto">
              <h2 className="text-2xl font-black text-text-primary mb-6 tracking-tight text-center">Carteirinha Digital</h2>

              {/* Card Front */}
              <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-[32px] p-8 text-white shadow-float relative overflow-hidden mb-6">
                <div className="absolute -top-10 -right-10 size-36 bg-white/10 rounded-full" />
                <div className="absolute -bottom-6 -left-6 size-24 bg-white/5 rounded-full" />

                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Rede Escola</p>
                    <p className="font-black text-2xl tracking-tight">LinkScholl</p>
                  </div>
                  <div className="size-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center font-black text-lg">RE</div>
                </div>

                <img src={STUDENT.avatar} alt={STUDENT.name} className="size-20 rounded-2xl border-4 border-white/30 mb-4 shadow-lg" />

                <h3 className="font-black text-2xl tracking-tight leading-tight">{STUDENT.name}</h3>
                <p className="text-white/70 font-bold">{STUDENT.class} · RA {STUDENT.ra}</p>

                <div className="mt-6 pt-4 border-t border-white/20 flex justify-between items-end">
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-widest">Validade</p>
                    <p className="font-black">Dez 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 text-xs uppercase tracking-widest">Status</p>
                    <span className="inline-flex items-center gap-1.5 font-black text-green-200">
                      <span className="size-2 rounded-full bg-green-300 animate-pulse" /> Ativo
                    </span>
                  </div>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="bg-ui-surface rounded-3xl border border-ui-divider/50 shadow-card p-8 text-center">
                <div className="size-40 bg-ui-wash rounded-2xl mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-ui-divider">
                  <QrCode size={72} className="text-text-placeholder" strokeWidth={1} />
                </div>
                <h3 className="font-black text-text-primary text-lg">QR Code Dinâmico</h3>
                <p className="text-text-secondary text-sm font-semibold mt-1 mb-4">Use na catraca da escola para entrada/saída automática</p>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-3 flex items-center gap-2 text-green-700 font-bold text-sm">
                  <CheckCircle2 size={18} /> Acesso liberado — Entrada às 07:15 hoje
                </div>
              </div>
            </div>
          )}

          {/* ── NOTAS & FREQUÊNCIA ───────────────────────────── */}
          {activeTab === 'notas' && (
            <div className="animate-in slide-in-from-right-4 duration-500 space-y-6">
              <h2 className="text-2xl font-black text-text-primary tracking-tight">Notas & Frequência</h2>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Média Geral', value: '7.9', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
                  { label: 'Frequência',  value: '92%',  color: 'text-brand-blue', bg: 'bg-brand-blue/5', border: 'border-brand-blue/20' },
                  { label: 'Faltas',      value: '3',    color: 'text-brand-orange', bg: 'bg-brand-orange/5', border: 'border-brand-orange/20' },
                ].map(stat => (
                  <div key={stat.label} className={cn('rounded-2xl border p-5 text-center', stat.bg, stat.border)}>
                    <div className={cn('text-3xl font-black', stat.color)}>{stat.value}</div>
                    <div className="text-xs font-bold text-text-secondary uppercase tracking-widest mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Grades Table */}
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
                    {GRADES.map(g => (
                      <tr key={g.subject} className="hover:bg-ui-wash/30 smooth">
                        <td className="px-6 py-4 font-bold text-text-primary">{g.subject}</td>
                        <td className="px-6 py-4 font-bold text-text-secondary">{g.p1}</td>
                        <td className="px-6 py-4 font-bold text-text-secondary">{g.p2}</td>
                        <td className="px-6 py-4">
                          <span className={cn('font-black text-lg', g.media >= 7 ? 'text-green-600' : 'text-brand-orange')}>{g.media}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn('text-xs font-black px-3 py-1.5 rounded-full', g.status === 'aprovado' ? 'bg-green-100 text-green-700' : 'bg-brand-orange/10 text-brand-orange')}>
                            {g.status === 'aprovado' ? '✓ Ok' : '⚠ Atenção'}
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
              <h2 className="text-2xl font-black text-text-primary tracking-tight">Minha Agenda</h2>

              <div className="space-y-4">
                {EVENTS.map((ev, i) => (
                  <div key={i} className="bg-ui-surface p-6 rounded-3xl border border-ui-divider/50 shadow-card flex items-center gap-5 group hover:shadow-soft smooth cursor-pointer">
                    <div className={cn('size-14 rounded-2xl flex flex-col items-center justify-center shrink-0 group-hover:scale-110 smooth', ev.color)}>
                      <span className="text-xl font-black leading-none">{ev.day}</span>
                      <span className="text-[10px] font-bold">{ev.month}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-text-primary text-lg">{ev.title}</p>
                      <span className={cn('text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded mt-1 inline-block', ev.color)}>{ev.type}</span>
                    </div>
                    <ChevronRight size={18} className="text-text-placeholder" />
                  </div>
                ))}

                <div className="border-2 border-dashed border-ui-divider rounded-3xl p-10 text-center">
                  <CalendarDays className="text-text-placeholder mx-auto mb-3" size={40} strokeWidth={1.5} />
                  <p className="font-black text-text-secondary">Ver mais em breve aqui</p>
                </div>
              </div>
            </div>
          )}

          {/* ── EXPLORE ──────────────────────────────────────── */}
          {activeTab === 'explore' && (
            <div className="animate-in fade-in duration-500 space-y-6">
              <h2 className="text-2xl font-black text-text-primary tracking-tight">Explorar 🌐</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: '5 Fatos Incríveis sobre o Sistema Solar', category: 'Ciências', img: 'https://images.unsplash.com/photo-1446776709462-d6b525b8a69d?w=600&q=80&auto=format&fit=crop', read: '3 min' },
                  { title: 'Como a Matemática está em Todo Lugar', category: 'Matemática', img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&q=80&auto=format&fit=crop', read: '5 min' },
                  { title: 'Grandes Escritores Brasileiros do Séc. XX', category: 'Português', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80&auto=format&fit=crop', read: '4 min' },
                  { title: 'A Revolução Industrial e o Mundo Atual', category: 'História',  img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80&auto=format&fit=crop', read: '6 min' },
                ].map((art, i) => (
                  <div key={i} className="bg-ui-surface rounded-3xl border border-ui-divider/50 shadow-card overflow-hidden group hover:shadow-soft smooth cursor-pointer">
                    <div className="aspect-video overflow-hidden bg-ui-wash">
                      <img src={art.img} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 smooth" />
                    </div>
                    <div className="p-5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-2 py-1 rounded mb-2 inline-block">{art.category}</span>
                      <h3 className="font-black text-text-primary text-lg leading-tight mb-2">{art.title}</h3>
                      <p className="text-text-secondary text-xs font-bold">⏱ {art.read} de leitura</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── EDUCOINS ─────────────────────────────────────── */}
          {activeTab === 'educoins' && (
            <div className="animate-in fade-in duration-500 space-y-6">
              <h2 className="text-2xl font-black text-text-primary tracking-tight">EduCoins 🪙</h2>

              {/* Balance Card */}
              <div className="bg-gradient-to-r from-brand-purple to-brand-blue rounded-3xl p-8 text-white shadow-float relative overflow-hidden">
                <div className="absolute -bottom-8 -right-8 size-40 bg-white/10 rounded-full" />
                <Coins className="absolute top-6 right-8 size-16 opacity-20" />
                <p className="text-white/70 font-bold mb-1">Seu saldo atual</p>
                <h2 className="text-5xl font-black tracking-tight">{STUDENT.eduCoins.toLocaleString()}</h2>
                <p className="text-white/70 mt-1 text-lg font-semibold">EduCoins</p>
                <div className="mt-6 flex gap-6">
                  <div><p className="text-white/60 text-xs font-bold uppercase tracking-widest">Streak</p><p className="font-black text-xl">{STUDENT.streak} dias 🔥</p></div>
                  <div><p className="text-white/60 text-xs font-bold uppercase tracking-widest">Ranking</p><p className="font-black text-xl">#3 na turma 🏅</p></div>
                </div>
              </div>

              {/* Loja de Recompensas */}
              <div>
                <h3 className="font-black text-xl text-text-primary mb-4 flex items-center gap-2">
                  <ShoppingBag size={20} className="text-brand-purple" /> Loja de Recompensas
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {REWARDS.map(r => {
                    const canBuy = STUDENT.eduCoins >= r.cost;
                    return (
                      <div key={r.id} className="bg-ui-surface rounded-3xl border border-ui-divider/50 shadow-card p-6 group hover:shadow-soft smooth">
                        <div className="text-4xl mb-3">{r.icon}</div>
                        <h4 className="font-black text-text-primary mb-1">{r.name}</h4>
                        <p className="text-xs text-text-secondary font-bold mb-4">{r.stock} disponíveis</p>
                        <div className="flex items-center justify-between">
                          <span className="font-black text-brand-purple text-lg">{r.cost.toLocaleString()} EC</span>
                          <button
                            disabled={!canBuy}
                            className={cn(
                              'px-4 py-2 rounded-xl text-sm font-black smooth',
                              canBuy
                                ? 'bg-brand-purple text-white hover:scale-105 active:scale-95 shadow-float'
                                : 'bg-ui-wash text-text-placeholder cursor-not-allowed'
                            )}
                          >
                            {canBuy ? 'Resgatar' : 'Sem saldo'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Extrato */}
              <div className="bg-ui-surface rounded-3xl border border-ui-divider/50 shadow-card p-6">
                <h3 className="font-black text-text-primary mb-4">Extrato Recente</h3>
                {[
                  { desc: 'Chamada presente — Ciências',   amount: '+10', positive: true,  time: 'Hoje' },
                  { desc: 'Nota acima de 8 — Português',  amount: '+50', positive: true,  time: 'Ontem' },
                  { desc: 'Tarefa entregue no prazo',      amount: '+30', positive: true,  time: '2d atrás' },
                  { desc: 'Resgate: Dispensa de Tarefa',   amount: '-800', positive: false, time: '1 sem. atrás' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-ui-divider last:border-0">
                    <div>
                      <p className="font-bold text-sm text-text-primary">{item.desc}</p>
                      <p className="text-xs text-text-secondary font-medium">{item.time}</p>
                    </div>
                    <span className={cn('font-black', item.positive ? 'text-green-600' : 'text-brand-orange')}>{item.amount} EC</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── RANKING ──────────────────────────────────────── */}
          {activeTab === 'ranking' && (
            <div className="animate-in fade-in duration-500 space-y-6">
              <h2 className="text-2xl font-black text-text-primary tracking-tight">Ranking da Turma 🏆</h2>

              {/* Podium */}
              <div className="bg-ui-surface rounded-3xl border border-ui-divider/50 shadow-card p-8">
                <div className="flex items-end justify-center gap-4 mb-8">
                  {[RANKING[1], RANKING[0], RANKING[2]].map((r, i) => {
                    const pos = [2, 1, 3][i];
                    const heights = ['h-24', 'h-32', 'h-20'];
                    const colors  = ['bg-gray-100', 'bg-brand-yellow/20', 'bg-brand-orange/10'];
                    const medals  = ['🥈', '🥇', '🥉'];
                    return (
                      <div key={r.pos} className="flex flex-col items-center">
                        <img src={r.avatar} alt={r.name} className="size-12 rounded-2xl border-4 border-white shadow-card mb-2" />
                        <p className="font-black text-sm text-center leading-tight">{r.name.split(' ')[0]}</p>
                        <p className="text-xs font-bold text-text-secondary mb-2">{r.coins.toLocaleString()} EC</p>
                        <div className={cn('w-20 rounded-t-2xl flex items-center justify-center text-2xl', heights[i], colors[i])}>
                          {medals[i]}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Full list */}
                <div className="divide-y divide-ui-divider">
                  {RANKING.map(r => (
                    <div key={r.pos} className={cn('flex items-center gap-4 py-4 px-2 rounded-2xl smooth', r.isMe && 'bg-green-50 -mx-2 px-4')}>
                      <span className={cn('text-lg font-black w-6 text-center', r.pos === 1 ? 'text-brand-yellow' : r.pos === 2 ? 'text-gray-400' : r.pos === 3 ? 'text-brand-orange' : 'text-text-secondary')}>
                        {r.pos === 1 ? '🥇' : r.pos === 2 ? '🥈' : r.pos === 3 ? '🥉' : `#${r.pos}`}
                      </span>
                      <img src={r.avatar} alt={r.name} className="size-10 rounded-xl border border-ui-divider" />
                      <div className="flex-1">
                        <p className={cn('font-black', r.isMe ? 'text-green-700' : 'text-text-primary')}>
                          {r.name} {r.isMe && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-black ml-1">Você</span>}
                        </p>
                      </div>
                      <span className="font-black text-brand-purple">{r.coins.toLocaleString()} EC</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
