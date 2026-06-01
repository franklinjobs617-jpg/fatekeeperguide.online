import type { GuideFaq } from "@/lib/guides";

export function GuideFaqList({ faqs }: { faqs: GuideFaq[] }) {
  if (!faqs.length) {
    return null;
  }

  return (
    <section id="faq" className="article-section scroll-mt-28">
      <h2>Frequently asked questions</h2>
      <div className="mt-5 grid gap-3">
        {faqs.map((faq) => (
          <article key={faq.question} className="surface-tight p-4">
            <h3 className="text-[18px] font-medium leading-7 text-white">{faq.question}</h3>
            <p className="mt-3 text-[15px] leading-7 text-silver-text">{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
