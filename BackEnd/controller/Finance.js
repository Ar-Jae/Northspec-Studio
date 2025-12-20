const Invoice = require('../models/Invoice');
const Payment = require('../models/Payment');

// =====================
// INVOICE ENDPOINTS
// =====================

/**
 * GET /api/invoices
 * List all invoices with optional filtering
 */
exports.getAllInvoices = async (req, res) => {
  try {
    const { status, clientEmail, startDate, endDate, limit = 50, skip = 0 } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (clientEmail) filter.clientEmail = clientEmail;
    if (startDate || endDate) {
      filter.issueDate = {};
      if (startDate) filter.issueDate.$gte = new Date(startDate);
      if (endDate) filter.issueDate.$lte = new Date(endDate);
    }
    
    const invoices = await Invoice.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    
    const total = await Invoice.countDocuments(filter);
    
    res.json({ invoices, total, limit: parseInt(limit), skip: parseInt(skip) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/invoices/stats
 * Get invoice statistics
 */
exports.getInvoiceStats = async (req, res) => {
  try {
    const stats = await Invoice.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$total' },
          totalPaid: { $sum: '$amountPaid' },
          totalDue: { $sum: '$amountDue' }
        }
      }
    ]);
    
    const totals = await Invoice.aggregate([
      {
        $group: {
          _id: null,
          totalInvoices: { $sum: 1 },
          totalRevenue: { $sum: '$total' },
          totalCollected: { $sum: '$amountPaid' },
          totalOutstanding: { $sum: '$amountDue' }
        }
      }
    ]);
    
    // Recent activity
    const recentInvoices = await Invoice.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('invoiceNumber clientName total status createdAt');
    
    res.json({
      byStatus: stats,
      totals: totals[0] || { totalInvoices: 0, totalRevenue: 0, totalCollected: 0, totalOutstanding: 0 },
      recentInvoices
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/invoices/:id
 * Get single invoice
 */
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    
    // Get related payments
    const payments = await Payment.find({ invoiceId: invoice._id }).sort({ paymentDate: -1 });
    
    res.json({ invoice, payments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/invoices
 * Create new invoice
 */
exports.createInvoice = async (req, res) => {
  try {
    const invoiceData = req.body;
    
    // Calculate item amounts if not provided
    if (invoiceData.items) {
      invoiceData.items = invoiceData.items.map(item => ({
        ...item,
        amount: item.amount || (item.quantity * item.unitPrice)
      }));
    }
    
    const invoice = new Invoice(invoiceData);
    await invoice.save();
    
    res.status(201).json(invoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * PUT /api/invoices/:id
 * Update invoice
 */
exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    
    // Don't allow editing paid invoices
    if (invoice.status === 'paid') {
      return res.status(400).json({ error: 'Cannot edit a paid invoice' });
    }
    
    Object.assign(invoice, req.body);
    await invoice.save();
    
    res.json(invoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * DELETE /api/invoices/:id
 * Delete invoice
 */
exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    
    // Check for associated payments
    const paymentCount = await Payment.countDocuments({ invoiceId: invoice._id });
    if (paymentCount > 0) {
      return res.status(400).json({ error: 'Cannot delete invoice with associated payments' });
    }
    
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/invoices/:id/send
 * Mark invoice as sent (simulated email)
 */
exports.sendInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    
    invoice.status = 'sent';
    await invoice.save();
    
    // TODO: Integrate with email service to actually send invoice
    
    res.json({ message: 'Invoice sent successfully', invoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/invoices/:id/reminder
 * Send payment reminder
 */
exports.sendReminder = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    
    if (invoice.status === 'paid') {
      return res.status(400).json({ error: 'Invoice is already paid' });
    }
    
    invoice.remindersSent += 1;
    invoice.lastReminderDate = new Date();
    await invoice.save();
    
    // TODO: Integrate with email service
    
    res.json({ message: 'Reminder sent successfully', invoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =====================
// PAYMENT ENDPOINTS
// =====================

/**
 * GET /api/payments
 * List all payments
 */
exports.getAllPayments = async (req, res) => {
  try {
    const { status, method, startDate, endDate, limit = 50, skip = 0 } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (method) filter.method = method;
    if (startDate || endDate) {
      filter.paymentDate = {};
      if (startDate) filter.paymentDate.$gte = new Date(startDate);
      if (endDate) filter.paymentDate.$lte = new Date(endDate);
    }
    
    const payments = await Payment.find(filter)
      .populate('invoiceId', 'invoiceNumber clientName')
      .sort({ paymentDate: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    
    const total = await Payment.countDocuments(filter);
    
    res.json({ payments, total, limit: parseInt(limit), skip: parseInt(skip) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/payments/stats
 * Payment statistics
 */
exports.getPaymentStats = async (req, res) => {
  try {
    const stats = await Payment.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: '$method',
          count: { $sum: 1 },
          total: { $sum: '$amount' }
        }
      }
    ]);
    
    const monthlyRevenue = await Payment.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: { 
            year: { $year: '$paymentDate' },
            month: { $month: '$paymentDate' }
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);
    
    const totals = await Payment.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: null,
          totalPayments: { $sum: 1 },
          totalCollected: { $sum: '$amount' }
        }
      }
    ]);
    
    res.json({
      byMethod: stats,
      monthlyRevenue,
      totals: totals[0] || { totalPayments: 0, totalCollected: 0 }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/payments/:id
 * Get single payment
 */
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('invoiceId');
    
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/payments
 * Record a new payment
 */
exports.createPayment = async (req, res) => {
  try {
    // Handle invoice field (frontend sends 'invoice', model uses 'invoiceId')
    const paymentData = { ...req.body };
    if (paymentData.invoice) {
      paymentData.invoiceId = paymentData.invoice;
      delete paymentData.invoice;
    }
    
    const payment = new Payment(paymentData);
    
    // If paying an invoice, validate it exists
    if (payment.invoiceId) {
      const invoice = await Invoice.findById(payment.invoiceId);
      if (!invoice) {
        return res.status(400).json({ error: 'Invoice not found' });
      }
      
      // Auto-fill payer info from invoice if not provided
      if (!payment.payerName) payment.payerName = invoice.clientName;
      if (!payment.payerEmail) payment.payerEmail = invoice.clientEmail;
    }
    
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * POST /api/payments/:id/process
 * Process/complete a pending payment
 */
exports.processPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    
    if (payment.status !== 'pending') {
      return res.status(400).json({ error: 'Payment is not in pending status' });
    }
    
    // Simulate payment processing
    // In production, integrate with Stripe, PayPal, etc.
    payment.status = 'completed';
    payment.processedAt = new Date();
    payment.transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    await payment.save();
    
    res.json({ message: 'Payment processed successfully', payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/payments/:id/refund
 * Refund a payment
 */
exports.refundPayment = async (req, res) => {
  try {
    const { amount, reason } = req.body;
    const payment = await Payment.findById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    
    if (payment.status !== 'completed') {
      return res.status(400).json({ error: 'Only completed payments can be refunded' });
    }
    
    const refundAmount = amount || payment.amount;
    if (refundAmount > payment.amount - payment.refundedAmount) {
      return res.status(400).json({ error: 'Refund amount exceeds available amount' });
    }
    
    payment.refundedAmount += refundAmount;
    payment.refundReason = reason;
    payment.refundDate = new Date();
    
    if (payment.refundedAmount >= payment.amount) {
      payment.status = 'refunded';
    }
    
    await payment.save();
    
    // Update invoice if applicable
    if (payment.invoiceId) {
      const invoice = await Invoice.findById(payment.invoiceId);
      if (invoice) {
        invoice.amountPaid -= refundAmount;
        invoice.amountDue = invoice.total - invoice.amountPaid;
        if (invoice.amountPaid <= 0) {
          invoice.status = 'sent';
          invoice.paidDate = null;
        } else {
          invoice.status = 'partial';
        }
        await invoice.save();
      }
    }
    
    res.json({ message: 'Refund processed successfully', payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * DELETE /api/payments/:id
 * Delete a payment (only pending)
 */
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    
    if (payment.status === 'completed') {
      return res.status(400).json({ error: 'Cannot delete completed payments. Use refund instead.' });
    }
    
    await Payment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =====================
// FINANCIAL OVERVIEW
// =====================

/**
 * GET /api/finance/overview
 * Combined financial overview
 */
exports.getFinanceOverview = async (req, res) => {
  try {
    // Invoice stats
    const invoiceStats = await Invoice.aggregate([
      {
        $group: {
          _id: null,
          totalInvoices: { $sum: 1 },
          totalRevenue: { $sum: '$total' },
          totalCollected: { $sum: '$amountPaid' },
          totalOutstanding: { $sum: '$amountDue' }
        }
      }
    ]);
    
    // Payment stats this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const monthlyPayments = await Payment.aggregate([
      { 
        $match: { 
          status: 'completed',
          paymentDate: { $gte: startOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Overdue invoices
    const overdueInvoices = await Invoice.countDocuments({ status: 'overdue' });
    
    // Recent activity
    const recentInvoices = await Invoice.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('invoiceNumber clientName total status createdAt');
    
    const recentPayments = await Payment.find({ status: 'completed' })
      .sort({ paymentDate: -1 })
      .limit(5)
      .select('paymentNumber payerName amount method paymentDate');
    
    res.json({
      invoices: invoiceStats[0] || { totalInvoices: 0, totalRevenue: 0, totalCollected: 0, totalOutstanding: 0 },
      thisMonth: monthlyPayments[0] || { total: 0, count: 0 },
      overdueCount: overdueInvoices,
      recentInvoices,
      recentPayments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
