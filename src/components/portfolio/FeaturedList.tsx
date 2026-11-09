/**
 * Small titled bullet list inside the "Проект месяца" card (materials, works). Shows the
 * first three items: the full lists are on the project page.
 */
export function FeaturedList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="m-0 text-caption font-semibold">{title}</h3>
      <ul className="m-0 mt-2 pl-4 text-caption text-ink-muted">
        {items.slice(0, 3).map((item) => (
          <li key={item} className="py-px">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
