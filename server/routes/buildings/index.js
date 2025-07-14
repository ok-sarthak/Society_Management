import express from 'express';
import {
  getAllBuildings,
  getBuildingById,
  createBuilding,
  updateBuilding,
  deleteBuilding,
  updateMaintenanceSchedule,
  getBuildingStatistics
} from '../../controllers/building/buildingController.js';
import { protect, authorize } from '../../middlewares/auth.js';

const router = express.Router();

// Apply authentication to all routes
router.use(protect);

// GET /api/buildings - Get all buildings
router.get('/', authorize(['admin', 'watchman']), getAllBuildings);

// GET /api/buildings/statistics - Get building statistics
router.get('/statistics', authorize(['admin']), getBuildingStatistics);

// GET /api/buildings/:id - Get building by ID
router.get('/:id', authorize(['admin', 'watchman']), getBuildingById);

// POST /api/buildings - Create new building
router.post('/', authorize(['admin']), createBuilding);

// PUT /api/buildings/:id - Update building
router.put('/:id', authorize(['admin']), updateBuilding);

// PUT /api/buildings/:id/maintenance - Update maintenance schedule
router.put('/:id/maintenance', authorize(['admin']), updateMaintenanceSchedule);

// DELETE /api/buildings/:id - Delete building
router.delete('/:id', authorize(['admin']), deleteBuilding);

export default router;
