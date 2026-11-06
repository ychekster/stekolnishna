/**
 * Text logo: company name + tagline (design: Brand). Swap for an <Image> once the
 * customer provides a logo file.
 */
export function Brand({ name, tagline }: { name: string; tagline: string }) {
  return (
    <a href="#" className="inline-flex flex-col leading-none text-ink">
      <span className="text-brand">{name}</span>
      <span className="mt-0.5 text-micro text-ink-muted">{tagline}</span>
    </a>
  );
}
