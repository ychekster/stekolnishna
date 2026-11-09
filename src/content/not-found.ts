/**
 * Copy of the 404 page, from the design mockup "404".
 * This file disappears once Payload CMS serves it; read it only through src/lib/content.
 */
import type { NotFoundPage } from "@/lib/content/types";

export const notFoundPageContent: NotFoundPage = {
  title: "Страница разбилась.",
  titleMuted: "Но мы её склеим.",
  text: "Возможно, ссылка устарела или в адресе опечатка. Зато всё остальное на месте.",
  homeLabel: "На главную",
  catalogLabel: "В каталог",
  image: {
    src: "/images/hero-glass.jpg",
    alt: "Стеклянный фасад и стопка листов закалённого стекла",
  },
};
