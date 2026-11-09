/**
 * Russian plural form for a number: 1 товар, 2 товара, 5 товаров, 11 товаров, 21 товар.
 */
import type { PluralForms } from "@/lib/content/types";

export function pluralRu(count: number, [one, few, many]: PluralForms): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

/** "6 товаров". */
export function formatCount(count: number, forms: PluralForms): string {
  return `${count} ${pluralRu(count, forms)}`;
}
