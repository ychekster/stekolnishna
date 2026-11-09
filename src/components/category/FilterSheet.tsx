"use client";

/**
 * Bottom sheet with the category filters on phones (native modal <dialog>: focus trap,
 * Escape and backdrop come from the browser). Filters apply immediately; "Показать" closes.
 */
import { X } from "lucide-react";
import type { ReactNode, Ref } from "react";

import { Button } from "@/components/ui/Button";
import { ICON_STROKE } from "@/components/ui/Icon";

interface FilterSheetProps {
  ref: Ref<HTMLDialogElement>;
  title: string;
  applyLabel: string;
  children: ReactNode;
}

export function FilterSheet({ ref, title, applyLabel, children }: FilterSheetProps) {
  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      className="mt-auto mb-0 w-full max-w-none border-0 bg-transparent p-0 text-ink backdrop:bg-scrim"
    >
      <div className="rounded-t-lg bg-surface px-4 pt-4 pb-6">
        <div className="flex items-center justify-between">
          <h2 className="m-0 text-title">{title}</h2>
          <form method="dialog">
            <button
              type="submit"
              aria-label="Закрыть"
              className="grid size-10 cursor-pointer place-items-center rounded-full border-0 bg-surface-alt text-ink"
            >
              <X size={18} strokeWidth={ICON_STROKE} aria-hidden="true" />
            </button>
          </form>
        </div>
        <div className="mt-3">{children}</div>
        <form method="dialog" className="mt-5">
          <Button type="submit" className="w-full">
            {applyLabel}
          </Button>
        </form>
      </div>
    </dialog>
  );
}
