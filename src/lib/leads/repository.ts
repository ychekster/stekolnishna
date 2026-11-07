/**
 * Lead storage.
 *
 * TEMPORARY: there is no database yet, so leads are only written to the server log.
 * When Payload CMS is connected, this becomes `payload.create({ collection: "leads", ... })`
 * plus the email notification to the owner (docs/backlog.md).
 * Callers already depend only on this function, so nothing else changes.
 */
import "server-only";

import type { LeadFormData } from "./schema";

export interface LeadRecord extends LeadFormData {
  createdAt: string;
}

export async function saveLead(lead: LeadFormData): Promise<void> {
  const record: LeadRecord = { ...lead, createdAt: new Date().toISOString() };
  console.info("[lead] new lead received (not persisted yet — no database)", record);
}
