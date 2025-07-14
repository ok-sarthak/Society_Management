import Maintenance from '../../models/maintenance/Maintenance.js';
import MaintenanceRate from '../../models/maintenance/MaintenanceRate.js';
import MemberList from '../../models/member/MemberList.js';
import MemberLogger from '../../utils/memberLogger.js';
import notifier from '../../utils/notifier.js';
import logger from '../../utils/logger.js';

class MaintenanceController {
  // Get all maintenance records
  async getAllMaintenance(req, res, next) {
    try {
      const { page = 1, limit = 10, status, month } = req.query;
      const skip = (page - 1) * limit;
      
      const filter = {};
      if (status) filter.status = status;
      if (month) filter.month = month;
      
      const maintenance = await Maintenance.find(filter)
        .populate('member', 'name memberID buildingNumber blockNumber floorNumber phoneNumber email')
        .populate('collectedBy', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Maintenance.countDocuments(filter);

      res.json({
        success: true,
        data: {
          maintenance,
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

  // Get maintenance by ID
  async getMaintenanceById(req, res, next) {
    try {
      const maintenance = await Maintenance.findById(req.params.id)
        .populate('member', 'name memberID buildingNumber blockNumber floorNumber phoneNumber email')
        .populate('collectedBy', 'name email')
        .populate('createdBy', 'name email');

      if (!maintenance) {
        return res.status(404).json({
          success: false,
          message: 'Maintenance record not found'
        });
      }

      res.json({
        success: true,
        data: { maintenance }
      });
    } catch (error) {
      next(error);
    }
  }

  // Create new maintenance record
  async createMaintenance(req, res, next) {
    try {
      const maintenanceData = {
        ...req.body,
        createdBy: req.user.id
      };

      const maintenance = new Maintenance(maintenanceData);
      await maintenance.save();

      await maintenance.populate('member', 'name memberID buildingNumber blockNumber floorNumber phoneNumber email');

      res.status(201).json({
        success: true,
        message: 'Maintenance record created successfully',
        data: { maintenance }
      });
    } catch (error) {
      next(error);
    }
  }

  // Update maintenance record
  async updateMaintenance(req, res, next) {
    try {
      const updates = {
        ...req.body,
        updatedBy: req.user.id
      };

      const maintenance = await Maintenance.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true, runValidators: true }
      ).populate('member', 'name memberID buildingNumber blockNumber floorNumber phoneNumber email');

      if (!maintenance) {
        return res.status(404).json({
          success: false,
          message: 'Maintenance record not found'
        });
      }

      // Log the action
      MemberLogger.logMaintenanceUpdate(maintenance.member._id, updates, req.user.id);

      res.json({
        success: true,
        message: 'Maintenance record updated successfully',
        data: { maintenance }
      });
    } catch (error) {
      next(error);
    }
  }

  // Pay maintenance
  async payMaintenance(req, res, next) {
    try {
      const { paymentMethod, transactionId, notes } = req.body;

      const maintenance = await Maintenance.findById(req.params.id)
        .populate('member', 'name memberID buildingNumber blockNumber floorNumber phoneNumber email');

      if (!maintenance) {
        return res.status(404).json({
          success: false,
          message: 'Maintenance record not found'
        });
      }

      if (maintenance.status === 'paid') {
        return res.status(400).json({
          success: false,
          message: 'Maintenance already paid'
        });
      }

      // Update maintenance record
      maintenance.status = 'paid';
      maintenance.paidDate = new Date();
      maintenance.paymentMethod = paymentMethod;
      maintenance.transactionId = transactionId;
      maintenance.notes = notes;
      maintenance.collectedBy = req.user.id;
      maintenance.updatedBy = req.user.id;

      await maintenance.save();

      // Log the payment
      MemberLogger.logMaintenancePayment(maintenance.member._id, maintenance.totalAmount, req.user.id);

      // Send payment receipt
      if (maintenance.member.email) {
        await notifier.sendMaintenanceReceipt(
          maintenance.member,
          maintenance.totalAmount,
          maintenance.paidDate
        );
      }

      res.json({
        success: true,
        message: 'Maintenance payment recorded successfully',
        data: { maintenance }
      });
    } catch (error) {
      next(error);
    }
  }

  // Get maintenance by member
  async getMaintenanceByMember(req, res, next) {
    try {
      const { memberId } = req.params;
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;

      const maintenance = await Maintenance.find({ member: memberId })
        .populate('collectedBy', 'name email')
        .sort({ month: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Maintenance.countDocuments({ member: memberId });

      res.json({
        success: true,
        data: {
          maintenance,
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

  // Get overdue maintenance
  async getOverdueMaintenance(req, res, next) {
    try {
      const overdue = await Maintenance.find({
        status: { $in: ['pending', 'overdue'] },
        dueDate: { $lt: new Date() }
      })
      .populate('member', 'name memberID buildingNumber blockNumber floorNumber phoneNumber email')
      .sort({ dueDate: 1 });

      res.json({
        success: true,
        data: { overdue, count: overdue.length }
      });
    } catch (error) {
      next(error);
    }
  }

  // Get maintenance statistics
  async getMaintenanceStats(req, res, next) {
    try {
      const currentMonth = new Date().toISOString().slice(0, 7);
      
      const totalPaid = await Maintenance.countDocuments({ status: 'paid' });
      const totalPending = await Maintenance.countDocuments({ status: 'pending' });
      const totalOverdue = await Maintenance.countDocuments({ status: 'overdue' });
      
      const currentMonthStats = await Maintenance.aggregate([
        { $match: { month: currentMonth } },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            totalAmount: { $sum: '$totalAmount' }
          }
        }
      ]);

      const monthlyCollection = await Maintenance.aggregate([
        { $match: { status: 'paid' } },
        {
          $group: {
            _id: '$month',
            totalAmount: { $sum: '$totalAmount' },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: -1 } },
        { $limit: 12 }
      ]);

      res.json({
        success: true,
        data: {
          summary: {
            totalPaid,
            totalPending,
            totalOverdue
          },
          currentMonthStats,
          monthlyCollection
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Generate maintenance for all members
  async generateMaintenanceForAll(req, res, next) {
    try {
      const { month } = req.params;
      const { amount, dueDate } = req.body;

      // Check if maintenance already exists for this month
      const existingCount = await Maintenance.countDocuments({ month });
      if (existingCount > 0) {
        return res.status(400).json({
          success: false,
          message: `Maintenance for ${month} already exists`
        });
      }

      // Get all active members
      const members = await MemberList.find({ isActive: true, isPrimaryOwner: true });

      const maintenanceRecords = [];
      
      for (const member of members) {
        const maintenance = new Maintenance({
          member: member._id,
          month,
          amount,
          dueDate: new Date(dueDate),
          createdBy: req.user.id
        });

        await maintenance.save();
        maintenanceRecords.push(maintenance);
      }

      logger.info(`Generated maintenance for ${maintenanceRecords.length} members for month ${month}`);

      res.status(201).json({
        success: true,
        message: `Maintenance generated for ${maintenanceRecords.length} members`,
        data: { count: maintenanceRecords.length }
      });
    } catch (error) {
      next(error);
    }
  }

  // Send payment reminders
  async sendPaymentReminders(req, res, next) {
    try {
      const overdue = await Maintenance.find({
        status: { $in: ['pending', 'overdue'] },
        dueDate: { $lt: new Date() }
      }).populate('member', 'name email');

      let remindersSent = 0;

      for (const maintenance of overdue) {
        if (maintenance.member.email) {
          await notifier.sendMaintenanceReminder(maintenance.member, maintenance.totalAmount);
          remindersSent++;
        }
      }

      logger.info(`Sent ${remindersSent} payment reminders`);

      res.json({
        success: true,
        message: `Sent ${remindersSent} payment reminders`,
        data: { remindersSent }
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new MaintenanceController();
