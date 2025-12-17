"use client";

import { motion } from "framer-motion";
import Container from "../Container";
import SectionHeading from "../SectionHeading";
import Button from "../Button";
import services from "../../content/services";

export default function ServicesOverview() {
  return (
    <section className="bg-brand-dark">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Services"
            title="Build, integrate, and support"
            description="Three ways we help teams ship and maintain high-quality web products."
          />
          <div className="flex gap-2">
            <Button as="link" href="/services" variant="secondary">
              Explore services
            </Button>
            <Button as="link" href="/contact" variant="brand">
              Book a Call
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <motion.div
              key={service.title}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors"
            >
              <h3 className="text-xl font-semibold tracking-tight text-white font-serif">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-slate-400">{service.short}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-300">
                {service.bullets.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="mt-1 text-brand-gold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
