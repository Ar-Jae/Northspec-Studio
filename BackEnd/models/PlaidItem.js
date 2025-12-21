const mongoose = require('mongoose');

const PlaidItemSchema = new mongoose.Schema({
  // Plaid identifiers
  itemId: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  
  // Institution info
  institutionId: { type: String },
  institutionName: { type: String },
  institutionLogo: { type: String },
  institutionColor: { type: String },
  
  // Linked accounts from this item
  accounts: [{
    accountId: { type: String, required: true },
    name: { type: String },
    officialName: { type: String },
    type: { type: String }, // depository, credit, loan, investment
    subtype: { type: String }, // checking, savings, credit card, etc.
    mask: { type: String }, // last 4 digits
    currentBalance: { type: Number },
    availableBalance: { type: Number },
    limit: { type: Number }, // for credit accounts
    currency: { type: String, default: 'USD' },
    lastUpdated: { type: Date }
  }],
  
  // Status
  status: {
    type: String,
    enum: ['active', 'needs_update', 'error', 'disconnected'],
    default: 'active'
  },
  errorCode: { type: String },
  errorMessage: { type: String },
  
  // Consent
  consentExpirationTime: { type: Date },
  
  // User association (if you have user auth)
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
  // Timestamps
  lastSyncedAt: { type: Date },
  
}, { timestamps: true });

// Index for quick lookups (itemId already has unique index from schema)
PlaidItemSchema.index({ 'accounts.accountId': 1 });

module.exports = mongoose.model('PlaidItem', PlaidItemSchema);
