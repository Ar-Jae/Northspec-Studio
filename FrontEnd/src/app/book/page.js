"use client";

import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import site from "../../content/site";
import FadeIn from "../../components/animations/FadeIn";
import { motion } from "framer-motion";

export default function BookPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12 mb-16">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Discovery"
                title="Book a Call"
                description="Select a time that works for you. We'll use this session to understand your technical requirements, business goals, and project timeline."
              />
            </div>
            <div className="flex-none">
              <div className="text-8xl font-bold text-white/5 font-serif select-none">CAL</div>
            </div>
          </div>

          <div className="grid gap-16 lg:grid-cols-12">
            {/* Left Side: Context/Prep */}
            <div className="lg:col-span-4 space-y-12">
              <section>
                <h2 className="text-2xl font-semibold text-white font-serif flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-brand-gold" />
                  What to expect
                </h2>
                <div className="mt-8 space-y-8">
                  {[
                    { title: "30-Minute Session", desc: "A focused technical discussion about your project." },
                    { title: "Scope Definition", desc: "We'll help clarify requirements and technical constraints." },
                    { title: "Next Steps", desc: "You'll leave with a clear understanding of how we can help." }
                  ].map((item, i) => (
                    <div key={i} className="relative pl-8 border-l border-white/10">
                      <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-brand-gold" />
                      <h4 className="text-white font-bold">{item.title}</h4>
                      <p className="mt-2 text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h3 className="text-lg font-bold text-white font-serif">Preparation</h3>
                <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                  To make the most of our time, please have any existing documentation, wireframes, or technical requirements ready to share.
                </p>
              </div>
            </div>

            {/* Right Side: Calendar Embed */}
            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden min-h-[600px] relative">
                {/* Loading State / Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
                </div>
                
                <iframe
                  src={site.calendarUrl}
                  width="100%"
                  height="700"
                  frameBorder="0"
                  className="relative z-10"
                  title="Schedule a Call"
                ></iframe>
              </div>
              
              <p className="mt-6 text-center text-xs text-slate-500 italic">
                Can't find a time that works? Email us at <a href={`mailto:${site.contact.email}`} className="text-brand-gold hover:underline">{site.contact.email}</a>
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
