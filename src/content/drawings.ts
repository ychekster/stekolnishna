/**
 * GENERATED from the customer's catalog export (stekolni-master.kz): glass-drawing sample
 * sets of the "Рисунки на стекле" section. Images: public/images/catalog/risunki/<set>/NN.webp,
 * numbered in the source order; the number is what the client tells the manager.
 * The source site may cut long sets at 99 pictures (docs/backlog.md).
 * This file disappears once Payload CMS serves the catalog; read it only through src/lib/content.
 */
import type { DrawingSet } from "@/lib/content/types";

const sets: [slug: string, name: string, count: number][] = [
  ["cvety", "Цветы", 63],
  ["pticy", "Птицы", 42],
  ["derevya", "Деревья", 7],
  ["zhivotnye", "Животные", 5],
  ["chelovek", "Человек", 38],
  ["detskie", "Детские", 34],
  ["ugolki", "Уголки", 52],
  ["ramki-na-zerkala", "Рамки на зеркала", 99],
  ["vstavka-seredina", "Вставка в середину", 45],
  ["ieroglify", "Иероглифы", 44],
  ["zodiak", "Зодиак", 4],
  ["zdaniya", "Здания", 10],
  ["drakony-i-babochki", "Драконы и бабочки", 80],
  ["cvetnye-risunki", "Цветные рисунки", 99],
  ["risunok-s-matirovaniem", "С матированием", 99],
  ["obrazec", "Образцы", 5],
];

export const drawingSets: DrawingSet[] = sets.map(([slug, name, count]) => ({
  slug,
  name,
  images: Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      src: `/images/catalog/risunki/${slug}/${number}.webp`,
      alt: `Рисунок на стекле, набор «${name}», № ${number}`,
    };
  }),
}));
