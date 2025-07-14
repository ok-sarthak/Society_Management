import express from 'express';
import {
  getReportTemplates,
  createReportTemplate,
  updateReportTemplate,
  deleteReportTemplate,
  getReports,
  generateReport,
  getReportById,
  shareReport,
  downloadReport,
  deleteReport,
  getReportsDashboard
} from '../../controllers/reports/reportsController.js';
import { authenticateToken, authorizeRoles } from '../../middlewares/auth.js';

const router = express.Router();

// Report Template Routes
router.get('/templates', authenticateToken, authorizeRoles(['admin', 'manager']), getReportTemplates);
router.post('/templates', authenticateToken, authorizeRoles(['admin']), createReportTemplate);
router.put('/templates/:id', authenticateToken, authorizeRoles(['admin']), updateReportTemplate);
router.delete('/templates/:id', authenticateToken, authorizeRoles(['admin']), deleteReportTemplate);

// Report Instance Routes
router.get('/reports', authenticateToken, getReports);
router.post('/templates/:templateId/generate', authenticateToken, generateReport);
router.get('/reports/:id', authenticateToken, getReportById);
router.post('/reports/:id/share', authenticateToken, shareReport);
router.get('/reports/:id/download', authenticateToken, downloadReport);
router.delete('/reports/:id', authenticateToken, authorizeRoles(['admin', 'manager']), deleteReport);

// Dashboard Routes
router.get('/dashboard', authenticateToken, authorizeRoles(['admin', 'manager']), getReportsDashboard);

export default router;
