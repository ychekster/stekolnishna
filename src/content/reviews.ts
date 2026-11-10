/**
 * Real client reviews of the customer's workshop, collected 2026-11-10 from its 2GIS and
 * Yandex Maps cards (the cards of «Стекольный мастер», stekolni-master.kz, prospekt Suyunbaya
 * 43/1: the customer's own business, see docs/tz-annotated.md §3.2). Texts are verbatim, typos
 * and emoji included: never edit them. Each links to the card's review page (platforms give no
 * permalink per review; 2GIS review IDs are in the comments).
 *
 * Ask the customer before launch that publishing them is fine (docs/open-questions.md).
 * This file disappears once Payload CMS serves reviews; read it only through src/lib/content.
 */
import type { ReviewSource, Testimonial } from "@/lib/content/types";

const TWO_GIS: ReviewSource = {
  label: "2ГИС",
  url: "https://2gis.kz/almaty/firm/9429940001545377/tab/reviews",
};
const YANDEX: ReviewSource = {
  label: "Яндекс Карты",
  url: "https://yandex.kz/maps/org/aynek_sheberi/1797587374/reviews/",
};

// 2GIS review 295761300.
const vorobtsov: Testimonial = {
  quote:
    "Отличная мастерская. Заказывал фасады из закалённого стекла, очень доволен результатом. Размеры не гуляют, фаски и отверстия ровные. Мастера приветливые и отзывчивые, все объясняют, советуют, подсказывают. Приятно иметь дело.",
  author: "Александр Воробцов",
  subject: "Фасады из закалённого стекла",
  avatar: null,
  rating: 5,
  date: "10 сентября 2026",
  source: TWO_GIS,
};

const malikovich: Testimonial = {
  quote:
    'Заказывал каленое стекло на лестничные перила, сделали быстро, дали лучшую цену без хитростей типа: "за каждое отверстие у нас доплата, за фаску доплата..."',
  author: "Юрий Маликович",
  subject: "Закалённое стекло для перил лестницы",
  avatar: null,
  rating: 5,
  date: "12 марта 2018",
  source: YANDEX,
};

// 2GIS review 309910817.
const tabyldy: Testimonial = {
  quote:
    "Хорошая компания, остался доволен работой. Всё сделали качественно и аккуратно, персонал вежливый, всё объяснили. Видно, что ребята знают своё дело. Спасибо за хорошую работу! Рекомендую 👍",
  author: "Nursultan Tabyldy",
  subject: null,
  avatar: null,
  rating: 5,
  date: "26 октября 2026",
  source: TWO_GIS,
};

// 2GIS review 83812591.
const demelbaeva: Testimonial = {
  quote:
    "Спасибо за выполненный заказ. Сделали недорого и в срок. Заказывала зеркало с подсветкой в прихожку. Особенное спасибо цеху за упаковку в стретч плёнку.",
  author: "Динара Демельбаева",
  subject: "Зеркало с подсветкой в прихожую",
  avatar: null,
  rating: 5,
  date: "25 мая 2024",
  source: TWO_GIS,
};

// 2GIS review 227074271.
const nurpeisov: Testimonial = {
  quote:
    "Большое спасибо руководству в лице Рината! Оперативно ответили, собрали упаковали! Материалы были направлены в город Костанай.",
  author: "Азамат Нурпеисов",
  subject: "Отправка материалов в Костанай",
  avatar: null,
  rating: 5,
  date: "5 марта 2026",
  source: TWO_GIS,
};

// 2GIS review 83698063.
const r1k0: Testimonial = {
  quote: "Заказывал круглое зеркало и полки стеклянные в ванную. Сделали аккуратно, качественно.",
  author: "r1k0[k0]",
  subject: "Круглое зеркало и стеклянные полки",
  avatar: null,
  rating: 5,
  date: "24 мая 2024",
  source: TWO_GIS,
};

/** Homepage carousel, newest and most detailed first. */
export const homeReviews: Testimonial[] = [
  vorobtsov,
  tabyldy,
  demelbaeva,
  r1k0,
  nurpeisov,
  malikovich,
];

/** The quote on the portfolio page: railings, next to the terrace photo. */
export const portfolioReview: Testimonial = malikovich;
