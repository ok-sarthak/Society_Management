import express from 'express';
import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getFinancialSummary,
  getMonthlyReport,
  getExpenseAnalytics,
  getIncomeAnalytics,
  bulkCreateTransactions,
  getTransactionsByBuilding,
  getPendingTransactions,
  updateTransactionStatus
} from '../../controllers/accounts/accountsController.js';
import { protect, authorize } from '../../middlewares/auth.js';

const router = express.Router();

// Apply authentication to all routes
router.use(protect);

// GET /api/accounts/transactions - Get all transactions
router.get('/transactions', authorize('admin'), getAllTransactions);

// GET /api/accounts/transactions/pending - Get pending transactions
router.get('/transactions/pending', authorize('admin'), getPendingTransactions);

// GET /api/accounts/transactions/building/:buildingNumber - Get transactions by building
router.get('/transactions/building/:buildingNumber', authorize('admin'), getTransactionsByBuilding);

// GET /api/accounts/transactions/:id - Get transaction by ID
router.get('/transactions/:id', authorize('admin'), getTransactionById);

// POST /api/accounts/transactions - Create new transaction
router.post('/transactions', authorize('admin'), createTransaction);

// POST /api/accounts/transactions/bulk - Bulk create transactions
router.post('/transactions/bulk', authorize('admin'), bulkCreateTransactions);

// PUT /api/accounts/transactions/:id - Update transaction
router.put('/transactions/:id', authorize('admin'), updateTransaction);

// PATCH /api/accounts/transactions/:id/status - Update transaction status
router.patch('/transactions/:id/status', authorize('admin'), updateTransactionStatus);

// DELETE /api/accounts/transactions/:id - Delete transaction
router.delete('/transactions/:id', authorize('admin'), deleteTransaction);

// GET /api/accounts/summary - Get financial summary
router.get('/summary', authorize('admin'), getFinancialSummary);

// GET /api/accounts/reports/monthly - Get monthly report
router.get('/reports/monthly', authorize('admin'), getMonthlyReport);

// GET /api/accounts/analytics/expenses - Get expense analytics
router.get('/analytics/expenses', authorize('admin'), getExpenseAnalytics);

// GET /api/accounts/analytics/income - Get income analytics
router.get('/analytics/income', authorize('admin'), getIncomeAnalytics);

export default router;
