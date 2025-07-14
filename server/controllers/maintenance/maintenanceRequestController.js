import MaintenanceRequest from '../../models/maintenance/MaintenanceRequest.js';
import logger from '../../utils/logger.js';

class MaintenanceRequestController {
  // Get all maintenance requests
  async getAllRequests(req, res, next) {
    try {
      const { page = 1, limit = 10, status, priority, category } = req.query;
      const skip = (page - 1) * limit;
      
      const filter = {};
      if (status) filter.status = status;
      if (priority) filter.priority = priority;
      if (category) filter.category = category;
      
      const requests = await MaintenanceRequest.find(filter)
        .populate('requestedBy', 'username email')
        .populate('assignedTo', 'name employeeId')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await MaintenanceRequest.countDocuments(filter);

      res.json({
        success: true,
        data: {
          requests,
          pagination: {
            current: parseInt(page),
            pages: Math.ceil(total / limit),
            total,
            limit: parseInt(limit)
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Get maintenance request by ID
  async getRequestById(req, res, next) {
    try {
      const request = await MaintenanceRequest.findById(req.params.id)
        .populate('requestedBy', 'username email')
        .populate('assignedTo', 'name employeeId');
      
      if (!request) {
        return res.status(404).json({
          success: false,
          message: 'Maintenance request not found'
        });
      }

      res.json({
        success: true,
        data: request
      });
    } catch (error) {
      next(error);
    }
  }

  // Create new maintenance request
  async createRequest(req, res, next) {
    try {
      const requestData = {
        ...req.body,
        requestedBy: req.user.id
      };

      const request = new MaintenanceRequest(requestData);
      await request.save();

      await request.populate('requestedBy', 'username email');

      logger.info(`New maintenance request created: ${request._id} by user ${req.user.id}`);

      res.status(201).json({
        success: true,
        data: request,
        message: 'Maintenance request created successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // Update maintenance request
  async updateRequest(req, res, next) {
    try {
      const request = await MaintenanceRequest.findById(req.params.id);
      
      if (!request) {
        return res.status(404).json({
          success: false,
          message: 'Maintenance request not found'
        });
      }

      // Update fields
      Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
          request[key] = req.body[key];
        }
      });

      // Set completion date if status is completed
      if (req.body.status === 'completed' && !request.completionDate) {
        request.completionDate = new Date();
      }

      await request.save();
      await request.populate('requestedBy', 'username email');
      await request.populate('assignedTo', 'name employeeId');

      logger.info(`Maintenance request updated: ${request._id}`);

      res.json({
        success: true,
        data: request,
        message: 'Maintenance request updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete maintenance request
  async deleteRequest(req, res, next) {
    try {
      const request = await MaintenanceRequest.findById(req.params.id);
      
      if (!request) {
        return res.status(404).json({
          success: false,
          message: 'Maintenance request not found'
        });
      }

      await MaintenanceRequest.findByIdAndDelete(req.params.id);

      logger.info(`Maintenance request deleted: ${req.params.id}`);

      res.json({
        success: true,
        message: 'Maintenance request deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // Get maintenance requests by status
  async getRequestsByStatus(req, res, next) {
    try {
      const { status } = req.params;
      
      const requests = await MaintenanceRequest.find({ status })
        .populate('requestedBy', 'username email')
        .populate('assignedTo', 'name employeeId')
        .sort({ createdAt: -1 });

      res.json({
        success: true,
        data: requests
      });
    } catch (error) {
      next(error);
    }
  }

  // Get maintenance requests by priority
  async getRequestsByPriority(req, res, next) {
    try {
      const { priority } = req.params;
      
      const requests = await MaintenanceRequest.find({ priority })
        .populate('requestedBy', 'username email')
        .populate('assignedTo', 'name employeeId')
        .sort({ createdAt: -1 });

      res.json({
        success: true,
        data: requests
      });
    } catch (error) {
      next(error);
    }
  }

  // Get maintenance requests statistics
  async getRequestsStats(req, res, next) {
    try {
      const stats = await MaintenanceRequest.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]);

      const priorityStats = await MaintenanceRequest.aggregate([
        {
          $group: {
            _id: '$priority',
            count: { $sum: 1 }
          }
        }
      ]);

      res.json({
        success: true,
        data: {
          statusStats: stats,
          priorityStats: priorityStats
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new MaintenanceRequestController();
