import express from 'express';
import {
  getAllNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
  markNoticeAsRead,
  acknowledgeNotice
} from '../../controllers/notices/noticesController.js';
import { protect, authorize } from '../../middlewares/auth.js';

const router = express.Router();

// Apply authentication to all routes
router.use(protect);

// GET /api/notices - Get all notices
router.get('/', getAllNotices);

// GET /api/notices/:id - Get notice by ID
router.get('/:id', getNoticeById);

// POST /api/notices - Create new notice
router.post('/', authorize(['admin']), createNotice);

// PUT /api/notices/:id - Update notice
router.put('/:id', authorize(['admin']), updateNotice);

// DELETE /api/notices/:id - Delete notice
router.delete('/:id', authorize(['admin']), deleteNotice);

// POST /api/notices/:id/read - Mark notice as read
router.post('/:id/read', markNoticeAsRead);

// POST /api/notices/:id/acknowledge - Acknowledge notice
router.post('/:id/acknowledge', acknowledgeNotice);

export default router;
