/**
 * PLACEHOLDER content of the Services page (/uslugi), taken from the design mockup
 * "Услуги — десктоп". Changes vs. the mockup (docs/decisions/0003): no price calculator,
 * WhatsApp replaced by the Telegram bot; files go to the bot because the short lead form
 * has no upload.
 *
 * The services list follows spec §3.3. Facts and prices from the designer's draft were
 * confirmed by the customer on 2026-11-10; the Telegram reply time stays in [brackets] until
 * the contacts are final. Tempering is done at a partner's plant (no own furnace).
 *
 * This file disappears once Payload CMS serves the page; read it only through
 * src/lib/content.
 */
import type { ServicesPage } from "@/lib/content/types";

export const servicesPageContent: ServicesPage = {
  seo: {
    title: "Услуги по обработке стекла и монтажу в Алматы | Стекло&Центр",
    description:
      "Резка стекла по размерам, обработка кромки, сверление, фацет, закалка, изготовление зеркал и стеклянных конструкций, монтаж и доставка по Алматы. Цены на работы.",
  },
  name: "Услуги",

  hero: {
    title: "Обработка стекла и монтаж под ключ",
    lead: "Девять услуг: от резки одного листа до установки готовой конструкции. Всё делаем на своём производстве в Алматы.",
  },

  offers: {
    navLabel: "Услуги на странице",
    priceLabel: "Стоимость",
    orderLabel: "Заказать",
    items: [
      {
        slug: "rezka",
        title: "Резка стекла по размерам",
        description:
          "Прямая и фигурная резка по вашим размерам или чертежу. Простую резку делаем в день обращения.",
        specs: ["точность 0,5 мм", "лист до 3210 × 2250 мм", "толщина 4–19 мм"],
        price: "от 300 ₸/м.п.",
        image: { src: "/images/catalog/steklo/cover.jpg", alt: "Листы стекла, вид на кромку" },
      },
      {
        slug: "obrabotka-kromki",
        title: "Обработка кромки",
        description:
          "Шлифовка убирает острые края, полировка делает кромку прозрачной и блестящей. Нужна для открытых торцов полок, столешниц и душевых.",
        specs: ["шлифовка", "полировка", "прямая и криволинейная"],
        price: "от 600 ₸/м.п.",
        image: null,
      },
      {
        slug: "sverlenie",
        title: "Сверление отверстий",
        description:
          "Отверстия под петли, ручки, крепления и розетки по шаблону фурнитуры, без сколов.",
        specs: ["диаметр 6–100 мм", "вырезы под розетки", "по шаблону"],
        price: "от 500 ₸ за отверстие",
        image: null,
      },
      {
        slug: "facet",
        title: "Фацетирование",
        description:
          "Декоративная фаска по краю зеркала или стекла: изделие выглядит дороже и играет на свету.",
        specs: ["ширина 5–40 мм", "зеркала и стекло", "прямой контур"],
        price: "от 1 500 ₸/м.п.",
        image: {
          src: "/images/catalog/facetnoe-zerkalo/gallery-04.jpg",
          alt: "Фацетное зеркало из ромбов на стене",
        },
      },
      {
        slug: "zakalka",
        title: "Закалка стекла",
        description:
          "Закаляем на проверенном партнёрском производстве: после нагрева и резкого охлаждения стекло становится в 5 раз прочнее, а при ударе рассыпается на безопасные кубики.",
        specs: ["до 2400 × 3600 мм", "толщина 4–19 мм", "от 3 рабочих дней"],
        price: "от 6 000 ₸/м²",
        image: null,
      },
      {
        slug: "zerkala",
        title: "Изготовление зеркал",
        description:
          "Настенные, интерьерные и фигурные зеркала, панно, зеркала с подсветкой и фацетом под размер стены или мебели.",
        specs: ["серебро, графит, бронза", "подсветка", "любая форма"],
        price: "от 9 000 ₸/м²",
        image: {
          src: "/images/catalog/zerkala-dlya-vannoj/gallery-01.jpeg",
          alt: "Зеркало во всю стену в ванной",
        },
      },
      {
        slug: "konstrukcii",
        title: "Стеклянные конструкции",
        description:
          "Душевые, перегородки, двери, ограждения, столы и полки по вашим размерам, с фурнитурой и креплениями в комплекте.",
        specs: ["душевые", "перегородки и двери", "ограждения"],
        price: "индивидуально",
        image: {
          src: "/images/catalog/steklyannye-konstrukcii/gallery-01.jpg",
          alt: "Стеклянная винтовая лестница",
        },
      },
      {
        slug: "montazh",
        title: "Монтаж",
        description:
          "Устанавливают штатные монтажники с опытом от 5 лет. Обычно справляемся за один день, убираем за собой и даём гарантию.",
        specs: ["бесплатный замер", "1 день", "гарантия 1 год"],
        price: "от 15 000 ₸",
        image: null,
      },
      {
        slug: "dostavka",
        title: "Доставка",
        description:
          "Своя машина с пирамидой для крупных листов. По Алматы бесплатно при заказе от 50 000 ₸, по Казахстану отправляем в обрешётке.",
        specs: ["Алматы и область", "по Казахстану", "самовывоз"],
        price: "от 5 000 ₸",
        image: null,
      },
    ],
  },

  photoOrder: {
    title: "Заказ по фото или чертежу",
    lead: "Не знаете, как называется нужное изделие? Просто покажите",
    steps: [
      {
        title: "Сфотографируйте или начертите",
        description: "Подойдёт фото похожего изделия, эскиз от руки или проект дизайнера",
      },
      {
        title: "Отправьте нам с размерами",
        description:
          "Пришлите фото, скриншот или PDF в Telegram-бот. Можно просто описать задачу в форме ниже",
      },
      {
        title: "Получите расчёт",
        description: "Менеджер ответит с ценой и сроком в течение [30 минут] в рабочее время",
      },
    ],
    telegramLabel: "Отправить фото в Telegram",
  },

  prices: {
    title: "Цены на работы",
    lead: "Базовые тарифы. Окончательная цена фиксируется в договоре после замера",
    columns: { name: "Работа", unit: "Единица", price: "Цена" },
    rows: [
      { name: "Резка прямая", unit: "погонный метр", price: "от 300 ₸" },
      { name: "Резка фигурная", unit: "погонный метр", price: "от 1 200 ₸" },
      { name: "Шлифовка кромки", unit: "погонный метр", price: "от 600 ₸" },
      { name: "Полировка кромки", unit: "погонный метр", price: "от 900 ₸" },
      { name: "Сверление отверстия", unit: "штука", price: "от 500 ₸" },
      { name: "Фацет", unit: "погонный метр", price: "от 1 500 ₸" },
      { name: "Закалка", unit: "м²", price: "от 6 000 ₸" },
      { name: "Монтаж", unit: "выезд", price: "от 15 000 ₸" },
      { name: "Доставка по Алматы", unit: "рейс", price: "от 5 000 ₸" },
    ],
  },

  leadForm: {
    title: "Не нашли нужную услугу?",
    lead: "Опишите задачу: мы делаем и нестандартные изделия по проектам заказчика. Перезвоним в течение рабочего дня.",
    detailsLabel: "Что нужно сделать",
    submitLabel: "Оставить заявку",
    successMessage: "Спасибо! Менеджер перезвонит вам в течение рабочего дня.",
  },
};
