"use client";

import Container from "../../components/Container";
import SectionHeading from "../../components/SectionHeading";
import Button from "../../components/Button";
import FadeIn from "../../components/animations/FadeIn";
import { motion } from "framer-motion";

const techStack = [
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Framer Motion", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "Go", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Redis", category: "Database" },
  { name: "AWS", category: "Cloud" },
  { name: "Vercel", category: "Cloud" },
  { name: "Docker", category: "Cloud" },
  { name: "Terraform", category: "Cloud" },
];

const categories = [
  { title: "Frontend", items: ["Next.js", "React", "Tailwind CSS", "Framer Motion"] },
  { title: "Backend", items: ["Node.js", "Express", "Python", "Go"] },
  { title: "Database", items: ["PostgreSQL", "MongoDB", "Redis"] },
  { title: "Cloud", items: ["AWS", "Vercel", "Docker", "Terraform"] },
];


export default function AboutPage() {
  return (
    <>
    <div className="bg-brand-dark">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <FadeIn>
          <SectionHeading
            eyebrow="About"
            title="Engineering first"
            description="We build, fix, and maintain production software to spec. Clean code. Clear communication. No guesswork."
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-12">
            <div id="why" className="lg:col-span-7 scroll-mt-32">
              <h2 className="text-2xl font-semibold tracking-tight text-white font-serif">
                Our Story
              </h2>
              <div className="mt-6 space-y-6 text-base text-slate-400 leading-relaxed">
                <p>
                  Northspec Studio was founded on a simple observation: most software projects fail not because of a lack of talent, but because of a lack of clarity. 
                  We saw agencies shipping "black box" code that clients couldn't maintain, and developers building features without understanding the business goals.
                </p>
                <p>
                  We decided to do things differently. We built a studio focused on <strong>durability</strong>. 
                  To us, that means writing code that lasts, documenting every major decision, and ensuring our clients actually own and understand their technical infrastructure.
                </p>
                <p>
                  Today, we operate as a distributed team of senior engineers. We don't have account managers or junior developers. 
                  When you work with Northspec, you are working directly with the people writing the code.
                </p>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 sticky top-32">
                <h2 className="text-xl font-semibold tracking-tight text-white font-serif">
                  Ready to build?
                </h2>
                <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                  We specialize in high-performance engineering for teams that value durability and transparency.
                </p>

                <div className="mt-8 flex flex-col gap-3">
                  <Button as="link" href="/work" variant="brand">
                    View Our Work
                  </Button>
                  <Button as="link" href="/contact" variant="secondary">
                    Book a Discovery Call
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </FadeIn>
      </Container>
    </div>

    {/* Core Values Section */}
    <div className="bg-brand-dark/50 py-24 border-y border-white/5">
      <Container>
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold text-white font-serif">Core Values</h2>
            <p className="mt-4 text-slate-400">
              These principles guide every line of code we write and every decision we make.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Durability",
                desc: "We build systems that don't just work today, but are maintainable for years to come."
              },
              {
                title: "Transparency",
                desc: "No black boxes. You have full access to the code, the docs, and the decision logs."
              },
              {
                title: "Senior Execution",
                desc: "Every project is handled by senior engineers. No hand-offs to juniors."
              },
              {
                title: "Fixed Scopes",
                desc: "We believe in clear boundaries. We define what we're building and what it costs upfront."
              }
            ].map((value, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-brand-gold/30 transition-colors">
                <h3 className="text-lg font-semibold text-white font-serif">{value.title}</h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </div>

    {/* Tech Stack Section */}
    <div className="py-24 overflow-hidden bg-brand-dark relative">
      {/* Animated Background Marquee */}
      <div className="absolute inset-0 flex flex-col justify-center gap-8 opacity-[0.03] pointer-events-none select-none">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-12 text-8xl font-bold text-white uppercase"
        >
          {Array(10).fill(techStack.map(t => t.name).join(" • ")).join(" • ")}
        </motion.div>
        <motion.div 
          animate={{ x: [-1000, 0] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-12 text-8xl font-bold text-white uppercase"
        >
          {Array(10).fill(techStack.map(t => t.name).reverse().join(" • ")).join(" • ")}
        </motion.div>
      </div>

      <Container className="relative z-10">
        <FadeIn>
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-4xl font-semibold text-white font-serif">Our Tech Stack</h2>
              <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-xl">
                We specialize in modern, proven technologies that allow for rapid development without sacrificing performance or security. 
                While we are tool-agnostic, these are the stacks where we provide the most value.
              </p>
              
              <div className="mt-12 grid sm:grid-cols-2 gap-x-12 gap-y-10">
                {categories.map((cat) => (
                  <div key={cat.title} className="group">
                    <h4 className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <span className="w-8 h-[1px] bg-brand-gold/30 group-hover:w-12 transition-all" />
                      {cat.title}
                    </h4>
                    <ul className="space-y-2">
                      {cat.items.map((item) => (
                        <li key={item} className="text-white text-base font-medium flex items-center gap-2 group/item">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/20 group-hover/item:bg-brand-gold transition-colors" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-1">
                <div className="h-full w-full rounded-[2.3rem] border border-white/5 bg-brand-dark/40 flex items-center justify-center relative overflow-hidden">
                  {/* Floating Tech Grid */}
                  <div className="grid grid-cols-3 gap-6 p-12">
                    {techStack.slice(0, 9).map((tech, i) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -5, scale: 1.05 }}
                        className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-4 group/icon relative"
                      >
                        <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover/icon:opacity-100 transition-opacity rounded-2xl" />
                        <span className="text-[10px] font-bold text-slate-500 group-hover/icon:text-brand-gold transition-colors text-center uppercase tracking-tighter">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-gold/10 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-gold/10 blur-[100px] rounded-full" />
                </div>
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-brand-gold p-6 rounded-2xl shadow-2xl shadow-brand-gold/20 hidden md:block"
              >
                <p className="text-brand-dark font-bold text-sm leading-tight">
                  Production<br />Ready Stacks
                </p>
              </motion.div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>

    <Container className="pb-24">
      <div id="careers" className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-sm scroll-mt-32">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-white font-serif">Careers</h2>
          <p className="mt-4 text-slate-400">
            We are always looking for senior-level talent who value autonomy, deep work, and engineering excellence. 
            While we are not currently hiring for full-time roles, we frequently partner with specialized contractors.
          </p>
          <div className="mt-8">
            <Button as="link" href="/contact/careers" variant="secondary">
              View Openings
            </Button>
          </div>
        </div>
      </div>
    </Container>
    </>
  );
}
