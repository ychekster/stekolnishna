/**
 * "← В каталог" / "← Все проекты" link under the breadcrumbs of inner pages.
 */
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { ICON_STROKE } from "./Icon";

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mt-4 inline-flex items-center gap-1.5 text-nav text-accent-strong hover:text-ink md:mt-5"
    >
      <ArrowLeft size={18} strokeWidth={ICON_STROKE} aria-hidden="true" />
      {label}
    </Link>
  );
}
