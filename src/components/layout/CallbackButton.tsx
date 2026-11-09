"use client";

/**
 * Button that opens the "Заказать звонок" dialog. Accepts the usual Button styling props;
 * `as="text"` renders a small accent text button (header, under the phone number).
 */
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

import { useOpenCallbackDialog } from "./CallbackDialogProvider";

interface CallbackButtonProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  as?: "button" | "text";
  className?: string;
  /** Extra action on click, e.g. closing the burger panel. */
  onOpen?: () => void;
}

export function CallbackButton({
  label,
  variant = "outline",
  size = "sm",
  as = "button",
  className,
  onOpen,
}: CallbackButtonProps) {
  const open = useOpenCallbackDialog();
  const handleClick = () => {
    onOpen?.();
    open();
  };

  if (as === "text") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-haspopup="dialog"
        className={cn(
          "cursor-pointer border-0 bg-transparent p-0 text-left text-small text-accent-strong underline-offset-2 hover:underline",
          className,
        )}
      >
        {label}
      </button>
    );
  }
  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      aria-haspopup="dialog"
      className={className}
    >
      {label}
    </Button>
  );
}
