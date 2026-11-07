/**
 * 404 page. While most sections from the sitemap are still planned, navigation links lead
 * here — so the copy says "section is in progress" rather than "page not found".
 * Revisit the wording once all planned pages exist.
 */
import { Button } from "@/components/ui/Button";
import { routes } from "@/lib/routes";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-start justify-center gap-6 py-16">
      <h1 className="m-0 text-h2 md:text-h1">Раздел скоро появится</h1>
      <p className="m-0 max-w-120 text-body text-ink-muted">
        Мы готовим эту страницу. А пока посмотрите главную или оставьте заявку: рассчитаем стоимость
        и ответим на вопросы.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button href={routes.home} variant="outline">
          На главную
        </Button>
        <Button href={routes.leadForm}>Оставить заявку</Button>
      </div>
    </section>
  );
}
