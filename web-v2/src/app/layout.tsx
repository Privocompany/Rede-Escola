import type { Metadata } from "next";
import "./globals.css";
import AppSidebar from "@/components/layout/AppSidebar";
import BottomNav from "@/components/layout/BottomNav";

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
        <div className="min-h-screen">
          {/* Sidebar Desktop */}
          <AppSidebar />
          
          {/* Main Container com padding para a Sidebar */}
          <main className="md:pl-[72px] xl:pl-[260px] pb-20 md:pb-0 min-h-screen">
            {children}
          </main>

          {/* Nav Mobile */}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
