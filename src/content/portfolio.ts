/**
 * Content of the portfolio "Наши работы" (/nashi-raboty) and the project pages, from the
 * design mockups "Наши работы — десктоп" and "Проект — страница кейса".
 *
 * Projects are DEMO data (demo-portfolio.ts) for the customer review: replace them with real
 * completed orders before launch. The client quote is a real review (reviews.ts). The hero numbers
 * are confirmed facts instead of the mockup's order counts (the company is new).
 * Categories are the spec's portfolio filters (§3.4).
 *
 * This file disappears once Payload CMS serves projects; read it only through src/lib/content.
 */
import type { PortfolioPage, PortfolioProject } from "@/lib/content/types";

import { demoPortfolioProjects } from "./demo-portfolio";
import { portfolioReview } from "./reviews";

/** Shown in this order: the newest first, as the owner sorts them. */
export const portfolioProjects: PortfolioProject[] = demoPortfolioProjects;

const LEAD_FORM_TITLE = "Хотите такой же результат?";

export const portfolioPageContent: PortfolioPage = {
  seo: {
    title: "Наши работы: стеклянные конструкции в Алматы | Стекло&Центр",
    description:
      "Фото выполненных проектов Стекло&Центр в Алматы и области: душевые, зеркала, перегородки, стеклянные двери, ограждения и мебель из стекла.",
  },
  name: "Наши работы",
  hero: {
    title: "Наши работы.",
    subtitle: "Реальные объекты в Алматы и области.",
    stats: [
      { value: "Бесплатно", label: "замер по Алматы" },
      { value: "1 год", label: "гарантии на монтаж" },
    ],
  },
  featured: {
    projectSlug: "steklyannaya-peregovornaya-v-ofise",
    label: "Проект месяца",
    viewLabel: "Смотреть проект",
    wantLabel: "Хочу так же",
  },
  categories: [
    { category: "shower", label: "Душевые кабины" },
    { category: "mirror", label: "Зеркала" },
    { category: "partition", label: "Перегородки" },
    { category: "door", label: "Стеклянные двери" },
    { category: "railing", label: "Ограждения" },
    { category: "furniture", label: "Стеклянная мебель" },
    { category: "custom", label: "Индивидуальные проекты" },
  ],
  list: {
    title: "Все проекты",
    allLabel: "Все",
    shownLabel: "Показано: {shown} из {total}",
    moreLabel: "Показать ещё проекты",
    pageSize: 9,
    photosLabel: "{count} фото",
  },
  testimonial: {
    ...portfolioReview,
    image: {
      src: "/images/portfolio/testimonial.jpg",
      alt: "Терраса со стеклянным ограждением на закате",
    },
  },
  leadForm: {
    title: LEAD_FORM_TITLE,
    lead: "Пришлите фото помещения или проект дизайнера: подберём решение и рассчитаем стоимость. Замер по Алматы бесплатный.",
    detailsLabel: "Что хотите сделать",
    submitLabel: "Оставить заявку",
    successMessage: "Спасибо! Заявка отправлена, мы перезвоним в течение рабочего дня.",
  },
  project: {
    backLabel: "Все проекты",
    wantLabel: "Хочу так же",
    aboutTitle: "О проекте",
    materialsTitle: "Материалы",
    worksTitle: "Выполненные работы",
    previousLabel: "Предыдущий проект",
    nextLabel: "Следующий проект",
    morePhotosLabel: "+{count} фото",
    leadForm: {
      title: LEAD_FORM_TITLE,
      lead: "Пришлите фото помещения или проект дизайнера: подберём решение и рассчитаем стоимость.",
      detailsLabel: "Что хотите сделать",
      submitLabel: "Оставить заявку",
      successMessage: "Спасибо! Заявка отправлена, мы перезвоним в течение рабочего дня.",
    },
  },
};
