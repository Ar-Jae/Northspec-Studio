"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../Container";
import Button from "../Button";
import StarField from "../animations/StarField";
import TextReveal from "../animations/TextReveal";
import FadeIn from "../animations/FadeIn";
import site from "../../content/site";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-brand-dark pt-20 flex flex-col justify-center">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-hero-gradient opacity-20 pointer-events-none" />

      {/* Starfield Animation */}
      <StarField speed={0.2} density={800} />

      {/* Large Background Text - only on md+ */}
      <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none select-none overflow-hidden">
        <TextReveal>
          <h1 className="text-4xl xs:text-5xl sm:text-[8vw] font-bold tracking-tighter text-white leading-none opacity-100 z-0 text-center font-serif px-2">
            Northspec Studio
          </h1>
        </TextReveal>
      </div>

      <Container className="relative z-10 h-full flex-1 flex flex-col">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Left Sidebar - Socials (hidden on mobile) */}
          <div className="hidden lg:flex col-span-1 flex-col gap-6 items-center justify-center h-full">
            {site.social.map((social, i) => (
              <FadeIn key={social.label} delay={0.8 + (i * 0.1)} direction="right">
                <a 
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-bold text-white hover:bg-white hover:text-brand-dark transition-colors"
                  title={social.label}
                >
                  {social.shortLabel || social.label}
                </a>
              </FadeIn>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="col-span-1 lg:col-span-11 relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px] flex items-center justify-center w-full">
            {/* Company name heading for mobile only */}
            <div className="block md:hidden w-full text-center mb-4">
              <h1 className="text-3xl font-bold tracking-tight text-white font-serif">Northspec Studio</h1>
            </div>
            {/* Description & CTA - Responsive position */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative lg:absolute bottom-0 right-0 lg:right-10 z-20 max-w-xs w-full px-2 sm:px-0 text-center lg:text-right flex flex-col items-center lg:items-end gap-6"
            >
              <p className="text-base sm:text-sm text-slate-400 leading-relaxed">
                In a world where digital presence means everything, we help businesses grow, attract clients, and stay one step ahead of the competition. Your goal is our focus. We create strategies that work.
              </p>
              <Button as="link" href="/services" variant="brand" className="rounded-full px-6 py-4 sm:py-6 text-base sm:text-lg uppercase tracking-wider w-full sm:w-auto">
                START YOUR JOURNEY
              </Button>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
