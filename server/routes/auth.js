import express from 'express';
import User from '../models/User.js';
import { authenticate, adminOnly } from '../middlewares/auth.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Register new user (admin only)
router.post('/register', authenticate, adminOnly, async (req, res, next) => {
  try {
    const { name, email, password, role, phoneNumber } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role,
      phoneNumber,
      createdBy: req.user.id
    });

    await user.save();

    // Generate token
    const token = user.generateToken();

    logger.info(`New user registered: ${email} with role: ${role}`);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phoneNumber: user.phoneNumber
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
});

// Login user
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    await user.updateLastLogin();

    // Generate token
    const token = user.generateToken();

    logger.info(`User logged in: ${email}`);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phoneNumber: user.phoneNumber,
          lastLogin: user.lastLogin
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get current user profile
router.get('/profile', authenticate, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
});

// Update user profile
router.put('/profile', authenticate, async (req, res, next) => {
  try {
    const { name, phoneNumber } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update allowed fields
    if (name) user.name = name;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phoneNumber: user.phoneNumber
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// Change password
router.put('/change-password', authenticate, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    logger.info(`Password changed for user: ${user.email}`);

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get all users (admin only)
router.get('/users', authenticate, adminOnly, async (req, res, next) => {
  try {
    const users = await User.find({ isActive: true })
      .select('-password')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { users, count: users.length }
    });
  } catch (error) {
    next(error);
  }
});

// Deactivate user (admin only)
router.put('/users/:id/deactivate', authenticate, adminOnly, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isActive = false;
    await user.save();

    logger.info(`User deactivated: ${user.email} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'User deactivated successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
