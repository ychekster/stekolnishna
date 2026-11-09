/**
 * PLACEHOLDER content of the order page (/zayavka), taken from the design mockup
 * "Оформление заявки". Changed against the mockup: WhatsApp → Telegram bot, the calculator
 * link is dropped (docs/decisions/0003), the lead number in the success message is dropped
 * until leads are stored (Payload). The response time is the designer's draft: [brackets].
 * The product types are the catalog sections (content layer), not listed here.
 *
 * This file disappears once Payload CMS serves the page; read it only through src/lib/content.
 */
import type { OrderPage } from "@/lib/content/types";

export const orderPageContent: OrderPage = {
  seo: {
    title: "Заявка на заказ изделий из стекла | Стекло&Центр",
    description:
      "Оставьте заявку на изготовление стекла, зеркал, душевых и перегородок в Алматы: размеры, количество, фото или чертёж. Перезвоним и рассчитаем стоимость.",
  },
  name: "Оформление заявки",
  backLabel: "В каталог",
  hero: {
    title: "Заявка на заказ.",
    subtitle: "Ответим в течение [30 минут].",
  },
  form: {
    productTypeLabel: "Вид изделия",
    productTypePlaceholder: "Выберите изделие",
    productTypeOther: "Другое",
    sizeLabel: "Размеры, мм",
    sizePlaceholder: "1200 × 2000",
    quantityLabel: "Кол-во",
    detailsLabel: "Пожелания и комментарий",
    detailsPlaceholder: "Толщина и цвет стекла, обработка, фурнитура, адрес объекта",
    dropTitle: "Перетащите фото или чертёж сюда",
    dropHint: "или нажмите, чтобы выбрать",
    removeFileLabel: "Убрать файл",
    submitLabel: "Отправить заявку",
  },
  success: {
    title: "Заявка принята",
    text: "Менеджер проверит параметры и перезвонит на указанный номер в течение [30 минут] в рабочее время.",
    catalogLabel: "Вернуться в каталог",
    againLabel: "Новая заявка",
  },
  telegram: {
    title: "Быстрее в Telegram",
    text: "Пришлите фото и размеры, ответим с ценой.",
    buttonLabel: "Написать",
  },
  nextSteps: {
    title: "Что будет дальше",
    steps: [
      "Менеджер перезвонит и уточнит детали",
      "Бесплатный замер по Алматы",
      "Точная смета и договор",
      "Изготовление и монтаж",
    ],
  },
};
