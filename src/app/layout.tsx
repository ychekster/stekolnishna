/**
 * Root layout shared by every page: Russian document, Manrope font (Latin + Cyrillic,
 * self-hosted by next/font), default metadata, sticky header, footer, the floating
 * Telegram button, the "Заказать звонок" dialog and the cookie banner. Pages render only
 * their own content inside <main>.
 */
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";

import { CallbackDialogProvider } from "@/components/layout/CallbackDialogProvider";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { FloatingTelegram } from "@/components/layout/FloatingTelegram";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Container } from "@/components/ui/Container";
import { getSiteSettings } from "@/lib/content";
import { routes } from "@/lib/routes";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Стекло&Центр: стеклянные конструкции под ключ в Алматы",
  description:
    "Изготовление и монтаж изделий из стекла и зеркал в Алматы: перегородки, душевые, зеркала, ограждения. Собственное производство, бесплатный замер.",
  // Pre-launch: keep the preview (e.g. via tunnel) out of search engines.
  // Switch to indexable when the site goes live on its real domain.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  return (
    <html lang="ru" className={manrope.variable}>
      <body>
        <CallbackDialogProvider
          content={settings.callback}
          privacyPolicyHref={settings.privacyPolicyHref}
        >
          <SiteHeader settings={settings} />
          <Container>
            <main>{children}</main>
          </Container>
          <SiteFooter settings={settings} />
          <FloatingTelegram botUsername={settings.telegramBot} />
          <CookieBanner content={settings.cookieBanner} policyHref={routes.cookiePolicy} />
        </CallbackDialogProvider>
      </body>
    </html>
  );
}
