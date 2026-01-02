"use client";

import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import ContactForm from "../../components/contact/ContactForm";
import site from "../../content/site";
import FadeIn from "../../components/animations/FadeIn";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12 mb-16">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Contact"
                title="Let's build something durable"
                description="Tell us what you’re building. We’ll follow up with a clear plan and timeline."
              />
            </div>
            <div className="flex-none">
              <div className="text-8xl font-bold text-white/5 font-serif select-none">HI</div>
            </div>
          </div>

          <div className="grid gap-16 lg:grid-cols-12">
            <div id="info" className="lg:col-span-5 scroll-mt-32 space-y-12">
              <section>
                <h2 className="text-2xl font-semibold text-white font-serif flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-brand-gold" />
                  Direct Channels
                </h2>
                <p className="mt-4 text-slate-400 leading-relaxed">
                  Prefer a direct conversation? Reach out to our specific departments for faster routing.
                </p>
              </section>

              <div className="grid gap-6">
                {[
                  { label: "Main Inquiry", value: site.contact.emails?.main || site.contact.email, icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                  { label: "Project Proposals", value: site.contact.emails?.projects, icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                  { label: "Billing & Finance", value: site.contact.emails?.billing, icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="mt-1 p-2 rounded-lg bg-white/5 border border-white/10 text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-dark transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
                      <p className="text-lg font-medium text-white mt-1">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-12 border-t border-white/10">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone</p>
                    <p className="text-white mt-2">{site.contact.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Location</p>
                    <p className="text-white mt-2">{site.contact.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-12 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl -mr-32 -mt-32" />
                
                <h2 className="text-2xl font-bold text-white font-serif relative z-10">
                  Send a message
                </h2>
                <p className="mt-4 text-slate-400 relative z-10">
                  Share a bit of context and we’ll respond within 1 business day.
                </p>
                
                <div className="mt-10 relative z-10">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}

