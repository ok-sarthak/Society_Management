import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductReview,
  updateProductStock,
  getVendors,
  createVendor,
  updateVendor,
  verifyVendor,
  getOrders,
  createOrder,
  updateOrderStatus,
  cancelOrder,
  getShoppingDashboard
} from '../../controllers/shopping/shoppingController.js';
import { authenticateToken, authorizeRoles } from '../../middlewares/auth.js';

const router = express.Router();

// Product Routes
router.get('/products', authenticateToken, getProducts);
router.get('/products/:id', authenticateToken, getProductById);
router.post('/products', authenticateToken, authorizeRoles(['admin', 'vendor']), createProduct);
router.put('/products/:id', authenticateToken, authorizeRoles(['admin', 'vendor']), updateProduct);
router.delete('/products/:id', authenticateToken, authorizeRoles(['admin', 'vendor']), deleteProduct);
router.post('/products/:id/reviews', authenticateToken, addProductReview);
router.put('/products/:id/stock', authenticateToken, authorizeRoles(['admin', 'vendor']), updateProductStock);

// Vendor Routes
router.get('/vendors', authenticateToken, authorizeRoles(['admin', 'manager']), getVendors);
router.post('/vendors', authenticateToken, authorizeRoles(['admin']), createVendor);
router.put('/vendors/:id', authenticateToken, authorizeRoles(['admin', 'vendor']), updateVendor);
router.put('/vendors/:id/verify', authenticateToken, authorizeRoles(['admin']), verifyVendor);

// Order Routes
router.get('/orders', authenticateToken, getOrders);
router.post('/orders', authenticateToken, createOrder);
router.put('/orders/:id/status', authenticateToken, authorizeRoles(['admin', 'vendor']), updateOrderStatus);
router.put('/orders/:id/cancel', authenticateToken, cancelOrder);

// Dashboard Routes
router.get('/dashboard', authenticateToken, authorizeRoles(['admin', 'manager']), getShoppingDashboard);

export default router;
