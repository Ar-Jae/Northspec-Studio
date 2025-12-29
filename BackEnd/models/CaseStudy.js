const mongoose = require('mongoose');

const ImpactSchema = new mongoose.Schema({
  label: { type: String },
  value: { type: String }
}, { _id: false });

const CaseStudySchema = new mongoose.Schema({
  client: { type: String, required: true },
  industry: { type: String },
  problem: { type: String },
  solution: { type: String },
  impact: [ImpactSchema],
  stack: [{ type: String }],
  image: { type: String },
  featured: { type: Boolean, default: false },
  slug: { type: String, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('CaseStudy', CaseStudySchema);
