import express from 'express';
import {
  getSystemConfigs,
  updateSystemConfig,
  createSystemConfig,
  getThemeConfigs,
  createThemeConfig,
  updateThemeConfig,
  setDefaultTheme,
  getEmailTemplates,
  createEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
  getBackupConfigs,
  createBackupConfig,
  updateBackupConfig,
  runBackup,
  getAdminDashboard
} from '../../controllers/adminSettings/adminSettingsController.js';
import { authenticateToken, authorizeRoles } from '../../middlewares/auth.js';

const router = express.Router();

// System Configuration Routes
router.get('/configs', authenticateToken, authorizeRoles(['admin']), getSystemConfigs);
router.post('/configs', authenticateToken, authorizeRoles(['admin']), createSystemConfig);
router.put('/configs/:id', authenticateToken, authorizeRoles(['admin']), updateSystemConfig);

// Theme Configuration Routes
router.get('/themes', authenticateToken, authorizeRoles(['admin']), getThemeConfigs);
router.post('/themes', authenticateToken, authorizeRoles(['admin']), createThemeConfig);
router.put('/themes/:id', authenticateToken, authorizeRoles(['admin']), updateThemeConfig);
router.put('/themes/:id/default', authenticateToken, authorizeRoles(['admin']), setDefaultTheme);

// Email Template Routes
router.get('/email-templates', authenticateToken, authorizeRoles(['admin', 'manager']), getEmailTemplates);
router.post('/email-templates', authenticateToken, authorizeRoles(['admin']), createEmailTemplate);
router.put('/email-templates/:id', authenticateToken, authorizeRoles(['admin']), updateEmailTemplate);
router.delete('/email-templates/:id', authenticateToken, authorizeRoles(['admin']), deleteEmailTemplate);

// Backup Configuration Routes
router.get('/backups', authenticateToken, authorizeRoles(['admin']), getBackupConfigs);
router.post('/backups', authenticateToken, authorizeRoles(['admin']), createBackupConfig);
router.put('/backups/:id', authenticateToken, authorizeRoles(['admin']), updateBackupConfig);
router.post('/backups/:id/run', authenticateToken, authorizeRoles(['admin']), runBackup);

// Dashboard Routes
router.get('/dashboard', authenticateToken, authorizeRoles(['admin']), getAdminDashboard);

export default router;
