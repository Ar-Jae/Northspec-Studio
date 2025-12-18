const caseStudies = [
  {
    id: "harbor",
    featured: true,
    client: "HarborCart",
    industry: "E-commerce",
    problem:
      "A slow storefront and fragmented checkout flow were hurting conversion and driving up support tickets.",
    solution:
      "We rebuilt the marketing + checkout experience in Next.js, introduced a shared component library, and implemented performance budgets with automated checks.",
    impact: [
      { label: "Checkout conversion", value: "+18%" },
      { label: "Largest Contentful Paint", value: "-42%" },
      { label: "Support tickets", value: "-24%" },
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Node.js"],
    image: "/images/placeholder-1.jpg",
  },
  {
    id: "lumen",
    featured: true,
    client: "LumenOps",
    industry: "B2B SaaS",
    problem:
      "The team needed an internal admin tool to manage customers, billing flags, and onboarding without engineering bottlenecks.",
    solution:
      "We shipped a secure internal dashboard with role-based access, streamlined workflows, and audit logging, cutting repetitive ops work.",
    impact: [
      { label: "Ops time saved", value: "~12 hrs/week" },
      { label: "Onboarding time", value: "-35%" },
      { label: "Error rate", value: "-60%" },
    ],
    stack: ["React", "Next.js", "Postgres", "REST APIs"],
    image: "/images/placeholder-2.jpg",
  },
  {
    id: "ridgeview",
    featured: false,
    client: "Ridgeview Health",
    industry: "Healthcare",
    problem:
      "A legacy scheduling portal had reliability issues and frequent regressions after updates.",
    solution:
      "We performed a stability audit, introduced automated smoke checks, and optimized the most critical user flows, then set up a maintenance cadence.",
    impact: [
      { label: "Incidents", value: "-50%" },
      { label: "Page load time", value: "-30%" },
      { label: "Release confidence", value: "+1 sprint" },
    ],
    stack: ["Next.js", "Monitoring", "Performance Audits"],
    image: "/images/placeholder-3.jpg",
  },
];

export default caseStudies;
