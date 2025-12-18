import Container from "../Container";
import SectionHeading from "../SectionHeading";
import faqs from "../../content/faqs";

export default function FAQ() {
  return (
    <section className="bg-brand-dark">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="FAQ"
          title="Answers, upfront"
          description="A few common questions before you reach out."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 open:bg-white/10 transition-colors"
            >
              <summary className="cursor-pointer list-none text-base font-semibold tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark font-serif">
                <div className="flex items-start justify-between gap-4">
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 text-slate-400 transition group-open:rotate-45 group-open:text-brand-gold"
                  >
                    +
                  </span>
                </div>
              </summary>
              <p className="mt-3 text-sm text-slate-400">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
