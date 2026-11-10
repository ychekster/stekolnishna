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
import type {
  CatalogPage,
  CategoryPageCopy,
  DrawingsPageCopy,
  ProductPageCopy,
} from "@/lib/content/types";

export { catalogCategories, catalogProducts } from "./catalog-items";
export { drawingSets } from "./drawings";

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

/**
 * Copy shared by every category page (design handoff "Страница категории"). Facts the
 * customer has not confirmed are in [brackets].
 */
export const categoryPageCopy: CategoryPageCopy = {
  productForms: ["товар", "товара", "товаров"],
  leadTimeLabel: "Срок изготовления",
  filtersTitle: "Фильтры",
  filtersButton: "Фильтры",
  filtersApply: "Показать",
  resetFilters: "Сбросить фильтры",
  sectionsTitle: "Разделы каталога",
  foundLabel: "Найдено: {count}",
  sortLabel: "Сортировка",
  sorts: [
    { value: "popular", label: "Популярные" },
    { value: "price-asc", label: "Сначала дешевле" },
    { value: "price-desc", label: "Сначала дороже" },
  ],
  emptyResults: "С такими фильтрами товаров нет. Сбросьте фильтры или опишите задачу в форме ниже.",
  detailsLabel: "Подробнее",
  seoTitle: "{name} на заказ в Алматы",
  seoMoreLabel: "Развернуть",
  usefulLabel: "Полезно:",
  otherSectionsTitle: "Другие разделы каталога",
  noProducts: {
    priceLabel: "Цена",
    orderLabel: "Оставить заявку",
    telegramLabel: "Написать в Telegram",
    note: "Цену назовёт менеджер после заявки и замера.",
    scopeTitle: "Что входит в работу",
    scope: [
      {
        icon: "pin",
        title: "Замер",
        description: "Мастер приезжает на объект и снимает точные размеры",
      },
      {
        icon: "sliders",
        title: "Изготовление",
        description: "Режем и обрабатываем стекло на своём производстве",
      },
      {
        icon: "shield",
        title: "Фурнитура",
        description: "Подбираем крепления и фурнитуру под конструкцию",
      },
      {
        icon: "check",
        title: "Монтаж",
        description: "Устанавливаем, регулируем и убираем после работ",
      },
    ],
    projectsTitle: "Наши работы",
    allProjectsLabel: "Все проекты",
  },
  telegramLabel: "Написать в Telegram",
  leadForm: {
    title: "Подберём решение под ваш проект",
    lead: "Опишите задачу или пришлите фото места: менеджер уточнит детали и назовёт цену.",
    detailsLabel: "Комментарий: размеры, количество, пожелания",
    submitLabel: "Отправить заявку",
    successMessage: "Спасибо! Заявка отправлена, мы перезвоним в течение рабочего дня.",
  },
};

/** Copy of "Рисунки на стекле" (design handoff, state "Рисунки"). */
export const drawingsPageCopy: DrawingsPageCopy = {
  categorySlug: "risunki",
  howTitle: "Как выбрать рисунок",
  howSteps: [
    "Откройте набор и найдите образец",
    "Запомните номер в углу картинки",
    "Укажите номер в заявке или в Telegram",
  ],
  howButton: "Отправить номер в Telegram",
  countLabel: "{sets} наборов, {count} образцов",
  setsTitle: "Наборы",
  shownLabel: "Показано {shown} из {total}",
  pageSize: 24,
  moreLabel: "Показать ещё {count}",
  zoomHint: "Нажмите на образец, чтобы увеличить",
  chooseLabel: "Выбрать этот рисунок",
  noMatch: {
    title: "Нет подходящего рисунка?",
    text: "Нанесём узор по вашему эскизу, фото или логотипу.",
    buttonLabel: "Прислать эскиз",
  },
  sampleLabel: "Номер образца",
  samplePlaceholder: "Например: Цветы, № 12",
  leadForm: {
    title: "Закажите рисунок на стекле",
    lead: "Укажите номер образца и размеры изделия: менеджер уточнит детали и назовёт цену.",
    detailsLabel: "Комментарий: размеры, количество, пожелания",
    submitLabel: "Отправить заявку",
    successMessage: "Спасибо! Заявка отправлена, мы перезвоним в течение рабочего дня.",
  },
};

/** Copy shared by every product page (design handoff "Карточка товара"). */
export const productPageCopy: ProductPageCopy = {
  measureChip: "Замер [бесплатно по Алматы]",
  noOptions: "Размер, толщину и обработку подберём под ваш проект.",
  orderLabel: "Заказать",
  telegramLabel: "Написать в Telegram",
  priceNote: "Цену назовёт менеджер по заявке. В Telegram бот сразу передаст название товара.",
  descriptionTitle: "Описание",
  specsTitle: "Характеристики",
  similarTitle: "Похожие товары",
  allLabel: "Весь раздел",
  leadFormTitle: "Заказать: {name}",
  productFieldLabel: "Товар",
  leadForm: {
    title: "Заказать",
    lead: "Оставьте телефон: менеджер уточнит размеры и детали и назовёт цену.",
    detailsLabel: "Комментарий: размеры, количество, пожелания",
    submitLabel: "Отправить заявку",
    successMessage: "Спасибо! Заявка отправлена, мы перезвоним в течение рабочего дня.",
  },
};
