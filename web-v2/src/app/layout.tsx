import type { Metadata } from "next";
import "./globals.css";

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
      <body className="bg-ui-wash min-h-screen">
        {children}
      </body>
    </html>
  );
}
