/**
 * Outlined card with a titled bullet list on a project page ("Материалы", "Выполненные работы").
 */
export function ProjectListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-line p-6 md:p-7">
      <h3 className="m-0 text-title">{title}</h3>
      <ul className="m-0 mt-3 list-disc pl-4.5 text-body text-ink-muted">
        {items.map((item) => (
          <li key={item} className="py-0.5">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
