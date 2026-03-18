"use client";

import { motion } from "framer-motion";

export default function TrustStrip() {
  return (
    <div className="relative z-10 border-y border-white/[0.06] bg-white/[0.02] py-5">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center text-[11px] font-bold tracking-[0.3em] text-slate-500 uppercase px-6"
      >
        Built for startups, operators, and teams who need reliable systems, not experiments.
      </motion.p>
    </div>
  );
}
