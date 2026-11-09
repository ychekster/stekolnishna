/**
 * Lead storage.
 *
 * TEMPORARY: there is no database yet, so leads are only written to the server log, and
 * attached files are checked but not kept (only their names, types and sizes are logged).
 * When Payload CMS is connected, this becomes `payload.create({ collection: "leads", ... })`
 * with the files in a Payload upload collection, plus the email notification to the owner
 * (docs/backlog.md). Callers already depend only on this function, so nothing else changes.
 */
import "server-only";

import type { CallbackFormData } from "./callback-schema";
import type { OrderFormData } from "./order-schema";
import type { LeadFormData } from "./schema";
import type { SniffedType } from "./uploads";

/** An attachment that passed the checks in uploads.ts. */
export interface LeadAttachment {
  name: string;
  size: number;
  type: SniffedType;
  file: File;
}

/** One lead, by the form it came from (data-model.md: order request / callback request). */
export type LeadInput =
  | ({ kind: "request" } & LeadFormData)
  | ({ kind: "callback" } & CallbackFormData)
  | ({ kind: "order"; attachments: LeadAttachment[] } & OrderFormData);

export async function saveLead(lead: LeadInput): Promise<void> {
  const record = {
    ...lead,
    ...(lead.kind === "order" && {
      attachments: lead.attachments.map(({ name, size, type }) => ({ name, size, type })),
    }),
    createdAt: new Date().toISOString(),
  };
  console.info("[lead] new lead received (not persisted yet — no database)", record);
}
