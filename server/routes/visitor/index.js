import express from 'express';
import visitorController from '../../controllers/visitor/visitorController.js';
import { authenticate, adminOrWatchman } from '../../middlewares/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all visitors
router.get('/', adminOrWatchman, visitorController.getAllVisitors);

// Get visitor by ID
router.get('/:id', adminOrWatchman, visitorController.getVisitorById);

// Create new visitor entry
router.post('/', adminOrWatchman, visitorController.createVisitor);

// Update visitor
router.put('/:id', adminOrWatchman, visitorController.updateVisitor);

// Check out visitor
router.put('/:id/checkout', adminOrWatchman, visitorController.checkOutVisitor);

// Get current visitors (not checked out)
router.get('/status/current', adminOrWatchman, visitorController.getCurrentVisitors);

// Get overdue visitors
router.get('/status/overdue', adminOrWatchman, visitorController.getOverdueVisitors);

// Get visitor statistics
router.get('/stats/summary', adminOrWatchman, visitorController.getVisitorStats);

// Search visitors
router.get('/search/:query', adminOrWatchman, visitorController.searchVisitors);

export default router;
