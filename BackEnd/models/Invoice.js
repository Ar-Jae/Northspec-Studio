const mongoose = require('mongoose');

const InvoiceItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  unitPrice: { type: Number, required: true },
  amount: { type: Number }
});

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { 
    type: String, 
    unique: true 
  },
  // Client info
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  clientPhone: { type: String },
  clientAddress: { type: String },
  clientCompany: { type: String },
  
  // Invoice details
  items: [InvoiceItemSchema],
  subtotal: { type: Number, default: 0 },
  taxRate: { type: Number, default: 0 }, // percentage
  taxAmount: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  discountType: { type: String, enum: ['fixed', 'percentage'], default: 'fixed' },
  total: { type: Number, default: 0 },
  
  // Status
  status: { 
    type: String, 
    enum: ['draft', 'sent', 'viewed', 'paid', 'partial', 'overdue', 'cancelled'],
    default: 'draft'
  },
  
  // Dates
  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date },
  paidDate: { type: Date },
  
  // Payment info
  amountPaid: { type: Number, default: 0 },
  amountDue: { type: Number },
  paymentMethod: { type: String },
  paymentLink: { type: String },
  
  // Notes
  notes: { type: String },
  terms: { type: String },
  
  // References
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  contactId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
  
  // Reminders
  remindersSent: { type: Number, default: 0 },
  lastReminderDate: { type: Date }
}, { timestamps: true });

// Auto-generate invoice number
InvoiceSchema.pre('save', async function() {
  if (!this.invoiceNumber) {
    const count = await mongoose.model('Invoice').countDocuments();
    const year = new Date().getFullYear();
    this.invoiceNumber = `INV-${year}-${String(count + 1).padStart(4, '0')}`;
  }
  
  // Calculate item amounts and totals
  if (this.items && this.items.length > 0) {
    this.items.forEach(item => {
      item.amount = item.quantity * item.unitPrice;
    });
    this.subtotal = this.items.reduce((sum, item) => sum + item.amount, 0);
    this.taxAmount = (this.subtotal * (this.taxRate / 100));
    
    // Calculate discount
    let discountAmount = 0;
    if (this.discountType === 'percentage') {
      discountAmount = this.subtotal * (this.discount / 100);
    } else {
      discountAmount = this.discount || 0;
    }
    
    this.total = this.subtotal + this.taxAmount - discountAmount;
    this.amountDue = this.total - (this.amountPaid || 0);
  }
  
  // Check overdue status
  if (this.status !== 'paid' && this.status !== 'cancelled' && this.dueDate && this.dueDate < new Date()) {
    this.status = 'overdue';
  }
});

// Virtual for payment percentage
InvoiceSchema.virtual('paymentPercentage').get(function() {
  if (this.total === 0) return 0;
  return Math.round((this.amountPaid / this.total) * 100);
});

InvoiceSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Invoice', InvoiceSchema);
