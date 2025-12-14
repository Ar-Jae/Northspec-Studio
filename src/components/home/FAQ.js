import Container from "../Container";
import SectionHeading from "../SectionHeading";
import faqs from "../../content/faqs";

export default function FAQ() {
  return (
    <section className="bg-white">
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
              className="group rounded-2xl border border-slate-200 bg-white p-6"
            >
              <summary className="cursor-pointer list-none text-base font-semibold tracking-tight text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                <div className="flex items-start justify-between gap-4">
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 text-slate-500 transition group-open:rotate-45"
                  >
                    +
                  </span>
                </div>
              </summary>
              <p className="mt-3 text-sm text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
