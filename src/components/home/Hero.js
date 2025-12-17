"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../Container";
import Button from "../Button";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-brand-dark pt-20 flex flex-col justify-center">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-hero-gradient opacity-20 pointer-events-none" />
      
      {/* Large Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h1 className="text-[8vw] font-bold tracking-tighter text-white leading-none opacity-100 z-0 text-center">
          Northspec Studio
        </h1>
        <span className="absolute right-[10%] top-[50%] text-4xl font-light text-white/80 tracking-widest">
          Agency
        </span>
      </div>

      <Container className="relative z-10 h-full flex-1 flex flex-col">
        <div className="flex-1 grid grid-cols-12 gap-4 items-center">
          
          {/* Left Sidebar - Socials */}
          <div className="hidden lg:flex col-span-1 flex-col gap-6 items-center justify-center h-full">
            {['IG', 'TW', 'FB', 'LI'].map((social) => (
              <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs text-white hover:bg-white hover:text-brand-dark transition-colors">
                {social}
              </a>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-11 relative h-[600px] flex items-center justify-center">
            




            {/* Description & CTA - Bottom Right */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute bottom-0 right-0 md:right-10 z-20 max-w-xs text-right flex flex-col items-end gap-6"
            >
              <p className="text-sm text-slate-400 leading-relaxed">
                In a world where digital presence means everything, we help businesses grow, attract clients, and stay one step ahead of the competition. Your goal is our focus. We create strategies that work.
              </p>
              <Button as="link" href="/contact" variant="brand" className="rounded-full px-8 py-6 text-lg">
                contact us
              </Button>
            </motion.div>

          </div>
        </div>
      </Container>
    </section>
  );
}
