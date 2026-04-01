'use client';

import { usePathname } from 'next/navigation';
import AppSidebar from '@/components/layout/AppSidebar';
import BottomNav from '@/components/layout/BottomNav';
import { MessageDock } from '@/components/ui/message-dock';

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Páginas sem layout (onboarding, auth, admin próprio)
  const noLayoutPages = ['/login', '/cadastro', '/esqueci-senha', '/landing', '/admin', '/professor', '/aluno', '/responsavel'];
  const showLayout = !noLayoutPages.includes(pathname);

  // Sem layout: apenas renderiza o conteúdo puro
  if (!showLayout) return <main className="min-h-screen">{children}</main>;

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AppSidebar />
      
      <main className="md:pl-[72px] xl:pl-[260px] pb-20 md:pb-0 min-h-screen flex flex-col">
        {children}
      </main>

      <BottomNav />

      {/* Chat flutuante: só aparece em páginas autenticadas */}
      <MessageDock />
    </div>
  );
}
