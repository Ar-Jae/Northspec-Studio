const site = {
  name: "Northspec Studio",
  tagline: "Automation, engineering, and mobile systems that deliver outcomes.",
  description:
    "Northspec Studio helps established companies improve operations with workflow automation, software engineering, mobile app development, and reliability support.",
  keywords: [
    "Software Development",
    "Custom Web Applications",
    "Workflow Automation",
    "AI Automation",
    "Mobile App Development",
    "Next.js Development",
    "API Integrations",
    "SaaS MVP Development",
    "Software Engineers",
    "Technical Infrastructure",
    "Node.js Backend",
    "Custom CRM Development",
    "Automated Inventory Systems",
    "Enterprise Workflow Design",
    "Bespoke Business Software",
    "Website Reliability Monitoring"
  ],
  twitterHandle: "@NorthspecStudio",
  url: "https://northspecstudio.com",
  nav: [
    { label: "Home", href: "/" },
    { 
      label: "Services", 
      href: "/services",
      children: [
        { label: "Built to Spec", href: "/built-to-spec", description: "Our engineering philosophy and standards." },
        { label: "Software Engineering", href: "/services/software-development", description: "Custom web and backend systems." },
        { label: "Workflow Automation", href: "/services/workflow-automation", description: "n8n and AI-driven process optimization." },
        { label: "Mobile Apps", href: "/services/mobile-app-development", description: "iOS and Android product development." },
        { label: "Integrations", href: "/services/integrations", description: "Connect your existing software stack." },
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
