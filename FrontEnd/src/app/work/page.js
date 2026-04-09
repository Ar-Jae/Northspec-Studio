"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import CaseStudyCard from "../../components/work/CaseStudyCard";
import FadeIn from "../../components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "../../components/animations/Stagger";
import Button from "../../components/Button";
import BackgroundCanvasClient from "../../components/3d/BackgroundCanvasClient";

function HeroSplitReveal({ text, className, delay = 0 }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.2em] mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block -mb-[0.2em]"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1, delay: delay + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function WorkPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY       = useTransform(heroScroll, [0, 1],   ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/content/case-studies`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error("Failed to fetch case studies:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-brand-dark min-h-screen relative overflow-hidden">
      <BackgroundCanvasClient />

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[40vh] w-full flex flex-col justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(198,166,104,0.07) 0%, transparent 70%)",
          }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-36 pt-24 pb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 bg-brand-gold" />
            <span className="text-[11px] font-bold tracking-[0.35em] text-brand-gold uppercase">
              Our Work
            </span>
            <div className="h-[1px] w-12 bg-brand-gold" />
          </motion.div>

          <h1 className="font-serif font-bold leading-[1.05] tracking-tight text-white mb-6">
            <HeroSplitReveal
              text="Engineering Excellence"
              delay={0.6}
              className="block text-[clamp(2.5rem,6.3vw,5.85rem)]"
            />
            <HeroSplitReveal
              text="Systems Built to Perform."
              delay={1.0}
              className="block text-brand-gold uppercase text-[clamp(1.5rem,4vw,3.5rem)]"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl text-slate-300 text-lg sm:text-xl leading-relaxed mb-12 font-times font-medium italic"
          >
            Real projects, real outcomes. Custom AI and automation systems that
            deliver measurable results for the businesses we build with.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Button
              as="link"
              href="/contact"
              variant="brand"
              className="rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em] font-bold"
            >
              Start a Project
            </Button>
            <Button
              as="link"
              href="/pricing"
              variant="outline"
              className="rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em] font-bold"
            >
              View Pricing
            </Button>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-brand-dark/60 pointer-events-none z-10" />
      </section>

      {/* ── CASE STUDIES ────────────────────────────────────────────────────── */}
      <Container className="pb-16 sm:pb-20 relative z-10">
        <FadeIn>
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
            </div>
          ) : (
            <StaggerContainer id="case-studies" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 scroll-mt-32">
              {data.map((study) => (
                <StaggerItem key={study._id || study.id}>
                  <CaseStudyCard study={study} compact />
                </StaggerItem>
              ))}
              {data.length === 0 && !loading && (
                <p className="text-gray-400 col-span-full text-center py-12">No case studies found.</p>
              )}
            </StaggerContainer>
          )}

          <div id="testimonials" className="mt-32 scroll-mt-32">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl font-bold text-white font-serif">Client Feedback</h2>
              <div className="h-[1px] flex-grow bg-white/10" />
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {[
                {
                  quote: "Northspec delivered our MVP ahead of schedule and with better architecture than we initially planned. Highly recommended.",
                  author: "Founder, Fintech Startup"
                },
                {
                  quote: "The level of communication and transparency is unmatched. We always knew exactly where the project stood.",
                  author: "CTO, E-commerce Platform"
                }
              ].map((t, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-sm relative"
                >
                  <div className="absolute top-8 left-8 text-brand-gold/20 text-6xl font-serif">"</div>
                  <p className="text-slate-300 italic text-lg leading-relaxed relative z-10">
                    {t.quote}
                  </p>
                  <p className="mt-8 text-sm font-bold text-white uppercase tracking-widest">- {t.author}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-32 rounded-3xl bg-brand-gold p-12 text-center">
            <h2 className="text-3xl font-bold text-brand-dark font-serif">Have a project in mind?</h2>
            <p className="mt-4 text-brand-dark/80 max-w-2xl mx-auto">
              Let&apos;s discuss your technical requirements and build a system that lasts.
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
