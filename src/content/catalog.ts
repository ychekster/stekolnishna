/**
 * PLACEHOLDER catalog: the 12 categories from spec §3.2 and sample products from the design
 * mockup "Каталог — десктоп", plus the catalog page copy.
 *
 * Changes vs. the mockup (docs/decisions/0003): no calculator (its promo card became
 * "send a photo to the Telegram bot", the "Рассчитать" buttons are gone), WhatsApp replaced
 * by the Telegram bot. Products are the designer's examples, not the customer's range:
 * prices are `draft` (shown in [brackets]) and sizes/terms are bracketed until the customer
 * sends the real catalog (docs/open-questions.md). Category slugs match the homepage links.
 *
 * This file disappears once Payload CMS serves the catalog; read it only through
 * src/lib/content.
 */
import type { CatalogCategory, CatalogPage, CatalogProduct } from "@/lib/content/types";

export const catalogCategories: CatalogCategory[] = [
  {
    slug: "steklo",
    name: "Стекло",
    description: "Листовое, закалённое, прозрачное, тонированное",
    tagline: "Листовое и закалённое.",
    image: null,
    price: { kind: "from", amount: 4500, unit: "m2", draft: true },
  },
  {
    slug: "zerkala",
    name: "Зеркала",
    description: "Настенные, интерьерные, фигурные",
    tagline: "Настенные, интерьерные, фигурные.",
    image: null,
    price: { kind: "from", amount: 9000, unit: "m2", draft: true },
  },
  {
    slug: "dushevye-peregorodki",
    name: "Душевые перегородки",
    description: "Стеклянные душевые конструкции",
    tagline: "Закалённое стекло [8 мм].",
    image: null,
    price: { kind: "from", amount: 65000, unit: "piece", draft: true },
  },
  {
    slug: "steklyannye-dveri",
    name: "Стеклянные двери",
    description: "Распашные и раздвижные",
    tagline: "Распашные и раздвижные.",
    image: null,
    price: { kind: "from", amount: 85000, unit: "piece", draft: true },
  },
  {
    slug: "peregorodki",
    name: "Перегородки",
    description: "Офисные и межкомнатные",
    tagline: "Офисные и межкомнатные.",
    image: null,
    price: { kind: "from", amount: 38000, unit: "m2", draft: true },
  },
  {
    slug: "steklyannye-ograzhdeniya",
    name: "Стеклянные ограждения",
    description: "Лестничные и балконные",
    tagline: "Лестничные и балконные.",
    image: null,
    price: { kind: "from", amount: 45000, unit: "linear-m", draft: true },
  },
  {
    slug: "zerkalnye-panno",
    name: "Зеркальные панно",
    description: "Декоративные зеркальные конструкции",
    tagline: "Декоративные конструкции.",
    image: null,
    price: { kind: "individual" },
  },
  {
    slug: "steklyannye-stoly",
    name: "Стеклянные столы",
    description: "Столешницы и мебельные изделия",
    tagline: "Столешницы и мебель.",
    image: null,
    price: { kind: "from", amount: 25000, unit: "piece", draft: true },
  },
  {
    slug: "steklyannye-polki",
    name: "Стеклянные полки",
    description: "Полки различной формы",
    tagline: "Полки различной формы.",
    image: null,
    price: { kind: "from", amount: 3500, unit: "piece", draft: true },
  },
  {
    slug: "individualnye-konstrukcii",
    name: "Индивидуальные конструкции",
    description: "Изделия по проектам заказчика",
    tagline: "По проекту заказчика.",
    image: null,
    price: { kind: "individual" },
  },
  {
    slug: "furnitura",
    name: "Фурнитура",
    description: "Петли, ручки, крепления, профили",
    tagline: "Петли, ручки, крепления, профили.",
    image: null,
    price: { kind: "from", amount: 1200, unit: "piece", draft: true },
  },
  {
    slug: "obrabotka-stekla",
    name: "Обработка стекла",
    description: "Резка, шлифовка, сверление и другие операции",
    tagline: "Резка, шлифовка, сверление.",
    image: null,
    price: { kind: "from", amount: 300, unit: "linear-m", draft: true },
  },
];

/** In "popular" order. Slugs double as Telegram deep-link parameters: Latin, digits, "-". */
export const catalogProducts: CatalogProduct[] = [
  // Стекло
  {
    slug: "prozrachnoe-steklo",
    categorySlug: "steklo",
    name: "Прозрачное листовое стекло",
    summary: "[4–10] мм, резка по размеру",
    price: { kind: "from", amount: 4500, unit: "m2", draft: true },
    badge: "Хит",
    tags: ["home", "office"],
    image: null,
  },
  {
    slug: "zakalennoe-steklo",
    categorySlug: "steklo",
    name: "Закалённое стекло",
    summary: "[6–12] мм, в 5 раз прочнее обычного",
    price: { kind: "from", amount: 12000, unit: "m2", draft: true },
    badge: null,
    tags: ["home", "office", "tempered"],
    image: null,
  },
  {
    slug: "matovoe-steklo-satin",
    categorySlug: "steklo",
    name: "Матовое стекло «Сатин»",
    summary: "[4–10] мм, не пропускает взгляд",
    price: { kind: "from", amount: 7500, unit: "m2", draft: true },
    badge: null,
    tags: ["home", "office"],
    image: null,
  },
  {
    slug: "tonirovannoe-steklo",
    categorySlug: "steklo",
    name: "Тонированное стекло",
    summary: "Бронза и графит, [4–8] мм",
    price: { kind: "from", amount: 8000, unit: "m2", draft: true },
    badge: null,
    tags: ["home", "office"],
    image: null,
  },
  // Зеркала
  {
    slug: "zerkalo-serebro",
    categorySlug: "zerkala",
    name: "Зеркало серебро с полировкой",
    summary: "[4] мм, любой размер",
    price: { kind: "from", amount: 9000, unit: "m2", draft: true },
    badge: null,
    tags: ["home", "office"],
    image: null,
  },
  {
    slug: "zerkalo-s-podsvetkoj",
    categorySlug: "zerkala",
    name: "Зеркало с LED-подсветкой",
    summary: "Тёплый или холодный свет",
    price: { kind: "from", amount: 45000, unit: "piece", draft: true },
    badge: "Хит",
    tags: ["home", "installation"],
    image: null,
  },
  {
    slug: "figurnoe-zerkalo",
    categorySlug: "zerkala",
    name: "Фигурное зеркало",
    summary: "Круг, овал, арка или по шаблону",
    price: { kind: "from", amount: 18000, unit: "piece", draft: true },
    badge: null,
    tags: ["home"],
    image: null,
  },
  {
    slug: "zerkalo-s-facetom",
    categorySlug: "zerkala",
    name: "Зеркало с фацетом",
    summary: "Фаска [10–40] мм",
    price: { kind: "from", amount: 14000, unit: "m2", draft: true },
    badge: null,
    tags: ["home", "office"],
    image: null,
  },
  // Душевые перегородки
  {
    slug: "dushevaya-walk-in",
    categorySlug: "dushevye-peregorodki",
    name: "Перегородка Walk-in",
    summary: "Без двери, закалённое стекло [8] мм",
    price: { kind: "from", amount: 120000, unit: "piece", draft: true },
    badge: "С монтажом",
    tags: ["home", "installation", "tempered"],
    image: null,
  },
  {
    slug: "uglovaya-dushevaya",
    categorySlug: "dushevye-peregorodki",
    name: "Угловая душевая",
    summary: "Распашная дверь, [8] мм",
    price: { kind: "from", amount: 180000, unit: "piece", draft: true },
    badge: null,
    tags: ["home", "installation", "tempered"],
    image: null,
  },
  {
    slug: "dushevaya-v-nishu",
    categorySlug: "dushevye-peregorodki",
    name: "Душевая в нишу",
    summary: "Раздвижная дверь, [8] мм",
    price: { kind: "from", amount: 160000, unit: "piece", draft: true },
    badge: null,
    tags: ["home", "installation", "tempered"],
    image: null,
  },
  {
    slug: "shtorka-na-vannu",
    categorySlug: "dushevye-peregorodki",
    name: "Шторка на ванну",
    summary: "Неподвижная или поворотная",
    price: { kind: "from", amount: 65000, unit: "piece", draft: true },
    badge: null,
    tags: ["home", "installation", "tempered"],
    image: null,
  },
  // Стеклянные двери
  {
    slug: "raspashnaya-dver",
    categorySlug: "steklyannye-dveri",
    name: "Распашная дверь",
    summary: "[8–10] мм, петли в комплекте",
    price: { kind: "from", amount: 95000, unit: "piece", draft: true },
    badge: null,
    tags: ["home", "office", "installation", "tempered"],
    image: null,
  },
  {
    slug: "razdvizhnaya-dver",
    categorySlug: "steklyannye-dveri",
    name: "Раздвижная дверь",
    summary: "На роликовой системе",
    price: { kind: "from", amount: 140000, unit: "piece", draft: true },
    badge: "Хит",
    tags: ["home", "office", "installation", "tempered"],
    image: null,
  },
  {
    slug: "mayatnikovaya-dver",
    categorySlug: "steklyannye-dveri",
    name: "Маятниковая дверь",
    summary: "Для офисов и ресторанов",
    price: { kind: "individual" },
    badge: null,
    tags: ["office", "installation", "tempered"],
    image: null,
  },
  {
    slug: "dver-v-saunu",
    categorySlug: "steklyannye-dveri",
    name: "Дверь в сауну",
    summary: "Бронза, [8] мм",
    price: { kind: "from", amount: 85000, unit: "piece", draft: true },
    badge: null,
    tags: ["home", "installation", "tempered"],
    image: null,
  },
];

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
      categorySlug: "dushevye-peregorodki",
      label: "Под ключ",
      title: "Душевые из закалённого стекла",
      text: "Замер, изготовление и монтаж за [5] дней.",
      price: { kind: "from", amount: 65000, unit: "piece", draft: true },
      linkLabel: "Смотреть",
      image: null,
    },
    photoOrder: {
      label: "Заказ по фото",
      title: "Пришлите фото или чертёж",
      text: "Не знаете, как называется изделие? Отправьте снимок и размеры в Telegram, назовём цену и срок.",
      buttonLabel: "Отправить в Telegram",
    },
  },

  featuredCategorySlugs: ["steklo", "zerkala", "dushevye-peregorodki", "steklyannye-dveri"],
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
