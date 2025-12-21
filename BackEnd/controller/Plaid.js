const plaidClient = require('../services/plaidService');
const PlaidItem = require('../models/PlaidItem');
const { Products, CountryCode } = require('plaid');

/**
 * POST /api/plaid/create-link-token
 * Create a link token to initialize Plaid Link
 */
exports.createLinkToken = async (req, res) => {
  try {
    const request = {
      user: {
        client_user_id: req.body.userId || 'default-user',
      },
      client_name: 'Northspec Studio',
      products: [Products.Auth, Products.Transactions],
      country_codes: [CountryCode.Us],
      language: 'en',
      // For update mode (re-linking)
      ...(req.body.accessToken && { access_token: req.body.accessToken }),
    };

    const response = await plaidClient.linkTokenCreate(request);
    res.json({ link_token: response.data.link_token });
  } catch (error) {
    console.error('Create link token error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to create link token',
      details: error.response?.data?.error_message || error.message 
    });
  }
};

/**
 * POST /api/plaid/exchange-token
 * Exchange public token for access token after successful Plaid Link
 */
exports.exchangeToken = async (req, res) => {
  try {
    const { public_token, metadata } = req.body;

    // Exchange public token for access token
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token: public_token,
    });

    const accessToken = exchangeResponse.data.access_token;
    const itemId = exchangeResponse.data.item_id;

    // Get account information
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    // Get institution details
    let institutionInfo = {};
    if (metadata?.institution?.institution_id) {
      try {
        const instResponse = await plaidClient.institutionsGetById({
          institution_id: metadata.institution.institution_id,
          country_codes: [CountryCode.Us],
          options: { include_optional_metadata: true },
        });
        institutionInfo = {
          institutionId: instResponse.data.institution.institution_id,
          institutionName: instResponse.data.institution.name,
          institutionLogo: instResponse.data.institution.logo,
          institutionColor: instResponse.data.institution.primary_color,
        };
      } catch (instError) {
        console.log('Could not fetch institution details:', instError.message);
        institutionInfo = {
          institutionId: metadata.institution.institution_id,
          institutionName: metadata.institution.name,
        };
      }
    }

    // Format accounts data
    const accounts = accountsResponse.data.accounts.map(acc => ({
      accountId: acc.account_id,
      name: acc.name,
      officialName: acc.official_name,
      type: acc.type,
      subtype: acc.subtype,
      mask: acc.mask,
      currentBalance: acc.balances.current,
      availableBalance: acc.balances.available,
      limit: acc.balances.limit,
      currency: acc.balances.iso_currency_code || 'USD',
      lastUpdated: new Date(),
    }));

    // Save to database
    const plaidItem = await PlaidItem.findOneAndUpdate(
      { itemId: itemId },
      {
        itemId,
        accessToken,
        ...institutionInfo,
        accounts,
        status: 'active',
        lastSyncedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: 'Account linked successfully',
      item: {
        id: plaidItem._id,
        institutionName: plaidItem.institutionName,
        accountCount: plaidItem.accounts.length,
      },
    });
  } catch (error) {
    console.error('Exchange token error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to link account',
      details: error.response?.data?.error_message || error.message 
    });
  }
};

/**
 * GET /api/plaid/accounts
 * Get all linked accounts with current balances
 */
exports.getAccounts = async (req, res) => {
  try {
    const plaidItems = await PlaidItem.find({ status: { $ne: 'disconnected' } });
    
    // Refresh balances for each item
    const accountsWithBalances = [];
    
    for (const item of plaidItems) {
      try {
        const balanceResponse = await plaidClient.accountsBalanceGet({
          access_token: item.accessToken,
        });

        // Update accounts with fresh balances
        const updatedAccounts = balanceResponse.data.accounts.map(acc => ({
          accountId: acc.account_id,
          name: acc.name,
          officialName: acc.official_name,
          type: acc.type,
          subtype: acc.subtype,
          mask: acc.mask,
          currentBalance: acc.balances.current,
          availableBalance: acc.balances.available,
          limit: acc.balances.limit,
          currency: acc.balances.iso_currency_code || 'USD',
          lastUpdated: new Date(),
          // Include institution info
          institutionName: item.institutionName,
          institutionLogo: item.institutionLogo,
          institutionColor: item.institutionColor,
          itemId: item._id,
        }));

        accountsWithBalances.push(...updatedAccounts);

        // Update stored balances
        item.accounts = updatedAccounts.map(({ institutionName, institutionLogo, institutionColor, itemId, ...acc }) => acc);
        item.lastSyncedAt = new Date();
        await item.save();
      } catch (itemError) {
        console.error(`Error fetching balances for item ${item.itemId}:`, itemError.message);
        // Still include cached accounts but mark as stale
        const cachedAccounts = item.accounts.map(acc => ({
          ...acc.toObject(),
          institutionName: item.institutionName,
          institutionLogo: item.institutionLogo,
          institutionColor: item.institutionColor,
          itemId: item._id,
          stale: true,
        }));
        accountsWithBalances.push(...cachedAccounts);
      }
    }

    // Calculate totals
    const totals = {
      checking: 0,
      savings: 0,
      credit: 0,
      investment: 0,
      other: 0,
      total: 0,
    };

    accountsWithBalances.forEach(acc => {
      const balance = acc.currentBalance || 0;
      if (acc.subtype === 'checking') totals.checking += balance;
      else if (acc.subtype === 'savings') totals.savings += balance;
      else if (acc.type === 'credit') totals.credit += balance;
      else if (acc.type === 'investment') totals.investment += balance;
      else totals.other += balance;
      
      // For total, subtract credit (it's debt)
      if (acc.type === 'credit') {
        totals.total -= balance;
      } else {
        totals.total += balance;
      }
    });

    res.json({
      accounts: accountsWithBalances,
      totals,
      lastUpdated: new Date(),
    });
  } catch (error) {
    console.error('Get accounts error:', error.message);
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
};

/**
 * GET /api/plaid/transactions
 * Get recent transactions from all linked accounts
 */
exports.getTransactions = async (req, res) => {
  try {
    const { startDate, endDate, accountId } = req.query;
    
    // Default to last 30 days
    const end = endDate || new Date().toISOString().split('T')[0];
    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const plaidItems = await PlaidItem.find({ status: 'active' });
    let allTransactions = [];

    for (const item of plaidItems) {
      try {
        const request = {
          access_token: item.accessToken,
          start_date: start,
          end_date: end,
          options: {
            count: 100,
            offset: 0,
          },
        };

        // Filter by specific account if provided
        if (accountId) {
          request.options.account_ids = [accountId];
        }

        const response = await plaidClient.transactionsGet(request);
        
        const transactions = response.data.transactions.map(txn => ({
          id: txn.transaction_id,
          accountId: txn.account_id,
          amount: txn.amount,
          date: txn.date,
          name: txn.name,
          merchantName: txn.merchant_name,
          category: txn.category,
          pending: txn.pending,
          paymentChannel: txn.payment_channel,
          logoUrl: txn.logo_url,
          institutionName: item.institutionName,
        }));

        allTransactions.push(...transactions);
      } catch (itemError) {
        console.error(`Error fetching transactions for item ${item.itemId}:`, itemError.message);
      }
    }

    // Sort by date descending
    allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Calculate summary
    const summary = {
      totalIncome: 0,
      totalExpenses: 0,
      transactionCount: allTransactions.length,
    };

    allTransactions.forEach(txn => {
      if (txn.amount < 0) {
        summary.totalIncome += Math.abs(txn.amount);
      } else {
        summary.totalExpenses += txn.amount;
      }
    });

    res.json({
      transactions: allTransactions,
      summary,
      dateRange: { start, end },
    });
  } catch (error) {
    console.error('Get transactions error:', error.message);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

/**
 * GET /api/plaid/items
 * Get all linked Plaid items (institutions)
 */
exports.getItems = async (req, res) => {
  try {
    const items = await PlaidItem.find().select('-accessToken');
    res.json(items);
  } catch (error) {
    console.error('Get items error:', error.message);
    res.status(500).json({ error: 'Failed to fetch linked institutions' });
  }
};

/**
 * DELETE /api/plaid/items/:id
 * Unlink a bank account
 */
exports.unlinkItem = async (req, res) => {
  try {
    const item = await PlaidItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Remove from Plaid
    try {
      await plaidClient.itemRemove({
        access_token: item.accessToken,
      });
    } catch (plaidError) {
      console.log('Plaid item remove error (may already be removed):', plaidError.message);
    }

    // Remove from database
    await PlaidItem.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Account unlinked successfully' });
  } catch (error) {
    console.error('Unlink item error:', error.message);
    res.status(500).json({ error: 'Failed to unlink account' });
  }
};

/**
 * POST /api/plaid/sync
 * Force sync all accounts
 */
exports.syncAccounts = async (req, res) => {
  try {
    const plaidItems = await PlaidItem.find({ status: 'active' });
    const results = [];

    for (const item of plaidItems) {
      try {
        const balanceResponse = await plaidClient.accountsBalanceGet({
          access_token: item.accessToken,
        });

        item.accounts = balanceResponse.data.accounts.map(acc => ({
          accountId: acc.account_id,
          name: acc.name,
          officialName: acc.official_name,
          type: acc.type,
          subtype: acc.subtype,
          mask: acc.mask,
          currentBalance: acc.balances.current,
          availableBalance: acc.balances.available,
          limit: acc.balances.limit,
          currency: acc.balances.iso_currency_code || 'USD',
          lastUpdated: new Date(),
        }));
        item.lastSyncedAt = new Date();
        item.status = 'active';
        await item.save();

        results.push({
          institutionName: item.institutionName,
          status: 'synced',
          accountCount: item.accounts.length,
        });
      } catch (itemError) {
        const errorCode = itemError.response?.data?.error_code;
        item.status = 'error';
        item.errorCode = errorCode;
        item.errorMessage = itemError.response?.data?.error_message || itemError.message;
        await item.save();

        results.push({
          institutionName: item.institutionName,
          status: 'error',
          error: item.errorMessage,
        });
      }
    }

    res.json({
      success: true,
      message: 'Sync complete',
      results,
    });
  } catch (error) {
    console.error('Sync accounts error:', error.message);
    res.status(500).json({ error: 'Failed to sync accounts' });
  }
};

/**
 * GET /api/plaid/spending-insights
 * Get spending insights and categorization
 */
exports.getSpendingInsights = async (req, res) => {
  try {
    const plaidItems = await PlaidItem.find({ status: 'active' });
    
    // Get last 30 days of transactions
    const end = new Date().toISOString().split('T')[0];
    const start = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const categoryTotals = {};
    let totalSpending = 0;
    let totalIncome = 0;

    for (const item of plaidItems) {
      try {
        const response = await plaidClient.transactionsGet({
          access_token: item.accessToken,
          start_date: start,
          end_date: end,
          options: { count: 500 },
        });

        response.data.transactions.forEach(txn => {
          if (txn.amount > 0) {
            // Expense
            totalSpending += txn.amount;
            const category = txn.category?.[0] || 'Other';
            categoryTotals[category] = (categoryTotals[category] || 0) + txn.amount;
          } else {
            // Income
            totalIncome += Math.abs(txn.amount);
          }
        });
      } catch (itemError) {
        console.error(`Error fetching transactions for insights:`, itemError.message);
      }
    }

    // Convert to array and sort
    const categories = Object.entries(categoryTotals)
      .map(([name, amount]) => ({
        name,
        amount,
        percentage: totalSpending > 0 ? Math.round((amount / totalSpending) * 100) : 0,
      }))
      .sort((a, b) => b.amount - a.amount);

    res.json({
      period: { start, end },
      totalSpending,
      totalIncome,
      netCashFlow: totalIncome - totalSpending,
      categories,
    });
  } catch (error) {
    console.error('Get spending insights error:', error.message);
    res.status(500).json({ error: 'Failed to fetch spending insights' });
  }
};
