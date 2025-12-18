import Container from "../Container";
import Button from "../Button";
import TextReveal from "../animations/TextReveal";
import FadeIn from "../animations/FadeIn";

export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-brand-dark to-slate-900 border-t border-white/10">
      <Container className="py-14 sm:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <TextReveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl font-serif pb-1">
                Ready to start with a clear spec?
              </h2>
            </TextReveal>
            <FadeIn delay={0.2}>
              <p className="mt-2 max-w-2xl text-pretty text-base text-slate-400">
                Book a call. We’ll define scope, discuss tradeoffs, and outline a plan you can trust.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.4} className="flex flex-col gap-3 sm:flex-row">
            <Button
              as="link"
              href="/work"
              variant="secondary"
            >
              View Work
            </Button>
            <Button
              as="link"
              href="/contact"
              variant="brand"
            >
              Book a Call
            </Button>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
