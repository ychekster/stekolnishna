/**
 * Hidden anti-spam field of every form: invisible to people and screen readers, filled
 * only by naive bots. The server pretends success when it is filled (src/lib/leads).
 */
import { HONEYPOT_FIELD } from "@/lib/leads/schema";

export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Не заполняйте это поле
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
