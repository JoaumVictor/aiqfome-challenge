import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/contexts/StoreContext";
import { CartProvider } from "@/contexts/CartContext";

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
      <body className={`font-sans antialiased`}>
        <StoreProvider>
          <CartProvider>{children}</CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
