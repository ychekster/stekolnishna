/**
 * Numbering of glass-drawing samples: a sample has no name, only its position in the set,
 * printed on the tile as "№ 07" and said to the manager ("Цветы, № 07").
 */

/** "07" for the 7th sample (zero-based index 6). */
export function sampleNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

/** What goes into the lead form's "Номер образца" field. */
export function sampleReference(setName: string, index: number): string {
  return `${setName}, № ${sampleNumber(index)}`;
}
