require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('./config/db');

// Models
const Lead = require('./models/Lead');
const Activity = require('./models/Activity');
const File = require('./models/File');
const News = require('./models/News');
const Service = require('./models/Service');
const Testimonial = require('./models/Testimonial');
const CaseStudy = require('./models/CaseStudy');
const FAQ = require('./models/FAQ');
const Target = require('./models/Target');
const Budget = require('./models/Budget');
const Admin = require('./models/Admin');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Lead.deleteMany({});
    await Activity.deleteMany({});
    await File.deleteMany({});
    await News.deleteMany({});
    await Service.deleteMany({});
    await Testimonial.deleteMany({});
    await CaseStudy.deleteMany({});
    await FAQ.deleteMany({});
    await Target.deleteMany({});
    await Budget.deleteMany({});
    await Admin.deleteMany({});

    console.log('Cleared existing data');

    // Seed Leads
    const leads = [
      { name: "Mr. Johnson", property: "Downtown Apartment", stage: "Negotiation", stageTone: "amber", value: 320000, lastActivity: "Aug 22 - Sent Brochure" },
      { name: "Jonathan Weak", property: "Lakeside Villa", stage: "Contacted", stageTone: "green", value: 560000, lastActivity: "Aug 20 - Call" },
      { name: "Sarah Connor", property: "Suburban House", stage: "New", stageTone: "sky", value: 250000, lastActivity: "Aug 19 - Added Lead" },
      { name: "Michael Smith", property: "City Loft", stage: "Closed", stageTone: "emerald", value: 450000, lastActivity: "Aug 15 - Signed" },
      { name: "Emily Davis", property: "Beach House", stage: "Negotiation", stageTone: "amber", value: 750000, lastActivity: "Aug 18 - Meeting" },
      { name: "David Wilson", property: "Mountain Cabin", stage: "New", stageTone: "sky", value: 180000, lastActivity: "Today - Inquiry" }
    ];
    await Lead.insertMany(leads);

    // Seed Activities
    const activities = [
      { icon: "🐛", text: "You have a bug that needs to be fixed.", time: "Just now", type: "bug" },
      { icon: "🚀", text: "Released a new version", time: "59 minutes ago", type: "release" },
      { icon: "📝", text: "Submitted a bug", time: "12 hours ago", type: "bug" },
      { icon: "✏️", text: "Modified A data in Page X", time: "Today, 11:59 AM", type: "modification" },
      { icon: "🗑️", text: "Deleted a page in Project X", time: "Feb 2, 2024", type: "deletion" }
    ];
    await Activity.insertMany(activities);

    // Seed Files
    const files = [
      { name: "Project tech requirements.pdf", size: "5.6 MB", author: "Karina Clark" },
      { name: "Dashboard-design.jpg", size: "2.3 MB", author: "Marcus Blake" },
      { name: "Completed Project Stylings.pdf", size: "4.6 MB", author: "Terry Barry" },
      { name: "Create Project Wireframes.xls", size: "1.2 MB", author: "Roth Bloom" },
      { name: "Project tech requirements.pdf", size: "2.8 MB", author: "Natali Craig" }
    ];
    await File.insertMany(files);

    // Seed News
    const news = [
      { title: "Follow up with Mr. Johnson", subtitle: "Interested 3BHK Flat at Banani", author: "Lisa Wong", time: "12:30 pm" },
      { title: "New lead added", subtitle: "Lisa Wong", author: "System", time: "12:32 pm" },
      { title: "Quarterly Review", subtitle: "Meeting with the sales team", author: "Management", time: "10:00 am" },
      { title: "System Maintenance", subtitle: "Scheduled for tonight", author: "IT Dept", time: "09:00 am" }
    ];
    await News.insertMany(news);

    // Seed Services
    const services = [
      {
        title: "Web Development",
        short: "Production marketing sites and landing pages built with Next.js/React.",
        description: "We build websites that load fast, read clearly, and are easy to maintain. Scope is defined up front, decisions are documented, and the handoff is clean.",
        bullets: ["Next.js/React builds (App Router)", "Marketing sites + landing pages", "Accessible, responsive components", "Performance and Core Web Vitals"],
        order: 1
      },
      {
        title: "Software Engineering",
        short: "APIs, integrations, and internal tools built with clear specs and stable interfaces.",
        description: "We build and fix the systems behind your product. Expect clear requirements, documented tradeoffs, and code that your team can maintain.",
        bullets: ["APIs + integrations", "Internal dashboards + tools", "Background jobs and workflows", "Auth + permissions"],
        order: 2
      },
      {
        title: "Product Support",
        short: "Maintenance, debugging, audits, and performance work to keep systems stable.",
        description: "Software is built to last, not just to launch. We reduce incidents, improve performance, and keep delivery predictable with ongoing support.",
        bullets: ["Ongoing maintenance", "Performance + Core Web Vitals", "Debugging + incident response", "Audits + refactors"],
        order: 3
      }
    ];
    await Service.insertMany(services);

    // Seed Testimonials
    const testimonials = [
      { name: "Maya Chen", title: "Head of Growth", company: "HarborCart", quote: "Northspec shipped a faster site and a cleaner checkout flow without drama. The work was thoughtful, well-communicated, and the results showed up in the numbers." },
      { name: "Dylan Reed", title: "VP Engineering", company: "LumenOps", quote: "They operated like a senior extension of our team, with strong code quality, pragmatic decisions, and clear delivery. Our internal tooling finally keeps up with the business." },
      { name: "Sofia Alvarez", title: "Product Manager", company: "Ridgeview Health", quote: "The audit was immediately useful. We reduced incidents, improved performance, and gained confidence in releases. Exactly the kind of support we needed." }
    ];
    await Testimonial.insertMany(testimonials);

    // Seed Case Studies
    const caseStudies = [
      {
        id: "harbor",
        featured: true,
        client: "HarborCart",
        industry: "E-commerce",
        problem: "A slow storefront and fragmented checkout flow were hurting conversion and driving up support tickets.",
        solution: "We rebuilt the marketing + checkout experience in Next.js, introduced a shared component library, and implemented performance budgets with automated checks.",
        impact: [{ label: "Checkout conversion", value: "+18%" }, { label: "Largest Contentful Paint", value: "-42%" }, { label: "Support tickets", value: "-24%" }],
        stack: ["Next.js", "React", "Tailwind CSS", "Node.js"],
        image: "/images/placeholder-1.jpg",
        slug: "harbor-cart"
      },
      {
        id: "lumen",
        featured: true,
        client: "LumenOps",
        industry: "B2B SaaS",
        problem: "The team needed an internal admin tool to manage customers, billing flags, and onboarding without engineering bottlenecks.",
        solution: "We shipped a secure internal dashboard with role-based access, streamlined workflows, and audit logging, cutting repetitive ops work.",
        impact: [{ label: "Ops time saved", value: "~12 hrs/week" }, { label: "Onboarding time", value: "-35%" }, { label: "Error rate", value: "-60%" }],
        stack: ["React", "Next.js", "Postgres", "REST APIs"],
        image: "/images/placeholder-2.jpg",
        slug: "lumen-ops"
      },
      {
        id: "ridgeview",
        featured: false,
        client: "Ridgeview Health",
        industry: "Healthcare",
        problem: "A legacy scheduling portal had reliability issues and frequent regressions after updates.",
        solution: "We performed a stability audit, introduced automated smoke checks, and optimized the most critical user flows, then set up a maintenance cadence.",
        impact: [{ label: "Incidents", value: "-50%" }, { label: "Page load time", value: "-30%" }, { label: "Release confidence", value: "+1 sprint" }],
        stack: ["Next.js", "Monitoring", "Performance Audits"],
        image: "/images/placeholder-3.jpg",
        slug: "ridgeview-health"
      }
    ];
    await CaseStudy.insertMany(caseStudies);

    // Seed FAQs
    const faqs = [
      { question: "Why is this more expensive than a normal website?", answer: "Because we don’t build “just websites.” We build systems — frontends, backends, integrations, and automation that actually run your business. Cheap builds cost more in the long run through breakdowns, rebuilds, and technical debt. We price for reliability, scalability, and long-term stability, not shortcuts.", order: 1 },
      { question: "Do you charge hourly or fixed price?", answer: "We price by scope and outcomes, not hours. Hourly encourages slow work, while scope pricing encourages efficient, high-quality delivery. You’ll always know your cost up front.", order: 2 },
      { question: "Can you do it cheaper?", answer: "If we reduced the price, we’d also have to reduce reliability, testing, support, and quality. We don’t compete on being the cheapest; we compete on being the team you don’t need to replace later.", order: 3 },
      { question: "Can’t we figure features out later?", answer: "No. “Figure it out later” turns into scope creep and blown timelines. We always define scope clearly first so your project stays predictable, stable, and successful.", order: 4 },
      { question: "What if I don’t need automation yet?", answer: "Perfect. Automation (n8n) is completely optional. We build a strong frontend and reliable backend first, making automation compatible for when you’re ready. No forced upsells.", order: 5 },
      { question: "Why is automation priced separately?", answer: "Because automation isn’t a feature — it’s infrastructure. It requires deployment, security, monitoring, and reliability engineering. Separating it keeps pricing fair and expectations clear.", order: 6 },
      { question: "Do you offer payment plans?", answer: "Yes — for larger projects. Typically 50% upfront and 50% before deployment. For bigger builds, milestone options (40/30/30) may be available. We do not do “pay after delivery.”", order: 7 },
      { question: "Do I own the code when it’s done?", answer: "Yes. Once the project is paid in full, you own your code, your system, and your data. We earn relationships by trust, not dependency.", order: 8 },
      { question: "What kind of businesses is this NOT for?", answer: "We’re not the right fit if you’re looking for the cheapest option, a quick no-thinking website, unlimited revisions, or projects under $2,500. We work best with serious founders building real systems.", order: 9 }
    ];
    await FAQ.insertMany(faqs);

    // Seed Targets
    const targets = [
      { title: "Q1 Revenue Goal", goal: 50000, current: 32000, category: "Revenue", deadline: "2026-03-31" },
      { title: "New Leads", goal: 100, current: 45, category: "Sales", deadline: "2026-01-31" },
      { title: "Project Completions", goal: 5, current: 2, category: "Operations", deadline: "2026-02-28" }
    ];
    await Target.insertMany(targets);

    // Seed Budgets
    const budgets = [
      { category: "Marketing", allocated: 5000, spent: 1200, period: "Monthly" },
      { category: "Development", allocated: 15000, spent: 8000, period: "Quarterly" },
      { category: "Operations", allocated: 3000, spent: 1500, period: "Monthly" }
    ];
    await Budget.insertMany(budgets);

    // Seed Admins
    const admins = [
      { firstName: "Arlene", lastName: "McCoy", email: "arlene@northspec.studio", password: "password123", isAdmin: true, status: "approved" },
      { firstName: "Admin", lastName: "User", email: "admin@northspec.studio", password: "password123", isAdmin: true, status: "approved" },
      { firstName: "John", lastName: "Doe", email: "john@northspec.studio", password: "password123", isAdmin: false, status: "pending" }
    ];
    await Admin.insertMany(admins);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
