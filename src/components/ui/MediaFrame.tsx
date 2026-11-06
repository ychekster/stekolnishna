/**
 * Fills its parent with an optimized image, or with the photo placeholder pattern when no
 * image is available yet. The parent controls size, aspect ratio and rounding.
 */
import Image from "next/image";

import type { ImageAsset } from "@/lib/content/types";
import { cn } from "@/lib/cn";

interface MediaFrameProps {
  image: ImageAsset | null;
  /** Responsive `sizes` hint for next/image — keep it close to the real rendered width. */
  sizes: string;
  className?: string;
  imageClassName?: string;
  preload?: boolean;
  /**
   * Position absolutely over the whole parent (background-style, e.g. hero) instead of
   * taking up space in the flow. A prop rather than a className, because `relative` and
   * `absolute` on one element conflict.
   */
  cover?: boolean;
}

export function MediaFrame({
  image,
  sizes,
  className,
  imageClassName,
  preload,
  cover,
}: MediaFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden",
        cover ? "absolute inset-0" : "relative size-full",
        className,
      )}
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          preload={preload}
          className={cn("object-cover", imageClassName)}
        />
      ) : (
        <div className="photo-placeholder size-full" role="presentation" />
      )}
    </div>
  );
}
