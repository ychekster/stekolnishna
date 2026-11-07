/**
 * "Команда": heading and a grid of key people (4 in a row on desktop, 2 on mobile).
 */
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AboutPage } from "@/lib/content/types";

import { TeamMember } from "./TeamMember";

export function TeamSection({ team }: { team: AboutPage["team"] }) {
  return (
    <Section id="team" labelledBy="team-title">
      <SectionHeading id="team-title" title={team.title} lead={team.lead} />
      <ul className="m-0 mt-6 grid list-none grid-cols-2 gap-3 p-0 md:mt-10 md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] md:gap-4">
        {team.members.map((member, index) => (
          // Index key: placeholder members share the name "[Имя Фамилия]".
          <li key={index}>
            <TeamMember member={member} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
