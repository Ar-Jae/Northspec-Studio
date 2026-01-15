"use client";

import Container from "../../../components/Container";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import FadeIn from "../../../components/animations/FadeIn";
import JobApplicationForm from "../../../components/about/JobApplicationForm";
import { StaggerContainer, StaggerItem } from "../../../components/animations/Stagger";
import { motion } from "framer-motion";

const openRoles = [
  {
    title: "Senior Full-Stack Engineer",
    type: "Contract / Project-based",
    location: "Remote",
    description: "We're looking for senior engineers who can take full ownership of complex Next.js and Node.js builds. You should be comfortable architecting systems from scratch and integrating with various third-party APIs.",
    requirements: [
      "5+ years of professional experience",
      "Expertise in Next.js, React, and Node.js",
      "Strong understanding of database design (SQL & NoSQL)",
      "Experience with cloud infrastructure (AWS/Vercel)"
    ]
  },
  {
    title: "Automation Specialist",
    type: "Contract / Project-based",
    location: "Remote",
    description: "Help us build robust, scalable workflows for our clients. You'll be working primarily with n8n and custom Node.js scripts to bridge the gap between disparate business systems.",
    requirements: [
      "Deep experience with n8n or Zapier",
      "Strong JavaScript/Node.js skills",
      "Experience with REST and GraphQL APIs",
      "Ability to map complex business processes"
    ]
  }
];

export default function CareersPage() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12 mb-16">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Careers"
                title="Build the future of engineering"
                description="We are always looking for senior-level talent who value autonomy, deep work, and engineering excellence."
              />
            </div>
            <div className="flex-none">
              <div className="text-8xl font-bold text-white/5 font-serif select-none">JOIN</div>
            </div>
          </div>

          <div className="grid gap-16 lg:grid-cols-12">
            {/* Left Side: Roles & Info */}
            <div className="lg:col-span-7 space-y-16">
              <section>
                <h2 className="text-3xl font-bold text-white font-serif mb-8">Open Roles</h2>
                <StaggerContainer className="space-y-8">
                  {openRoles.map((role) => (
                    <StaggerItem key={role.title}>
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 hover:border-brand-gold/20 transition-colors group">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                          <h3 className="text-xl font-bold text-white font-serif group-hover:text-brand-gold transition-colors">
                            {role.title}
                          </h3>
                          <div className="flex gap-2">
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              {role.type}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              {role.location}
                            </span>
                          </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8">
                          {role.description}
                        </p>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {role.requirements.map((req, i) => (
                            <div key={i} className="flex items-center gap-3 text-xs text-slate-300">
                              <div className="w-1 h-1 rounded-full bg-brand-gold" />
                              {req}
                            </div>
                          ))}
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </section>

              <section className="rounded-3xl border border-brand-gold/20 bg-brand-gold/5 p-10">
                <h2 className="text-2xl font-bold text-white font-serif mb-4">Our Philosophy</h2>
                <p className="text-slate-300 leading-relaxed">
                  At Northspec, we don't believe in busy work. We believe in deep work blocks, clear requirements, and high-quality output. 
                  We operate as a distributed team of senior engineers who take ownership of their work. No micromanagement, no useless meetings - just engineering.
                </p>
              </section>
            </div>

            {/* Right Side: Application Form */}
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl -mr-32 -mt-32" />
                  
                  <h2 className="text-2xl font-bold text-white font-serif relative z-10">
                    Apply Now
                  </h2>
                  <p className="mt-4 text-slate-400 relative z-10 mb-10">
                    Interested in joining the team? Fill out the form below and we'll be in touch.
                  </p>
                  
                  <div className="relative z-10">
                    <JobApplicationForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
