const site = {
  name: "Northspec Studio",
  tagline: "AI automation, software development, mobile apps, and consulting.",
  description:
    "Northspec Studio specializes in AI automation, software development, mobile app development, and consulting — helping companies implement intelligent systems, build reliable software, and operate more efficiently.",
  keywords: [
    "AI Automation Agency",
    "AI Implementation",
    "AI Workflow Automation",
    "AI Apps and Agents",
    "Vapi Voice Agent",
    "n8n AI Automation",
    "AI Strategy Consulting",
    "OpenAI Integration Services",
    "Workflow Automation",
    "Software Development",
    "Custom Web Applications",
    "Mobile App Development",
    "Next.js Development",
    "API Integrations",
    "Node.js Backend",
    "Enterprise Workflow Design",
  ],
  twitterHandle: "@NorthspecStudio",
  url: "https://northspecstudio.com",
  nav: [
    { label: "Home", href: "/" },
    { 
      label: "Services", 
      href: "/services",
      children: [
        { label: "AI Automation", href: "/services/ai-implementation", description: "Replace manual work with intelligent AI workflows." },
        { label: "AI Strategy & Consulting", href: "/services/ai-strategy", description: "Find where AI creates real value before you build." },
        { label: "AI Apps & Agents", href: "/services/ai-agents", description: "Voice agents, autonomous systems, and AI-native apps." },
        { label: "Software & Mobile Development", href: "/services/software-development", description: "AI-compatible software and mobile app builds." },
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
