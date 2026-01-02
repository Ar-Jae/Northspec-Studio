const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  short: { type: String },
  description: { type: String },
  bullets: [{ type: String }],
  icon: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
