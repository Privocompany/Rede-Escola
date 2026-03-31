import React from 'react';
import { cn } from '@/lib/utils';
import { Award, Medal, Ribbon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export interface AwardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'certificate' | 'badge';
  title: string;
  subtitle: string;
  recipient: string;
  date: string;
  courseName?: string;
}

export function Awards({
  variant = 'certificate',
  title,
  subtitle,
  recipient,
  date,
  courseName,
  className,
  ...props
}: AwardProps) {
  if (variant === 'badge') {
    return (
      <div
        className={cn(
          'relative flex flex-col items-center justify-center p-6 text-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-yellow/10 to-brand-orange/10 border border-brand-yellow/30 shadow-card',
          className
        )}
        {...props}
      >
        <Sparkles className="absolute top-2 right-2 text-brand-yellow w-6 h-6 opacity-50" />
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-yellow to-brand-orange flex items-center justify-center shadow-lg mb-4">
          <Medal className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-black text-text-primary uppercase tracking-wider">{title}</h3>
        <p className="text-sm font-bold text-text-primary mt-1">{recipient}</p>
        <p className="text-xs text-text-secondary mt-1 max-w-[200px]">{subtitle}</p>
        <span className="text-[10px] font-bold text-text-placeholder mt-3 uppercase tracking-widest">{date}</span>
      </div>
    );
  }

  // Certificado estilo Premium
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        'relative w-full max-w-3xl aspect-[1.414/1] bg-white rounded-xl shadow-float overflow-hidden flex flex-col items-center justify-center p-8 md:p-14 text-center border-[8px] border-ui-wash',
        className
      )}
      {...props}
    >
      {/* Padrão decorativo de fundo */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#050505_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Bordas Douradas Elegantes */}
      <div className="absolute inset-4 border border-brand-yellow/40 rounded-lg pointer-events-none"></div>
      <div className="absolute inset-5 border border-brand-yellow/10 rounded-md pointer-events-none"></div>
      
      {/* Elemento de Topo */}
      <div className="mb-6 relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 bg-brand-purple/10 text-brand-purple rounded-full flex items-center justify-center mb-4">
          <Award className="w-8 h-8" />
        </div>
        <h4 className="text-brand-purple font-black tracking-[0.2em] uppercase text-xs">Rede Escola</h4>
      </div>

      <h1 className="text-4xl md:text-5xl font-black text-text-primary mb-2 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
        {title}
      </h1>
      
      <p className="text-sm md:text-base text-text-secondary mb-6 italic">
        Isto certifica orgulhosamente que
      </p>

      <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-6 border-b-2 border-brand-blue/20 pb-2 px-8 inline-block">
        {recipient}
      </h2>

      <p className="text-base text-text-primary max-w-xl mx-auto leading-relaxed mb-12">
        {subtitle} {courseName && <span className="font-bold">"{courseName}"</span>}
      </p>

      {/* Assinaturas & Selo Lateral */}
      <div className="w-full flex justify-between items-end mt-auto relative z-10 px-8">
        <div className="flex flex-col items-center w-32">
          <div className="border-b border-text-primary w-full max-w-[120px] mb-2"></div>
          <span className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">Data</span>
          <span className="text-xs font-black text-text-primary">{date}</span>
        </div>

        {/* Selo Centralizado ou à direita */}
        <div className="w-20 h-20 absolute left-1/2 -translate-x-1/2 bottom-0 flex items-center justify-center border-4 border-brand-yellow border-dashed rounded-full bg-brand-yellow/10">
           <Ribbon className="text-brand-yellow w-8 h-8" />
        </div>

        <div className="flex flex-col items-center w-32">
          <div className="border-b border-text-primary w-full max-w-[120px] mb-2 h-6 flex items-end justify-center">
            {/* Fake Signature */}
            <span className="font-[cursive] text-lg text-brand-purple/80 leading-none">Diretoria</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">Assinatura</span>
          <span className="text-xs font-black text-text-primary">Rede Escola</span>
        </div>
      </div>
    </motion.div>
  );
}
