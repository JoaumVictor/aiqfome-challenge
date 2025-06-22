import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aiqfome Challenge",
  description:
    "Desafio técnico Aiqfome: Aplicação de delivery focada em experiência mobile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  );
}
