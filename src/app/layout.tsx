import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ретрит в Карпатах · 12–16 червня 2026 · Клуб 432",
  description: "П'ять днів духовних практик, трансформації та перезавантаження в серці Карпат. Йога, медитація, гра Ліла, кристалохілінг. Seven Hills, Яблуниця.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
