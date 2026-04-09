"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "../Button";
import site from "../../content/site";
import { SplineScene } from "@/components/ui/spline";
import { Spotlight } from "@/components/ui/spotlight-hover";
import { Spotlight as SpotlightStatic } from "@/components/ui/spotlight-static";

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.8 }}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
    >
      <span className="text-[10px] font-bold tracking-[0.3em] text-slate-500 uppercase">
        Scroll
      </span>
      <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold to-transparent" />
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        className="w-1.5 h-1.5 rounded-full bg-brand-gold"
      />
    </motion.div>
  );
}

// Letter-by-letter reveal for the large title
function SplitReveal({ text, className, delay = 0 }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden pb-[0.2em] mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block -mb-[0.2em]"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 1,
              delay: delay + wi * 0.14,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function ImmersiveHero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const yContent    = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityOut  = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scaleOut    = useTransform(scrollYProgress, [0, 0.7], [1, 0.92]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-transparent"
    >
      {/* Background Static Spotlight */}
      <SpotlightStatic
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      {/* Interactive Hover Spotlight */}
      <Spotlight size={500} />

      {/* Radial glow - Adjusted opacity for visibility of main background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(198,166,104,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Horizontal rule top removed for a cleaner, floating feel */}

      <div className="relative z-10 w-full mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 pt-12">
          {/* Left content: Text & CTA */}
          <motion.div
            style={{ y: yContent, opacity: opacityOut, scale: scaleOut }}
            className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left pt-12 lg:pt-0"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-[1px] w-12 bg-brand-gold" />
              <span className="text-[11px] font-bold tracking-[0.35em] text-brand-gold uppercase">
                Northspec Studio
              </span>
              <div className="h-[1px] w-12 bg-brand-gold" />
            </motion.div>

            {/* Main headline */}
            <h1 className="font-serif font-bold leading-[1.05] tracking-tight text-white mb-4">
              <SplitReveal text="AI Automations &" delay={0.7} className="block text-[clamp(2.5rem,5.5vw,5rem)]" />
              <SplitReveal
                text="Web Development."
                delay={1.3}
                className="block text-brand-gold uppercase text-[clamp(1.5rem,3.2vw,3rem)]"
              />
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
              className="mb-8"
            >
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.4em] text-slate-500 uppercase font-times italic">
                From AI Workflows to Custom Mobile & Web Apps.
              </span>
            </motion.div>

            {/* Sub-tagline */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.8, ease: "easeOut" }}
              className="max-w-xl text-slate-300 text-lg leading-relaxed mb-12 font-times font-medium italic"
            >
              Northspec Studio delivers industry-leading AI automations, high-performance web development, 
              and custom mobile app development designed to scale your modern business.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.7 }}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4"
            >
              <Button
                as="link"
                href="/contact"
                variant="brand"
                className="rounded-full px-10 py-5 text-sm uppercase tracking-[0.2em] font-bold"
              >
                Schedule an AI Strategy Session
              </Button>
            </motion.div>
          </motion.div>

          {/* Right content: 3D Scene */}
          <div 
            className="flex-1 relative w-full h-[400px] md:h-[500px] lg:h-[700px] group cursor-grab active:cursor-grabbing overflow-visible z-10"
          >
            <div className="absolute inset-0 bg-brand-gold/5 rounded-3xl blur-3xl group-hover:bg-brand-gold/10 transition-colors duration-500 scale-150 translate-y-25" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 100 }}
              transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
              className="w-full h-full"
            >
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-[120%] relative z-10 overflow-visible"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <ScrollIndicator />

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-brand-dark/60 pointer-events-none z-10" />
    </section>
  );
}
