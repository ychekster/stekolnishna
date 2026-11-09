/**
 * Renders long text stored as blocks (headings, paragraphs, lists): category and product
 * descriptions, SEO texts. Rich text in the CMS later maps to the same blocks.
 */
import { cn } from "@/lib/cn";
import type { DescriptionBlock } from "@/lib/content/types";

interface RichTextProps {
  blocks: DescriptionBlock[];
  className?: string;
}

export function RichText({ blocks, className }: RichTextProps) {
  return (
    <div className={cn("text-body text-ink-muted", className)}>
      {blocks.map((block, index) => {
        const key = `${block.kind}-${index}`;
        if (block.kind === "heading") {
          return (
            <h3 key={key} className="m-0 mt-5 text-title text-ink first:mt-0">
              {block.text}
            </h3>
          );
        }
        if (block.kind === "list") {
          return (
            <ul key={key} className="m-0 mt-3 list-disc pl-5 first:mt-0">
              {block.items.map((item) => (
                <li key={item} className="py-0.5">
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={key} className="m-0 mt-3 first:mt-0">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
