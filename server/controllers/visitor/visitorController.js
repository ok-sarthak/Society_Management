import Visitor from '../../models/visitor/Visitor.js';
import PreApprovedVisitor from '../../models/visitor/PreApprovedVisitor.js';
import logger from '../../utils/logger.js';

class VisitorController {
  // Get all visitors
  async getAllVisitors(req, res, next) {
    try {
      const { page = 1, limit = 10, status, date } = req.query;
      const skip = (page - 1) * limit;
      
      const filter = {};
      if (status) filter.status = status;
      if (date) {
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);
        filter.entryTime = { $gte: startDate, $lt: endDate };
      }
      
      const visitors = await Visitor.find(filter)
        .populate('visitingMember', 'name memberID buildingNumber blockNumber floorNumber phoneNumber')
        .populate('approvedBy', 'name memberID')
        .populate('createdBy', 'name email')
        .sort({ entryTime: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Visitor.countDocuments(filter);

      res.json({
        success: true,
        data: {
          visitors,
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

  // Get visitor by ID
  async getVisitorById(req, res, next) {
    try {
      const visitor = await Visitor.findById(req.params.id)
        .populate('visitingMember', 'name memberID buildingNumber blockNumber floorNumber phoneNumber')
        .populate('approvedBy', 'name memberID')
        .populate('createdBy', 'name email');

      if (!visitor) {
        return res.status(404).json({
          success: false,
          message: 'Visitor not found'
        });
      }

      res.json({
        success: true,
        data: { visitor }
      });
    } catch (error) {
      next(error);
    }
  }

  // Create new visitor entry
  async createVisitor(req, res, next) {
    try {
      const visitorData = {
        ...req.body,
        createdBy: req.user.id
      };

      // If visitingMember is provided as a string (name), try to find the member
      if (visitorData.visitingMember && typeof visitorData.visitingMember === 'string') {
        // Try to find member by name first
        const MemberList = (await import('../../models/member/MemberList.js')).default;
        const member = await MemberList.findOne({
          name: { $regex: new RegExp(visitorData.visitingMember, 'i') },
          isActive: true
        });
        
        if (member) {
          visitorData.visitingMember = member._id;
        } else {
          // If member not found, return error
          return res.status(400).json({
            success: false,
            message: `Member '${visitorData.visitingMember}' not found. Please add the member first or check if the member is active.`
          });
        }
      }

      // Check for duplicate active visitor (same phone number with active status)
      const existingActiveVisitor = await Visitor.findOne({
        visitorPhone: visitorData.visitorPhone,
        status: 'entered'
      });
      
      if (existingActiveVisitor) {
        return res.status(400).json({
          success: false,
          message: 'This visitor is already checked-in and active. Please check them out first before registering a new entry.'
        });
      }

      // Check if visitor is pre-approved (only if visitingMember is now an ObjectId)
      if (visitorData.visitingMember) {
        try {
          const preApproved = await PreApprovedVisitor.findOne({
            visitorPhone: visitorData.visitorPhone,
            approvedBy: visitorData.visitingMember,
            isActive: true,
            validFrom: { $lte: new Date() },
            validTo: { $gte: new Date() }
          });

          if (preApproved) {
            visitorData.isPreApproved = true;
            visitorData.approvedBy = preApproved.approvedBy;
          }
        } catch (preApprovalError) {
          // If pre-approval check fails, log but continue
          logger.warn(`Pre-approval check failed for visitor ${visitorData.visitorName}: ${preApprovalError.message}`);
        }
      }

      const visitor = new Visitor(visitorData);
      await visitor.save();

      await visitor.populate('visitingMember', 'name memberID buildingNumber blockNumber floorNumber phoneNumber');

      logger.info(`New visitor entry: ${visitor.visitorName} visiting ${visitor.visitingMember.name}`);

      res.status(201).json({
        success: true,
        message: 'Visitor entry created successfully',
        data: { visitor }
      });
    } catch (error) {
      // Handle duplicate field errors
      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        let message = `${field} already exists`;
        
        if (field === 'visitorId') {
          message = 'Visitor ID generation failed. Please try again.';
        }
        
        return res.status(400).json({
          success: false,
          message
        });
      }
      
      // Handle validation errors
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({
          success: false,
          message: `Validation failed: ${messages.join(', ')}`
        });
      }
      
      next(error);
    }
  }

  // Update visitor
  async updateVisitor(req, res, next) {
    try {
      const updates = {
        ...req.body,
        updatedBy: req.user.id
      };

      const visitor = await Visitor.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true, runValidators: true }
      ).populate('visitingMember', 'name memberID buildingNumber blockNumber floorNumber phoneNumber');

      if (!visitor) {
        return res.status(404).json({
          success: false,
          message: 'Visitor not found'
        });
      }

      res.json({
        success: true,
        message: 'Visitor updated successfully',
        data: { visitor }
      });
    } catch (error) {
      next(error);
    }
  }

  // Check out visitor
  async checkOutVisitor(req, res, next) {
    try {
      const { exitGate, remarks } = req.body;

      const visitor = await Visitor.findById(req.params.id)
        .populate('visitingMember', 'name memberID buildingNumber blockNumber floorNumber phoneNumber');

      if (!visitor) {
        return res.status(404).json({
          success: false,
          message: 'Visitor not found'
        });
      }

      if (visitor.status === 'exited') {
        return res.status(400).json({
          success: false,
          message: 'Visitor already checked out'
        });
      }

      // Update visitor record
      visitor.exitTime = new Date();
      visitor.exitGate = exitGate || visitor.entryGate;
      visitor.remarks = remarks || visitor.remarks;
      visitor.status = 'exited';
      visitor.updatedBy = req.user.id;

      await visitor.save();

      logger.info(`Visitor checked out: ${visitor.visitorName} from ${visitor.visitingMember.name}`);

      res.json({
        success: true,
        message: 'Visitor checked out successfully',
        data: { visitor }
      });
    } catch (error) {
      next(error);
    }
  }

  // Get current visitors (not checked out)
  async getCurrentVisitors(req, res, next) {
    try {
      const visitors = await Visitor.find({ status: 'entered' })
        .populate('visitingMember', 'name memberID buildingNumber blockNumber floorNumber phoneNumber')
        .sort({ entryTime: -1 });

      res.json({
        success: true,
        data: { visitors, count: visitors.length }
      });
    } catch (error) {
      next(error);
    }
  }

  // Get overdue visitors
  async getOverdueVisitors(req, res, next) {
    try {
      const visitors = await Visitor.find({ status: 'overstayed' })
        .populate('visitingMember', 'name memberID buildingNumber blockNumber floorNumber phoneNumber')
        .sort({ entryTime: 1 });

      res.json({
        success: true,
        data: { visitors, count: visitors.length }
      });
    } catch (error) {
      next(error);
    }
  }

  // Get visitor statistics
  async getVisitorStats(req, res, next) {
    try {
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));

      const todayVisitors = await Visitor.countDocuments({
        entryTime: { $gte: startOfDay, $lte: endOfDay }
      });

      const currentVisitors = await Visitor.countDocuments({ status: 'entered' });
      const overdueVisitors = await Visitor.countDocuments({ status: 'overstayed' });

      // Purpose-wise statistics
      const purposeStats = await Visitor.aggregate([
        {
          $group: {
            _id: '$purpose',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } }
      ]);

      // Daily visitor trend (last 7 days)
      const dailyTrend = await Visitor.aggregate([
        {
          $match: {
            entryTime: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$entryTime' } },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]);

      // Building-wise statistics
      const buildingStats = await Visitor.aggregate([
        {
          $group: {
            _id: '$buildingNumber',
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]);

      res.json({
        success: true,
        data: {
          summary: {
            todayVisitors,
            currentVisitors,
            overdueVisitors
          },
          purposeStats,
          dailyTrend,
          buildingStats
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Search visitors
  async searchVisitors(req, res, next) {
    try {
      const { query } = req.params;
      const searchRegex = new RegExp(query, 'i');

      const visitors = await Visitor.find({
        $or: [
          { visitorName: searchRegex },
          { visitorPhone: searchRegex },
          { visitorId: searchRegex },
          { vehicleNumber: searchRegex }
        ]
      })
      .populate('visitingMember', 'name memberID buildingNumber blockNumber floorNumber phoneNumber')
      .sort({ entryTime: -1 })
      .limit(20);

      res.json({
        success: true,
        data: { visitors, count: visitors.length }
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new VisitorController();
