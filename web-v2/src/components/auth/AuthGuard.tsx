'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Checa se o usuário tem um "token" falso salvo no navegador
    const isAuthenticated = localStorage.getItem('redeescola_auth') === 'true';
    
    // Lista de páginas abertas que não precisam de login (Login/Cadastro)
    const publicPages = ['/login', '/cadastro'];
    const isPublicPage = publicPages.includes(pathname);

    if (!isAuthenticated && !isPublicPage) {
      // Se não tá logado e tentou acessar página interna -> Expulsa pro Login
      router.push('/login');
    } else if (isAuthenticated && isPublicPage) {
      // Se tá logado e tentou acessar o Login -> Joga pro Feed
      router.push('/');
    } else {
      // Acesso liberado
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  // Enquanto ele não verificar qual é a página e se tem login (evita piscar a tela do site antes do redirect)
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-ui-wash flex items-center justify-center">
        {/* Shimmer loading básico */}
        <div className="w-12 h-12 border-4 border-brand-purple/20 border-t-brand-purple rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}
