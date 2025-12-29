const mongoose = require('mongoose');

const targetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  goal: { type: Number, required: true },
  current: { type: Number, default: 0 },
  deadline: { type: Date },
  category: { type: String }, // e.g., 'Sales', 'Leads', 'Revenue'
  status: { type: String, enum: ['active', 'completed', 'on-hold'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Target', targetSchema);
