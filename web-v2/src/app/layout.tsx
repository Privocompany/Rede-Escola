import type { Metadata } from "next";
import "./globals.css";
import SidebarWrapper from "@/components/layout/SidebarWrapper";
import AuthGuard from "@/components/auth/AuthGuard";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "Rede Escola",
  description: "A rede social educacional que conecta alunos, professores e famílias.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-ui-wash min-h-screen text-text-primary">
        <AuthProvider>
          <AuthGuard>
            <SidebarWrapper>
              {children}
            </SidebarWrapper>
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
