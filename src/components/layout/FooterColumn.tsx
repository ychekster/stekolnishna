/**
 * A titled list of links in the footer ("Меню", "Популярные услуги", "Покупателям").
 */
import Link from "next/link";

import type { LinkItem } from "@/lib/content/types";

export function FooterColumn({ title, links }: { title: string; links: LinkItem[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="m-0 text-caption font-semibold text-ink">{title}</h2>
      <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-caption text-ink-muted hover:text-accent-strong">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
