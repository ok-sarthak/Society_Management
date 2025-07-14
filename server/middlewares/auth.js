import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';

// Authentication middleware
export const authenticate = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

// Authorization middleware for different roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};

// Alias for authenticate (for backward compatibility)
export const protect = authenticate;
export const authenticateToken = authenticate;

// Authorization middleware wrapper for roles
export const authorizeRoles = (roles) => authorize(...roles);

// Role-specific middleware
export const adminOnly = authorize('admin');
export const adminOrWatchman = authorize('admin', 'watchman');
export const allRoles = authorize('admin', 'watchman', 'member');
