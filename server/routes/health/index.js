import express from 'express';
import {
  getAllHealthRecords,
  getHealthRecordById,
  createHealthRecord,
  updateHealthRecord,
  deleteHealthRecord,
  getHealthRecordsByMember
} from '../../controllers/health/healthController.js';
import { protect, authorize } from '../../middlewares/auth.js';

const router = express.Router();

// Apply authentication to all routes
router.use(protect);

// GET /api/health - Get all health records
router.get('/', authorize(['admin', 'watchman']), getAllHealthRecords);

// GET /api/health/member/:memberId - Get health records by member
router.get('/member/:memberId', getHealthRecordsByMember);

// GET /api/health/:id - Get health record by ID
router.get('/:id', getHealthRecordById);

// POST /api/health - Create new health record
router.post('/', createHealthRecord);

// PUT /api/health/:id - Update health record
router.put('/:id', updateHealthRecord);

// DELETE /api/health/:id - Delete health record
router.delete('/:id', authorize(['admin']), deleteHealthRecord);

export default router;
