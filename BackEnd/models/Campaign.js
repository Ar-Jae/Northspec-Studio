const { mongoose } = require("../config/db");

const EmailSequenceSchema = new mongoose.Schema({
  dayOffset: { type: Number, required: true, default: 0 },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  order: { type: Number, required: true }
});

const RecipientSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String },
  company: { type: String },
  website: { type: String },
  industry: { type: String },
  customFields: { type: Map, of: String },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'unsubscribed', 'bounced', 'replied'],
    default: 'pending'
  },
  currentSequenceIndex: { type: Number, default: 0 },
  firstEmailedAt: { type: Date },
  lastEmailedAt: { type: Date },
  nextEmailAt: { type: Date },
  openCount: { type: Number, default: 0 },
  clickCount: { type: Number, default: 0 },
  repliedAt: { type: Date }
}, { timestamps: true });

const CampaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'completed'],
    default: 'draft'
  },
  senderName: { type: String, required: true },
  senderEmail: { type: String, required: true },
  replyToEmail: { type: String },
  
  // Email sequences (the email templates to send)
  sequences: [EmailSequenceSchema],
  
  // Recipients for this campaign
  recipients: [RecipientSchema],
  
  // Settings
  settings: {
    sendOnWeekends: { type: Boolean, default: false },
    dailySendLimit: { type: Number, default: 50 },
    sendTimeStart: { type: String, default: '09:00' }, // HH:mm format
    sendTimeEnd: { type: String, default: '17:00' },
    timezone: { type: String, default: 'America/New_York' },
    stopOnReply: { type: Boolean, default: true }
  },

  // Stats (calculated fields)
  stats: {
    totalRecipients: { type: Number, default: 0 },
    totalSent: { type: Number, default: 0 },
    totalOpened: { type: Number, default: 0 },
    totalClicked: { type: Number, default: 0 },
    totalReplied: { type: Number, default: 0 },
    totalBounced: { type: Number, default: 0 },
    totalUnsubscribed: { type: Number, default: 0 }
  }
}, { timestamps: true });

// Calculate stats before saving
CampaignSchema.pre('save', async function() {
  // Initialize stats if not exists
  if (!this.stats) {
    this.stats = {};
  }
  
  if (this.recipients && this.recipients.length > 0) {
    this.stats.totalRecipients = this.recipients.length;
    this.stats.totalSent = this.recipients.filter(r => r.firstEmailedAt).length;
    this.stats.totalReplied = this.recipients.filter(r => r.status === 'replied').length;
    this.stats.totalBounced = this.recipients.filter(r => r.status === 'bounced').length;
    this.stats.totalUnsubscribed = this.recipients.filter(r => r.status === 'unsubscribed').length;
  } else {
    this.stats.totalRecipients = 0;
  }
});

module.exports = mongoose.model("Campaign", CampaignSchema);
