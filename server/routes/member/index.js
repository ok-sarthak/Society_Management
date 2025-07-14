import express from 'express';
import memberController from '../../controllers/member/memberController.js';
import { authenticate, adminOrWatchman, allRoles } from '../../middlewares/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all members
router.get('/', adminOrWatchman, memberController.getAllMembers);

// Get member statistics
router.get('/stats/summary', adminOrWatchman, memberController.getMemberStats);

// Search members
router.get('/search/:query', adminOrWatchman, memberController.searchMembers);

// Get members by building
router.get('/building/:building', adminOrWatchman, memberController.getMembersByBuilding);

// Get members by location (using query parameters for Express 5.x compatibility)
router.get('/location', adminOrWatchman, memberController.getMembersByLocation);

// Member self-update route (must come before /:id route)
router.put('/profile', allRoles, memberController.updateMemberProfile);

// Member self-view route
router.get('/profile', allRoles, memberController.getMemberProfile);

// Get member by ID
router.get('/:id', adminOrWatchman, memberController.getMemberById);

// Create new member
router.post('/', adminOrWatchman, memberController.createMember);

// Update member (admin/watchman only)
router.put('/:id', adminOrWatchman, memberController.updateMember);

// Delete member
router.delete('/:id', adminOrWatchman, memberController.deleteMember);

export default router;
