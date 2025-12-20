const { mongoose } = require("../config/db");

const DecisionMakerSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  emailStatus: { 
    type: String, 
    enum: ['valid', 'risky', 'invalid', 'unknown'],
    default: 'unknown'
  },
  position: { type: String },
  category: { 
    type: String, 
    enum: ['sales', 'ceo', 'marketing', 'other'],
    default: 'other'
  },
  linkedinUrl: { type: String }
}, { _id: false });

const ProspectSchema = new mongoose.Schema({
  // Company Info
  companyName: { type: String, required: true },
  location: { type: String },
  industry: { type: String },
  
  // Domain/Website (from Serper + AI enrichment)
  url: { type: String },
  domain: { type: String },
  domainExplanation: { type: String },
  
  // Company Emails (from AnyMailFinder bulk search)
  companyEmails: [{ type: String }],
  companyEmailsStatus: { 
    type: String, 
    enum: ['valid', 'risky', 'not_found', 'pending'],
    default: 'pending'
  },
  
  // Decision Makers (from AnyMailFinder decision-maker search)
  decisionMakers: [DecisionMakerSchema],
  
  // Enrichment Status
  enrichmentStatus: {
    type: String,
    enum: ['pending', 'domain_found', 'domain_not_found', 'emails_found', 'completed', 'failed'],
    default: 'pending'
  },
  enrichmentError: { type: String },
  lastEnrichedAt: { type: Date },
  
  // Source tracking
  source: { 
    type: String, 
    enum: ['n8n', 'google_places', 'manual', 'import', 'other'],
    default: 'n8n'
  },
  externalId: { type: String }, // ID from NocoDB or other external system
  
  // Lead scoring
  leadScore: { type: Number, default: 0 },
  
  // Integration with campaigns
  addedToCampaigns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' }],
  
  // Additional metadata
  tags: [{ type: String }],
  notes: { type: String },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Index for fast lookups
ProspectSchema.index({ domain: 1 });
ProspectSchema.index({ companyName: 1 });
ProspectSchema.index({ externalId: 1 });
ProspectSchema.index({ enrichmentStatus: 1 });
ProspectSchema.index({ 'decisionMakers.email': 1 });

// Calculate lead score based on enrichment data
ProspectSchema.pre('save', function() {
  let score = 0;
  
  // Has website/domain
  if (this.domain) score += 20;
  
  // Has decision makers with valid emails
  const validEmails = this.decisionMakers.filter(dm => dm.emailStatus === 'valid');
  score += validEmails.length * 15;
  
  // Has CEO or Sales contact
  const hasKeyContact = this.decisionMakers.some(dm => 
    ['ceo', 'sales'].includes(dm.category) && dm.emailStatus === 'valid'
  );
  if (hasKeyContact) score += 20;
  
  // Has company emails
  if (this.companyEmails.length > 0 && this.companyEmailsStatus === 'valid') {
    score += 10;
  }
  
  this.leadScore = Math.min(score, 100);
  this.updatedAt = new Date();
});

module.exports = mongoose.model("Prospect", ProspectSchema);
