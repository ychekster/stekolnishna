/**
 * Order page /zayavka (spec §4.2, §4.5, design mockup "Оформление заявки"): the full order
 * form with photos and drawings, a Telegram card and the next steps. The header's
 * "Оставить заявку" leads here; page-level short forms stay on their pages. The folder name
 * must match `routes.order`.
 */
import type { Metadata } from "next";

import { OrderAside } from "@/components/order/OrderAside";
import { OrderFormCard } from "@/components/order/OrderFormCard";
import { BackLink } from "@/components/ui/BackLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getCatalogCategories, getOrderPage, getSiteSettings } from "@/lib/content";
import { routes } from "@/lib/routes";

export async function generateMetadata(): Promise<Metadata> {
  const order = await getOrderPage();
  return { title: order.seo.title, description: order.seo.description };
}

export default async function OrderPage() {
  const [settings, order, categories] = await Promise.all([
    getSiteSettings(),
    getOrderPage(),
    getCatalogCategories(),
  ]);

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Главная", href: routes.home }, { label: order.name }]}
        className="mt-4 md:mt-8"
      />
      <BackLink href={routes.catalog} label={order.backLabel} />
      <h1 className="m-0 mt-3 max-w-215 text-display-sm md:mt-4 md:text-display">
        {order.hero.title} <span className="text-ink-muted">{order.hero.subtitle}</span>
      </h1>
      <section
        aria-label={order.name}
        className="mt-8 flex flex-wrap items-start gap-6 md:mt-12 md:gap-8"
      >
        <div className="min-w-0 flex-[999_1_600px]">
          <OrderFormCard
            form={order.form}
            success={order.success}
            productTypes={categories.map((category) => category.name)}
            catalogHref={routes.catalog}
            privacyPolicyHref={settings.privacyPolicyHref}
          />
        </div>
        <OrderAside
          telegram={order.telegram}
          nextSteps={order.nextSteps}
          telegramBot={settings.telegramBot}
        />
      </section>
    </>
  );
}
