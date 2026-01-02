"use client";

import { useState, useEffect, use } from "react";
import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";
import { useRouter } from "next/navigation";

export default function CaseStudyDetailPage({ params }) {
  const { slug } = use(params);
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudy() {
      try {
        const res = await fetch(`http://localhost:4000/api/content/case-studies/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setStudy(data);
        }
      } catch (error) {
        console.error("Failed to fetch case study:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStudy();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-brand-dark min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  if (!study) {
    return (
      <div className="bg-brand-dark min-h-screen flex items-center justify-center">
        <Container className="text-center">
          <h1 className="text-4xl font-bold text-white font-serif">Case Study Not Found</h1>
          <p className="mt-4 text-slate-400">The case study you are looking for does not exist or has been moved.</p>
          <div className="mt-8">
            <Button as="link" href="/work" variant="brand">Back to Work</Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <SectionHeading
            eyebrow={`Case Study: ${study.industry}`}
            title={study.client}
            description={study.problem}
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-2xl font-semibold text-white font-serif">The Solution</h2>
                <p className="mt-4 text-slate-400 leading-relaxed">{study.solution}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white font-serif">The Stack</h2>
                <div className="mt-6 flex flex-wrap gap-2">
                  {study.stack?.map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-8">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white font-serif">Impact</h2>
                <div className="mt-6 space-y-6">
                  {study.impact?.map((item, index) => (
                    <div key={index}>
                      <p className="text-3xl font-bold text-brand-gold">{item.value}</p>
                      <p className="text-sm text-slate-400 mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-brand-gold/20 bg-brand-gold/5 p-8 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white font-serif">Ready for results?</h2>
                <p className="mt-4 text-sm text-slate-400">
                  Let's build a system that delivers these kinds of results for your business.
                </p>
                <div className="mt-6">
                  <Button as="link" href="/book" variant="brand" className="w-full">Book a Call</Button>
                </div>
              </div>
            </aside>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
