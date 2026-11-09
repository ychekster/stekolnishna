/**
 * Content types for the public site.
 *
 * These describe what pages need, independent of where the data comes from. Today the
 * data is a local placeholder file (src/content); after Payload CMS is connected the same
 * shapes will be produced by mapping CMS documents. Components depend only on these types,
 * so swapping the source does not touch the UI.
 */

/** Keys of icons available to editors. Mapped to actual SVGs in components/ui/Icon.tsx. */
export type IconName =
  "sliders" | "check" | "document" | "pin" | "chat" | "phone" | "mail" | "telegram" | "shield";

/** An image with mandatory alt text (SEO + accessibility requirement from the spec). */
export interface ImageAsset {
  src: string;
  alt: string;
}

/** A link rendered as a button or text link. `href` may be an anchor (`#form`). */
export interface LinkItem {
  label: string;
  href: string;
}

/**
 * Price shown on a catalog card. `amount: null` means "not provided yet" → placeholder.
 * `draft: true` marks a number from the designer's mockup that the customer has not
 * confirmed: it is shown in [brackets] but still sorts like a real price.
 */
export type Price =
  | { kind: "from"; amount: number | null; unit: PriceUnit; draft?: boolean }
  | { kind: "individual" };

export type PriceUnit = "piece" | "m2" | "linear-m";

/** Per-page search metadata (spec §6). Editable per page once the CMS is connected. */
export interface PageSeo {
  title: string;
  description: string;
}

/** Copy of a lead-form block. The same form is placed on several pages with its own text. */
export interface LeadFormContent {
  title: string;
  lead: string;
  /** Label of the free-text field ("Что нужно изготовить", "Удобный день и время"). */
  detailsLabel: string;
  submitLabel: string;
  successMessage: string;
}

// ---------------------------------------------------------------------------
// Global site settings (one record, edited by the owner)
// ---------------------------------------------------------------------------

export interface SiteSettings {
  companyName: string;
  tagline: string;
  /** Human-readable phone, shown as text. */
  phoneDisplay: string;
  /** Phone in E.164 (`+77011234567`) for `tel:` links. */
  phoneE164: string;
  /** Username of the company Telegram bot, without `@` (`steklo_center_bot`). */
  telegramBot: string;
  email: string;
  address: string;
  workingHours: string;
  navigation: LinkItem[];
  privacyPolicyHref: string;
  copyright: string;
  map: {
    /** 2GIS / Yandex Maps embed URL. `null` → a placeholder is shown. */
    embedUrl: string | null;
    label: string;
  };
  /** "Заказать звонок" dialog (spec §4.4), opened from the header and the Contacts page. */
  callback: CallbackContent;
  /** Cookie banner shown until the visitor chooses (spec §9). */
  cookieBanner: {
    title: string;
    text: string;
    moreLabel: string;
    acceptLabel: string;
    necessaryLabel: string;
  };
}

export interface CallbackContent {
  /** Text of the buttons that open the dialog. */
  triggerLabel: string;
  title: string;
  lead: string;
  timeLabel: string;
  /** Options of the "convenient time" select; the first one is preselected. */
  timeOptions: string[];
  submitLabel: string;
  successTitle: string;
  successText: string;
}

// ---------------------------------------------------------------------------
// Homepage
// ---------------------------------------------------------------------------

export interface Stat {
  value: string;
  label: string;
}

export interface ServiceItem {
  icon: IconName;
  title: string;
  description: string;
}

export interface CatalogItem {
  title: string;
  href: string;
  image: ImageAsset | null;
  price: Price;
}

export interface AdvantageItem {
  title: string;
  description: string;
}

export interface ProjectItem {
  caption: string;
  href: string | null;
  image: ImageAsset | null;
}

export interface ProcessStep {
  icon: IconName;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  /** What the client ordered, shown under the name. */
  subject: string;
  avatar: ImageAsset | null;
}

export interface HomePage {
  hero: {
    title: string;
    lead: string;
    image: ImageAsset;
    cta: LinkItem;
  };
  about: {
    title: string;
    paragraphs: string[];
    stats: Stat[];
  };
  services: {
    title: string;
    lead: string;
    items: ServiceItem[];
  };
  catalog: {
    title: string;
    lead: string;
    items: CatalogItem[];
  };
  advantages: {
    title: string;
    items: AdvantageItem[];
  };
  projects: {
    title: string;
    lead: string;
    allProjectsLink: LinkItem;
    items: ProjectItem[];
  };
  process: {
    title: string;
    lead: string;
    image: ImageAsset | null;
    badge: string;
    steps: ProcessStep[];
  };
  testimonials: {
    title: string;
    items: Testimonial[];
  };
  leadForm: LeadFormContent;
  contacts: {
    title: string;
  };
}

// ---------------------------------------------------------------------------
// About page (spec §3.5)
// ---------------------------------------------------------------------------

export interface WorkshopPhoto {
  caption: string;
  image: ImageAsset | null;
}

/** One production capability: muted label, big value, note ("Толщина стекла / от 4 до 19 мм"). */
export interface Capability {
  label: string;
  value: string;
  note: string;
}

export interface EquipmentItem {
  icon: IconName;
  title: string;
  description: string;
}

export interface Region {
  name: string;
  description: string;
}

/** A line of delivery/installation terms; `highlight` is shown in bold before the text. */
export interface TermsItem {
  highlight?: string;
  text: string;
}

export interface TermsCard {
  icon: IconName;
  title: string;
  items: TermsItem[];
}

export interface AboutPage {
  seo: PageSeo;
  /** Short page name for breadcrumbs. */
  name: string;
  hero: {
    title: string;
    lead: string;
    image: ImageAsset;
    stats: Stat[];
  };
  production: {
    title: string;
    lead: string;
    photos: WorkshopPhoto[];
    capabilities: Capability[];
  };
  equipment: {
    title: string;
    lead: string;
    items: EquipmentItem[];
  };
  /** Dark block "Почему своё производство — это выгодно вам". */
  ownProduction: {
    title: string;
    benefits: AdvantageItem[];
  };
  geography: {
    title: string;
    lead: string;
    regions: Region[];
    map: {
      /** Map picture of the service area. `null` → placeholder with a dashed radius circle. */
      image: ImageAsset | null;
      label: string;
      note: string;
    };
  };
  delivery: {
    title: string;
    lead: string;
    cards: TermsCard[];
  };
  leadForm: LeadFormContent;
}

// ---------------------------------------------------------------------------
// Contacts page (spec §3.6)
// ---------------------------------------------------------------------------

/** An extra phone line on the Contacts page. `e164: null` → shown as text, not a link. */
export interface ExtraPhone {
  display: string;
  e164: string | null;
  note: string;
}

/** One row of the schedule table: department and its hours on weekdays and Saturday. */
export interface ScheduleRow {
  department: string;
  weekdays: string;
  saturday: string;
}

/** A label/value pair, e.g. a line of the company's legal details. */
export interface DetailItem {
  label: string;
  value: string;
}

/**
 * Contacts page. Phone, email, address and the Telegram bot themselves come from
 * SiteSettings (one source for the whole site); this holds only the page's own copy.
 */
export interface ContactsPage {
  seo: PageSeo;
  /** Short page name for breadcrumbs. */
  name: string;
  hero: {
    title: string;
    lead: string;
  };
  cards: {
    phone: { label: string; mainNote: string; extraPhones: ExtraPhone[] };
    /** The dark card that invites to write to the Telegram bot. */
    telegram: { label: string; title: string; text: string; buttonLabel: string };
    email: { label: string; note: string };
    address: { label: string; note: string };
  };
  directions: {
    label: string;
    /** How to find the entrance, parking etc. */
    text: string;
    twoGisLabel: string;
    yandexLabel: string;
  };
  schedule: {
    title: string;
    lead: string;
    columns: { department: string; weekdays: string; saturday: string };
    rows: ScheduleRow[];
    /** Highlighted pill under the table ("Воскресенье выходной"). */
    dayOff: string;
    note: string;
  };
  leadForm: LeadFormContent;
  requisites: {
    title: string;
    lead: string;
    items: DetailItem[];
  };
}

// ---------------------------------------------------------------------------
// Services page (spec §3.3)
// ---------------------------------------------------------------------------

/**
 * One service card. `slug` is the anchor on the page (`/uslugi#rezka`) and, later, the
 * slug of its own page `/uslugi/[service]` (docs/sitemap.md). Prices are free text,
 * because units differ per service (per metre, per hole, per trip).
 */
export interface ServiceOffer {
  slug: string;
  title: string;
  description: string;
  /** Short facts shown as tags under the description. */
  specs: string[];
  price: string;
  image: ImageAsset | null;
}

/** A step of the "order by photo" instruction. */
export interface InstructionStep {
  title: string;
  description: string;
}

/** A row of the price list: work, unit, price (all text, may hold placeholders). */
export interface PriceRow {
  name: string;
  unit: string;
  price: string;
}

export interface ServicesPage {
  seo: PageSeo;
  /** Short page name for breadcrumbs. */
  name: string;
  hero: {
    title: string;
    lead: string;
  };
  offers: {
    /** Accessible name of the anchor chips above the cards. */
    navLabel: string;
    priceLabel: string;
    orderLabel: string;
    items: ServiceOffer[];
  };
  photoOrder: {
    title: string;
    lead: string;
    steps: InstructionStep[];
    telegramLabel: string;
  };
  prices: {
    title: string;
    lead: string;
    columns: { name: string; unit: string; price: string };
    rows: PriceRow[];
  };
  leadForm: LeadFormContent;
}

// ---------------------------------------------------------------------------
// Catalog (spec §3.2)
// ---------------------------------------------------------------------------

/** Filter chips on the catalog page. Keys, so editors tick them per product in the CMS. */
export type ProductTag = "home" | "office" | "installation" | "tempered";

/** A block of a long description (category or product page text, rich text in the CMS). */
export type DescriptionBlock =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] };

/** A catalog category (the customer's 14 sections; the owner can add more). */
export interface CatalogCategory {
  slug: string;
  name: string;
  /** What is inside, e.g. "Офисные и межкомнатные". */
  description: string;
  /** Second, muted half of the section heading: "Стекло. Листовое и закалённое." */
  tagline: string;
  image: ImageAsset | null;
  /** Lowest price in the category, shown on the category tile. */
  price: Price;
  /** "Изготовление от 7 дней", or null when unknown. */
  leadTime: string | null;
  /** Text of the future category page. */
  intro: DescriptionBlock[];
  /** Search metadata of the future category page; null → built from the name. */
  seo: PageSeo | null;
}

/** A product inside a category; gallery and description feed the future product page. */
export interface CatalogProduct {
  slug: string;
  categorySlug: string;
  name: string;
  /** One line of key facts under the name: "4–10 мм, резка по размеру". */
  summary: string;
  price: Price;
  /** Pill on the photo ("Хит", "С монтажом"), or null. */
  badge: string | null;
  tags: ProductTag[];
  /** Card photo. */
  image: ImageAsset | null;
  gallery: ImageAsset[];
  /** "Изготовление от 7 дней", or null when unknown. */
  leadTime: string | null;
  description: DescriptionBlock[];
  /** Search metadata of the future product page; null → built from the name. */
  seo: PageSeo | null;
}

export type CatalogSort = "popular" | "price-asc" | "price-desc";

export interface CatalogPage {
  seo: PageSeo;
  /** Short page name for breadcrumbs. */
  name: string;
  hero: {
    title: string;
    /** Muted continuation of the H1. */
    subtitle: string;
    help: { title: string; linkLabel: string };
  };
  categoriesNavLabel: string;
  filters: {
    allLabel: string;
    tags: { tag: ProductTag; label: string }[];
    searchLabel: string;
    sortLabel: string;
    sorts: { value: CatalogSort; label: string }[];
    /** "Найдено: N" — `{count}` is replaced with the number. */
    resultsLabel: string;
    resetLabel: string;
    emptyTitle: string;
    emptyText: string;
  };
  promos: {
    /** Light card leading to one category. */
    featured: {
      categorySlug: string;
      label: string;
      title: string;
      text: string;
      price: Price;
      linkLabel: string;
      image: ImageAsset | null;
    };
    /** Dark card: send a photo or drawing to the Telegram bot (instead of the calculator). */
    photoOrder: { label: string; title: string; text: string; buttonLabel: string };
  };
  /** Categories shown as product sections on the page, in this order. */
  featuredCategorySlugs: string[];
  /** Products per section on the catalog page. */
  productsPerSection: number;
  sectionLinkLabel: string;
  productCard: { orderLabel: string; askLabel: string };
  more: { title: string; subtitle: string };
  leadForm: LeadFormContent;
}

// ---------------------------------------------------------------------------
// Portfolio (spec §3.4)
// ---------------------------------------------------------------------------

/** Portfolio filter categories from the spec. Keys, so editors pick them in the CMS. */
export type ProjectCategory =
  "shower" | "mirror" | "partition" | "door" | "railing" | "furniture" | "custom";

/** A completed order shown in "Наши работы" and on its own page. */
export interface PortfolioProject {
  slug: string;
  category: ProjectCategory;
  title: string;
  /** District or town, e.g. "ЖК «Название», Медеуский район". */
  place: string;
  year: string;
  /** One line of key materials under the card title. */
  summary: string;
  /** Short story for the featured block on the portfolio page. */
  excerpt: string;
  /** Card photo; the gallery holds the rest. */
  cover: ImageAsset | null;
  gallery: ImageAsset[];
  /** "О проекте" paragraphs on the project page. */
  description: string[];
  materials: string[];
  works: string[];
  /** Key numbers on the dark plate: "Площадь / 420 м²", "Срок / 18 дней". */
  facts: DetailItem[];
  testimonial: { quote: string; author: string } | null;
  /** Search metadata of the project page; null → built from the title. */
  seo: PageSeo | null;
}

export interface PortfolioPage {
  seo: PageSeo;
  /** Short page name for breadcrumbs. */
  name: string;
  hero: {
    title: string;
    /** Muted continuation of the H1. */
    subtitle: string;
    stats: Stat[];
  };
  featured: {
    projectSlug: string;
    label: string;
    viewLabel: string;
    wantLabel: string;
  };
  categories: { category: ProjectCategory; label: string }[];
  list: {
    title: string;
    allLabel: string;
    /** "Показано: {shown} из {total}". */
    shownLabel: string;
    moreLabel: string;
    /** Projects shown before "Показать ещё". */
    pageSize: number;
    /** "{count} фото" pill on a card. */
    photosLabel: string;
  };
  testimonial: Testimonial & { image: ImageAsset | null };
  leadForm: LeadFormContent;
  /** Copy of the project pages (/nashi-raboty/[project]). */
  project: {
    backLabel: string;
    wantLabel: string;
    aboutTitle: string;
    materialsTitle: string;
    worksTitle: string;
    previousLabel: string;
    nextLabel: string;
    /** "+{count} фото" over the last gallery tile. */
    morePhotosLabel: string;
    leadForm: LeadFormContent;
  };
}

// ---------------------------------------------------------------------------
// Order form page /zayavka (spec §4.2, §4.5)
// ---------------------------------------------------------------------------

export interface OrderPage {
  seo: PageSeo;
  name: string;
  backLabel: string;
  hero: { title: string; subtitle: string };
  form: {
    productTypeLabel: string;
    productTypePlaceholder: string;
    /** Last option after the catalog sections. */
    productTypeOther: string;
    sizeLabel: string;
    sizePlaceholder: string;
    quantityLabel: string;
    detailsLabel: string;
    detailsPlaceholder: string;
    dropTitle: string;
    dropHint: string;
    removeFileLabel: string;
    submitLabel: string;
  };
  success: { title: string; text: string; catalogLabel: string; againLabel: string };
  telegram: { title: string; text: string; buttonLabel: string };
  nextSteps: { title: string; steps: string[] };
}

// ---------------------------------------------------------------------------
// Legal information (spec §9)
// ---------------------------------------------------------------------------

export interface LegalSection {
  /** Anchor; routes.privacyPolicy and routes.cookiePolicy point at "privacy" and "cookies". */
  id: string;
  title: string;
  paragraphs: string[];
}

export interface LegalPage {
  seo: PageSeo;
  name: string;
  title: string;
  /** "Редакция от …" line under the title. */
  revision: string;
  navLabel: string;
  sections: LegalSection[];
}

// ---------------------------------------------------------------------------
// 404
// ---------------------------------------------------------------------------

export interface NotFoundPage {
  title: string;
  /** Muted second half of the heading. */
  titleMuted: string;
  text: string;
  homeLabel: string;
  catalogLabel: string;
  image: ImageAsset;
}
