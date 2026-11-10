/**
 * Legal information /pravovaya-informaciya (spec §9, design mockup "Правовая информация +
 * cookie"): privacy policy, personal-data consent, terms and cookie policy on one page,
 * with a table of contents. The cookie banner itself is site-wide (root layout). The
 * folder name must match `routes.legal`.
 */
import type { Metadata } from "next";

import { LegalNav } from "@/components/legal/LegalNav";
import { LegalSection } from "@/components/legal/LegalSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getLegalPage } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const legal = await getLegalPage();
  return { title: legal.seo.title, description: legal.seo.description };
}

export default async function LegalPage() {
  const legal = await getLegalPage();

  return (
    <>
      <Breadcrumbs items={[{ label: legal.name }]} />
      <h1 className="m-0 mt-4 text-display-sm md:mt-6 md:text-display">{legal.title}</h1>
      <p className="m-0 mt-3 text-nav font-normal text-ink-muted">{legal.revision}</p>
      <div className="mt-8 flex flex-wrap items-start gap-6 md:mt-12 md:gap-12">
        <div className="w-full flex-[1_1_240px] self-stretch md:max-w-70">
          <LegalNav label={legal.navLabel} sections={legal.sections} />
        </div>
        <div className="dividers-between max-w-190 min-w-0 flex-[999_1_560px]">
          {legal.sections.map((section) => (
            <LegalSection key={section.id} section={section} />
          ))}
        </div>
      </div>
    </>
  );
}
