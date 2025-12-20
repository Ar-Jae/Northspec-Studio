const Campaign = require('../models/Campaign');
const EmailLog = require('../models/EmailLog');
const emailService = require('../services/emailService');
const campaignScheduler = require('../services/campaignScheduler');

/**
 * Get all campaigns
 */
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .select('-recipients.customFields') // Exclude large fields for list view
      .sort({ createdAt: -1 });
    
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a single campaign by ID
 */
exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Create a new campaign
 */
exports.createCampaign = async (req, res) => {
  try {
    const campaign = new Campaign({
      name: req.body.name,
      description: req.body.description,
      senderName: req.body.senderName,
      senderEmail: req.body.senderEmail,
      replyToEmail: req.body.replyToEmail,
      settings: req.body.settings || {},
      sequences: [],
      recipients: []
    });

    const savedCampaign = await campaign.save();
    res.status(201).json(savedCampaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Update a campaign
 */
exports.updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Only allow updates if campaign is not active
    if (campaign.status === 'active' && req.body.sequences) {
      return res.status(400).json({ 
        message: 'Cannot modify sequences while campaign is active. Pause the campaign first.' 
      });
    }

    const allowedUpdates = ['name', 'description', 'senderName', 'senderEmail', 'replyToEmail', 'settings', 'sequences'];
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        campaign[field] = req.body[field];
      }
    });

    const updatedCampaign = await campaign.save();
    res.json(updatedCampaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Delete a campaign
 */
exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Delete associated email logs
    await EmailLog.deleteMany({ campaignId: campaign._id });
    
    await campaign.deleteOne();
    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Add a sequence to a campaign
 */
exports.addSequence = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    const newSequence = {
      dayOffset: req.body.dayOffset || 0,
      subject: req.body.subject,
      message: req.body.message,
      order: campaign.sequences.length
    };

    campaign.sequences.push(newSequence);
    
    // Sort sequences by dayOffset
    campaign.sequences.sort((a, b) => a.dayOffset - b.dayOffset);
    
    // Update order after sorting
    campaign.sequences.forEach((seq, index) => {
      seq.order = index;
    });

    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Update a sequence
 */
exports.updateSequence = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    const sequence = campaign.sequences.id(req.params.sequenceId);
    if (!sequence) {
      return res.status(404).json({ message: 'Sequence not found' });
    }

    if (req.body.dayOffset !== undefined) sequence.dayOffset = req.body.dayOffset;
    if (req.body.subject) sequence.subject = req.body.subject;
    if (req.body.message) sequence.message = req.body.message;

    // Re-sort and update order
    campaign.sequences.sort((a, b) => a.dayOffset - b.dayOffset);
    campaign.sequences.forEach((seq, index) => {
      seq.order = index;
    });

    await campaign.save();
    res.json(campaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Delete a sequence
 */
exports.deleteSequence = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    campaign.sequences = campaign.sequences.filter(
      seq => seq._id.toString() !== req.params.sequenceId
    );

    // Update order after deletion
    campaign.sequences.forEach((seq, index) => {
      seq.order = index;
    });

    await campaign.save();
    res.json(campaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Add recipients to a campaign
 */
exports.addRecipients = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    const recipients = req.body.recipients || [];
    
    // Check for duplicates
    const existingEmails = new Set(campaign.recipients.map(r => r.email.toLowerCase()));
    const newRecipients = recipients.filter(r => !existingEmails.has(r.email.toLowerCase()));

    campaign.recipients.push(...newRecipients.map(r => ({
      email: r.email,
      name: r.name,
      company: r.company,
      website: r.website,
      industry: r.industry,
      customFields: r.customFields || {}
    })));

    await campaign.save();
    
    res.json({
      message: `Added ${newRecipients.length} recipients`,
      duplicatesSkipped: recipients.length - newRecipients.length,
      campaign
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Remove a recipient from a campaign
 */
exports.removeRecipient = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    campaign.recipients = campaign.recipients.filter(
      r => r._id.toString() !== req.params.recipientId
    );

    await campaign.save();
    res.json(campaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Import recipients from contacts
 */
exports.importFromContacts = async (req, res) => {
  try {
    const Contact = require('../models/Contact');
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Get all contacts
    const contacts = await Contact.find({});
    
    // Convert contacts to recipients format
    const recipients = contacts.map(contact => ({
      email: contact.email,
      name: contact.name,
      company: contact.company || '',
      website: '',
      industry: contact.projectType || ''
    }));

    // Check for duplicates
    const existingEmails = new Set(campaign.recipients.map(r => r.email.toLowerCase()));
    const newRecipients = recipients.filter(r => !existingEmails.has(r.email.toLowerCase()));

    campaign.recipients.push(...newRecipients);
    await campaign.save();

    res.json({
      message: `Imported ${newRecipients.length} contacts`,
      duplicatesSkipped: recipients.length - newRecipients.length,
      campaign
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Start/Activate a campaign
 */
exports.activateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Validation
    if (campaign.sequences.length === 0) {
      return res.status(400).json({ message: 'Campaign must have at least one email sequence' });
    }
    if (campaign.recipients.length === 0) {
      return res.status(400).json({ message: 'Campaign must have at least one recipient' });
    }
    if (!campaign.senderEmail) {
      return res.status(400).json({ message: 'Campaign must have a sender email' });
    }

    campaign.status = 'active';
    await campaign.save();

    res.json({ message: 'Campaign activated', campaign });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Pause a campaign
 */
exports.pauseCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    campaign.status = 'paused';
    await campaign.save();

    res.json({ message: 'Campaign paused', campaign });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Get campaign analytics
 */
exports.getCampaignAnalytics = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Get email logs for this campaign
    const emailLogs = await EmailLog.find({ campaignId: campaign._id });

    // Calculate per-sequence stats
    const sequenceStats = campaign.sequences.map((seq, index) => {
      const logsForSequence = emailLogs.filter(log => log.sequenceIndex === index);
      return {
        sequenceId: seq._id,
        subject: seq.subject,
        dayOffset: seq.dayOffset,
        sent: logsForSequence.filter(l => l.sentAt).length,
        opened: logsForSequence.filter(l => l.openedAt).length,
        clicked: logsForSequence.filter(l => l.clickedAt).length,
        replied: logsForSequence.filter(l => l.repliedAt).length,
        failed: logsForSequence.filter(l => l.status === 'failed').length
      };
    });

    // Calculate daily stats for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyStats = await EmailLog.aggregate([
      {
        $match: {
          campaignId: campaign._id,
          sentAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$sentAt' } },
          sent: { $sum: 1 },
          opened: { $sum: { $cond: ['$openedAt', 1, 0] } },
          clicked: { $sum: { $cond: ['$clickedAt', 1, 0] } }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      campaign: {
        id: campaign._id,
        name: campaign.name,
        status: campaign.status,
        stats: campaign.stats
      },
      sequenceStats,
      dailyStats,
      rates: {
        openRate: campaign.stats.totalSent > 0 
          ? (campaign.stats.totalOpened / campaign.stats.totalSent * 100).toFixed(2) 
          : 0,
        clickRate: campaign.stats.totalSent > 0 
          ? (campaign.stats.totalClicked / campaign.stats.totalSent * 100).toFixed(2) 
          : 0,
        replyRate: campaign.stats.totalSent > 0 
          ? (campaign.stats.totalReplied / campaign.stats.totalSent * 100).toFixed(2) 
          : 0,
        bounceRate: campaign.stats.totalSent > 0 
          ? (campaign.stats.totalBounced / campaign.stats.totalSent * 100).toFixed(2) 
          : 0
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Track email open (returns 1x1 transparent pixel)
 */
exports.trackOpen = async (req, res) => {
  const { trackingId } = req.params;
  
  await campaignScheduler.trackOpen(trackingId, {
    userAgent: req.headers['user-agent'],
    ipAddress: req.ip
  });

  // Return 1x1 transparent GIF
  const pixel = Buffer.from(
    'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    'base64'
  );
  
  res.writeHead(200, {
    'Content-Type': 'image/gif',
    'Content-Length': pixel.length,
    'Cache-Control': 'no-store, no-cache, must-revalidate, private'
  });
  res.end(pixel);
};

/**
 * Track email click and redirect
 */
exports.trackClick = async (req, res) => {
  const { trackingId } = req.params;
  const { url } = req.query;

  await campaignScheduler.trackClick(trackingId, url, {
    userAgent: req.headers['user-agent'],
    ipAddress: req.ip
  });

  // Redirect to original URL
  if (url) {
    res.redirect(decodeURIComponent(url));
  } else {
    res.status(400).send('Missing redirect URL');
  }
};

/**
 * Handle unsubscribe
 */
exports.handleUnsubscribe = async (req, res) => {
  try {
    const { campaignId, email } = req.params;
    
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).send('Campaign not found');
    }

    const recipient = campaign.recipients.find(r => r.email === email);
    if (recipient) {
      recipient.status = 'unsubscribed';
      campaign.stats.totalUnsubscribed++;
      await campaign.save();
    }

    // Return a simple unsubscribe confirmation page
    res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>Unsubscribed</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h1>You've been unsubscribed</h1>
          <p>You will no longer receive emails from this campaign.</p>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Error processing unsubscribe');
  }
};

/**
 * Send a test email
 */
exports.sendTestEmail = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    const { testEmail, sequenceIndex = 0 } = req.body;
    if (!testEmail) {
      return res.status(400).json({ message: 'Test email address is required' });
    }

    const sequence = campaign.sequences[sequenceIndex];
    if (!sequence) {
      return res.status(400).json({ message: 'Sequence not found' });
    }

    // Create test recipient data
    const testRecipient = {
      email: testEmail,
      name: 'Test User',
      company: 'Test Company',
      website: 'https://example.com',
      industry: 'Technology'
    };

    const subject = emailService.replacePlaceholders(sequence.subject, testRecipient);
    const message = emailService.replacePlaceholders(sequence.message, testRecipient);

    const result = await emailService.sendEmail({
      to: testEmail,
      from: campaign.senderEmail,
      fromName: campaign.senderName,
      subject: `[TEST] ${subject}`,
      text: message,
      html: emailService.textToHtml(message)
    });

    if (result.success) {
      res.json({ message: 'Test email sent successfully', messageId: result.messageId });
    } else {
      res.status(500).json({ message: 'Failed to send test email', error: result.error });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Verify email configuration
 */
exports.verifyEmailConfig = async (req, res) => {
  const result = await emailService.verifyConnection();
  res.json(result);
};
