const site = {
  name: "Northspec Studio",
  tagline: "Engineering websites and software that ship.",
  description:
    "Northspec Studio engineers websites and software that ship. Web development, software engineering, and product support.",
  url: "https://northspecstudio.com",
  nav: [
    { label: "Home", href: "/" },
    { 
      label: "Services", 
      href: "/services",
      children: [
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
      label: "Process", 
      href: "/process",
      children: [
        { label: "How It Works", href: "/process/how-it-works" },
        { label: "Discovery", href: "/process/discovery" },
        { label: "Development", href: "/process/development" },
        { label: "Delivery", href: "/process/delivery" },
      ]
    },
    { 
      label: "Work", 
      href: "/work",
      children: [
        { label: "Case Studies", href: "/work/case-studies" },
        { label: "Testimonials", href: "/work/testimonials" },
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
        { label: "Careers", href: "/about/careers" },
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
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "GitHub", href: "https://github.com" },
  ],
  // Calendar booking URL - supports Calendly, Cal.com, or any embeddable calendar
  // Examples:
  //   Calendly: "https://calendly.com/your-username/discovery-call"
  //   Cal.com: "https://cal.com/your-username/discovery-call"
  calendarUrl: "https://calendly.com/northspec",
};

export default site;
