import Transaction from '../../models/Accounts.js';
import logger from '../../utils/logger.js';

// Get all transactions
export const getAllTransactions = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 100,
      type,
      category,
      startDate,
      endDate,
      memberId,
      buildingNumber
    } = req.query;

    const filter = {};
    
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (memberId) filter.memberId = memberId;
    if (buildingNumber) filter.buildingNumber = buildingNumber;
    
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const transactions = await Transaction.find(filter)
      .populate('memberId', 'name email phoneNumber buildingNumber blockNumber flatNumber')
      .populate('createdBy', 'name email')
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Transaction.countDocuments(filter);

    // Calculate comprehensive totals
    const allTransactions = await Transaction.find({});
    
    let totalIncome = 0;
    let totalExpense = 0;
    let thisMonthIncome = 0;
    let thisMonthExpense = 0;
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    allTransactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      const amount = transaction.amount;
      
      if (transaction.type === 'income') {
        totalIncome += amount;
        if (transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear) {
          thisMonthIncome += amount;
        }
      } else {
        totalExpense += amount;
        if (transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear) {
          thisMonthExpense += amount;
        }
      }
    });

    const balance = totalIncome - totalExpense;

    res.status(200).json({
      success: true,
      data: {
        transactions,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalRecords: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        },
        summary: {
          totalIncome,
          totalExpense,
          balance,
          thisMonthIncome,
          thisMonthExpense
        }
      }
    });
  } catch (error) {
    logger.error('Error fetching transactions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transactions',
      error: error.message
    });
  }
};

// Get transaction by ID
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('memberId', 'name email phoneNumber buildingNumber blockNumber flatNumber')
      .populate('createdBy', 'name email');

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { transaction }
    });
  } catch (error) {
    logger.error('Error fetching transaction:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transaction',
      error: error.message
    });
  }
};

// Create new transaction
export const createTransaction = async (req, res) => {
  try {
    const transactionData = {
      ...req.body,
      createdBy: req.user.id
    };

    const transaction = new Transaction(transactionData);
    await transaction.save();

    await transaction.populate('memberId', 'name email phoneNumber buildingNumber blockNumber flatNumber');
    await transaction.populate('createdBy', 'name email');

    logger.info(`Transaction created: ${transaction.transactionId} by user ${req.user.id}`);

    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: { transaction }
    });
  } catch (error) {
    logger.error('Error creating transaction:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create transaction',
      error: error.message
    });
  }
};

// Update transaction
export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    )
      .populate('memberId', 'name email phoneNumber buildingNumber blockNumber flatNumber')
      .populate('createdBy', 'name email');

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    logger.info(`Transaction updated: ${transaction.transactionId} by user ${req.user.id}`);

    res.status(200).json({
      success: true,
      message: 'Transaction updated successfully',
      data: { transaction }
    });
  } catch (error) {
    logger.error('Error updating transaction:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update transaction',
      error: error.message
    });
  }
};

// Delete transaction
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    logger.info(`Transaction deleted: ${transaction.transactionId} by user ${req.user.id}`);

    res.status(200).json({
      success: true,
      message: 'Transaction deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting transaction:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete transaction',
      error: error.message
    });
  }
};

// Get financial summary
export const getFinancialSummary = async (req, res) => {
  try {
    const { period = 'monthly', year = new Date().getFullYear() } = req.query;
    
    let groupBy;
    if (period === 'monthly') {
      groupBy = { year: { $year: '$date' }, month: { $month: '$date' } };
    } else if (period === 'yearly') {
      groupBy = { year: { $year: '$date' } };
    } else {
      groupBy = { 
        year: { $year: '$date' }, 
        month: { $month: '$date' }, 
        day: { $dayOfMonth: '$date' } 
      };
    }

    const summary = await Transaction.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: {
            ...groupBy,
            type: '$type'
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: {
            year: '$_id.year',
            month: '$_id.month',
            day: '$_id.day'
          },
          income: {
            $sum: {
              $cond: [{ $eq: ['$_id.type', 'income'] }, '$total', 0]
            }
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ['$_id.type', 'expense'] }, '$total', 0]
            }
          },
          totalTransactions: { $sum: '$count' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: { summary }
    });
  } catch (error) {
    logger.error('Error generating financial summary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate financial summary',
      error: error.message
    });
  }
};

// Get monthly financial report
export const getMonthlyReport = async (req, res) => {
  try {
    const { month = new Date().getMonth() + 1, year = new Date().getFullYear() } = req.query;
    
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    
    const transactions = await Transaction.find({
      date: { $gte: startDate, $lte: endDate }
    }).populate('memberId', 'name buildingNumber blockNumber flatNumber');
    
    const income = transactions.filter(t => t.type === 'income');
    const expenses = transactions.filter(t => t.type === 'expense');
    
    const incomeByCategory = income.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
    
    const expensesByCategory = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
    
    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
    
    res.status(200).json({
      success: true,
      data: {
        period: { month, year },
        summary: {
          totalIncome,
          totalExpenses,
          netBalance: totalIncome - totalExpenses,
          transactionCount: transactions.length
        },
        breakdown: {
          incomeByCategory,
          expensesByCategory
        },
        transactions
      }
    });
  } catch (error) {
    logger.error('Error generating monthly report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate monthly report',
      error: error.message
    });
  }
};

// Get expense analytics
export const getExpenseAnalytics = async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let matchStage = {};
    if (period === 'month') {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      matchStage.date = { $gte: startOfMonth };
    } else if (period === 'year') {
      const startOfYear = new Date();
      startOfYear.setMonth(0, 1);
      startOfYear.setHours(0, 0, 0, 0);
      matchStage.date = { $gte: startOfYear };
    }
    
    const analytics = await Transaction.aggregate([
      { $match: { type: 'expense', ...matchStage } },
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 },
          avgAmount: { $avg: '$amount' }
        }
      },
      { $sort: { totalAmount: -1 } }
    ]);
    
    const totalExpenses = analytics.reduce((sum, item) => sum + item.totalAmount, 0);
    
    const analyticsWithPercentage = analytics.map(item => ({
      ...item,
      percentage: ((item.totalAmount / totalExpenses) * 100).toFixed(2)
    }));
    
    res.status(200).json({
      success: true,
      data: {
        analytics: analyticsWithPercentage,
        totalExpenses,
        period
      }
    });
  } catch (error) {
    logger.error('Error generating expense analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate expense analytics',
      error: error.message
    });
  }
};

// Get income analytics
export const getIncomeAnalytics = async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let matchStage = {};
    if (period === 'month') {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      matchStage.date = { $gte: startOfMonth };
    } else if (period === 'year') {
      const startOfYear = new Date();
      startOfYear.setMonth(0, 1);
      startOfYear.setHours(0, 0, 0, 0);
      matchStage.date = { $gte: startOfYear };
    }
    
    const analytics = await Transaction.aggregate([
      { $match: { type: 'income', ...matchStage } },
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 },
          avgAmount: { $avg: '$amount' }
        }
      },
      { $sort: { totalAmount: -1 } }
    ]);
    
    const totalIncome = analytics.reduce((sum, item) => sum + item.totalAmount, 0);
    
    const analyticsWithPercentage = analytics.map(item => ({
      ...item,
      percentage: ((item.totalAmount / totalIncome) * 100).toFixed(2)
    }));
    
    res.status(200).json({
      success: true,
      data: {
        analytics: analyticsWithPercentage,
        totalIncome,
        period
      }
    });
  } catch (error) {
    logger.error('Error generating income analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate income analytics',
      error: error.message
    });
  }
};

// Bulk create transactions
export const bulkCreateTransactions = async (req, res) => {
  try {
    const { transactions } = req.body;
    
    if (!Array.isArray(transactions) || transactions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of transactions'
      });
    }
    
    const transactionsWithMeta = transactions.map(transaction => ({
      ...transaction,
      createdBy: req.user.id
    }));
    
    const createdTransactions = await Transaction.insertMany(transactionsWithMeta);
    
    logger.info(`Bulk created ${createdTransactions.length} transactions by user ${req.user.id}`);
    
    res.status(201).json({
      success: true,
      message: `Successfully created ${createdTransactions.length} transactions`,
      data: { transactions: createdTransactions }
    });
  } catch (error) {
    logger.error('Error bulk creating transactions:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to bulk create transactions',
      error: error.message
    });
  }
};

// Get transactions by building
export const getTransactionsByBuilding = async (req, res) => {
  try {
    const { buildingNumber } = req.params;
    
    const transactions = await Transaction.find({ buildingNumber })
      .populate('memberId', 'name email phoneNumber buildingNumber blockNumber flatNumber')
      .sort({ date: -1 });
    
    const summary = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'income') {
        acc.totalIncome += transaction.amount;
      } else {
        acc.totalExpense += transaction.amount;
      }
      return acc;
    }, { totalIncome: 0, totalExpense: 0 });
    
    summary.balance = summary.totalIncome - summary.totalExpense;
    
    res.status(200).json({
      success: true,
      data: {
        transactions,
        summary,
        buildingNumber
      }
    });
  } catch (error) {
    logger.error('Error fetching transactions by building:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transactions by building',
      error: error.message
    });
  }
};

// Get pending transactions
export const getPendingTransactions = async (req, res) => {
  try {
    const pendingTransactions = await Transaction.find({ status: 'pending' })
      .populate('memberId', 'name email phoneNumber buildingNumber blockNumber flatNumber')
      .populate('createdBy', 'name email')
      .sort({ date: -1 });
    
    res.status(200).json({
      success: true,
      data: { transactions: pendingTransactions }
    });
  } catch (error) {
    logger.error('Error fetching pending transactions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pending transactions',
      error: error.message
    });
  }
};

// Update transaction status
export const updateTransactionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;
    
    if (!['pending', 'completed', 'failed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be pending, completed, or failed'
      });
    }
    
    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { status, remarks, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).populate('memberId', 'name email phoneNumber buildingNumber blockNumber flatNumber');
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
    
    logger.info(`Transaction status updated: ${transaction.transactionId} to ${status} by user ${req.user.id}`);
    
    res.status(200).json({
      success: true,
      message: 'Transaction status updated successfully',
      data: { transaction }
    });
  } catch (error) {
    logger.error('Error updating transaction status:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update transaction status',
      error: error.message
    });
  }
};
