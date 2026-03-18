"use client";

import { useState, useEffect } from "react";
import Container from "../Container";
import SectionHeading from "../SectionHeading";
import { StaggerContainer, StaggerItem } from "../animations/Stagger";

export default function Testimonials() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:4000/api/content/testimonials");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="bg-brand-dark border-t border-white/10">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Testimonials"
          title="Teams come back for the support"
          description="We focus on calm delivery: clear communication, solid engineering, and measurable outcomes."
        />

        <StaggerContainer className="mt-10 grid gap-6 lg:grid-cols-3">
          {data.map((t) => (
            <StaggerItem
              key={t._id || `${t.name}-${t.company}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <blockquote className="text-sm text-slate-300 font-serif italic">“{t.quote}”</blockquote>
              <figcaption className="mt-5 text-sm">
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-slate-500">
                  {t.title} • {t.company}
                </p>
              </figcaption>
            </StaggerItem>
          ))}
          {data.length === 0 && !loading && (
            <p className="text-gray-400">No testimonials found.</p>
          )}
        </StaggerContainer>
      </Container>
    </section>
  );
}
