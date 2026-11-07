/**
 * Team member card: 4:5 portrait (placeholder until a photo exists), name and role.
 */
import { MediaFrame } from "@/components/ui/MediaFrame";
import type { TeamMember as TeamMemberData } from "@/lib/content/types";

export function TeamMember({ member }: { member: TeamMemberData }) {
  return (
    <figure className="m-0">
      <div className="aspect-4/5 overflow-hidden rounded-md">
        <MediaFrame image={member.photo} sizes="(min-width: 768px) 25vw, 50vw" />
      </div>
      <figcaption className="mt-3">
        <div className="text-label font-semibold text-ink md:text-title">{member.name}</div>
        <div className="mt-0.5 text-small text-ink-muted md:text-caption">{member.role}</div>
      </figcaption>
    </figure>
  );
}
