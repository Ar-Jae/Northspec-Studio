"use client";

import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import ContactForm from "../../components/contact/ContactForm";
import site from "../../content/site";
import FadeIn from "../../components/animations/FadeIn";
import { motion } from "framer-motion";
import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";

export default function ContactPage() {
  return (
    <div className="bg-brand-dark min-h-screen relative overflow-hidden">
      <BackgroundCanvasClient />
      
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 mb-16">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Contact"
                title="Submit Project Specs"
                description="Our engineering team will follow up with a technical plan and timeline within 24 hours."
              />
            </div>
            <div className="flex-none">
              <div className="text-8xl font-bold text-white/5 font-times select-none uppercase">HI</div>
            </div>
          </div>

          <div className="grid gap-20 lg:grid-cols-12 relative z-10">
            <div id="info" className="lg:col-span-5 scroll-mt-32 space-y-16">
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-3xl font-bold text-white font-times uppercase tracking-[0.2em]">
                    Channels
                  </h2>
                  <div className="h-[1px] flex-grow bg-white/[0.03]" />
                </div>
                <p className="mt-4 text-slate-400 leading-relaxed font-medium italic">
                  Reach out to our specific departments for faster routing. We typically respond within <span className="text-brand-gold uppercase tracking-widest font-bold">24 hours</span>.
                </p>
              </section>

              <div className="grid gap-8">
                {[
                  { label: "Main Inquiry", value: site.contact.emails?.main || site.contact.email, icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                  { label: "Project Proposals", value: site.contact.emails?.projects, icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                  { label: "Billing & Finance", value: site.contact.emails?.billing, icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-6 group"
                  >
                    <div className="mt-1 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-dark transition-all duration-500 backdrop-blur-xl">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] font-times">{item.label}</p>
                      <p className="text-xl font-bold text-white mt-2 font-times tracking-tight group-hover:text-brand-gold transition-colors">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-12 relative z-10">
                <div className="grid gap-12 sm:grid-cols-2">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] font-times">Phone</p>
                    <p className="text-white mt-3 font-bold font-times text-lg">{site.contact.phone}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] font-times">Location</p>
                    <p className="text-white mt-3 font-bold font-times text-lg">{site.contact.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 relative z-10">
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-10 sm:p-16 backdrop-blur-xl relative overflow-hidden group hover:border-brand-gold/20 transition-all duration-700">
                <div className="absolute top-0 right-0 p-8 text-8xl font-black text-white/[0.02] font-times select-none italic tracking-tighter uppercase leading-none pointer-events-none group-hover:text-white/[0.04] transition-all duration-700">SUBMIT</div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] -mr-48 -mt-48 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <h2 className="text-3xl font-bold text-white font-times uppercase tracking-[0.2em] relative z-10">
                  Direct Line
                </h2>
                <p className="mt-6 text-slate-400 relative z-10 leading-relaxed font-medium italic mb-12">
                  Share a bit of context and we’ll respond within <span className="text-brand-gold font-bold">1 business day</span>.
                </p>
                
                <div className="relative z-10">
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

