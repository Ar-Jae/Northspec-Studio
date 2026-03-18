"use client";

import { useState, useEffect } from "react";
import Container from "../Container";
import SectionHeading from "../SectionHeading";

export default function FAQ() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:4000/api/content/faqs");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="bg-brand-dark">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="FAQ"
          title="Answers, upfront"
          description="A few common questions before you reach out."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {data.map((item) => (
            <details
              key={item._id || item.question}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 open:bg-white/10 transition-colors"
            >
              <summary className="cursor-pointer list-none text-base font-semibold tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark font-serif">
                <div className="flex items-start justify-between gap-4">
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 text-slate-400 transition group-open:rotate-45 group-open:text-brand-gold"
                  >
                    +
                  </span>
                </div>
              </summary>
              <p className="mt-3 text-sm text-slate-400">{item.answer}</p>
            </details>
          ))}
          {data.length === 0 && !loading && (
            <p className="text-gray-400">No FAQs found.</p>
          )}
        </div>
      </Container>
    </section>
  );
}
