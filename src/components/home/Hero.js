"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../Container";
import Button from "../Button";
import site from "../../content/site";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50">
      <Container className="py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <p className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              Web development • Software engineering • Product support
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Build and maintain software to spec.
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-base text-slate-600 sm:text-lg">
              We help teams ship production-ready software without surprises or shortcuts.
              Clean code. Clear scope. Reliable delivery.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button as="link" href="/contact" variant="primary">
                Book a Call
              </Button>
              <Button as="link" href="/work" variant="secondary">
                View Work
              </Button>
            </div>

            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <dt className="text-xs text-slate-600">Built to spec</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">
                  Clear requirements
                </dd>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <dt className="text-xs text-slate-600">Senior execution</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">Direct work</dd>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <dt className="text-xs text-slate-600">Reliable delivery</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">Weekly updates</dd>
              </div>
            </dl>
          </motion.div>

          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <div className="relative aspect-[16/11] bg-slate-100">
                <Image
                  src="/images/placeholder-1.jpg"
                  alt="Project screenshot placeholder"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-600">What you get</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    A maintainable system
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Documented decisions, clean interfaces, and a clear handoff.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-600">How we work</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">No guesswork</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Clear scopes, real estimates, and steady communication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
