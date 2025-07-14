import express from 'express';
import maintenanceRequestController from '../../controllers/maintenance/maintenanceRequestController.js';
import { authenticate, adminOrWatchman } from '../../middlewares/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all maintenance requests
router.get('/requests', adminOrWatchman, maintenanceRequestController.getAllRequests);

// Get maintenance request by ID
router.get('/requests/:id', adminOrWatchman, maintenanceRequestController.getRequestById);

// Create new maintenance request
router.post('/requests', adminOrWatchman, maintenanceRequestController.createRequest);

// Update maintenance request
router.put('/requests/:id', adminOrWatchman, maintenanceRequestController.updateRequest);

// Delete maintenance request
router.delete('/requests/:id', adminOrWatchman, maintenanceRequestController.deleteRequest);

// Get maintenance requests by status
router.get('/requests/status/:status', adminOrWatchman, maintenanceRequestController.getRequestsByStatus);

// Get maintenance requests by priority
router.get('/requests/priority/:priority', adminOrWatchman, maintenanceRequestController.getRequestsByPriority);

// Get maintenance requests statistics
router.get('/requests/stats', adminOrWatchman, maintenanceRequestController.getRequestsStats);

export default router;
