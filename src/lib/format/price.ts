/**
 * Price formatting for catalog cards (Russian UI, tenge).
 */
import type { Price, PriceUnit } from "@/lib/content/types";

/** Shown instead of a number until the owner sets real prices. Visible on purpose. */
const PRICE_PLACEHOLDER = "[цена]";

const UNIT_SUFFIX: Record<PriceUnit, string> = {
  piece: "",
  m2: "/м²",
  "linear-m": "/м.п.",
};

const amountFormatter = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });

/**
 * Formats a price label, e.g. `от 25 000 ₸/м²` or `Цена рассчитывается индивидуально`.
 * Uses a non-breaking space before ₸ so the currency never wraps onto its own line.
 */
export function formatPrice(price: Price): string {
  if (price.kind === "individual") {
    return "Цена рассчитывается индивидуально";
  }
  if (price.amount === null) return `от ${PRICE_PLACEHOLDER} ₸${UNIT_SUFFIX[price.unit]}`;
  const number = amountFormatter.format(price.amount);
  const amount = price.draft ? `[${number}]` : number;
  return `от ${amount} ₸${UNIT_SUFFIX[price.unit]}`;
}
