import express from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  bookService,
  updateBookingStatus,
  addServiceFeedback
} from '../../controllers/services/servicesController.js';
import { protect, authorize } from '../../middlewares/auth.js';

const router = express.Router();

// Apply authentication to all routes
router.use(protect);

// GET /api/services - Get all services
router.get('/', getAllServices);

// GET /api/services/:id - Get service by ID
router.get('/:id', getServiceById);

// POST /api/services - Create new service
router.post('/', authorize(['admin']), createService);

// PUT /api/services/:id - Update service
router.put('/:id', authorize(['admin']), updateService);

// DELETE /api/services/:id - Delete service
router.delete('/:id', authorize(['admin']), deleteService);

// POST /api/services/:id/book - Book service
router.post('/:id/book', bookService);

// PUT /api/services/:id/bookings/:bookingId - Update booking status
router.put('/:id/bookings/:bookingId', authorize(['admin']), updateBookingStatus);

// POST /api/services/:id/bookings/:bookingId/feedback - Add service feedback
router.post('/:id/bookings/:bookingId/feedback', addServiceFeedback);

export default router;
