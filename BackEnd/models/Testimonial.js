const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String },
  company: { type: String },
  quote: { type: String, required: true },
  avatar: { type: String },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', TestimonialSchema);
