/**
 * NocoDB Service
 * 
 * A comprehensive service for interacting with NocoDB API v2.
 * Used for syncing prospects and contacts between the Northspec database and NocoDB.
 * 
 * Environment Variables Required:
 *   NOCODB_API_URL - Base URL for NocoDB (e.g., https://app.nocodb.com)
 *   NOCODB_API_TOKEN - API token for authentication
 *   NOCODB_TABLE_ID - Table ID for prospects
 */

const NOCODB_API_URL = process.env.NOCODB_API_URL || 'https://app.nocodb.com';
const NOCODB_API_TOKEN = process.env.NOCODB_API_TOKEN;
const NOCODB_TABLE_ID = process.env.NOCODB_TABLE_ID;

class NocoDBService {
  constructor(options = {}) {
    this.baseUrl = options.apiUrl || NOCODB_API_URL;
    this.token = options.token || NOCODB_API_TOKEN;
    this.tableId = options.tableId || NOCODB_TABLE_ID;
  }

  /**
   * Make an authenticated request to NocoDB API
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      'xc-token': this.token,
      ...options.headers
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`NocoDB API Error: ${response.status} - ${errorText}`);
      }

      // Handle empty responses
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    } catch (error) {
      console.error('NocoDB Request Failed:', error.message);
      throw error;
    }
  }

  // ==========================================
  // RECORD OPERATIONS
  // ==========================================

  /**
   * List records from a table with pagination and filtering
   * @param {Object} options - Query options
   * @param {string} options.tableId - Table ID (optional, uses default)
   * @param {string} options.fields - Comma-separated field names
   * @param {string} options.sort - Sort fields (prefix with - for descending)
   * @param {string} options.where - Filter conditions
   * @param {number} options.limit - Number of records to return
   * @param {number} options.offset - Number of records to skip
   * @param {string} options.viewId - View ID for filtering
   * @returns {Promise<{list: Array, pageInfo: Object}>}
   */
  async listRecords(options = {}) {
    const tableId = options.tableId || this.tableId;
    const params = new URLSearchParams();

    if (options.fields) params.append('fields', options.fields);
    if (options.sort) params.append('sort', options.sort);
    if (options.where) params.append('where', options.where);
    if (options.limit) params.append('limit', options.limit.toString());
    if (options.offset) params.append('offset', options.offset.toString());
    if (options.viewId) params.append('viewId', options.viewId);

    const queryString = params.toString();
    const endpoint = `/api/v2/tables/${tableId}/records${queryString ? `?${queryString}` : ''}`;

    return this.request(endpoint, { method: 'GET' });
  }

  /**
   * Get all records from a table (handles pagination automatically)
   * @param {Object} options - Query options
   * @returns {Promise<Array>} All records
   */
  async getAllRecords(options = {}) {
    const allRecords = [];
    let offset = 0;
    const limit = options.limit || 100;
    let hasMore = true;

    while (hasMore) {
      const response = await this.listRecords({
        ...options,
        limit,
        offset
      });

      allRecords.push(...response.list);

      if (response.pageInfo.isLastPage || response.list.length < limit) {
        hasMore = false;
      } else {
        offset += limit;
      }
    }

    return allRecords;
  }

  /**
   * Get a single record by ID
   * @param {string|number} recordId - Record ID
   * @param {string} tableId - Table ID (optional)
   * @returns {Promise<Object>}
   */
  async getRecord(recordId, tableId = null) {
    const tId = tableId || this.tableId;
    return this.request(`/api/v2/tables/${tId}/records/${recordId}`, {
      method: 'GET'
    });
  }

  /**
   * Create one or more records
   * @param {Object|Array} records - Record(s) to create
   * @param {string} tableId - Table ID (optional)
   * @returns {Promise<Array>} Created record IDs
   */
  async createRecords(records, tableId = null) {
    const tId = tableId || this.tableId;
    const payload = Array.isArray(records) ? records : [records];

    return this.request(`/api/v2/tables/${tId}/records`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  /**
   * Update one or more records
   * @param {Object|Array} records - Record(s) to update (must include Id field)
   * @param {string} tableId - Table ID (optional)
   * @returns {Promise<Array>} Updated record IDs
   */
  async updateRecords(records, tableId = null) {
    const tId = tableId || this.tableId;
    const payload = Array.isArray(records) ? records : [records];

    return this.request(`/api/v2/tables/${tId}/records`, {
      method: 'PATCH',
      body: JSON.stringify(payload)
    });
  }

  /**
   * Delete one or more records
   * @param {Array<number>} recordIds - Array of record IDs to delete
   * @param {string} tableId - Table ID (optional)
   * @returns {Promise<Object>}
   */
  async deleteRecords(recordIds, tableId = null) {
    const tId = tableId || this.tableId;
    const payload = recordIds.map(id => ({ Id: id }));

    return this.request(`/api/v2/tables/${tId}/records`, {
      method: 'DELETE',
      body: JSON.stringify(payload)
    });
  }

  /**
   * Find a record by a specific field value
   * @param {string} field - Field name
   * @param {string} value - Value to search for
   * @param {string} tableId - Table ID (optional)
   * @returns {Promise<Object|null>} Found record or null
   */
  async findRecordByField(field, value, tableId = null) {
    const response = await this.listRecords({
      tableId: tableId || this.tableId,
      where: `(${field},eq,${value})`,
      limit: 1
    });

    return response.list.length > 0 ? response.list[0] : null;
  }

  /**
   * Upsert a record (create if not exists, update if exists)
   * @param {string} lookupField - Field to use for lookup
   * @param {string} lookupValue - Value to search for
   * @param {Object} data - Record data
   * @param {string} tableId - Table ID (optional)
   * @returns {Promise<Object>} Created or updated record
   */
  async upsertRecord(lookupField, lookupValue, data, tableId = null) {
    const existing = await this.findRecordByField(lookupField, lookupValue, tableId);

    if (existing) {
      // Update existing record
      const updateData = { Id: existing.Id, ...data };
      await this.updateRecords(updateData, tableId);
      return { ...existing, ...data, updated: true };
    } else {
      // Create new record
      const result = await this.createRecords(data, tableId);
      return { Id: result[0]?.Id, ...data, created: true };
    }
  }

  // ==========================================
  // PROSPECT-SPECIFIC OPERATIONS
  // ==========================================

  /**
   * Sync a prospect from MongoDB to NocoDB
   * @param {Object} prospect - Prospect document from MongoDB
   * @returns {Promise<Object>}
   */
  async syncProspectToNocoDB(prospect) {
    const nocoData = {
      CompanyName: prospect.companyName,
      Domain: prospect.domain,
      Location: prospect.location,
      URL: prospect.url,
      LeadScore: prospect.leadScore,
      EnrichmentStatus: prospect.enrichmentStatus,
      DecisionMakerCount: prospect.decisionMakers?.length || 0,
      HasEmails: prospect.companyEmails?.length > 0 || prospect.decisionMakers?.some(dm => dm.email),
      MongoDBId: prospect._id?.toString(),
      Source: prospect.source || 'manual'
      // Note: CreatedAt and UpdatedAt are auto-generated by NocoDB
    };

    // Include decision maker emails as a comma-separated list
    if (prospect.decisionMakers?.length > 0) {
      nocoData.DecisionMakerEmails = prospect.decisionMakers
        .map(dm => dm.email)
        .filter(Boolean)
        .join(', ');
      
      nocoData.DecisionMakerNames = prospect.decisionMakers
        .map(dm => dm.name)
        .filter(Boolean)
        .join(', ');
    }

    // Include company emails
    if (prospect.companyEmails?.length > 0) {
      nocoData.CompanyEmails = prospect.companyEmails.join(', ');
    }

    return this.upsertRecord('MongoDBId', prospect._id?.toString(), nocoData);
  }

  /**
   * Sync a contact from MongoDB to NocoDB
   * @param {Object} contact - Contact document from MongoDB
   * @param {string} contactsTableId - Table ID for contacts
   * @returns {Promise<Object>}
   */
  async syncContactToNocoDB(contact, contactsTableId) {
    const nocoData = {
      Name: contact.name,
      Email: contact.email,
      Phone: contact.phone,
      Company: contact.company,
      ProjectType: contact.projectType,
      ProjectDescription: contact.projectDescription,
      Budget: contact.budget,
      BudgetApproved: contact.budgetApproved,
      Timeline: contact.timeline,
      AutomationInterest: contact.automationInterest,
      DecisionMaker: contact.decisionMaker,
      Status: contact.status,
      IsRejected: contact.isRejected,
      MongoDBId: contact._id?.toString(),
      CreatedAt: contact.createdAt?.toISOString()
    };

    return this.upsertRecord('MongoDBId', contact._id?.toString(), nocoData, contactsTableId);
  }

  /**
   * Get all prospects from NocoDB
   * @param {Object} options - Query options
   * @returns {Promise<Array>}
   */
  async getProspects(options = {}) {
    return this.getAllRecords({
      ...options,
      sort: options.sort || '-CreatedAt'
    });
  }

  /**
   * Get prospects with high lead scores
   * @param {number} minScore - Minimum lead score (default: 50)
   * @returns {Promise<Array>}
   */
  async getHighValueProspects(minScore = 50) {
    return this.getAllRecords({
      where: `(LeadScore,ge,${minScore})`,
      sort: '-LeadScore'
    });
  }

  /**
   * Get prospects by enrichment status
   * @param {string} status - Enrichment status
   * @returns {Promise<Array>}
   */
  async getProspectsByStatus(status) {
    return this.getAllRecords({
      where: `(EnrichmentStatus,eq,${status})`
    });
  }

  /**
   * Get prospects that need enrichment
   * @returns {Promise<Array>}
   */
  async getProspectsNeedingEnrichment() {
    return this.getAllRecords({
      where: '(EnrichmentStatus,eq,pending)~or(EnrichmentStatus,eq,domain_not_found)'
    });
  }

  // ==========================================
  // BULK OPERATIONS
  // ==========================================

  /**
   * Bulk sync prospects from MongoDB to NocoDB
   * @param {Array} prospects - Array of prospect documents
   * @returns {Promise<{synced: number, failed: number, errors: Array}>}
   */
  async bulkSyncProspects(prospects) {
    const results = {
      synced: 0,
      failed: 0,
      errors: []
    };

    // Process in batches of 10
    const batchSize = 10;
    for (let i = 0; i < prospects.length; i += batchSize) {
      const batch = prospects.slice(i, i + batchSize);
      
      await Promise.all(
        batch.map(async (prospect) => {
          try {
            await this.syncProspectToNocoDB(prospect);
            results.synced++;
          } catch (error) {
            results.failed++;
            results.errors.push({
              prospectId: prospect._id?.toString(),
              companyName: prospect.companyName,
              error: error.message
            });
          }
        })
      );
    }

    return results;
  }

  /**
   * Import prospects from NocoDB to MongoDB format
   * @returns {Promise<Array>} Array of prospects in MongoDB format
   */
  async importProspectsFromNocoDB() {
    const nocoRecords = await this.getAllRecords();

    return nocoRecords.map(record => ({
      externalId: record.Id?.toString(),
      companyName: record.CompanyName,
      domain: record.Domain,
      location: record.Location,
      url: record.URL,
      leadScore: record.LeadScore || 0,
      enrichmentStatus: record.EnrichmentStatus || 'pending',
      source: 'nocodb',
      decisionMakers: record.DecisionMakerEmails?.split(', ').map((email, idx) => ({
        email: email.trim(),
        name: record.DecisionMakerNames?.split(', ')[idx]?.trim() || 'Unknown'
      })) || [],
      companyEmails: record.CompanyEmails?.split(', ').map(e => e.trim()).filter(Boolean) || []
    }));
  }

  // ==========================================
  // UTILITY METHODS
  // ==========================================

  /**
   * Count records matching a condition
   * @param {string} where - Filter condition
   * @param {string} tableId - Table ID (optional)
   * @returns {Promise<number>}
   */
  async countRecords(where = null, tableId = null) {
    const response = await this.listRecords({
      tableId: tableId || this.tableId,
      where,
      limit: 1
    });

    return response.pageInfo.totalRows;
  }

  /**
   * Get table statistics
   * @returns {Promise<Object>}
   */
  async getStats() {
    const [total, pending, enriched, highValue] = await Promise.all([
      this.countRecords(),
      this.countRecords('(EnrichmentStatus,eq,pending)'),
      this.countRecords('(EnrichmentStatus,eq,emails_found)~or(EnrichmentStatus,eq,completed)'),
      this.countRecords('(LeadScore,ge,50)')
    ]);

    return {
      total,
      pending,
      enriched,
      highValue,
      enrichmentRate: total > 0 ? ((enriched / total) * 100).toFixed(1) : 0
    };
  }

  /**
   * Health check for NocoDB connection
   * @returns {Promise<boolean>}
   */
  async healthCheck() {
    try {
      await this.listRecords({ limit: 1 });
      return true;
    } catch (error) {
      console.error('NocoDB health check failed:', error.message);
      return false;
    }
  }
}

// Export singleton instance and class
const nocoDBService = new NocoDBService();

module.exports = {
  NocoDBService,
  nocoDBService,
  
  // Convenience methods for direct use
  listRecords: (options) => nocoDBService.listRecords(options),
  createRecords: (records, tableId) => nocoDBService.createRecords(records, tableId),
  updateRecords: (records, tableId) => nocoDBService.updateRecords(records, tableId),
  deleteRecords: (recordIds, tableId) => nocoDBService.deleteRecords(recordIds, tableId),
  syncProspectToNocoDB: (prospect) => nocoDBService.syncProspectToNocoDB(prospect),
  getProspects: (options) => nocoDBService.getProspects(options),
  getStats: () => nocoDBService.getStats()
};
