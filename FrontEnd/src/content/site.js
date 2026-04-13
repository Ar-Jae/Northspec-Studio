const site = {
  name: "Northspec Studio",
  tagline: "AI Automations, Web Development, and Mobile App Solutions.",
  description:
    "Northspec Studio delivers industry leading AI automations, high performance web development, and custom mobile app development. We build the intelligent systems and digital products that scale modern businesses.",
  keywords: [
    "AI Automations",
    "Web Development Agency",
    "Custom Mobile App Development",
    "AI Workflow Automation",
    "Full-Stack Web Development",
    "AI Integration Services",
    "Business Process Automation",
    "Software Engineering Studio",
    "n8n Automation Expert",
    "Next.js Web Development",
    "React Native Mobile Apps",
    "AI Strategy Consulting",
    "Digital Transformation AI",
    "Scalable Web Applications",
    "Enterprise AI Solutions"
  ],
  twitterHandle: "@NorthspecStudio",
  url: "https://northspecstudio.com",
  nav: [
    { label: "Home", href: "/" },
    {
      label: "AI Automation",
      href: "/ai-systems",
      children: [
        { label: "AI Systems", href: "/ai-systems", description: "Autonomous workflows and AI agents." },
        { label: "AI Receptionist", href: "/ai-systems/ai-receptionist", description: "24/7 AI voice receptionist that answers, qualifies, and books." },
        { label: "Workflow Automation", href: "/ai-systems/workflow-automation", description: "n8n and AI-driven process optimization." },
        { label: "AI Integrations", href: "/ai-systems/integrations", description: "Connect AI to your existing stack." },
        { label: "AI Optimization", href: "/ai-systems/maintenance-support", description: "Ongoing stability and AI refinement." },
      ]
    },
    {
      label: "Services",
      href: "/services",
      children: [
        { label: "Software & Platforms", href: "/services/software-development", description: "Custom web and backend systems." },
        { label: "Mobile Apps", href: "/services/mobile-app-development", description: "iOS and Android product development." },
      ]
    },
    { 
      label: "Pricing", 
      href: "/pricing",
      children: [
        { label: "Standard Plans", href: "/pricing", description: "Transparent tiered pricing for projects." },
        { label: "Retainers", href: "/retainers", description: "Ongoing support and engineering bandwidth." },
        { label: "Custom Quotes", href: "/pricing/custom", description: "Bespoke solutions for unique needs." },
      ]
    },
    { 
      label: "About", 
      href: "/about",
      children: [
        { label: "Company", href: "/about", description: "Our story, mission, and team." },
        { label: "Why Us", href: "/about/why-northspec", description: "What makes Northspec the right partner." },
      ]
    },
    { 
      label: "Contact", 
      href: "/contact",
      children: [
        { label: "General", href: "/contact", description: "Start a new project conversation." },
        { label: "Support", href: "/contact/support", description: "Help for active clients and systems." },
      ]
    },
  ],
  contact: {
    email: "build@northspecstudio.com",
    phone: "+1 (413) 390-3673",
    location: "North America",
  },
  social: [
    { label: "X", shortLabel: "X", href: "https://x.com/NorthspecStudio" },
    { label: "Instagram", shortLabel: "IG", href: "https://www.instagram.com/northspec_studio/" },
    { label: "LinkedIn", shortLabel: "LI", href: "https://www.linkedin.com/in/northspec-studio/" },
  ],
  // Google Appointment Schedule public booking URL (availability-only, no full calendar view)
  // Example: https://calendar.app.google/xxxxxxxxxxxx
  calendarUrl: "https://calendar.app.google/XMN48TcybVjmij4C7",
};

export default site;
