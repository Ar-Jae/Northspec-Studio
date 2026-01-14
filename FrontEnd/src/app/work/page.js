"use client";

import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import Button from "../../components/Button";
import CaseStudyCard from "../../components/work/CaseStudyCard";
import FadeIn from "../../components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "../../components/animations/Stagger";
import { motion } from "framer-motion";
import { caseStudies, testimonials } from "../../lib/data";

export default function WorkPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12 mb-16">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Portfolio"
                title="Engineering Excellence"
                description="Realistic examples of how we improve conversion, reliability, and velocity for teams through durable software engineering." 
              />
            </div>
            <div className="flex-none">
              <div className="text-8xl font-bold text-white/5 font-serif select-none">WORK</div>
            </div>
          </div>

          <StaggerContainer id="case-studies" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 scroll-mt-32">
            {caseStudies.map((study) => (
              <StaggerItem key={study.id}>
                <CaseStudyCard study={study} compact />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div id="testimonials" className="mt-32 scroll-mt-32">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl font-bold text-white font-serif">Client Feedback</h2>
              <div className="h-[1px] flex-grow bg-white/10" />
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              {testimonials.map((t, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-sm relative"
                >
                  <div className="absolute top-8 left-8 text-brand-gold/20 text-6xl font-serif">"</div>
                  <p className="text-slate-300 italic text-lg leading-relaxed relative z-10">
                    {t.quote}
                  </p>
                  <p className="mt-8 text-sm font-bold text-white uppercase tracking-widest">— {t.name}, {t.title} at {t.company}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-32 rounded-3xl bg-brand-gold p-12 text-center">
            <h2 className="text-3xl font-bold text-brand-dark font-serif">Have a project in mind?</h2>
            <p className="mt-4 text-brand-dark/80 max-w-2xl mx-auto">
              Let's discuss your technical requirements and build a system that lasts.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button as="link" href="/contact" variant="brand-dark">Start Your Project</Button>
              <Button as="link" href="/pricing" variant="outline-dark">View Pricing</Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}

