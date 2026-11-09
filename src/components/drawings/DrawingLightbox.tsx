"use client";

/**
 * Full-size view of a drawing sample (native modal <dialog>): picture, its number, arrows
 * and ←/→ keys to browse the set, and "Выбрать этот рисунок", which writes "Набор, № 07"
 * into the "Номер образца" field of the page's lead form and scrolls to it.
 */
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/Button";
import { ICON_STROKE } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { sampleNumber, sampleReference } from "@/lib/catalog/drawings";
import type { DrawingSet } from "@/lib/content/types";

interface DrawingLightboxProps {
  set: DrawingSet;
  /** Open sample, or null when closed. */
  index: number | null;
  onIndexChange: (index: number | null) => void;
  chooseLabel: string;
}

export function DrawingLightbox({ set, index, onIndexChange, chooseLabel }: DrawingLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const count = set.images.length;

  // Sync the native dialog with the `index` prop (open/close from React state).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  const go = (step: number) => {
    if (index === null) return;
    onIndexChange((index + step + count) % count);
  };

  const choose = () => {
    if (index === null) return;
    const field = document.querySelector<HTMLInputElement>('#form input[name="sample"]');
    onIndexChange(null);
    if (field) {
      field.value = sampleReference(set.name, index);
      field.scrollIntoView({ block: "center" });
      field.focus({ preventScroll: true });
    }
  };

  const image = index === null ? null : set.images[index];

  return (
    <dialog
      ref={dialogRef}
      aria-label={image ? image.alt : set.name}
      onClose={() => onIndexChange(null)}
      onClick={(event) => {
        if (event.target === event.currentTarget) onIndexChange(null);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") go(-1);
        if (event.key === "ArrowRight") go(1);
      }}
      className="m-auto w-[min(640px,calc(100%-2rem))] max-w-none border-0 bg-transparent p-0 text-ink backdrop:bg-scrim"
    >
      {image && index !== null && (
        <div className="relative rounded-lg bg-surface p-4 shadow-pop md:p-6">
          <div className="flex items-center justify-between gap-4">
            <span className="text-title">
              {set.name}, № {sampleNumber(index)}
            </span>
            <button
              type="button"
              onClick={() => onIndexChange(null)}
              aria-label="Закрыть"
              className="grid size-10 cursor-pointer place-items-center rounded-full border-0 bg-surface-alt text-ink"
            >
              <X size={18} strokeWidth={ICON_STROKE} aria-hidden="true" />
            </button>
          </div>
          <div className="relative mt-4 aspect-square overflow-hidden rounded-md bg-surface-alt">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="600px"
              className="object-contain p-4"
            />
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <IconButton aria-label="Предыдущий образец" onClick={() => go(-1)}>
                <ArrowLeft size={16} strokeWidth={ICON_STROKE} aria-hidden="true" />
              </IconButton>
              <span className="text-caption text-ink-muted">
                {index + 1} / {count}
              </span>
              <IconButton aria-label="Следующий образец" onClick={() => go(1)}>
                <ArrowRight size={16} strokeWidth={ICON_STROKE} aria-hidden="true" />
              </IconButton>
            </div>
            <Button size="sm" onClick={choose}>
              {chooseLabel}
            </Button>
          </div>
        </div>
      )}
    </dialog>
  );
}
