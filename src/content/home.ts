/**
 * PLACEHOLDER homepage content, taken from the design handoff (docs/design/reference.html).
 *
 * Images set to `null` render as grey-turquoise placeholders until the photos exist
 * (docs/photo-prompts.md). Testimonials are real reviews from 2GIS and Yandex Maps
 * (reviews.ts).
 * This file disappears once Payload CMS serves the homepage; read it only through
 * src/lib/content.
 */
import type { HomePage } from "@/lib/content/types";
import { routes } from "@/lib/routes";

import { homeReviews } from "./reviews";

export const homePageContent: HomePage = {
  seo: {
    title: "Стекло&Центр: стеклянные конструкции под ключ в Алматы",
    description:
      "Изготовление и монтаж изделий из стекла и зеркал в Алматы: перегородки, душевые, зеркала, ограждения. Собственное производство, бесплатный замер.",
  },

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
  },

  services: {
    title: "Направления",
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
    // Name, price and link come from the catalog; `image` picks a photo that reads better
    // on the 3:4 card than the section cover.
    categories: [
      {
        slug: "dushevye-kabiny",
        image: {
          src: "/images/catalog/dushevye-ugolki-iz-stekla/gallery-01.jpg",
          alt: "Душевой уголок из стекла",
        },
      },
      {
        slug: "steklyannye-peregorodki",
        image: {
          src: "/images/catalog/steklyannye-ofisnye-peregorodki/cover.jpg",
          alt: "Стеклянные офисные перегородки",
        },
      },
      {
        slug: "zerkala",
        image: {
          src: "/images/catalog/zerkalnye-steny/gallery-01.jpg",
          alt: "Зеркальная стена из фацетных зеркал",
        },
      },
      {
        slug: "ograzhdeniya-i-peregorodki",
        image: {
          src: "/images/catalog/ograzhdeniya-iz-nerzhavejki/gallery-01.jpg",
          alt: "Стеклянное ограждение балкона с поручнем из нержавейки",
        },
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
        description: "Изготовление от 3 рабочих дней, дату монтажа фиксируем письменно",
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
    title: "Проекты",
    lead: "Несколько работ последних месяцев",
    allProjectsLink: { label: "Смотреть все проекты", href: routes.portfolio },
    // Photo and link come from the portfolio project; `caption` is a shorter tile label.
    projects: [
      { slug: "steklyannaya-peregovornaya-v-ofise", caption: "Переговорная в офисе" },
      { slug: "dushevaya-na-tri-metra", caption: "Душевая на 3 метра" },
      { slug: "zerkalnaya-stena-v-fitnes-klube", caption: "Зеркальная стена в фитнес-клубе" },
      { slug: "ograzhdenie-lestnicy-na-spigotah", caption: "Ограждение лестницы в доме" },
      { slug: "vinnaya-komnata-so-steklyannymi-dveryami", caption: "Винная комната" },
    ],
  },

  process: {
    title: "Как мы работаем",
    lead: "Пять шагов от звонка до готовой конструкции",
    image: { src: "/images/home/process.jpg", alt: "Рука в перчатке на стекле душевой" },
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
    title: "Отзывы",
    // Real reviews of the workshop from 2GIS and Yandex Maps (reviews.ts).
    items: homeReviews,
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
