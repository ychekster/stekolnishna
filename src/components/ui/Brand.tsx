/**
 * Text logo: company name + tagline (design: Brand), links to the homepage.
 * Swap for an <Image> once the customer provides a logo file.
 */
import Link from "next/link";

import { routes } from "@/lib/routes";

export function Brand({ name, tagline }: { name: string; tagline: string }) {
  return (
    <Link href={routes.home} className="inline-flex flex-col leading-none text-ink">
      <span className="text-brand">{name}</span>
      <span className="mt-0.5 text-micro text-ink-muted">{tagline}</span>
    </Link>
  );
}
