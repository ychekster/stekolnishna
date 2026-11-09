"use client";

/**
 * Drop zone for photos and drawings (spec §4.5) with the list of picked files as chips.
 *
 * Controlled: the parent keeps the File list and sends it with the form. The real <input
 * type="file"> stays inside the label, so the zone is keyboard- and click-accessible and,
 * without JS, the browser submits the picked files on its own. Name and size are checked
 * right away (same rules as the server, src/lib/leads/uploads.ts).
 */
import { FileUp, X } from "lucide-react";
import { useId, useState, type DragEvent } from "react";

import { ICON_STROKE } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { OrderPage } from "@/lib/content/types";
import {
  checkUploadList,
  describeUploadLimits,
  formatFileSize,
  UPLOAD_ACCEPT,
} from "@/lib/leads/uploads";

interface FileDropProps {
  files: File[];
  onChange: (files: File[]) => void;
  labels: Pick<OrderPage["form"], "dropTitle" | "dropHint" | "removeFileLabel">;
  /** Error from the server, shown until the visitor changes the files. */
  serverError?: string;
  className?: string;
}

export function FileDrop({ files, onChange, labels, serverError, className }: FileDropProps) {
  const errorId = `${useId()}-files-error`;
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setDragging] = useState(false);
  const shownError = error ?? serverError;

  const add = (picked: FileList | null) => {
    if (!picked || picked.length === 0) return;
    const next = [...files, ...Array.from(picked)];
    const problem = checkUploadList(next);
    setError(problem);
    if (!problem) onChange(next);
  };

  const remove = (index: number) => {
    setError(null);
    onChange(files.filter((_, i) => i !== index));
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    add(event.dataTransfer.files);
  };

  return (
    <div className={className}>
      <label
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "relative flex cursor-pointer items-center gap-4 rounded-md border border-dashed bg-surface p-4 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus md:p-6",
          isDragging ? "border-accent-strong" : "border-line-strong",
        )}
      >
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-strong">
          <FileUp size={20} strokeWidth={ICON_STROKE} aria-hidden="true" />
        </span>
        <span className="flex flex-col">
          <span className="text-label font-semibold">{labels.dropTitle}</span>
          <span className="text-caption text-ink-muted">
            {labels.dropHint}, {describeUploadLimits()}
          </span>
        </span>
        <input
          type="file"
          name="files"
          multiple
          accept={UPLOAD_ACCEPT}
          aria-invalid={Boolean(shownError)}
          aria-describedby={shownError ? errorId : undefined}
          onChange={(event) => {
            add(event.target.files);
            // The files now live in state; clear the input so it does not send them twice
            // and so picking the same file again fires `change`.
            event.target.value = "";
          }}
          className="absolute size-px opacity-0"
        />
      </label>

      {shownError && (
        <p id={errorId} role="alert" className="m-0 mt-2 text-caption font-medium text-danger">
          {shownError}
        </p>
      )}

      {files.length > 0 && (
        <ul className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${file.size}-${index}`}
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-surface py-1.5 pr-1.5 pl-3 text-caption"
            >
              <span className="truncate">
                {file.name}, {formatFileSize(file.size)}
              </span>
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label={`${labels.removeFileLabel}: ${file.name}`}
                className="grid size-6 shrink-0 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-ink-muted hover:bg-surface-alt hover:text-ink"
              >
                <X size={14} strokeWidth={ICON_STROKE} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
