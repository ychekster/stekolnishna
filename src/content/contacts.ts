/**
 * PLACEHOLDER content of the Contacts page (/kontakty), taken from the design mockup
 * "Контакты — десктоп". WhatsApp from the mockup is replaced by the Telegram bot
 * (docs/decisions/0003).
 *
 * The phone, email, address, hours and bot username are NOT here: they come from site
 * settings, so the whole site changes in one place. The mockup's copy is a designer's
 * draft: every concrete fact (second phone, response times, department hours, showroom,
 * how to drive in, legal details) is wrapped in [square brackets] until the customer
 * confirms it (docs/open-questions.md). The director's name comes from the spec.
 *
 * This file disappears once Payload CMS serves the page; read it only through
 * src/lib/content.
 */
import type { ContactsPage } from "@/lib/content/types";

export const contactsPageContent: ContactsPage = {
  seo: {
    title: "Контакты Стекло&Центр: адрес, телефон и график работы в Алматы",
    description:
      "Телефон, Telegram, email и адрес стекольной мастерской Стекло&Центр в Алматы. График работы, схема проезда и реквизиты для юридических лиц.",
  },
  name: "Контакты",

  hero: {
    title: "Контакты",
    lead: "Звоните, пишите в Telegram или приезжайте [в шоурум при производстве]: покажем образцы и посчитаем заказ на месте.",
  },

  cards: {
    phone: {
      label: "Телефоны",
      mainNote: "отдел продаж",
      extraPhones: [
        { display: "+7 [___] ___-__-__", e164: null, note: "[производство и самовывоз]" },
      ],
    },
    telegram: {
      label: "Telegram",
      title: "Отвечаем за [15 минут]",
      text: "Пришлите фото или размеры, и мы сразу назовём ориентировочную цену",
      buttonLabel: "Написать в Telegram",
    },
    email: {
      label: "Email",
      note: "чертежи, сметы и запросы от компаний",
    },
    address: {
      label: "Адрес",
      note: "[шоурум и производство]",
    },
  },

  directions: {
    label: "Как добраться",
    text: "[Въезд через шлагбаум со стороны улицы ___. Шоурум на первом этаже, вход с вывеской. Бесплатная парковка у входа, есть место для разгрузки грузовой машины.]",
    twoGisLabel: "Построить маршрут в 2ГИС",
    yandexLabel: "Открыть в Яндекс Картах",
  },

  schedule: {
    title: "График работы",
    lead: "Заявки на сайте и в Telegram принимаем круглосуточно, ответим в рабочее время",
    columns: { department: "Подразделение", weekdays: "Пн–Пт", saturday: "Суббота" },
    rows: [
      { department: "Офис и шоурум", weekdays: "[9:00–19:00]", saturday: "[10:00–16:00]" },
      {
        department: "Производство и самовывоз",
        weekdays: "[8:00–18:00]",
        saturday: "[9:00–14:00]",
      },
      { department: "Выезд замерщика", weekdays: "[9:00–20:00]", saturday: "[10:00–18:00]" },
    ],
    dayOff: "Воскресенье [выходной]",
    note: "В праздничные дни график уточняйте по телефону",
  },

  leadForm: {
    title: "Оставьте заявку",
    lead: "Опишите изделие и размеры, менеджер рассчитает стоимость и перезвонит в течение рабочего дня.",
    detailsLabel: "Что нужно изготовить и размеры",
    submitLabel: "Отправить заявку",
    successMessage: "Спасибо! Менеджер перезвонит вам в течение рабочего дня.",
  },

  requisites: {
    title: "Реквизиты",
    lead: "Работаем с юридическими лицами по договору, [с НДС и без].",
    items: [
      { label: "Организация", value: "ТОО «Стекло&Центр»" },
      { label: "БИН", value: "[000000000000]" },
      { label: "Банк", value: "[Название банка]" },
      { label: "ИИК", value: "KZ[00 0000 0000 0000 0000]" },
      { label: "Юридический адрес", value: "г. Алматы, [улица, дом]" },
      { label: "Директор", value: "Абылгазиев Сакен Берикович" },
    ],
  },
};
