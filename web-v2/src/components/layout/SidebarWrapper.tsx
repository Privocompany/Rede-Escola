'use client';

import { usePathname } from 'next/navigation';
import AppSidebar from '@/components/layout/AppSidebar';
import BottomNav from '@/components/layout/BottomNav';

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Lista de páginas que não devem ter barra lateral/rodapé
  const noLayoutPages = ['/login', '/cadastro', '/esqueci-senha', '/landing'];
  const showLayout = !noLayoutPages.includes(pathname);

  if (!showLayout) return <main className="min-h-screen">{children}</main>;

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AppSidebar />
      
      <main className="md:pl-[72px] xl:pl-[260px] pb-20 md:pb-0 min-h-screen flex flex-col">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
