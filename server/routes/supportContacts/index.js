import express from 'express';
import {
  getSupportContacts,
  createSupportContact,
  updateSupportContact,
  deleteSupportContact,
  rateSupportContact,
  getEmergencyContacts,
  createEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact,
  getHelpdeskTickets,
  createHelpdeskTicket,
  updateHelpdeskTicket,
  addTicketComment,
  assignTicket,
  closeTicket
} from '../../controllers/supportContacts/supportContactsController.js';
import { authenticateToken, authorizeRoles } from '../../middlewares/auth.js';

const router = express.Router();

// Support Contacts Routes
router.get('/contacts', authenticateToken, getSupportContacts);
router.post('/contacts', authenticateToken, authorizeRoles(['admin', 'manager']), createSupportContact);
router.put('/contacts/:id', authenticateToken, authorizeRoles(['admin', 'manager']), updateSupportContact);
router.delete('/contacts/:id', authenticateToken, authorizeRoles(['admin']), deleteSupportContact);
router.post('/contacts/:id/rate', authenticateToken, rateSupportContact);

// Emergency Contacts Routes
router.get('/emergency', authenticateToken, getEmergencyContacts);
router.post('/emergency', authenticateToken, authorizeRoles(['admin', 'manager']), createEmergencyContact);
router.put('/emergency/:id', authenticateToken, authorizeRoles(['admin', 'manager']), updateEmergencyContact);
router.delete('/emergency/:id', authenticateToken, authorizeRoles(['admin']), deleteEmergencyContact);

// Helpdesk Tickets Routes
router.get('/tickets', authenticateToken, getHelpdeskTickets);
router.post('/tickets', authenticateToken, createHelpdeskTicket);
router.put('/tickets/:id', authenticateToken, authorizeRoles(['admin', 'manager', 'staff']), updateHelpdeskTicket);
router.post('/tickets/:id/comments', authenticateToken, addTicketComment);
router.put('/tickets/:id/assign', authenticateToken, authorizeRoles(['admin', 'manager']), assignTicket);
router.put('/tickets/:id/close', authenticateToken, authorizeRoles(['admin', 'manager', 'staff']), closeTicket);

export default router;
