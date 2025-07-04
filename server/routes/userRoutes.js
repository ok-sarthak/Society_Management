import { Router } from 'express';
import { getAllUsers, createUser } from '../controllers/userController.js';

const router = Router();

router.get('/', getAllUsers);
router.get("/demo" ,createUser); 
router.post('/demo', createUser); // Demo route for testing

export default router;