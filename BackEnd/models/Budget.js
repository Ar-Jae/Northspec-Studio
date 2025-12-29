const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g., 'Marketing', 'Development', 'Operations'
  allocated: { type: Number, required: true },
  spent: { type: Number, default: 0 },
  period: { type: String }, // e.g., 'Monthly', 'Quarterly', 'Yearly'
  year: { type: Number, default: new Date().getFullYear() }
}, { timestamps: true });

module.exports = mongoose.model('Budget', budgetSchema);
