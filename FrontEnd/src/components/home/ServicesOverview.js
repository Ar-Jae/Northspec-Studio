"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../Container";
import SectionHeading from "../SectionHeading";
import Button from "../Button";
import { StaggerContainer, StaggerItem } from "../animations/Stagger";

export default function ServicesOverview() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:4000/api/content/services");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="bg-brand-dark">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Services"
            title="Build, integrate, and support"
            description="Three ways we help teams ship and maintain high-quality web products."
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <Button as="link" href="/services" variant="secondary">
              Explore services
            </Button>
            <Button as="link" href="/contact" variant="brand">
              Book a Call
            </Button>
          </div>
        </div>

        <StaggerContainer className="mt-10 grid gap-6 lg:grid-cols-3">
          {data.map((service) => (
            <StaggerItem key={service._id || service.title}>
              <Link href={`/services/${service.slug || service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <motion.div
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors h-full"
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
              </Link>
            </StaggerItem>
          ))}
          {data.length === 0 && !loading && (
            <p className="text-gray-400">No services found.</p>
          )}
        </StaggerContainer>
      </Container>
    </section>
  );
}
