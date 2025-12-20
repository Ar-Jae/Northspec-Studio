const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  // Payment identification
  paymentNumber: { type: String, unique: true },
  transactionId: { type: String }, // External payment processor ID
  
  // Amount
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  
  // Payment method
  method: { 
    type: String, 
    enum: ['credit_card', 'debit_card', 'bank_transfer', 'paypal', 'stripe', 'cash', 'check', 'other'],
    required: true 
  },
  
  // Status
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'],
    default: 'pending'
  },
  
  // Payer info
  payerName: { type: String, required: true },
  payerEmail: { type: String, required: true },
  payerPhone: { type: String },
  
  // Card info (partial, for display)
  cardLast4: { type: String },
  cardBrand: { type: String },
  
  // References
  invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },
  contactId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
  
  // Dates
  paymentDate: { type: Date, default: Date.now },
  processedAt: { type: Date },
  
  // Notes
  description: { type: String },
  notes: { type: String },
  
  // Refund info
  refundedAmount: { type: Number, default: 0 },
  refundReason: { type: String },
  refundDate: { type: Date },
  
  // Metadata
  metadata: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

// Auto-generate payment number
PaymentSchema.pre('save', async function() {
  if (!this.paymentNumber) {
    const count = await mongoose.model('Payment').countDocuments();
    const year = new Date().getFullYear();
    this.paymentNumber = `PAY-${year}-${String(count + 1).padStart(5, '0')}`;
  }
});

// Update invoice when payment is completed
PaymentSchema.post('save', async function(doc) {
  if (doc.status === 'completed' && doc.invoiceId) {
    const Invoice = mongoose.model('Invoice');
    const invoice = await Invoice.findById(doc.invoiceId);
    if (invoice) {
      invoice.amountPaid = (invoice.amountPaid || 0) + doc.amount;
      invoice.amountDue = invoice.total - invoice.amountPaid;
      
      if (invoice.amountDue <= 0) {
        invoice.status = 'paid';
        invoice.paidDate = new Date();
      } else if (invoice.amountPaid > 0) {
        invoice.status = 'partial';
      }
      
      invoice.paymentMethod = doc.method;
      await invoice.save();
    }
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);
