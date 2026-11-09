/**
 * "← Предыдущий проект / Следующий проект →" links at the bottom of a project page, with
 * the neighbours' titles. The list wraps around (src/lib/portfolio/projects.ts).
 */
import Link from "next/link";

import type { PortfolioProject } from "@/lib/content/types";
import { routes } from "@/lib/routes";

interface ProjectPagerProps {
  previous: PortfolioProject;
  next: PortfolioProject;
  previousLabel: string;
  nextLabel: string;
}

export function ProjectPager({ previous, next, previousLabel, nextLabel }: ProjectPagerProps) {
  return (
    <nav
      aria-label="Другие проекты"
      className="mt-12 flex justify-between gap-4 border-t border-line pt-6 md:mt-18"
    >
      <Link href={routes.project(previous.slug)} className="group flex max-w-1/2 flex-col">
        <span className="text-small text-ink-muted">
          <span aria-hidden="true">← </span>
          {previousLabel}
        </span>
        <span className="text-label font-semibold text-ink group-hover:text-accent-strong">
          {previous.title}
        </span>
      </Link>
      <Link
        href={routes.project(next.slug)}
        className="group flex max-w-1/2 flex-col items-end text-right"
      >
        <span className="text-small text-ink-muted">
          {nextLabel}
          <span aria-hidden="true"> →</span>
        </span>
        <span className="text-label font-semibold text-ink group-hover:text-accent-strong">
          {next.title}
        </span>
      </Link>
    </nav>
  );
}
