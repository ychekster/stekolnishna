/**
 * Root layout: Russian document, Manrope font (Latin + Cyrillic, self-hosted by next/font),
 * default metadata.
 */
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Стеклянные конструкции под ключ в Алматы — стекольная мастерская",
  description:
    "Изготовление и монтаж изделий из стекла и зеркал в Алматы: перегородки, душевые, зеркала, ограждения. Собственное производство, бесплатный замер.",
  // Pre-launch: keep the preview (e.g. via tunnel) out of search engines.
  // Switch to indexable when the site goes live on its real domain.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
