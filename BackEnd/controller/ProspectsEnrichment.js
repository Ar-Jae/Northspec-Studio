const Prospect = require('../models/Prospect');

// =====================
// n8n Webhook Endpoints
// =====================

/**
 * Create or update a prospect with domain info
 * Called by n8n after "Update Companies Domains" node
 * POST /api/n8n/prospects/domain
 */
exports.upsertProspectDomain = async (req, res) => {
  try {
    const { 
      externalId,
      companyName,
      location,
      url,
      domain,
      explanation 
    } = req.body;

    if (!companyName && !externalId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Either companyName or externalId is required' 
      });
    }

    const enrichmentStatus = domain ? 'domain_found' : 'domain_not_found';

    const prospect = await Prospect.findOneAndUpdate(
      { 
        $or: [
          { externalId: externalId },
          { companyName: companyName }
        ]
      },
      {
        $set: {
          companyName,
          location,
          url,
          domain,
          domainExplanation: explanation,
          enrichmentStatus,
          lastEnrichedAt: new Date(),
          source: 'n8n'
        },
        $setOnInsert: {
          externalId,
          createdAt: new Date()
        }
      },
      { upsert: true, new: true, runValidators: true }
    );

    res.json({ 
      success: true, 
      prospect,
      message: domain ? 'Domain found and saved' : 'No domain found'
    });

  } catch (error) {
    console.error('Error upserting prospect domain:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Add a decision maker to a prospect
 * Called by n8n after "Create Contacts" node
 * POST /api/n8n/prospects/decision-maker
 */
exports.addDecisionMaker = async (req, res) => {
  try {
    const {
      externalId,
      companyName,
      name,
      email,
      emailStatus,
      position,
      category, // 'sales', 'ceo', 'marketing'
      linkedinUrl
    } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    // Find or create the prospect
    let prospect = await Prospect.findOne({
      $or: [
        { externalId: externalId },
        { companyName: companyName }
      ]
    });

    if (!prospect) {
      prospect = new Prospect({
        companyName,
        externalId,
        source: 'n8n'
      });
    }

    // Check if decision maker already exists
    const existingDM = prospect.decisionMakers.find(dm => dm.email === email);
    
    if (existingDM) {
      // Update existing
      existingDM.name = name || existingDM.name;
      existingDM.emailStatus = emailStatus || existingDM.emailStatus;
      existingDM.position = position || existingDM.position;
      existingDM.category = category || existingDM.category;
      existingDM.linkedinUrl = linkedinUrl || existingDM.linkedinUrl;
    } else {
      // Add new
      prospect.decisionMakers.push({
        name,
        email,
        emailStatus: emailStatus || 'unknown',
        position,
        category: category || 'other',
        linkedinUrl
      });
    }

    // Update enrichment status if we have valid emails
    const hasValidEmail = prospect.decisionMakers.some(dm => dm.emailStatus === 'valid');
    if (hasValidEmail) {
      prospect.enrichmentStatus = 'emails_found';
    }

    await prospect.save();

    res.json({ 
      success: true, 
      prospect,
      message: existingDM ? 'Decision maker updated' : 'Decision maker added'
    });

  } catch (error) {
    console.error('Error adding decision maker:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Bulk add decision makers
 * Called by n8n after "Merge1" node with all contacts
 * POST /api/n8n/prospects/decision-makers/bulk
 */
exports.bulkAddDecisionMakers = async (req, res) => {
  try {
    const { contacts } = req.body; // Array of contact objects

    if (!Array.isArray(contacts) || contacts.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'contacts array is required' 
      });
    }

    const results = {
      created: 0,
      updated: 0,
      errors: []
    };

    for (const contact of contacts) {
      try {
        const {
          company_id,
          company_name,
          name,
          email,
          email_status,
          person_job_title,
          linkedin
        } = contact;

        if (!email) continue;

        // Determine category from job title
        let category = 'other';
        const titleLower = (person_job_title || '').toLowerCase();
        if (titleLower.includes('ceo') || titleLower.includes('chief executive')) {
          category = 'ceo';
        } else if (titleLower.includes('sales') || titleLower.includes('business development')) {
          category = 'sales';
        } else if (titleLower.includes('marketing') || titleLower.includes('growth')) {
          category = 'marketing';
        }

        let prospect = await Prospect.findOne({
          $or: [
            { externalId: String(company_id) },
            { companyName: company_name }
          ]
        });

        if (!prospect) {
          prospect = new Prospect({
            companyName: company_name,
            externalId: String(company_id),
            source: 'n8n'
          });
          results.created++;
        }

        const existingDM = prospect.decisionMakers.find(dm => dm.email === email);
        
        if (!existingDM) {
          prospect.decisionMakers.push({
            name,
            email,
            emailStatus: email_status || 'unknown',
            position: person_job_title,
            category,
            linkedinUrl: linkedin
          });
          results.updated++;
        }

        const hasValidEmail = prospect.decisionMakers.some(dm => dm.emailStatus === 'valid');
        if (hasValidEmail) {
          prospect.enrichmentStatus = 'emails_found';
        }

        await prospect.save();

      } catch (err) {
        results.errors.push({ contact, error: err.message });
      }
    }

    res.json({ 
      success: true, 
      results,
      message: `Processed ${contacts.length} contacts`
    });

  } catch (error) {
    console.error('Error bulk adding decision makers:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update company emails for a prospect
 * Called by n8n after "Update Company Emails" node
 * POST /api/n8n/prospects/company-emails
 */
exports.updateCompanyEmails = async (req, res) => {
  try {
    const {
      externalId,
      companyName,
      emails, // Array of emails or comma-separated string
      emailStatus
    } = req.body;

    if (!companyName && !externalId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Either companyName or externalId is required' 
      });
    }

    // Handle emails as array or string
    let emailArray = [];
    if (typeof emails === 'string') {
      emailArray = emails.split(',').map(e => e.trim()).filter(Boolean);
    } else if (Array.isArray(emails)) {
      emailArray = emails;
    }

    const prospect = await Prospect.findOneAndUpdate(
      {
        $or: [
          { externalId: externalId },
          { companyName: companyName }
        ]
      },
      {
        $set: {
          companyEmails: emailArray,
          companyEmailsStatus: emailStatus || 'valid',
          lastEnrichedAt: new Date()
        }
      },
      { new: true }
    );

    if (!prospect) {
      return res.status(404).json({ 
        success: false, 
        message: 'Prospect not found' 
      });
    }

    res.json({ 
      success: true, 
      prospect,
      message: `Updated ${emailArray.length} company emails`
    });

  } catch (error) {
    console.error('Error updating company emails:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update enrichment status
 * POST /api/n8n/prospects/status
 */
exports.updateEnrichmentStatus = async (req, res) => {
  try {
    const { externalId, companyName, status, error } = req.body;

    const updateData = {
      enrichmentStatus: status,
      lastEnrichedAt: new Date()
    };

    if (error) {
      updateData.enrichmentError = error;
    }

    const prospect = await Prospect.findOneAndUpdate(
      {
        $or: [
          { externalId: externalId },
          { companyName: companyName }
        ]
      },
      { $set: updateData },
      { new: true }
    );

    if (!prospect) {
      return res.status(404).json({ 
        success: false, 
        message: 'Prospect not found' 
      });
    }

    res.json({ success: true, prospect });

  } catch (error) {
    console.error('Error updating enrichment status:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// =====================
// CRUD Endpoints
// =====================

/**
 * Get all prospects with optional filters
 * GET /api/prospects
 */
exports.getAllProspects = async (req, res) => {
  try {
    const { 
      status, 
      minScore, 
      hasEmail,
      source,
      page = 1, 
      limit = 50 
    } = req.query;

    const query = {};

    if (status) {
      query.enrichmentStatus = status;
    }

    if (minScore) {
      query.leadScore = { $gte: parseInt(minScore) };
    }

    if (hasEmail === 'true') {
      query['decisionMakers.0'] = { $exists: true };
    }

    if (source) {
      query.source = source;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [prospects, total] = await Promise.all([
      Prospect.find(query)
        .sort({ leadScore: -1, updatedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Prospect.countDocuments(query)
    ]);

    res.json({
      prospects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Error fetching prospects:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a single prospect by ID
 * GET /api/prospects/:id
 */
exports.getProspectById = async (req, res) => {
  try {
    const prospect = await Prospect.findById(req.params.id);
    
    if (!prospect) {
      return res.status(404).json({ message: 'Prospect not found' });
    }

    res.json(prospect);

  } catch (error) {
    console.error('Error fetching prospect:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Create a new prospect manually
 * POST /api/prospects
 */
exports.createProspect = async (req, res) => {
  try {
    const prospect = new Prospect({
      ...req.body,
      source: req.body.source || 'manual'
    });

    await prospect.save();
    res.status(201).json(prospect);

  } catch (error) {
    console.error('Error creating prospect:', error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Update a prospect
 * PUT /api/prospects/:id
 */
exports.updateProspect = async (req, res) => {
  try {
    const prospect = await Prospect.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!prospect) {
      return res.status(404).json({ message: 'Prospect not found' });
    }

    res.json(prospect);

  } catch (error) {
    console.error('Error updating prospect:', error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Delete a prospect
 * DELETE /api/prospects/:id
 */
exports.deleteProspect = async (req, res) => {
  try {
    const prospect = await Prospect.findByIdAndDelete(req.params.id);

    if (!prospect) {
      return res.status(404).json({ message: 'Prospect not found' });
    }

    res.json({ message: 'Prospect deleted', prospect });

  } catch (error) {
    console.error('Error deleting prospect:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Add prospects to a campaign
 * POST /api/prospects/add-to-campaign
 */
exports.addToCampaign = async (req, res) => {
  try {
    const { prospectIds, campaignId } = req.body;

    if (!prospectIds || !campaignId) {
      return res.status(400).json({ 
        message: 'prospectIds and campaignId are required' 
      });
    }

    const Campaign = require('../models/Campaign');
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    const prospects = await Prospect.find({ 
      _id: { $in: prospectIds },
      'decisionMakers.0': { $exists: true } // Only prospects with contacts
    });

    let addedCount = 0;

    for (const prospect of prospects) {
      // Add decision makers with valid emails as campaign recipients
      for (const dm of prospect.decisionMakers) {
        if (dm.email && ['valid', 'unknown'].includes(dm.emailStatus)) {
          // Check if already in campaign
          const exists = campaign.recipients.some(r => r.email === dm.email);
          if (!exists) {
            campaign.recipients.push({
              email: dm.email,
              name: dm.name,
              company: prospect.companyName,
              website: prospect.url,
              industry: prospect.industry,
              status: 'pending'
            });
            addedCount++;
          }
        }
      }

      // Mark prospect as added to campaign
      if (!prospect.addedToCampaigns.includes(campaignId)) {
        prospect.addedToCampaigns.push(campaignId);
        await prospect.save();
      }
    }

    await campaign.save();

    res.json({
      message: `Added ${addedCount} recipients to campaign`,
      campaign: campaign._id,
      addedCount
    });

  } catch (error) {
    console.error('Error adding prospects to campaign:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get statistics about prospects
 * GET /api/prospects/stats
 */
exports.getProspectStats = async (req, res) => {
  try {
    const [
      total,
      withDomain,
      withEmails,
      byStatus,
      avgScore
    ] = await Promise.all([
      Prospect.countDocuments(),
      Prospect.countDocuments({ domain: { $exists: true, $ne: null } }),
      Prospect.countDocuments({ 'decisionMakers.0': { $exists: true } }),
      Prospect.aggregate([
        { $group: { _id: '$enrichmentStatus', count: { $sum: 1 } } }
      ]),
      Prospect.aggregate([
        { $group: { _id: null, avg: { $avg: '$leadScore' } } }
      ])
    ]);

    const statusCounts = {};
    byStatus.forEach(s => {
      statusCounts[s._id || 'unknown'] = s.count;
    });

    res.json({
      total,
      withDomain,
      withEmails,
      byStatus: statusCounts,
      averageLeadScore: avgScore[0]?.avg || 0
    });

  } catch (error) {
    console.error('Error fetching prospect stats:', error);
    res.status(500).json({ message: error.message });
  }
};
