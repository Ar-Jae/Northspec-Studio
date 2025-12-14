# Northspec Studio - Marketing Site

Production-ready, responsive marketing site for **Northspec Studio** (Next.js App Router + Tailwind CSS).

## Requirements

- Node.js 18+ (recommended: 20+)

## Setup

```bash
cd northpeak-studio
npm install
```

## Run (dev)

```bash
npm run dev
```

Open http://localhost:3000

## Build (production)

```bash
npm run build
npm run start
```

## Contact form wiring

The contact form uses basic client-side validation and POSTs to a minimal API route:

- UI: [src/components/contact/ContactForm.js](src/components/contact/ContactForm.js)
- API: [src/app/api/contact/route.js](src/app/api/contact/route.js)

Note: the form includes a hidden honeypot field (`website`) and the API route drops submissions that fill it.

To send real emails or create leads:
- In [src/app/api/contact/route.js](src/app/api/contact/route.js), replace the placeholder `console.log` with a call to your provider (Resend, SendGrid, HubSpot, etc.).

## Customize checklist

- Update site URL + contact info: [src/content/site.js](src/content/site.js)
- Edit services copy: [src/content/services.js](src/content/services.js)
- Replace case studies + metrics: [src/content/caseStudies.js](src/content/caseStudies.js)
- Swap testimonials: [src/content/testimonials.js](src/content/testimonials.js)
- Adjust FAQs: [src/content/faqs.js](src/content/faqs.js)
- Replace placeholder images in `public/images/` with real work screenshots
