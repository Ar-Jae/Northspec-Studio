import Container from "../Container";
import Button from "../Button";

export default function CTASection() {
  return (
    <section className="bg-slate-900">
      <Container className="py-14 sm:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to start with a clear spec?
            </h2>
            <p className="mt-2 max-w-2xl text-pretty text-base text-slate-200">
              Book a call. We’ll define scope, discuss tradeoffs, and outline a plan you can trust.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              as="link"
              href="/work"
              variant="secondary"
              className="bg-white/10 text-white hover:bg-white/15 focus-visible:ring-white"
            >
              View Work
            </Button>
            <Button
              as="link"
              href="/contact"
              variant="primary"
              className="bg-white text-slate-900 hover:bg-slate-100 focus-visible:ring-white"
            >
              Book a Call
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
