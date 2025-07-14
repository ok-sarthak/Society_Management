import express from 'express';
import {
  getAllComplaints,
  getComplaintById,
  createComplaint,
  updateComplaintStatus,
  deleteComplaint,
  addComplaintFeedback
} from '../../controllers/complaints/complaintsController.js';
import { protect, authorize } from '../../middlewares/auth.js';

const router = express.Router();

// Apply authentication to all routes
router.use(protect);

// GET /api/complaints - Get all complaints
router.get('/', authorize(['admin', 'watchman']), getAllComplaints);

// GET /api/complaints/:id - Get complaint by ID
router.get('/:id', getComplaintById);

// POST /api/complaints - Create new complaint
router.post('/', createComplaint);

// PUT /api/complaints/:id - Update complaint status
router.put('/:id', authorize(['admin', 'watchman']), updateComplaintStatus);

// DELETE /api/complaints/:id - Delete complaint
router.delete('/:id', authorize(['admin']), deleteComplaint);

// POST /api/complaints/:id/feedback - Add feedback to complaint
router.post('/:id/feedback', addComplaintFeedback);

export default router;
