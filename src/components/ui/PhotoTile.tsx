/**
 * Photo filling its tile with a pill caption at the bottom (design: ProjectTile).
 * Used for portfolio projects on the homepage and workshop photos on the About page.
 * `featured` is the large 2×2 tile with a slightly bigger caption.
 */
import Link from "next/link";

import { MediaFrame } from "@/components/ui/MediaFrame";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/lib/content/types";

interface PhotoTileProps {
  image: ImageAsset | null;
  caption: string;
  /** Makes the whole tile a link (e.g. to a project page). */
  href?: string | null;
  featured?: boolean;
  className?: string;
}

export function PhotoTile({ image, caption, href, featured, className }: PhotoTileProps) {
  const tile = (
    <figure className={cn("relative m-0 size-full overflow-hidden rounded-md", className)}>
      <MediaFrame
        image={image}
        sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
      />
      <figcaption
        className={cn(
          "absolute rounded-full bg-surface text-caption font-medium",
          featured ? "bottom-4 left-4 px-4 py-2" : "bottom-3 left-3 px-3 py-1.5",
        )}
      >
        {caption}
      </figcaption>
    </figure>
  );

  return href ? (
    <Link href={href} className="block size-full rounded-md">
      {tile}
    </Link>
  ) : (
    tile
  );
}
