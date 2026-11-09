/**
 * Catalog page copy and settings. Categories and products themselves live in
 * ./catalog-items.ts (imported from the customer's catalog export) and are re-exported here.
 *
 * Changes vs. the mockup (docs/decisions/0003): no calculator (its promo card became
 * "send a photo to the Telegram bot", the "Рассчитать" buttons are gone), WhatsApp replaced
 * by the Telegram bot.
 *
 * This file disappears once Payload CMS serves the catalog; read it only through
 * src/lib/content.
 */
import type { CatalogPage } from "@/lib/content/types";

export { catalogCategories, catalogProducts } from "./catalog-items";

export const catalogPageContent: CatalogPage = {
  seo: {
    title: "Каталог изделий из стекла и зеркал в Алматы | Стекло&Центр",
    description:
      "Стекло, зеркала, душевые перегородки, стеклянные двери, перегородки, ограждения, столы и полки на заказ по вашим размерам. Цены, изготовление и монтаж в Алматы.",
  },
  name: "Каталог",

  hero: {
    title: "Каталог.",
    subtitle: "Стекло и зеркала точно по вашим размерам.",
    help: {
      title: "Нужна помощь с выбором?",
      linkLabel: "Спросите специалиста в Telegram",
    },
  },

  categoriesNavLabel: "Категории каталога",

  filters: {
    allLabel: "Все товары",
    tags: [
      { tag: "home", label: "Для дома" },
      { tag: "office", label: "Для офиса" },
      { tag: "installation", label: "С монтажом" },
      { tag: "tempered", label: "Закалённое стекло" },
    ],
    searchLabel: "Поиск по каталогу",
    sortLabel: "Сортировка",
    sorts: [
      { value: "popular", label: "Популярные" },
      { value: "price-asc", label: "Сначала дешевле" },
      { value: "price-desc", label: "Сначала дороже" },
    ],
    resultsLabel: "Найдено: {count}",
    resetLabel: "Сбросить",
    emptyTitle: "Ничего не нашли",
    emptyText:
      "Попробуйте другое слово или опишите изделие в форме ниже: сделаем по вашим размерам.",
  },

  promos: {
    featured: {
      categorySlug: "dushevye-kabiny",
      label: "Под ключ",
      title: "Душевые из закалённого стекла",
      text: "Замер, изготовление и монтаж. Изготовление от 5–7 дней.",
      price: { kind: "from", amount: 100000, unit: "piece" },
      linkLabel: "Смотреть",
      image: {
        src: "/images/catalog/dushevye-ugolki-iz-stekla/gallery-01.jpg",
        alt: "Душевой уголок из закалённого стекла",
      },
    },
    photoOrder: {
      label: "Заказ по фото",
      title: "Пришлите фото или чертёж",
      text: "Не знаете, как называется изделие? Отправьте снимок и размеры в Telegram, назовём цену и срок.",
      buttonLabel: "Отправить в Telegram",
    },
  },

  featuredCategorySlugs: [
    "dushevye-kabiny",
    "steklyannye-peregorodki",
    "zerkala",
    "ograzhdeniya-i-peregorodki",
  ],
  productsPerSection: 4,
  sectionLinkLabel: "Весь раздел",
  productCard: { orderLabel: "Заказать", askLabel: "Спросить в Telegram" },

  more: {
    title: "Ещё в каталоге.",
    subtitle: "Всё, что делаем из стекла.",
  },

  leadForm: {
    title: "Не нашли нужное изделие?",
    lead: "Изготовим по вашему чертежу, эскизу или фото. Оставьте заявку, менеджер перезвонит и рассчитает стоимость.",
    detailsLabel: "Изделие и размеры",
    submitLabel: "Оставить заявку",
    successMessage: "Спасибо! Менеджер перезвонит вам в течение рабочего дня.",
  },
};
