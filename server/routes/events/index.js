import express from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  updateAttendance,
  addEventFeedback
} from '../../controllers/events/eventsController.js';
import { protect, authorize } from '../../middlewares/auth.js';

const router = express.Router();

// Apply authentication to all routes
router.use(protect);

// GET /api/events - Get all events
router.get('/', getAllEvents);

// GET /api/events/:id - Get event by ID
router.get('/:id', getEventById);

// POST /api/events - Create new event
router.post('/', authorize(['admin']), createEvent);

// PUT /api/events/:id - Update event
router.put('/:id', authorize(['admin']), updateEvent);

// DELETE /api/events/:id - Delete event
router.delete('/:id', authorize(['admin']), deleteEvent);

// POST /api/events/:id/register - Register for event
router.post('/:id/register', registerForEvent);

// PUT /api/events/:id/attendance/:registrationId - Update attendance
router.put('/:id/attendance/:registrationId', authorize(['admin']), updateAttendance);

// POST /api/events/:id/feedback - Add event feedback
router.post('/:id/feedback', addEventFeedback);

export default router;
