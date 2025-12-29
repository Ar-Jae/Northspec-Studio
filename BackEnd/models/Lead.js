const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  property: { type: String },
  stage: { 
    type: String, 
    enum: ['New', 'Contacted', 'Negotiation', 'Closed', 'Lost'],
    default: 'New'
  },
  stageTone: { 
    type: String, 
    enum: ['sky', 'green', 'amber', 'emerald', 'rose'],
    default: 'sky'
  },
  value: { type: Number, default: 0 },
  lastActivity: { type: String },
  contactId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Lead', LeadSchema);
