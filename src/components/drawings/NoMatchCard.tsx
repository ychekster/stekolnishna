/**
 * Dashed card under the drawing gallery: "Нет подходящего рисунка?" with a button that
 * opens the Telegram bot to send a sketch, photo or logo.
 */
import { Button } from "@/components/ui/Button";
import type { DrawingsPageCopy } from "@/lib/content/types";

interface NoMatchCardProps {
  copy: DrawingsPageCopy["noMatch"];
  telegramHref: string;
}

export function NoMatchCard({ copy, telegramHref }: NoMatchCardProps) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-dashed border-line-strong p-5 md:p-6">
      <div>
        <h2 className="m-0 text-title">{copy.title}</h2>
        <p className="m-0 mt-1 text-caption text-ink-muted">{copy.text}</p>
      </div>
      <Button href={telegramHref} target="_blank" rel="noopener noreferrer">
        {copy.buttonLabel}
      </Button>
    </div>
  );
}
