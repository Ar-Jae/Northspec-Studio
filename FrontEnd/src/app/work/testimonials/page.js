"use client";

import { useState, useEffect } from "react";
import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import FadeIn from "../../../components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "../../../components/animations/Stagger";

export default function TestimonialsPage() {
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
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Work"
            title="Client Testimonials"
            description="Don't just take our word for it. Here's what our clients have to say about working with Northspec Studio."
          />

          <StaggerContainer className="mt-16 grid gap-8 md:grid-cols-2">
            {data.map((testimonial) => (
              <StaggerItem key={testimonial._id || testimonial.author} className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <p className="text-lg text-slate-300 italic leading-relaxed">"{testimonial.content}"</p>
                <div className="mt-6 flex items-center gap-4">
                  {testimonial.avatar && (
                    <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                  )}
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
            {data.length === 0 && !loading && (
              <>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <p className="text-lg text-slate-300 italic leading-relaxed">"Northspec delivered our MVP ahead of schedule and with better architecture than we initially planned. Highly recommended."</p>
                  <p className="mt-6 font-semibold text-white">— Founder, Fintech Startup</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <p className="text-lg text-slate-300 italic leading-relaxed">"The level of communication and transparency is unmatched. We always knew exactly where the project stood."</p>
                  <p className="mt-6 font-semibold text-white">— CTO, E-commerce Platform</p>
                </div>
              </>
            )}
          </StaggerContainer>
        </FadeIn>
      </Container>
    </div>
  );
}
