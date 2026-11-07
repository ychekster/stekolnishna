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

/** Price shown on a catalog card. `amount: null` means "not provided yet" → placeholder. */
export type Price =
  { kind: "from"; amount: number | null; unit: PriceUnit } | { kind: "individual" };

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

export interface Milestone {
  /** Shown as text, so a placeholder like "[2010]" works. */
  year: string;
  title: string;
  description: string;
}

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

export interface TeamMember {
  name: string;
  role: string;
  photo: ImageAsset | null;
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
  history: {
    title: string;
    lead: string;
    milestones: Milestone[];
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
  team: {
    title: string;
    lead: string;
    members: TeamMember[];
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
