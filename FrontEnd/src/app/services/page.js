"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import Button from "../../components/Button";
import FadeIn from "../../components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "../../components/animations/Stagger";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const res = await fetch(`${baseUrl}/api/content/services`);
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
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12 mb-16">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Capabilities"
                title="Built to spec"
                description="We build, fix, and maintain production software with clear scopes, documented decisions, and maintainable systems."
              />
            </div>
            <div className="flex-none">
              <div className="text-8xl font-bold text-white/5 font-serif select-none">0101</div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
            </div>
          ) : (
            <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {data.map((service) => {
                const slug = service.slug || service.title.toLowerCase().replace(/\s+/g, '-');
                return (
                  <StaggerItem key={service._id || service.title}>
                    <Link
                      href={`/services/${slug}`}
                      className="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-brand-gold/30 hover:bg-white/[0.07]"
                    >
                      <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white font-serif group-hover:text-brand-gold transition-colors">
                          {service.title}
                        </h2>
                        <div className="rounded-full bg-brand-gold/10 p-2 text-brand-gold opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                      
                      <p className="text-slate-400 leading-relaxed mb-8">
                        {service.description}
                      </p>

                      <ul className="mt-auto space-y-3">
                        {service.bullets.slice(0, 4).map((item) => (
                          <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                            <div className="w-1 h-1 rounded-full bg-brand-gold" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}

          <div className="mt-32 rounded-3xl bg-brand-gold p-12 text-center">
            <h2 className="text-3xl font-bold text-brand-dark font-serif">Ready to scope your project?</h2>
            <p className="mt-4 text-brand-dark/80 max-w-2xl mx-auto">
              Book a call and we’ll define scope, timeline, and next steps for your engineering requirements.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button as="link" href="/book" variant="brand-dark">Book a Discovery Call</Button>
              <Button as="link" href="/work" variant="outline-dark">View Case Studies</Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}

