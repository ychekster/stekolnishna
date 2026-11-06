/**
 * Content types for the public site.
 *
 * These describe what pages need, independent of where the data comes from. Today the
 * data is a local placeholder file (src/content); after Payload CMS is connected the same
 * shapes will be produced by mapping CMS documents. Components depend only on these types,
 * so swapping the source does not touch the UI.
 */

/** Keys of icons available to editors. Mapped to actual SVGs in components/ui/Icon.tsx. */
export type IconName = "sliders" | "check" | "document" | "pin" | "chat" | "phone" | "mail";

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
  /** WhatsApp number, digits only with country code (`77011234567`). */
  whatsappNumber: string;
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
  leadForm: {
    title: string;
    lead: string;
    submitLabel: string;
    successMessage: string;
  };
  contacts: {
    title: string;
  };
}
