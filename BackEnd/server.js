require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const Contact = require('./models/Contact');
const prospectsController = require('./controller/Prospects');
const prospectsEnrichmentController = require('./controller/ProspectsEnrichment');
const campaignsController = require('./controller/Campaigns');
const nocoDBController = require('./controller/NocoDB');
const financeController = require('./controller/Finance');
const plaidController = require('./controller/Plaid');
const dashboardController = require('./controller/Dashboard');
const contentController = require('./controller/Content');
const documentsController = require('./controller/Documents');
const campaignScheduler = require('./services/campaignScheduler');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to Database
connectDB();

// Start campaign scheduler
campaignScheduler.start();

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Northspec Studio Backend is running');
});

// Dashboard Routes
app.get('/api/dashboard/leads', dashboardController.getLeads);
app.post('/api/dashboard/leads', dashboardController.createLead);
app.get('/api/dashboard/activities', dashboardController.getActivities);
app.post('/api/dashboard/activities', dashboardController.createActivity);
app.get('/api/dashboard/files', dashboardController.getFiles);
app.post('/api/dashboard/files', dashboardController.createFile);
app.get('/api/dashboard/targets', dashboardController.getTargets);
app.post('/api/dashboard/targets', dashboardController.createTarget);
app.get('/api/dashboard/budgets', dashboardController.getBudgets);
app.post('/api/dashboard/budgets', dashboardController.createBudget);
app.get('/api/dashboard/users', dashboardController.getUsers);

// Document Routes (Google Drive)
app.get('/api/documents', documentsController.getDocuments);
app.post('/api/documents/upload', upload.single('file'), documentsController.uploadDocument);
app.delete('/api/documents/:id', documentsController.deleteDocument);
app.get('/api/documents/shared-drives', documentsController.getSharedDrives);
app.post('/api/documents/shared-drives', documentsController.createSharedDrive);

// Content Routes
app.get('/api/content/news', contentController.getAllNews);
app.post('/api/content/news', contentController.createNews);
app.get('/api/content/services', contentController.getAllServices);
app.post('/api/content/services', contentController.createService);
app.get('/api/content/testimonials', contentController.getAllTestimonials);
app.post('/api/content/testimonials', contentController.createTestimonial);
app.get('/api/content/case-studies', contentController.getAllCaseStudies);
app.post('/api/content/case-studies', contentController.createCaseStudy);
app.get('/api/content/faqs', contentController.getAllFAQs);
app.post('/api/content/faqs', contentController.createFAQ);

// Prospects Routes
app.post('/api/prospects/scan', prospectsController.scanProspects);

// Prospects Enrichment CRUD Routes
app.get('/api/prospects', prospectsEnrichmentController.getAllProspects);
app.get('/api/prospects/stats', prospectsEnrichmentController.getProspectStats);
app.get('/api/prospects/:id', prospectsEnrichmentController.getProspectById);
app.post('/api/prospects', prospectsEnrichmentController.createProspect);
app.put('/api/prospects/:id', prospectsEnrichmentController.updateProspect);
app.delete('/api/prospects/:id', prospectsEnrichmentController.deleteProspect);
app.post('/api/prospects/add-to-campaign', prospectsEnrichmentController.addToCampaign);

// n8n Webhook Endpoints (for workflow integration)
app.post('/api/n8n/prospects/domain', prospectsEnrichmentController.upsertProspectDomain);
app.post('/api/n8n/prospects/decision-maker', prospectsEnrichmentController.addDecisionMaker);
app.post('/api/n8n/prospects/decision-makers/bulk', prospectsEnrichmentController.bulkAddDecisionMakers);
app.post('/api/n8n/prospects/company-emails', prospectsEnrichmentController.updateCompanyEmails);
app.post('/api/n8n/prospects/status', prospectsEnrichmentController.updateEnrichmentStatus);

// Contact Routes
app.post('/api/contacts', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =====================
// Campaign Routes
// =====================

// Campaign CRUD
app.get('/api/campaigns', campaignsController.getAllCampaigns);
app.get('/api/campaigns/:id', campaignsController.getCampaignById);
app.post('/api/campaigns', campaignsController.createCampaign);
app.put('/api/campaigns/:id', campaignsController.updateCampaign);
app.delete('/api/campaigns/:id', campaignsController.deleteCampaign);

// Campaign Sequences
app.post('/api/campaigns/:id/sequences', campaignsController.addSequence);
app.put('/api/campaigns/:id/sequences/:sequenceId', campaignsController.updateSequence);
app.delete('/api/campaigns/:id/sequences/:sequenceId', campaignsController.deleteSequence);

// Campaign Recipients
app.post('/api/campaigns/:id/recipients', campaignsController.addRecipients);
app.delete('/api/campaigns/:id/recipients/:recipientId', campaignsController.removeRecipient);
app.post('/api/campaigns/:id/import-contacts', campaignsController.importFromContacts);

// Campaign Actions
app.post('/api/campaigns/:id/activate', campaignsController.activateCampaign);
app.post('/api/campaigns/:id/pause', campaignsController.pauseCampaign);
app.post('/api/campaigns/:id/test-email', campaignsController.sendTestEmail);

// Campaign Analytics
app.get('/api/campaigns/:id/analytics', campaignsController.getCampaignAnalytics);

// Email Tracking
app.get('/api/campaigns/track/open/:trackingId', campaignsController.trackOpen);
app.get('/api/campaigns/track/click/:trackingId', campaignsController.trackClick);
app.get('/api/campaigns/unsubscribe/:campaignId/:email', campaignsController.handleUnsubscribe);

// Email Configuration
app.get('/api/email/verify', campaignsController.verifyEmailConfig);

// =====================
// NocoDB Routes
// =====================

// Health & Stats
app.get('/api/nocodb/health', nocoDBController.healthCheck);
app.get('/api/nocodb/stats', nocoDBController.getStats);

// Prospects from NocoDB
app.get('/api/nocodb/prospects', nocoDBController.getProspects);
app.get('/api/nocodb/prospects/high-value', nocoDBController.getHighValueProspects);
app.get('/api/nocodb/prospects/needs-enrichment', nocoDBController.getProspectsNeedingEnrichment);

// Sync MongoDB to NocoDB
app.post('/api/nocodb/sync/prospects', nocoDBController.syncProspectsToNocoDB);
app.post('/api/nocodb/sync/prospect/:id', nocoDBController.syncSingleProspect);
app.post('/api/nocodb/sync/contacts', nocoDBController.syncContactsToNocoDB);

// Import from NocoDB to MongoDB
app.post('/api/nocodb/import/prospects', nocoDBController.importProspectsFromNocoDB);

// Generic NocoDB operations
app.post('/api/nocodb/records', nocoDBController.createRecords);
app.patch('/api/nocodb/records', nocoDBController.updateRecords);
app.delete('/api/nocodb/records', nocoDBController.deleteRecords);
app.post('/api/nocodb/query', nocoDBController.customQuery);

// =====================
// Finance Routes
// =====================

// Finance Overview
app.get('/api/finance/overview', financeController.getFinanceOverview);

// Invoices
app.get('/api/invoices', financeController.getAllInvoices);
app.get('/api/invoices/stats', financeController.getInvoiceStats);
app.get('/api/invoices/:id', financeController.getInvoiceById);
app.post('/api/invoices', financeController.createInvoice);
app.put('/api/invoices/:id', financeController.updateInvoice);
app.delete('/api/invoices/:id', financeController.deleteInvoice);
app.post('/api/invoices/:id/send', financeController.sendInvoice);
app.post('/api/invoices/:id/reminder', financeController.sendReminder);

// Payments
app.get('/api/payments', financeController.getAllPayments);
app.get('/api/payments/stats', financeController.getPaymentStats);
app.get('/api/payments/:id', financeController.getPaymentById);
app.post('/api/payments', financeController.createPayment);
app.post('/api/payments/:id/process', financeController.processPayment);
app.post('/api/payments/:id/refund', financeController.refundPayment);
app.delete('/api/payments/:id', financeController.deletePayment);

// =====================
// Plaid Bank Connection Routes
// =====================
app.post('/api/plaid/create-link-token', plaidController.createLinkToken);
app.post('/api/plaid/exchange-token', plaidController.exchangeToken);
app.get('/api/plaid/accounts', plaidController.getAccounts);
app.get('/api/plaid/transactions', plaidController.getTransactions);
app.get('/api/plaid/items', plaidController.getItems);
app.delete('/api/plaid/items/:id', plaidController.unlinkItem);
app.post('/api/plaid/sync', plaidController.syncAccounts);
app.get('/api/plaid/spending-insights', plaidController.getSpendingInsights);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
