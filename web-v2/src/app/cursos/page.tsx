"use client";

import { BookOpen, GraduationCap, PlayCircle, Trophy, Star, Search, Filter, BookIcon, Layout } from "lucide-react";
import { myCourses, recommendedCourses } from "@/lib/mock-courses";
import { cn } from "@/lib/utils";

export default function CoursesPage() {
  return (
    <div className="flex-1 min-h-screen bg-ui-wash">
      {/* Header */}
      <div className="bg-brand-purple p-8 pt-12 pb-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse" />
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2 flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-2xl backdrop-blur-sm">
                <GraduationCap size={36} />
              </div>
              Cursos Livres
            </h1>
            <p className="text-white/80 font-medium text-lg">
              Explore seu potencial além da sala de aula.
            </p>
          </div>

          <div className="flex items-center gap-4">
             <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center gap-3">
               <Trophy className="text-brand-yellow" size={24} />
               <div className="text-sm font-bold">
                 <p className="opacity-60 uppercase text-[10px]">Certificados</p>
                 <p className="text-xl leading-tight">12</p>
               </div>
             </div>
             <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center gap-3">
               <BookOpen className="text-brand-blue" size={24} />
               <div className="text-sm font-bold">
                 <p className="opacity-60 uppercase text-[10px]">Em Curso</p>
                 <p className="text-xl leading-tight">02</p>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto -mt-12 px-4 pb-12 relative z-20">
        
        {/* Search Bar Refined */}
        <div className="flex items-center gap-4 mb-12 flex-wrap">
          <div className="flex-1 min-w-[300px] h-14 bg-white rounded-2xl shadow-nav border border-ui-divider flex items-center px-6 gap-4">
            <Search className="text-text-secondary" />
            <input 
              type="text" 
              placeholder="Encontrar um curso ou conteúdo..." 
              className="bg-transparent border-none outline-none font-bold text-text-primary placeholder:text-text-secondary/50 w-full"
            />
          </div>
          <button className="h-14 px-8 bg-white border border-ui-divider rounded-2xl font-black text-brand-purple shadow-nav smooth hover:bg-brand-purple/5 flex items-center gap-2">
            <Filter size={18} /> Filtrar por Área
          </button>
        </div>

        {/* My Courses */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-2xl font-black text-text-primary flex items-center gap-3">
              <Layout className="text-brand-purple" />
              Continuar Aprendendo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {myCourses.map(course => (
              <div key={course.id} className="bg-white rounded-[2.5rem] p-6 shadow-nav border border-ui-divider group hover:border-brand-purple/20 smooth flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-44 h-44 rounded-3xl overflow-hidden flex-shrink-0 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 smooth" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent smooth" />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent flex justify-center md:hidden">
                    <span className="text-[10px] font-black tracking-widest text-white uppercase">{course.category}</span>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col pt-2">
                  <div className="hidden md:block">
                    <span className="text-[10px] font-black tracking-widest text-brand-blue uppercase mb-1 inline-block">
                      {course.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-text-primary mb-1 group-hover:text-brand-purple smooth">
                    {course.title}
                  </h3>
                  <p className="text-sm font-bold text-text-secondary mb-4 italic">"{course.lastLesson}"</p>
                  
                  <div className="mt-auto space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs font-black mb-2 uppercase text-text-secondary">
                        <span>Progresso</span>
                        <span className="text-brand-purple">{course.progress}%</span>
                      </div>
                      <div className="h-3 bg-ui-wash rounded-full overflow-hidden border border-ui-divider p-[2px]">
                        <div 
                          className="h-full bg-brand-purple rounded-full shadow-[0_0_8px_rgba(104,53,214,0.4)]" 
                          style={{ width: `${course.progress}%` }} 
                        />
                      </div>
                    </div>
                    
                    <button className="w-full bg-brand-purple text-white py-4 rounded-2xl font-black text-sm smooth shadow-float hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                      <PlayCircle size={20} /> Retomar Aula
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Store Grid */}
        <section>
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-2xl font-black text-text-primary flex items-center gap-3">
              <Star className="text-brand-yellow fill-current" />
              Novas turmas para você
            </h2>
            <button className="text-brand-purple font-black hover:underline">Ver catálogo completo</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendedCourses.map(course => (
              <div key={course.id} className="bg-white rounded-[2rem] border border-ui-divider shadow-card overflow-hidden group hover:shadow-nav smooth flex flex-col">
                <div className="h-44 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 smooth" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase text-text-primary">
                    Inscrições Abertas
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-brand-yellow" />
                    <span className="text-[10px] font-black text-text-secondary uppercase">{course.category}</span>
                  </div>
                  <h3 className="font-black text-text-primary group-hover:text-brand-purple smooth mb-2 truncate">
                    {course.title}
                  </h3>
                  <p className="text-xs font-semibold text-text-secondary line-clamp-2 leading-relaxed">
                    Com {course.instructor}. Comece agora e conquiste mais EduCoins ao final do semestre.
                  </p>
                  <button className="mt-auto pt-6 w-full text-brand-purple flex items-center justify-between font-black group/btn">
                    <span>Ver detalhes</span>
                    <div className="w-5 h-5 bg-brand-purple/10 rounded-lg flex items-center justify-center group-hover/btn:bg-brand-purple group-hover/btn:text-white smooth">
                      <GraduationCap size={12} />
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
