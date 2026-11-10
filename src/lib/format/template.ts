/**
 * Fills `{key}` slots in editable copy ("Показано {shown} из {total}"). Copy keeps whole
 * phrases with slots instead of being glued from pieces in code, so editors can reword it
 * and move the numbers. Unknown slots stay visible, so a typo in the CMS shows on the page
 * instead of silently disappearing.
 */
export function fillTemplate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (slot, key: string) =>
    key in values ? String(values[key]) : slot,
  );
}
