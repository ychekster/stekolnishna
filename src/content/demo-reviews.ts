/**
 * DEMO reviews, written by us for the customer review of the design (2026-11-10). They are
 * NOT real clients' words and must be replaced with real reviews (with the client's
 * permission) or hidden before launch: fake reviews on a live site mislead buyers and break
 * advertising law. `npm run placeholders` lists every demo-*.ts file.
 * Each one matches a demo project in demo-portfolio.ts.
 */
import type { Testimonial } from "@/lib/content/types";

export const demoHomeReviews: Testimonial[] = [
  {
    quote:
      "Проём в ванной почти три метра, в двух местах сказали, что без рамы не получится. Здесь мастер на замере сразу предложил верхнюю перемычку и стекло потолще. Стоит уже полгода, ничего не шатается, и перемычку почти не видно.",
    author: "Айгерим С.",
    subject: "Душевая на 3 метра",
    avatar: null,
  },
  {
    quote:
      "Нужна была переговорная, но без стен: у нас окна только с одной стороны. Поставили стеклянную стену с дверью за один день, в субботу, офис даже не заметил. Матовая полоса на уровне глаз оказалась очень кстати.",
    author: "Ержан К.",
    subject: "Переговорная в офис",
    avatar: null,
  },
  {
    quote:
      "Заказывала зеркало во всю стену над двумя раковинами, одним куском. Боялась, что не занесут на девятый этаж, но ребята всё сделали аккуратно, на присосках. Цену назвали после замера, и она не поменялась.",
    author: "Мадина Т.",
    subject: "Зеркало с подсветкой",
    avatar: null,
  },
];

export const demoPortfolioReview: Testimonial = {
  quote:
    "Хотели убрать металлические перила на террасе и смотреть на горы. Сделали ограждение из триплекса, стыков почти не видно, ветер на террасе стал заметно слабее. Отдельное спасибо монтажникам: после них даже пыли не осталось.",
  author: "Дмитрий и Ольга",
  subject: "Ограждение террасы, Медеуский район",
  avatar: null,
};
