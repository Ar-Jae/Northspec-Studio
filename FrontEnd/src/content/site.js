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
    "Senior Software Engineers",
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
        { label: "Built to Spec. Built to Last.", href: "/built-to-spec" },
        { label: "Software Development", href: "/services/software-development" },
        { label: "Workflow Automation", href: "/services/workflow-automation" },
        { label: "Mobile App Development", href: "/services/mobile-app-development" },
        { label: "Integrations", href: "/services/integrations" },
        { label: "Maintenance & Support", href: "/services/maintenance-support" },
      ]
    },
    { 
      label: "Pricing", 
      href: "/pricing",
      children: [
        { label: "All Pricing", href: "/pricing" },
        { label: "Retainers", href: "/retainers" },
        { label: "Custom Plans", href: "/services/custom-plans" },
      ]
    },
    { 
      label: "About", 
      href: "/about",
      children: [
        { label: "About Us", href: "/about" },
        { label: "Why Northspec", href: "/about/why-northspec" },
      ]
    },
    { 
      label: "Contact", 
      href: "/contact",
      children: [
        { label: "Contact Form", href: "/contact" },
        { label: "Careers", href: "/contact/careers" },
        { label: "Support", href: "/contact/support" },
      ]
    },
  ],
  contact: {
    email: "build@northspecstudio.com",
    phone: "+1 (555) 014-2266",
    location: "Remote / North America",
    emails: {
      main: "build@northspecstudio.com",
      projects: "build@northspecstudio.com",
      billing: "build@northspecstudio.com",
      press: "build@northspecstudio.com",
    },
  },
  social: [
    { label: "X", shortLabel: "X", href: "https://x.com/NorthspecStudio" },
    { label: "Instagram", shortLabel: "IG", href: "https://www.instagram.com/northspec_studio/" },
    { label: "LinkedIn", shortLabel: "LI", href: "https://www.linkedin.com/in/northspec-studio/" },
  ],
  // Calendar booking URL - supports Calendly, Cal.com, or any embeddable calendar
  // Examples:
  //   Calendly: "https://calendly.com/your-username/discovery-call"
  //   Cal.com: "https://cal.com/your-username/discovery-call"
  calendarUrl: "https://calendly.com/northspec",
};

export default site;
