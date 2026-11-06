/**
 * Portfolio tile (design: ProjectTile): photo filling the tile with a pill caption at the
 * bottom. `featured` is the large 2×2 tile with a slightly bigger caption.
 */
import { MediaFrame } from "@/components/ui/MediaFrame";
import { cn } from "@/lib/cn";
import type { ProjectItem } from "@/lib/content/types";

interface ProjectTileProps {
  project: ProjectItem;
  featured?: boolean;
  className?: string;
}

export function ProjectTile({ project, featured, className }: ProjectTileProps) {
  const tile = (
    <figure className={cn("relative m-0 size-full overflow-hidden rounded-md", className)}>
      <MediaFrame
        image={project.image}
        sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
      />
      <figcaption
        className={cn(
          "absolute rounded-full bg-surface text-caption font-medium",
          featured ? "bottom-4 left-4 px-4 py-2" : "bottom-3 left-3 px-3 py-1.5",
        )}
      >
        {project.caption}
      </figcaption>
    </figure>
  );

  return project.href ? (
    <a href={project.href} className="block size-full rounded-md">
      {tile}
    </a>
  ) : (
    tile
  );
}
