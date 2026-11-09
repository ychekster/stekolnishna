/**
 * PLACEHOLDER content of the SEO landing pages (spec §6, design handoff "SEO-лендинг"). Each
 * entry is its own page at `/<slug>`, listed in the footer column "Популярные услуги".
 *
 * Offer cards point at catalog sections, products or services: their prices and photos come
 * from there (src/lib/catalog/offers.ts), so a landing cannot contradict the catalog. Facts
 * the customer has not confirmed are in [brackets]; the 1-year warranty is confirmed
 * (2026-11-09). "Закалённое стекло" is not published until the customer confirms tempering
 * (no own furnace, docs/open-questions.md). SEO texts beyond the first paragraphs are for a
 * copywriter.
 *
 * This file disappears once Payload CMS serves the landings; read it only through src/lib/content.
 */
import type { AdvantageItem, LeadFormContent, SeoLanding } from "@/lib/content/types";

const ADVANTAGES: AdvantageItem[] = [
  {
    title: "Своё производство",
    description: "Режем и обрабатываем стекло в своём цехе, без посредников.",
  },
  {
    title: "Замер на объекте",
    description: "Мастер приезжает с образцами стекла и фурнитуры.",
  },
  {
    title: "Сроки в договоре",
    description: "Срок изготовления фиксируем письменно.",
  },
  {
    title: "Гарантия",
    description: "1 год на монтаж и фурнитуру.",
  },
];

const FAQ_LEAD = "Не нашли ответ? Напишите нам в Telegram.";
const ASK_LABEL = "Задать вопрос";

function leadForm(title: string, lead: string): LeadFormContent {
  return {
    title,
    lead,
    detailsLabel: "Комментарий: размеры, количество, пожелания",
    submitLabel: "Отправить заявку",
    successMessage: "Спасибо! Заявка отправлена, мы перезвоним в течение рабочего дня.",
  };
}

const MEASURE_FACT = { value: "[Бесплатно]", label: "замер по Алматы" };
const WARRANTY_FACT = { value: "1 год", label: "гарантия на монтаж" };
const OFFERS_NOTE = "Точную цену менеджер назовёт по заявке после замера.";
const OFFER_LINK = "В каталог";
const CATALOG_LINK = "Весь раздел";

export const seoLandings: SeoLanding[] = [
  {
    slug: "izgotovlenie-stekla-almaty",
    navLabel: "Изготовление стекла в Алматы",
    seo: {
      title: "Изготовление стекла на заказ в Алматы: цены | Стекло&Центр",
      description:
        "Изготовление изделий из стекла по вашим размерам в Алматы: перегородки, душевые, зеркала, ограждения, мебель. Своё производство, замер и монтаж.",
    },
    categorySlug: "steklo",
    hero: {
      title: "Изготовление стекла в Алматы",
      lead: "Режем, обрабатываем и устанавливаем стекло по вашим размерам: от одной полки до остекления этажа.",
      image: { src: "/images/catalog/steklo/cover.jpg", alt: "Листы стекла на производстве" },
    },
    facts: [
      { value: "от 1–2 дней", label: "изготовление простых изделий" },
      { value: "[4–19 мм]", label: "толщина стекла" },
      MEASURE_FACT,
      WARRANTY_FACT,
    ],
    offers: {
      title: "Что мы делаем.",
      subtitle: "Цены от.",
      note: OFFERS_NOTE,
      linkLabel: OFFER_LINK,
      items: [
        { kind: "category", slug: "steklo" },
        { kind: "category", slug: "steklyannye-peregorodki" },
        { kind: "category", slug: "dushevye-kabiny" },
        { kind: "category", slug: "zerkala" },
        { kind: "category", slug: "ograzhdeniya-i-peregorodki" },
        { kind: "category", slug: "steklyannaya-mebel" },
      ],
    },
    catalog: {
      title: "Популярное из каталога",
      categorySlugs: ["steklo", "steklyannaya-mebel", "zerkala"],
      linkLabel: CATALOG_LINK,
    },
    projects: { title: "Наши работы", category: "custom" },
    advantages: { title: "Почему заказывают у нас", items: ADVANTAGES },
    process: { title: "Как заказать", lead: "От заявки до готового изделия" },
    faq: {
      title: "Вопросы и ответы",
      lead: FAQ_LEAD,
      askLabel: ASK_LABEL,
      items: [
        {
          question: "Можно заказать стекло по своим размерам?",
          answer:
            "Да, всё изготавливаем по вашим размерам или чертежу. Пришлите размеры в заявке или в Telegram.",
        },
        {
          question: "Какой толщины бывает стекло?",
          answer: "Работаем со стеклом толщиной [от 4 до 19 мм]. Толщину подберём под задачу.",
        },
        {
          question: "Сколько времени занимает изготовление?",
          answer:
            "Простые изделия от 1–2 дней, конструкции дольше. Точный срок фиксируем в договоре.",
        },
        {
          question: "Вы устанавливаете изделия?",
          answer: "Да, привозим и монтируем по Алматы [и области], убираем после работ.",
        },
        {
          question: "Даёте ли гарантию?",
          answer: "Да, на монтаж и фурнитуру действует гарантия 1 год.",
        },
      ],
    },
    leadForm: leadForm(
      "Узнайте цену вашего изделия",
      "Пришлите размеры или фото: менеджер уточнит детали и назовёт цену.",
    ),
    contactsTitle: "Контакты",
    seoText: {
      title: "Изготовление стекла на заказ: что важно знать",
      blocks: [
        {
          kind: "paragraph",
          text: "Изделия из стекла делаем на своём производстве в Алматы: режем листы по размерам, обрабатываем кромку, сверлим отверстия и устанавливаем готовые конструкции.",
        },
        {
          kind: "paragraph",
          text: "[SEO-текст для копирайтера: виды стекла, где применяется, как выбрать толщину, от чего зависит цена.]",
        },
      ],
    },
  },
  {
    slug: "rezka-stekla-na-zakaz",
    navLabel: "Резка стекла на заказ",
    seo: {
      title: "Резка стекла на заказ в Алматы по размерам | Стекло&Центр",
      description:
        "Прямая и фигурная резка стекла и зеркал по вашим размерам в Алматы. Обработка кромки, сверление, фацет. Своё производство.",
    },
    categorySlug: "steklo",
    hero: {
      title: "Резка стекла на заказ в Алматы",
      lead: "Прямая и фигурная резка стекла и зеркал по вашим размерам или чертежу, с обработкой кромки.",
      image: { src: "/images/catalog/steklo/cover.jpg", alt: "Листы стекла, вид на кромку" },
    },
    facts: [
      { value: "[в день обращения]", label: "простая резка" },
      { value: "[0,5 мм]", label: "точность реза" },
      { value: "[4–19 мм]", label: "толщина стекла" },
      { value: "[до 3210 × 2250 мм]", label: "размер листа" },
    ],
    offers: {
      title: "Что мы делаем.",
      subtitle: "Цены от.",
      note: OFFERS_NOTE,
      linkLabel: "Подробнее",
      items: [
        { kind: "service", slug: "rezka" },
        { kind: "service", slug: "obrabotka-kromki" },
        { kind: "service", slug: "sverlenie" },
        { kind: "service", slug: "facet" },
        { kind: "service", slug: "zerkala" },
        { kind: "service", slug: "dostavka" },
      ],
    },
    catalog: {
      title: "Стекло из каталога",
      categorySlugs: ["steklo", "steklyannaya-mebel"],
      linkLabel: CATALOG_LINK,
    },
    projects: null,
    advantages: { title: "Почему заказывают у нас", items: ADVANTAGES },
    process: { title: "Как заказать резку", lead: "От заявки до готовых деталей" },
    faq: {
      title: "Вопросы и ответы",
      lead: FAQ_LEAD,
      askLabel: ASK_LABEL,
      items: [
        {
          question: "Сколько стоит резка стекла?",
          answer:
            "Цена зависит от толщины и длины реза: [от 300 ₸ за погонный метр]. Точную стоимость назовёт менеджер.",
        },
        {
          question: "Можно ли вырезать фигуру по шаблону?",
          answer: "Да, делаем фигурную резку по шаблону, чертежу или эскизу.",
        },
        {
          question: "Режете ли вы стекло заказчика?",
          answer: "[Уточняется: принимаем ли стекло заказчика и на каких условиях.]",
        },
        {
          question: "Как быстро будет готово?",
          answer: "Простую резку делаем [в день обращения], сложные заказы дольше.",
        },
        {
          question: "Можно ли сразу обработать кромку?",
          answer: "Да, шлифуем и полируем кромку, сверлим отверстия и делаем фацет.",
        },
      ],
    },
    leadForm: leadForm(
      "Узнайте цену резки",
      "Пришлите размеры или чертёж: менеджер уточнит детали и назовёт цену.",
    ),
    contactsTitle: "Контакты",
    seoText: {
      title: "Резка стекла по размерам: что важно знать",
      blocks: [
        {
          kind: "paragraph",
          text: "Режем листовое стекло и зеркала по вашим размерам на своём производстве. После резки кромку можно отшлифовать или отполировать, чтобы о неё нельзя было порезаться.",
        },
        {
          kind: "paragraph",
          text: "[SEO-текст для копирайтера: виды резки, допуски, какую кромку выбрать, как подготовить размеры.]",
        },
      ],
    },
  },
  {
    slug: "izgotovlenie-zerkal-almaty",
    navLabel: "Изготовление зеркал",
    seo: {
      title: "Изготовление зеркал на заказ в Алматы | Стекло&Центр",
      description:
        "Зеркала по вашим размерам в Алматы: на стену и потолок, с фацетом, для ванной, зеркальные стены и панно. Изготовление и монтаж.",
    },
    categorySlug: "zerkala",
    hero: {
      title: "Изготовление зеркал в Алматы",
      lead: "Зеркала по вашим размерам: на стену и потолок, с фацетом, для ванной, зеркальные стены и панно.",
      image: { src: "/images/catalog/zerkala/cover.jpeg", alt: "Зеркала и панно" },
    },
    facts: [
      { value: "от 3 дней", label: "изготовление" },
      { value: "[4–6 мм]", label: "толщина зеркала" },
      MEASURE_FACT,
      WARRANTY_FACT,
    ],
    offers: {
      title: "Какие зеркала мы делаем.",
      subtitle: "Цены от.",
      note: OFFERS_NOTE,
      linkLabel: OFFER_LINK,
      items: [
        { kind: "product", slug: "zerkala-na-stenu" },
        { kind: "product", slug: "facetnoe-zerkalo" },
        { kind: "product", slug: "zerkala-dlya-vannoj" },
        { kind: "product", slug: "zerkalnye-steny" },
        { kind: "product", slug: "zerkalnoe-panno-na-stenu" },
        { kind: "product", slug: "zerkala-na-potolok" },
      ],
    },
    catalog: {
      title: "Зеркала из каталога",
      categorySlugs: ["zerkala"],
      linkLabel: CATALOG_LINK,
    },
    projects: { title: "Наши работы", category: "mirror" },
    advantages: { title: "Почему заказывают у нас", items: ADVANTAGES },
    process: { title: "Как заказать зеркало", lead: "От заявки до установленного зеркала" },
    faq: {
      title: "Вопросы и ответы",
      lead: FAQ_LEAD,
      askLabel: ASK_LABEL,
      items: [
        {
          question: "Сколько стоит зеркало на заказ?",
          answer:
            "Цена зависит от размера, формы и обработки: от 5 000 ₸ за м². Точную стоимость назовёт менеджер.",
        },
        {
          question: "Можно сделать зеркало любой формы?",
          answer: "Да, режем круглые, овальные и фигурные зеркала по шаблону или эскизу.",
        },
        {
          question: "Что такое фацет?",
          answer:
            "Это скошенная по краю кромка шириной [10–40 мм]: она красиво преломляет свет и делает зеркало дороже на вид.",
        },
        {
          question: "Подойдёт ли зеркало для ванной?",
          answer:
            "Да, для ванной используем влагостойкие зеркала и правильно герметизируем кромку.",
        },
        {
          question: "Вы устанавливаете зеркала?",
          answer: "Да, привозим, монтируем на стену или потолок и убираем после работ.",
        },
      ],
    },
    leadForm: leadForm(
      "Подберём зеркало под ваш интерьер",
      "Опишите задачу или пришлите фото места: менеджер уточнит детали и назовёт цену.",
    ),
    contactsTitle: "Контакты",
    seoText: {
      title: "Зеркала на заказ: что важно знать",
      blocks: [
        {
          kind: "paragraph",
          text: "Зеркало по индивидуальным размерам точно встаёт в нишу, на стену или дверь шкафа. Мы режем полотно под ваш проект, обрабатываем кромку и готовим отверстия под крепления.",
        },
        {
          kind: "paragraph",
          text: "[SEO-текст для копирайтера: виды зеркал, обработка кромки, как выбрать зеркало для ванной и прихожей.]",
        },
      ],
    },
  },
  {
    slug: "steklyannye-peregorodki-almaty",
    navLabel: "Стеклянные перегородки",
    seo: {
      title: "Стеклянные перегородки в Алматы: офисные и межкомнатные | Стекло&Центр",
      description:
        "Стеклянные перегородки на заказ в Алматы: офисные, межкомнатные, раздвижные, лофт. Изготовление по размерам, монтаж под ключ.",
    },
    categorySlug: "steklyannye-peregorodki",
    hero: {
      title: "Стеклянные перегородки в Алматы",
      lead: "Офисные и межкомнатные перегородки из закалённого стекла: стационарные, раздвижные, с дверями и в стиле лофт.",
      image: {
        src: "/images/catalog/steklyannye-ofisnye-peregorodki/cover.jpg",
        alt: "Стеклянные офисные перегородки",
      },
    },
    facts: [
      { value: "от 7–10 дней", label: "изготовление" },
      { value: "[8–12 мм]", label: "закалённое стекло" },
      MEASURE_FACT,
      WARRANTY_FACT,
    ],
    offers: {
      title: "Какие перегородки мы делаем.",
      subtitle: "Цены от.",
      note: OFFERS_NOTE,
      linkLabel: OFFER_LINK,
      items: [
        { kind: "product", slug: "steklyannye-ofisnye-peregorodki" },
        { kind: "product", slug: "mezhkomnatnye-peregorodki" },
        { kind: "product", slug: "razdvizhnye-steklyannye-peregorodki" },
        { kind: "product", slug: "peregorodki-v-stile-loft" },
        { kind: "product", slug: "celnosteklyannye-peregorodki-s-raspashnymi-dveryami" },
        { kind: "product", slug: "peregorodki-umnoe-steklo" },
      ],
    },
    catalog: {
      title: "Перегородки из каталога",
      categorySlugs: ["steklyannye-peregorodki"],
      linkLabel: CATALOG_LINK,
    },
    projects: { title: "Наши работы", category: "partition" },
    advantages: { title: "Почему заказывают у нас", items: ADVANTAGES },
    process: { title: "Как заказать перегородку", lead: "От заявки до готовой перегородки" },
    faq: {
      title: "Вопросы и ответы",
      lead: FAQ_LEAD,
      askLabel: ASK_LABEL,
      items: [
        {
          question: "Сколько стоит стеклянная перегородка?",
          answer:
            "Цена зависит от площади, стекла и фурнитуры: от 25 000 ₸ за м². Точную стоимость назовёт менеджер после замера.",
        },
        {
          question: "Можно ли сделать перегородку с дверью?",
          answer: "Да, с распашной, раздвижной или маятниковой дверью.",
        },
        {
          question: "Перегородки пропускают звук?",
          answer:
            "Стекло снижает шум, а для переговорных подбираем триплекс и уплотнители. [Уточнить у заказчика: шумоизоляция в дБ.]",
        },
        {
          question: "Можно ли сделать стекло матовым?",
          answer: "Да, матовое стекло, плёнка-полоса на уровне глаз или «умное стекло».",
        },
        {
          question: "Монтаж мешает работе офиса?",
          answer: "Можем монтировать вечером и в выходные. [Уточнить у заказчика.]",
        },
      ],
    },
    leadForm: leadForm(
      "Узнайте цену перегородки",
      "Пришлите план или фото помещения: менеджер уточнит детали и назовёт цену.",
    ),
    contactsTitle: "Контакты",
    seoText: {
      title: "Стеклянные перегородки на заказ: что важно знать",
      blocks: [
        {
          kind: "paragraph",
          text: "Стеклянные перегородки делят пространство и сохраняют дневной свет. Изготавливаем их по размерам помещения из закалённого стекла и монтируем под ключ.",
        },
        {
          kind: "paragraph",
          text: "[SEO-текст для копирайтера: виды перегородок, профили и крепления, как выбрать стекло для офиса и квартиры.]",
        },
      ],
    },
  },
  {
    slug: "steklyannye-dushevye-almaty",
    navLabel: "Стеклянные душевые",
    seo: {
      title: "Стеклянные душевые в Алматы на заказ: цены | Стекло&Центр",
      description:
        "Душевые из закалённого стекла по вашим размерам в Алматы: перегородки, уголки, двери и шторки. Замер, изготовление и монтаж.",
    },
    categorySlug: "dushevye-kabiny",
    hero: {
      title: "Стеклянные душевые в Алматы",
      lead: "Изготовим и установим душевую из закалённого стекла по вашим размерам: перегородки, уголки, двери и шторки.",
      image: {
        src: "/images/catalog/dushevye-ugolki-iz-stekla/gallery-01.jpg",
        alt: "Душевой уголок из закалённого стекла",
      },
    },
    facts: [
      { value: "от 7 дней", label: "изготовление" },
      { value: "[8–10 мм]", label: "закалённое стекло" },
      MEASURE_FACT,
      WARRANTY_FACT,
    ],
    offers: {
      title: "Какие душевые мы делаем.",
      subtitle: "Цены от.",
      note: OFFERS_NOTE,
      linkLabel: OFFER_LINK,
      items: [
        {
          kind: "product",
          slug: "dushevaya-peregorodka-s-krepleniem-k-stene",
          description: "Одно или несколько полотен без двери, на креплении к стене или стойке",
        },
        {
          kind: "product",
          slug: "dushevye-ugolki-iz-stekla",
          description: "Два стеклянных полотна и дверь для угла с поддоном или трапом",
        },
        {
          kind: "product",
          slug: "raspashnye-dushevye-dveri",
          description: "Распашные, двустворчатые и складные двери в нишу",
        },
        {
          kind: "product",
          slug: "razdvizhnye-dushevye-dveri",
          description: "Дверь на роликах для узких ванных",
        },
        {
          kind: "product",
          slug: "steklo-dlya-dushevyh-kabin",
          description: "Замена стекла в готовой кабине по размерам",
        },
        {
          kind: "product",
          slug: "eksklyuzivnye-dushevye",
          description: "Сложные формы и конструкции по проекту",
        },
      ],
    },
    catalog: {
      title: "Душевые из каталога",
      categorySlugs: ["dushevye-kabiny"],
      linkLabel: CATALOG_LINK,
    },
    projects: { title: "Наши работы", category: "shower" },
    advantages: { title: "Почему заказывают у нас", items: ADVANTAGES },
    process: { title: "Как заказать душевую", lead: "От заявки до установленной душевой" },
    faq: {
      title: "Вопросы и ответы",
      lead: FAQ_LEAD,
      askLabel: ASK_LABEL,
      items: [
        {
          question: "Сколько стоит стеклянная душевая?",
          answer:
            "Цена зависит от размеров, толщины стекла и фурнитуры. Ориентир: от 130 000 ₸ за изделие. Точную стоимость менеджер назовёт после заявки и замера.",
        },
        {
          question: "Сколько времени занимает изготовление?",
          answer: "Обычно от 7 дней после замера. Срок фиксируем в договоре.",
        },
        {
          question: "Какое стекло вы используете?",
          answer:
            "Для душевых используем закалённое стекло толщиной [8 мм или 10 мм]: оно прочнее обычного и безопасно при разрушении.",
        },
        {
          question: "Можно ли сделать душевую без поддона?",
          answer:
            "Да, делаем ограждения для душа с трапом в полу. Мастер на замере проверит уклон и предложит решение.",
        },
        {
          question: "Выезжаете ли вы на замер?",
          answer:
            "Да, мастер приезжает на объект [по Алматы бесплатно], снимает размеры и показывает образцы стекла и фурнитуры.",
        },
        {
          question: "Даёте ли гарантию?",
          answer: "Да, на монтаж и фурнитуру действует гарантия 1 год.",
        },
      ],
    },
    leadForm: leadForm(
      "Узнайте цену вашей душевой",
      "Пришлите размеры или фото ванной: менеджер уточнит детали и назовёт цену.",
    ),
    contactsTitle: "Контакты",
    seoText: {
      title: "Стеклянные душевые на заказ: что важно знать",
      blocks: [
        {
          kind: "paragraph",
          text: "Стеклянная душевая занимает меньше места, чем кабина из пластика, и визуально не загромождает ванную. Мы изготавливаем ограждения по индивидуальным размерам из закалённого стекла.",
        },
        { kind: "heading", text: "Виды душевых ограждений" },
        {
          kind: "list",
          items: [
            "Перегородка Walk-in без двери.",
            "Угловая душевая с распашной дверью.",
            "Душевая в нишу с раздвижной дверью.",
            "Шторка на ванну.",
          ],
        },
        { kind: "heading", text: "Как выбрать стекло" },
        {
          kind: "paragraph",
          text: "Прозрачное стекло подходит для минималистичных ванных, матовое скрывает силуэт, тонированное добавляет глубины. Толщина [8 мм или 10 мм] зависит от размеров полотна.",
        },
        { kind: "heading", text: "Фурнитура" },
        {
          kind: "paragraph",
          text: "Петли, ручки, профили и уплотнители подбираем под стиль ванной: [хром, матовый чёрный, золото].",
        },
      ],
    },
  },
  {
    slug: "steklyannye-dveri-almaty",
    navLabel: "Стеклянные двери",
    seo: {
      title: "Стеклянные двери на заказ в Алматы | Стекло&Центр",
      description:
        "Стеклянные двери по вашим размерам в Алматы: распашные, раздвижные, маятниковые. Закалённое стекло, фурнитура, монтаж.",
    },
    categorySlug: "dveri-na-zakaz",
    hero: {
      title: "Стеклянные двери в Алматы",
      lead: "Распашные, раздвижные и маятниковые двери из закалённого стекла для квартир, офисов и магазинов.",
      image: { src: "/images/catalog/dveri-na-zakaz/cover.jpg", alt: "Стеклянные двери" },
    },
    facts: [
      { value: "от 7–10 дней", label: "изготовление" },
      { value: "[8–10 мм]", label: "закалённое стекло" },
      MEASURE_FACT,
      WARRANTY_FACT,
    ],
    offers: {
      title: "Какие двери мы делаем.",
      subtitle: "Цены от.",
      note: OFFERS_NOTE,
      linkLabel: OFFER_LINK,
      items: [
        { kind: "product", slug: "steklyannye-razdvizhnye-dveri" },
        { kind: "product", slug: "mayatnikovye-dveri" },
        { kind: "product", slug: "celnosteklyannye-peregorodki-s-raspashnymi-dveryami" },
        { kind: "product", slug: "raspashnye-dushevye-dveri" },
        { kind: "product", slug: "razdvizhnye-dushevye-dveri" },
        { kind: "product", slug: "skladnye-dushevye-dveri" },
      ],
    },
    catalog: {
      title: "Двери из каталога",
      categorySlugs: ["dveri-na-zakaz", "dushevye-kabiny"],
      linkLabel: CATALOG_LINK,
    },
    projects: { title: "Наши работы", category: "door" },
    advantages: { title: "Почему заказывают у нас", items: ADVANTAGES },
    process: { title: "Как заказать дверь", lead: "От заявки до установленной двери" },
    faq: {
      title: "Вопросы и ответы",
      lead: FAQ_LEAD,
      askLabel: ASK_LABEL,
      items: [
        {
          question: "Сколько стоит стеклянная дверь?",
          answer:
            "Цена зависит от размера, стекла и фурнитуры: от 70 000 ₸. Точную стоимость назовёт менеджер после замера.",
        },
        {
          question: "Какую дверь выбрать: распашную или раздвижную?",
          answer:
            "Раздвижная экономит место в узком проёме, распашная проще и дешевле. Мастер подскажет на замере.",
        },
        {
          question: "Безопасна ли стеклянная дверь?",
          answer:
            "Двери делаем из закалённого стекла: оно в разы прочнее обычного, а при разрушении не даёт острых осколков.",
        },
        {
          question: "Можно ли сделать дверь матовой или с рисунком?",
          answer: "Да, матовое и тонированное стекло, рисунок по образцу или эскизу.",
        },
        {
          question: "Даёте ли гарантию?",
          answer: "Да, на монтаж и фурнитуру действует гарантия 1 год.",
        },
      ],
    },
    leadForm: leadForm(
      "Узнайте цену двери",
      "Пришлите размеры проёма или фото: менеджер уточнит детали и назовёт цену.",
    ),
    contactsTitle: "Контакты",
    seoText: {
      title: "Стеклянные двери на заказ: что важно знать",
      blocks: [
        {
          kind: "paragraph",
          text: "Стеклянная дверь пропускает свет и делает помещение просторнее. Изготавливаем двери по размерам проёма из закалённого стекла и подбираем фурнитуру.",
        },
        {
          kind: "paragraph",
          text: "[SEO-текст для копирайтера: виды дверей, системы открывания, фурнитура, уход.]",
        },
      ],
    },
  },
  {
    slug: "obrabotka-stekla-almaty",
    navLabel: "Обработка стекла",
    seo: {
      title: "Обработка стекла в Алматы: кромка, сверление, фацет | Стекло&Центр",
      description:
        "Обработка стекла и зеркал в Алматы: шлифовка и полировка кромки, сверление отверстий, фацет, резка по размерам.",
    },
    categorySlug: null,
    hero: {
      title: "Обработка стекла в Алматы",
      lead: "Шлифуем и полируем кромку, сверлим отверстия, делаем фацет и режем стекло по вашим размерам.",
      image: { src: "/images/catalog/facetnoe-zerkalo/gallery-01.jpg", alt: "Зеркало с фацетом" },
    },
    facts: [
      { value: "[в день обращения]", label: "простые работы" },
      { value: "[4–19 мм]", label: "толщина стекла" },
      { value: "[до 100 мм]", label: "диаметр отверстий" },
      { value: "[10–40 мм]", label: "ширина фацета" },
    ],
    offers: {
      title: "Что мы делаем.",
      subtitle: "Цены от.",
      note: OFFERS_NOTE,
      linkLabel: "Подробнее",
      items: [
        { kind: "service", slug: "obrabotka-kromki" },
        { kind: "service", slug: "sverlenie" },
        { kind: "service", slug: "facet" },
        { kind: "service", slug: "rezka" },
        { kind: "service", slug: "zerkala" },
        { kind: "service", slug: "konstrukcii" },
      ],
    },
    catalog: null,
    projects: null,
    advantages: { title: "Почему заказывают у нас", items: ADVANTAGES },
    process: { title: "Как заказать обработку", lead: "От заявки до готовых деталей" },
    faq: {
      title: "Вопросы и ответы",
      lead: FAQ_LEAD,
      askLabel: ASK_LABEL,
      items: [
        {
          question: "Чем шлифовка кромки отличается от полировки?",
          answer:
            "Шлифовка делает кромку матовой и безопасной, полировка дополнительно делает её прозрачной и блестящей.",
        },
        {
          question: "Какие отверстия вы сверлите?",
          answer: "Сверлим отверстия диаметром [от 5 до 100 мм] под петли, ручки и крепления.",
        },
        {
          question: "Можно ли обработать моё стекло?",
          answer: "[Уточняется: принимаем ли стекло заказчика и на каких условиях.]",
        },
        {
          question: "Сколько стоит обработка?",
          answer:
            "Цена зависит от вида работ и толщины стекла. Цены на каждую операцию есть на странице «Услуги».",
        },
      ],
    },
    leadForm: leadForm(
      "Узнайте цену обработки",
      "Пришлите размеры или чертёж: менеджер уточнит детали и назовёт цену.",
    ),
    contactsTitle: "Контакты",
    seoText: {
      title: "Обработка стекла: что важно знать",
      blocks: [
        {
          kind: "paragraph",
          text: "После резки у стекла острая кромка. Её шлифуют или полируют, чтобы изделие было безопасным и аккуратным, а под крепления сверлят отверстия.",
        },
        {
          kind: "paragraph",
          text: "[SEO-текст для копирайтера: виды обработки кромки, фацет, сверление, когда что нужно.]",
        },
      ],
    },
  },
];
