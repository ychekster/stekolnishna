/**
 * Lead storage.
 *
 * TEMPORARY: there is no database yet, so leads are only written to the server log.
 * When Payload CMS is connected, this becomes `payload.create({ collection: "leads", ... })`
 * plus the owner notification (channel is an open question — see docs/open-questions.md).
 * Callers already depend only on this function, so nothing else changes.
 */
import "server-only";

import type { LeadFormData } from "./schema";

export interface LeadRecord extends LeadFormData {
  source: "homepage-form";
  createdAt: string;
}

export async function saveLead(lead: LeadFormData): Promise<void> {
  const record: LeadRecord = {
    ...lead,
    source: "homepage-form",
    createdAt: new Date().toISOString(),
  };
  console.info("[lead] new lead received (not persisted yet — no database)", record);
}
