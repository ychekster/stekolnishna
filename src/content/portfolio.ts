/**
 * PLACEHOLDER content of the portfolio "Наши работы" (/nashi-raboty) and the project pages,
 * taken from the design mockups "Наши работы — десктоп" and "Проект — страница кейса".
 *
 * The mockups' projects, numbers and the client quote are a designer's draft, not the
 * customer's real orders: every concrete fact is wrapped in [square brackets] and every
 * photo is a placeholder until the customer sends real completed projects
 * (docs/open-questions.md). Reviews must be real: never replace the placeholder quote with
 * a made-up one. Categories are the spec's portfolio filters (§3.4).
 *
 * This file disappears once Payload CMS serves projects; read it only through src/lib/content.
 */
import type { PortfolioPage, PortfolioProject, ProjectCategory } from "@/lib/content/types";

const DESCRIPTION_PLACEHOLDER = [
  "[Задача клиента: что было на объекте и чего хотели добиться.]",
  "[Наше решение: какое стекло и фурнитуру выбрали, как прошли замер, изготовление и монтаж, сколько заняло времени.]",
];

const WORKS_PLACEHOLDER = ["[Замер и проект]", "[Изготовление]", "[Доставка и монтаж]"];

/** A project from the mockup's grid: only the card facts are known, the rest is a template. */
function draftProject(
  slug: string,
  category: ProjectCategory,
  title: string,
  place: string,
  year: string,
  materials: string[],
): PortfolioProject {
  return {
    slug,
    category,
    title: `[${title}]`,
    place: `[${place}]`,
    year: `[${year}]`,
    summary: `[${materials.join(", ")}]`,
    excerpt: "[Короткий рассказ о проекте: задача и результат в двух предложениях.]",
    cover: null,
    gallery: [],
    description: DESCRIPTION_PLACEHOLDER,
    materials: materials.map((item) => `[${item}]`),
    works: WORKS_PLACEHOLDER,
    facts: [],
    testimonial: null,
    seo: null,
  };
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "ofis-it-kompanii",
    category: "partition",
    title: "[Офис IT-компании на 420 м²]",
    place: "[БЦ «Название», Бостандыкский район]",
    year: "[2025]",
    summary: "[Закалённое стекло 10 мм, графитовый профиль, матовая полоса]",
    excerpt:
      "[Разделили open space на переговорные и кабинеты, сохранив дневной свет по всему этажу. Работы шли по вечерам, чтобы офис не останавливался.]",
    cover: null,
    gallery: [],
    description: [
      "[Компания переехала на открытый этаж и хотела отдельные переговорные и кабинеты, не теряя дневного света. Мы предложили цельностеклянные перегородки из закалённого стекла 10 мм в тонком графитовом профиле и матовую полосу на уровне глаз для приватности.]",
      "[Монтаж вели вечерами и в выходные, чтобы офис продолжал работать. Весь объект, от замера до сдачи, занял 18 дней.]",
    ],
    materials: [
      "[Закалённое стекло 10 мм, 64 м²]",
      "[Алюминиевый профиль, графит]",
      "[Матовая плёнка-полоса]",
      "[Раздвижные системы с доводчиком]",
    ],
    works: [
      "[Замер и проект]",
      "[Раскрой и закалка стекла]",
      "[Монтаж 9 дверей и 6 перегородок]",
      "[Уборка и вывоз мусора]",
    ],
    facts: [
      { label: "Площадь", value: "[420 м²]" },
      { label: "Срок", value: "[18 дней]" },
    ],
    testimonial: {
      quote:
        "[Настоящий отзыв клиента об этом проекте, с его разрешения на публикацию. 1–2 предложения.]",
      author: "[Имя, должность]",
    },
    seo: null,
  },
  draftProject(
    "walk-in-dushevaya",
    "shower",
    "Walk-in душевая с графитовым профилем",
    "ЖК «Название», Медеуский район",
    "2025",
    ["Закалённое стекло 8 мм", "фурнитура матовый чёрный"],
  ),
  draftProject(
    "peregovornye-yuridicheskoj-firmy",
    "partition",
    "Переговорные для юридической фирмы",
    "БЦ, Алмалинский район",
    "2025",
    ["Триплекс 10 мм", "раздвижные двери"],
  ),
  draftProject(
    "zerkalnaya-stena-v-fitnes-zale",
    "mirror",
    "Зеркальная стена в фитнес-зале",
    "Фитнес-клуб, Ауэзовский район",
    "2025",
    ["Зеркало серебро 6 мм", "48 м²"],
  ),
  draftProject(
    "ograzhdenie-lestnicy-v-dome",
    "railing",
    "Ограждение лестницы в частном доме",
    "Каскелен",
    "2025",
    ["Закалённый триплекс 12 мм", "точечное крепление"],
  ),
  draftProject(
    "razdvizhnaya-dver-kuhnya-gostinaya",
    "door",
    "Раздвижная дверь между кухней и гостиной",
    "Квартира, мкр. Самал",
    "2024",
    ["Стекло «Сатин» 8 мм", "роликовая система"],
  ),
  draftProject(
    "steklyannyj-obedennyj-stol",
    "furniture",
    "Стеклянный обеденный стол",
    "Дом, Талгар",
    "2024",
    ["Осветлённое стекло 12 мм", "полировка кромки"],
  ),
  draftProject(
    "zerkalo-s-podsvetkoj-v-vannoj",
    "mirror",
    "Зеркало с подсветкой в ванной",
    "Квартира, мкр. Аксай",
    "2025",
    ["Зеркало 5 мм", "LED тёплый свет", "фацет 15 мм"],
  ),
  draftProject(
    "vitriny-yuvelirnogo-butika",
    "custom",
    "Витрины для ювелирного бутика",
    "ТРЦ, Бостандыкский район",
    "2024",
    ["Осветлённое закалённое стекло", "подсветка"],
  ),
  draftProject(
    "uglovaya-dushevaya-v-mansarde",
    "shower",
    "Угловая душевая в мансарде",
    "Дом, Есик",
    "2024",
    ["Закалённое стекло 8 мм", "скошенный край"],
  ),
  draftProject(
    "mezhkomnatnaya-peregorodka-loft",
    "partition",
    "Межкомнатная перегородка-лофт",
    "Квартира, ЖК «Название»",
    "2025",
    ["Прозрачное стекло 8 мм", "чёрный профиль"],
  ),
  draftProject(
    "balkonnoe-ograzhdenie-v-penthause",
    "railing",
    "Балконное ограждение в пентхаусе",
    "ЖК, Медеуский район",
    "2025",
    ["Триплекс 16 мм", "зажимной профиль"],
  ),
  draftProject(
    "kozyrek-nad-vhodom-v-restoran",
    "custom",
    "Козырёк над входом в ресторан",
    "Ресторан, ул. Название",
    "2024",
    ["Триплекс 12 мм", "вантовое крепление"],
  ),
];

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
      { value: "[3000+]", label: "выполненных заказов" },
      { value: "[400+]", label: "объектов за [2025] год" },
    ],
  },
  featured: {
    projectSlug: "ofis-it-kompanii",
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
    quote:
      "[Настоящий отзыв клиента: что заказывали, как прошли замер и монтаж, что понравилось. 2–3 предложения.]",
    author: "[Имя клиента]",
    subject: "[Что заказывали, где]",
    avatar: null,
    image: null,
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
