/**
 * Company logo linking to the homepage (design: Brand). Shows the logo file from site
 * settings when there is one, otherwise the text logo: company name + tagline.
 */
import Image from "next/image";
import Link from "next/link";

import type { ImageAsset } from "@/lib/content/types";
import { routes } from "@/lib/routes";

interface BrandProps {
  name: string;
  tagline: string;
  logo: ImageAsset | null;
}

export function Brand({ name, tagline, logo }: BrandProps) {
  if (logo) {
    return (
      <Link href={routes.home} className="inline-flex items-center">
        {/* Height follows the text logo (two lines, ~40px); width comes from the file. */}
        <Image src={logo.src} alt={logo.alt} width={160} height={40} className="h-10 w-auto" />
      </Link>
    );
  }

  return (
    <Link href={routes.home} className="inline-flex flex-col leading-none text-ink">
      <span className="text-brand">{name}</span>
      <span className="mt-0.5 text-micro text-ink-muted">{tagline}</span>
    </Link>
  );
}
