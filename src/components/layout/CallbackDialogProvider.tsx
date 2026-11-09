"use client";

/**
 * The "Заказать звонок" dialog (spec §4.4, mockup "Заказать звонок — окно"), one instance
 * for the whole site, mounted by the root layout. Any `CallbackButton` opens it through
 * the context, so the trigger can sit in the header, the burger panel or a page.
 *
 * Native <dialog> with showModal(): the browser traps focus, closes on Escape, makes the
 * page behind inert and draws the backdrop. Page scroll is locked in globals.css
 * (`html:has(dialog[open])`). A click on the backdrop closes it too.
 */
import { X } from "lucide-react";
import { createContext, use, useCallback, useRef, useState, type ReactNode } from "react";

import { ICON_STROKE } from "@/components/ui/Icon";
import type { SiteSettings } from "@/lib/content/types";

import { CallbackForm } from "./CallbackForm";

const CallbackDialogContext = createContext<(() => void) | null>(null);

/** Function that opens the dialog. Use inside the provider (any page or layout part). */
export function useOpenCallbackDialog(): () => void {
  const open = use(CallbackDialogContext);
  if (!open) throw new Error("useOpenCallbackDialog must be used inside CallbackDialogProvider");
  return open;
}

interface CallbackDialogProviderProps {
  content: SiteSettings["callback"];
  privacyPolicyHref: string;
  children: ReactNode;
}

export function CallbackDialogProvider({
  content,
  privacyPolicyHref,
  children,
}: CallbackDialogProviderProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // A new key on every opening remounts the form: after a sent request the visitor sees
  // an empty form again instead of the old "Спасибо".
  const [formKey, setFormKey] = useState(0);

  const open = useCallback(() => {
    setFormKey((key) => key + 1);
    dialogRef.current?.showModal();
  }, []);
  const close = () => dialogRef.current?.close();

  return (
    <CallbackDialogContext value={open}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="callback-title"
        // The <dialog> box has no padding and the card fills it, so a click whose target is
        // the dialog itself landed on the backdrop.
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-auto w-[min(460px,calc(100%-2rem))] max-w-none border-0 bg-transparent p-0 text-ink backdrop:bg-scrim"
      >
        <div className="relative rounded-lg bg-surface p-6 shadow-pop md:p-9">
          <button
            type="button"
            onClick={close}
            aria-label="Закрыть"
            className="absolute top-4 right-4 grid size-10 cursor-pointer place-items-center rounded-full border-0 bg-surface-alt text-ink hover:bg-accent-soft"
          >
            <X size={18} strokeWidth={ICON_STROKE} aria-hidden="true" />
          </button>
          <CallbackForm key={formKey} content={content} privacyPolicyHref={privacyPolicyHref} />
        </div>
      </dialog>
    </CallbackDialogContext>
  );
}
