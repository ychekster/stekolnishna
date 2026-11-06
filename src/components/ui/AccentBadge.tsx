/**
 * Round 128px accent sticker (design: AccentBadge), e.g. "Бесплатный замер" over a photo.
 * Text is dark (`on-accent`) — white on the accent color fails contrast.
 */
import { cn } from "@/lib/cn";

export function AccentBadge({ children, className }: { children: string; className?: string }) {
  return (
    <div
      className={cn(
        "grid size-32 place-items-center rounded-full bg-accent p-4 text-center text-label font-semibold text-on-accent",
        className,
      )}
    >
      {children}
    </div>
  );
}
