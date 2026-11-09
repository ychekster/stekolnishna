"use client";

/**
 * Keeps the chosen drawing set in the URL (`/katalog/risunki?nabor=cvety`), so a set can be
 * shared and survives a reload. Uses the native History API: Next.js syncs it with
 * useSearchParams, and no server request is made. Must sit inside <Suspense> (search params
 * are unknown while the static page is prerendered); the fallback is DrawingsBrowser
 * showing the first set.
 */
import { useSearchParams } from "next/navigation";
import type { ComponentProps } from "react";

import { DrawingsBrowser } from "./DrawingsBrowser";

export const DRAWING_SET_PARAM = "nabor";

type DrawingsUrlBrowserProps = Omit<ComponentProps<typeof DrawingsBrowser>, "slug" | "onSelect">;

export function DrawingsUrlBrowser(props: DrawingsUrlBrowserProps) {
  const searchParams = useSearchParams();
  const slug = searchParams.get(DRAWING_SET_PARAM) ?? props.sets[0]?.slug ?? "";

  const select = (next: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(DRAWING_SET_PARAM, next);
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  return <DrawingsBrowser {...props} slug={slug} onSelect={select} />;
}
