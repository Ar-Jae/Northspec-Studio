const site = {
  name: "Northspec Studio",
  tagline: "Automation and engineering systems that keep local businesses ahead.",
  description:
    "Northspec Studio helps established local companies improve operations through workflow automation, software engineering, and mobile app development.",
  keywords: [
    "Workflow Automation",
    "AI Automation Services",
    "Software Engineering",
    "Mobile App Development",
    "Next.js Development",
    "API Integrations",
    "Backend Reliability",
    "Operational Automation",
    "Local Business Automation",
    "Established Company Modernization",
    "Technical Infrastructure",
    "Node.js Backend",
    "Custom CRM Development",
    "Business Process Optimization",
    "Engineering Maintenance",
    "Bespoke Business Software"
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
    email: "hello@northspecstudio.com",
    phone: "+1 (555) 014-2266",
    location: "Remote / North America",
    emails: {
      main: "hello@northspecstudio.com",
      projects: "projects@northspecstudio.com",
      billing: "billing@northspecstudio.com",
      press: "press@northspecstudio.com",
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
