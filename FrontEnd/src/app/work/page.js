"use client";

import { useState, useEffect } from "react";
import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import CaseStudyCard from "../../components/work/CaseStudyCard";
import FadeIn from "../../components/animations/FadeIn";

export default function WorkPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:4000/api/content/case-studies");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error("Failed to fetch case studies:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-brand-dark">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <SectionHeading
            eyebrow="Work"
            title="Case studies"
            description="Realistic examples of how we improve conversion, reliability, and velocity for teams." 
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {data.map((study) => (
              <CaseStudyCard key={study._id || study.id} study={study} compact />
            ))}
            {data.length === 0 && !loading && (
              <p className="text-gray-400">No case studies found.</p>
            )}
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
