const { mongoose } = require("../config/db");

const EmailLogSchema = new mongoose.Schema({
  campaignId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Campaign', 
    required: true 
  },
  recipientEmail: { type: String, required: true },
  recipientName: { type: String },
  sequenceIndex: { type: Number, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  
  // Status tracking
  status: {
    type: String,
    enum: ['queued', 'sent', 'delivered', 'opened', 'clicked', 'replied', 'bounced', 'failed'],
    default: 'queued'
  },
  
  // Timestamps for tracking
  queuedAt: { type: Date, default: Date.now },
  sentAt: { type: Date },
  deliveredAt: { type: Date },
  openedAt: { type: Date },
  clickedAt: { type: Date },
  repliedAt: { type: Date },
  bouncedAt: { type: Date },
  failedAt: { type: Date },
  
  // Error tracking
  errorMessage: { type: String },
  
  // Tracking IDs
  messageId: { type: String }, // Email provider message ID
  trackingId: { type: String, unique: true }, // Our internal tracking ID
  
  // Metadata
  metadata: {
    userAgent: { type: String },
    ipAddress: { type: String },
    openCount: { type: Number, default: 0 },
    clickCount: { type: Number, default: 0 }
  }
}, { timestamps: true });

// Indexes for efficient queries
EmailLogSchema.index({ campaignId: 1, recipientEmail: 1 });
EmailLogSchema.index({ trackingId: 1 });
EmailLogSchema.index({ status: 1 });
EmailLogSchema.index({ sentAt: 1 });

module.exports = mongoose.model("EmailLog", EmailLogSchema);
