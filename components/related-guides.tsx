import { GuideCard } from "./guide-card";
import type { GuidePage } from "@/lib/guides";

export function RelatedGuides({ guides }: { guides: GuidePage[] }) {
  if (!guides.length) {
    return null;
  }

  return (
    <section className="container py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="kicker">Next reads</p>
          <h2 className="section-title mt-3">Related Fatekeeper guides</h2>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {guides.slice(0, 6).map((guide) => (
          <GuideCard key={guide.slug} guide={guide} compact />
        ))}
      </div>
    </section>
  );
}
