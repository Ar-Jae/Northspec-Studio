/**
 * NocoDB Controller
 * 
 * API endpoints for managing NocoDB synchronization and data operations.
 */

const { nocoDBService, NocoDBService } = require('../services/nocoDBService');
const Prospect = require('../models/Prospect');
const Contact = require('../models/Contact');

/**
 * GET /api/nocodb/health
 * Check NocoDB connection status
 */
exports.healthCheck = async (req, res) => {
  try {
    const isHealthy = await nocoDBService.healthCheck();
    
    if (isHealthy) {
      res.json({
        status: 'connected',
        message: 'NocoDB connection is healthy',
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(503).json({
        status: 'disconnected',
        message: 'Failed to connect to NocoDB',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

/**
 * GET /api/nocodb/stats
 * Get NocoDB table statistics
 */
exports.getStats = async (req, res) => {
  try {
    const stats = await nocoDBService.getStats();
    res.json(stats);
  } catch (error) {
    console.error('NocoDB stats error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/nocodb/prospects
 * Get all prospects from NocoDB
 */
exports.getProspects = async (req, res) => {
  try {
    const { limit, offset, sort, where, fields } = req.query;
    
    const options = {};
    if (limit) options.limit = parseInt(limit);
    if (offset) options.offset = parseInt(offset);
    if (sort) options.sort = sort;
    if (where) options.where = where;
    if (fields) options.fields = fields;

    const prospects = await nocoDBService.getProspects(options);
    
    res.json({
      count: prospects.length,
      prospects
    });
  } catch (error) {
    console.error('NocoDB get prospects error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/nocodb/prospects/high-value
 * Get high-value prospects from NocoDB
 */
exports.getHighValueProspects = async (req, res) => {
  try {
    const minScore = parseInt(req.query.minScore) || 50;
    const prospects = await nocoDBService.getHighValueProspects(minScore);
    
    res.json({
      count: prospects.length,
      minScore,
      prospects
    });
  } catch (error) {
    console.error('NocoDB high-value prospects error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/nocodb/prospects/needs-enrichment
 * Get prospects that need enrichment
 */
exports.getProspectsNeedingEnrichment = async (req, res) => {
  try {
    const prospects = await nocoDBService.getProspectsNeedingEnrichment();
    
    res.json({
      count: prospects.length,
      prospects
    });
  } catch (error) {
    console.error('NocoDB needs-enrichment error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/nocodb/sync/prospects
 * Sync all prospects from MongoDB to NocoDB
 */
exports.syncProspectsToNocoDB = async (req, res) => {
  try {
    const prospects = await Prospect.find();
    
    if (prospects.length === 0) {
      return res.json({
        message: 'No prospects to sync',
        synced: 0,
        failed: 0
      });
    }

    const results = await nocoDBService.bulkSyncProspects(prospects);
    
    res.json({
      message: 'Sync completed',
      ...results
    });
  } catch (error) {
    console.error('NocoDB sync error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/nocodb/sync/prospect/:id
 * Sync a single prospect to NocoDB
 */
exports.syncSingleProspect = async (req, res) => {
  try {
    const { id } = req.params;
    const prospect = await Prospect.findById(id);
    
    if (!prospect) {
      return res.status(404).json({ error: 'Prospect not found' });
    }

    const result = await nocoDBService.syncProspectToNocoDB(prospect);
    
    res.json({
      message: result.created ? 'Prospect created in NocoDB' : 'Prospect updated in NocoDB',
      result
    });
  } catch (error) {
    console.error('NocoDB single sync error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/nocodb/sync/contacts
 * Sync all contacts from MongoDB to NocoDB
 */
exports.syncContactsToNocoDB = async (req, res) => {
  try {
    const { contactsTableId } = req.body;
    
    if (!contactsTableId) {
      return res.status(400).json({ error: 'contactsTableId is required' });
    }

    const contacts = await Contact.find();
    
    if (contacts.length === 0) {
      return res.json({
        message: 'No contacts to sync',
        synced: 0,
        failed: 0
      });
    }

    const results = {
      synced: 0,
      failed: 0,
      errors: []
    };

    for (const contact of contacts) {
      try {
        await nocoDBService.syncContactToNocoDB(contact, contactsTableId);
        results.synced++;
      } catch (error) {
        results.failed++;
        results.errors.push({
          contactId: contact._id?.toString(),
          name: contact.name,
          error: error.message
        });
      }
    }
    
    res.json({
      message: 'Sync completed',
      ...results
    });
  } catch (error) {
    console.error('NocoDB contacts sync error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/nocodb/import/prospects
 * Import prospects from NocoDB to MongoDB
 */
exports.importProspectsFromNocoDB = async (req, res) => {
  try {
    const importedProspects = await nocoDBService.importProspectsFromNocoDB();
    
    const results = {
      imported: 0,
      updated: 0,
      failed: 0,
      errors: []
    };

    for (const prospectData of importedProspects) {
      try {
        // Try to find existing by externalId
        let prospect = await Prospect.findOne({ externalId: prospectData.externalId });
        
        if (prospect) {
          // Update existing
          Object.assign(prospect, prospectData);
          await prospect.save();
          results.updated++;
        } else {
          // Check if company already exists
          prospect = await Prospect.findOne({ companyName: prospectData.companyName });
          
          if (prospect) {
            // Update with NocoDB data
            Object.assign(prospect, prospectData);
            await prospect.save();
            results.updated++;
          } else {
            // Create new
            await Prospect.create(prospectData);
            results.imported++;
          }
        }
      } catch (error) {
        results.failed++;
        results.errors.push({
          companyName: prospectData.companyName,
          error: error.message
        });
      }
    }
    
    res.json({
      message: 'Import completed',
      ...results
    });
  } catch (error) {
    console.error('NocoDB import error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/nocodb/records
 * Create records in NocoDB (generic)
 */
exports.createRecords = async (req, res) => {
  try {
    const { tableId, records } = req.body;
    
    if (!records) {
      return res.status(400).json({ error: 'records is required' });
    }

    const result = await nocoDBService.createRecords(records, tableId);
    
    res.status(201).json({
      message: 'Records created',
      result
    });
  } catch (error) {
    console.error('NocoDB create error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * PATCH /api/nocodb/records
 * Update records in NocoDB (generic)
 */
exports.updateRecords = async (req, res) => {
  try {
    const { tableId, records } = req.body;
    
    if (!records) {
      return res.status(400).json({ error: 'records is required' });
    }

    const result = await nocoDBService.updateRecords(records, tableId);
    
    res.json({
      message: 'Records updated',
      result
    });
  } catch (error) {
    console.error('NocoDB update error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * DELETE /api/nocodb/records
 * Delete records from NocoDB (generic)
 */
exports.deleteRecords = async (req, res) => {
  try {
    const { tableId, recordIds } = req.body;
    
    if (!recordIds || !Array.isArray(recordIds)) {
      return res.status(400).json({ error: 'recordIds array is required' });
    }

    const result = await nocoDBService.deleteRecords(recordIds, tableId);
    
    res.json({
      message: 'Records deleted',
      result
    });
  } catch (error) {
    console.error('NocoDB delete error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/nocodb/query
 * Execute a custom query on NocoDB
 */
exports.customQuery = async (req, res) => {
  try {
    const { tableId, where, sort, fields, limit, offset } = req.body;
    
    const result = await nocoDBService.listRecords({
      tableId,
      where,
      sort,
      fields,
      limit,
      offset
    });
    
    res.json(result);
  } catch (error) {
    console.error('NocoDB query error:', error);
    res.status(500).json({ error: error.message });
  }
};
