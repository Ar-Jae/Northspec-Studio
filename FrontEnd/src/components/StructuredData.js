import site from "../content/site";

export default function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": site.name,
    "url": site.url,
    "logo": `${site.url}/logo-icon.png`,
    "description": site.description,
    "email": site.contact.email,
    "telephone": site.contact.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Remote",
      "addressRegion": "North America",
      "addressCountry": "US"
    },
    "sameAs": site.social.map(s => s.href)
  };

  const servicesData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Software Development & Automation",
    "provider": {
      "@type": "Organization",
      "name": site.name
    },
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Engineering Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Software Development",
            "description": "Bespoke web and software applications built with modern stacks like Next.js and Node.js."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Workflow Automation",
            "description": "Streamlining business processes using n8n, Zapier, and custom integrations."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Financial Integrations",
            "description": "Secure Plaid and API integrations for fintech applications."
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesData) }}
      />
    </>
  );
}
