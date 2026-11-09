/**
 * PLACEHOLDER homepage content, taken from the design handoff (docs/design/reference.html).
 *
 * Values in [square brackets] are intentionally visible placeholders for the customer to
 * fill in. Images set to `null` render as grey-turquoise placeholders until real photos
 * exist. Testimonials must be real — never replace the placeholders with made-up reviews.
 * This file disappears once Payload CMS serves the homepage; read it only through
 * src/lib/content.
 */
import type { HomePage } from "@/lib/content/types";
import { routes } from "@/lib/routes";

const REVIEW_PLACEHOLDER =
  "[Настоящий отзыв клиента: что заказывали, как прошли замер и монтаж, что понравилось. 2–4 предложения.]";

export const homePageContent: HomePage = {
  hero: {
    title: "Стеклянные конструкции под ключ",
    lead: "Производство и монтаж: перегородки, душевые, зеркала, ограждения и фасадное остекление",
    image: {
      src: "/images/hero-glass.jpg",
      alt: "Стеклянный фасад и стопка листов закалённого стекла на фоне неба",
    },
    cta: { label: "Оставить заявку", href: routes.leadForm },
  },

  about: {
    title: "О компании",
    paragraphs: [
      "Мы стекольная мастерская полного цикла в Алматы. Сами режем и обрабатываем стекло на собственном производстве, а затем монтируем готовые конструкции в квартирах, домах, офисах и торговых помещениях.",
      "Работаем с частными клиентами, дизайнерами и строительными компаниями: от одного зеркала до остекления целого этажа.",
    ],
    stats: [
      { value: "[1 200] м²", label: "собственный цех" },
      { value: "от [3] дней", label: "срок изготовления" },
      { value: "[1]", label: "день до замера" },
      { value: "1 год", label: "гарантии на монтаж" },
    ],
  },

  services: {
    title: "Направления работы",
    lead: "Берём на себя весь путь стекла: от листа до готовой конструкции",
    items: [
      {
        icon: "sliders",
        title: "Производство",
        description: "Раскрой, закалка, шлифовка и полировка кромки, сверление, триплекс",
      },
      {
        icon: "check",
        title: "Монтаж под ключ",
        description: "Замер, доставка, установка фурнитуры и вывоз мусора после работ",
      },
      {
        icon: "document",
        title: "Для бизнеса",
        description: "Офисные перегородки, витрины, фасады и ограждения по договору с НДС",
      },
      {
        icon: "pin",
        title: "Для дома",
        description: "Душевые, зеркала с подсветкой, кухонные фартуки, межкомнатные двери",
      },
    ],
  },

  catalog: {
    title: "Популярные категории",
    lead: "Изготавливаем по вашим размерам, цена зависит от толщины стекла и фурнитуры",
    items: [
      {
        title: "Душевые кабины",
        href: routes.catalogCategory("dushevye-kabiny"),
        image: {
          src: "/images/catalog/dushevye-ugolki-iz-stekla/gallery-01.jpg",
          alt: "Душевой уголок из стекла",
        },
        price: { kind: "from", amount: 100000, unit: "piece" },
      },
      {
        title: "Стеклянные перегородки",
        href: routes.catalogCategory("steklyannye-peregorodki"),
        image: {
          src: "/images/catalog/steklyannye-ofisnye-peregorodki/cover.jpg",
          alt: "Стеклянные офисные перегородки",
        },
        price: { kind: "from", amount: 25000, unit: "m2" },
      },
      {
        title: "Зеркала и панно",
        href: routes.catalogCategory("zerkala"),
        image: {
          src: "/images/catalog/zerkalnye-steny/gallery-01.jpg",
          alt: "Зеркальная стена из фацетных зеркал",
        },
        price: { kind: "from", amount: 15000, unit: "m2" },
      },
      {
        title: "Стеклянные ограждения",
        href: routes.catalogCategory("ograzhdeniya-i-peregorodki"),
        image: {
          src: "/images/catalog/ograzhdeniya-iz-nerzhavejki/gallery-01.jpg",
          alt: "Стеклянное ограждение балкона с поручнем из нержавейки",
        },
        price: { kind: "from", amount: 30000, unit: "m2" },
      },
    ],
  },

  advantages: {
    title: "Почему выбирают нас",
    items: [
      {
        title: "Собственное производство",
        description: "Без посредников: контролируем качество и цену на каждом этапе",
      },
      {
        title: "Бесплатный замер",
        description: "Мастер приедет с образцами стекла и фурнитуры в удобное время",
      },
      {
        title: "Безопасное закалённое стекло",
        description: "В разы прочнее обычного, а при разрушении не даёт острых осколков",
      },
      {
        title: "Сроки в договоре",
        description: "Изготовление от [N] рабочих дней, дату монтажа фиксируем письменно",
      },
      {
        title: "Гарантия на работы",
        description: "1 год на монтаж и фурнитуру. Приедем и устраним, если что-то не так",
      },
      {
        title: "Честная смета",
        description: "Цена после замера окончательная, без доплат в день установки",
      },
    ],
  },

  projects: {
    title: "Выполненные проекты",
    lead: "Несколько работ последних месяцев",
    allProjectsLink: { label: "Смотреть все проекты", href: routes.portfolio },
    items: [
      { caption: "Офисные перегородки в БЦ, [район]", href: null, image: null },
      { caption: "Душевая в квартире", href: null, image: null },
      { caption: "Зеркальная стена в фитнес-клубе", href: null, image: null },
      { caption: "Ограждение лестницы в частном доме", href: null, image: null },
      { caption: "Витрина магазина", href: null, image: null },
    ],
  },

  process: {
    title: "Как мы работаем",
    lead: "Пять шагов от звонка до готовой конструкции",
    image: null,
    badge: "Бесплатный замер",
    steps: [
      {
        icon: "chat",
        title: "Заявка и консультация",
        description:
          "Расскажите о задаче по телефону, в Telegram или через форму, и мы подскажем подходящее стекло и фурнитуру",
      },
      {
        icon: "pin",
        title: "Замер на объекте",
        description:
          "Мастер приезжает с образцами, делает точные замеры и предлагает варианты исполнения",
      },
      {
        icon: "document",
        title: "Смета и договор",
        description: "Фиксируем стоимость, сроки и комплектацию в договоре, берём предоплату",
      },
      {
        icon: "sliders",
        title: "Изготовление",
        description: "Режем и обрабатываем стекло на своём производстве",
      },
      {
        icon: "check",
        title: "Доставка и монтаж",
        description: "Привозим, устанавливаем, убираем за собой и передаём гарантийный талон",
      },
    ],
  },

  testimonials: {
    title: "Отзывы клиентов",
    items: [
      {
        quote: REVIEW_PLACEHOLDER,
        author: "[Имя Фамилия]",
        subject: "[Душевое ограждение]",
        avatar: null,
      },
      {
        quote: REVIEW_PLACEHOLDER,
        author: "[Имя Фамилия]",
        subject: "[Перегородки в офис]",
        avatar: null,
      },
      {
        quote: REVIEW_PLACEHOLDER,
        author: "[Имя Фамилия]",
        subject: "[Зеркала с подсветкой]",
        avatar: null,
      },
    ],
  },

  leadForm: {
    title: "Рассчитаем стоимость вашего проекта",
    lead: "Оставьте заявку: перезвоним в течение рабочего дня, ответим на вопросы и запишем на бесплатный замер.",
    detailsLabel: "Что нужно изготовить",
    submitLabel: "Оставить заявку",
    successMessage: "Спасибо! Заявка отправлена, мы перезвоним в течение рабочего дня.",
  },

  contacts: {
    title: "Контакты",
  },
};
