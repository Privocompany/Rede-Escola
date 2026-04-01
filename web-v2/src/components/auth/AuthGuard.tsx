'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ROLE_HOME, UserRole } from '@/lib/auth-context';

const PUBLIC_PAGES = ['/login', '/cadastro', '/landing'];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('redeescola_auth') === 'true';
    const role = localStorage.getItem('redeescola_role') as UserRole;
    const isPublicPage = PUBLIC_PAGES.includes(pathname);

    // Considera logado somente se tiver AMBOS: auth e role
    const isFullyAuthenticated = isAuthenticated && !!role;

    if (!isFullyAuthenticated && !isPublicPage) {
      // Sem login completo (pode ter auth antigo sem role) → Login
      localStorage.removeItem('redeescola_auth');
      localStorage.removeItem('redeescola_role');
      router.push('/login');
    } else if (isFullyAuthenticated && isPublicPage) {
      // Logado → área do role
      router.push(ROLE_HOME[role!]);
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-ui-wash flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-purple/20 border-t-brand-purple rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
