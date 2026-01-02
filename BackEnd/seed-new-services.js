const mongoose = require('mongoose');
require('dotenv').config();

const ServiceSchema = new mongoose.Schema({
  title: String,
  slug: String,
  short: String,
  description: String,
  bullets: [String],
  order: Number
}, { timestamps: true });

const Service = mongoose.model('Service', ServiceSchema);

async function seed() {
  try {
    await mongoose.connect(process.env.ATLAS_URL);
    console.log('Connected to MongoDB');

    const services = [
      {
        title: "Maintenance & Support",
        slug: "maintenance-support",
        short: "Ongoing technical support, security updates, and performance monitoring.",
        description: "Software isn't static. We provide the ongoing engineering support needed to keep your systems secure, fast, and up-to-date.",
        bullets: [
          "Security Patches & Updates",
          "Performance Audits",
          "Bug Fixes & Incident Response",
          "Feature Updates & Iterations"
        ],
        order: 4
      },
      {
        title: "Custom Plans",
        slug: "custom-plans",
        short: "Tailored engineering solutions for unique business requirements.",
        description: "Not every project fits into a standard box. We design custom engineering partnerships tailored to your specific technical and business goals.",
        bullets: [
          "Dedicated Engineering Teams",
          "Technical Consulting & Strategy",
          "Legacy System Migrations",
          "R&D and Prototyping"
        ],
        order: 5
      }
    ];

    for (const s of services) {
      await Service.findOneAndUpdate({ slug: s.slug }, s, { upsert: true, new: true });
      console.log(`Seeded service: ${s.title}`);
    }

    console.log('Seeding complete');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
