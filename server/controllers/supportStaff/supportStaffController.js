import SupportStaff from '../../models/supportStaff/SupportStaff.js';
import Attendance from '../../models/supportStaff/Attendance.js';
import logger from '../../utils/logger.js';

class SupportStaffController {
  // Get all support staff
  async getAllSupportStaff(req, res, next) {
    try {
      const { page = 1, limit = 10, role, active = 'true' } = req.query;
      const skip = (page - 1) * limit;
      
      const filter = {};
      if (role) filter.role = role;
      if (active === 'true') filter.isActive = true;
      
      const supportStaff = await SupportStaff.find(filter)
        .populate('createdBy', 'name email')
        .populate('updatedBy', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await SupportStaff.countDocuments(filter);

      res.json({
        success: true,
        data: {
          supportStaff,
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

  // Get support staff by ID
  async getSupportStaffById(req, res, next) {
    try {
      const supportStaff = await SupportStaff.findById(req.params.id)
        .populate('createdBy', 'name email')
        .populate('updatedBy', 'name email');

      if (!supportStaff) {
        return res.status(404).json({
          success: false,
          message: 'Support staff not found'
        });
      }

      res.json({
        success: true,
        data: { supportStaff }
      });
    } catch (error) {
      next(error);
    }
  }

  // Create new support staff
  async createSupportStaff(req, res, next) {
    try {
      const supportStaffData = {
        ...req.body,
        createdBy: req.user.id
      };

      const supportStaff = new SupportStaff(supportStaffData);
      await supportStaff.save();

      logger.info(`New support staff created: ${supportStaff.name} - ${supportStaff.role}`);

      res.status(201).json({
        success: true,
        message: 'Support staff created successfully',
        data: { supportStaff }
      });
    } catch (error) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        return res.status(400).json({
          success: false,
          message: `${field} already exists`
        });
      }
      next(error);
    }
  }

  // Update support staff
  async updateSupportStaff(req, res, next) {
    try {
      const updates = {
        ...req.body,
        updatedBy: req.user.id
      };

      const supportStaff = await SupportStaff.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true, runValidators: true }
      );

      if (!supportStaff) {
        return res.status(404).json({
          success: false,
          message: 'Support staff not found'
        });
      }

      res.json({
        success: true,
        message: 'Support staff updated successfully',
        data: { supportStaff }
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete support staff (soft delete)
  async deleteSupportStaff(req, res, next) {
    try {
      const supportStaff = await SupportStaff.findByIdAndUpdate(
        req.params.id,
        { 
          isActive: false,
          updatedBy: req.user.id,
          endDate: new Date()
        },
        { new: true }
      );

      if (!supportStaff) {
        return res.status(404).json({
          success: false,
          message: 'Support staff not found'
        });
      }

      logger.info(`Support staff deleted: ${supportStaff.name} - ${supportStaff.role}`);

      res.json({
        success: true,
        message: 'Support staff deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // Get support staff by role
  async getSupportStaffByRole(req, res, next) {
    try {
      const { role } = req.params;
      
      const supportStaff = await SupportStaff.find({
        role,
        isActive: true
      }).sort({ name: 1 });

      res.json({
        success: true,
        data: { supportStaff, count: supportStaff.length }
      });
    } catch (error) {
      next(error);
    }
  }

  // Get support staff statistics
  async getSupportStaffStats(req, res, next) {
    try {
      const totalStaff = await SupportStaff.countDocuments({ isActive: true });
      
      // Role-wise statistics
      const roleStats = await SupportStaff.aggregate([
        { $match: { isActive: true } },
        {
          $group: {
            _id: '$role',
            count: { $sum: 1 },
            totalSalary: { $sum: '$salary' }
          }
        },
        { $sort: { count: -1 } }
      ]);

      // Age group statistics
      const ageStats = await SupportStaff.aggregate([
        { $match: { isActive: true } },
        {
          $group: {
            _id: {
              $switch: {
                branches: [
                  { case: { $lt: ['$age', 25] }, then: '18-24' },
                  { case: { $lt: ['$age', 35] }, then: '25-34' },
                  { case: { $lt: ['$age', 45] }, then: '35-44' },
                  { case: { $lt: ['$age', 55] }, then: '45-54' },
                  { case: { $gte: ['$age', 55] }, then: '55+' }
                ],
                default: 'Unknown'
              }
            },
            count: { $sum: 1 }
          }
        }
      ]);

      // Monthly salary expense
      const totalSalaryExpense = await SupportStaff.aggregate([
        { $match: { isActive: true } },
        {
          $group: {
            _id: null,
            totalSalary: { $sum: '$salary' }
          }
        }
      ]);

      res.json({
        success: true,
        data: {
          summary: {
            totalStaff,
            totalSalaryExpense: totalSalaryExpense[0]?.totalSalary || 0
          },
          roleStats,
          ageStats
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Mark attendance
  async markAttendance(req, res, next) {
    try {
      const { id } = req.params;
      const { date, checkIn, checkOut, status, remarks } = req.body;

      const attendanceDate = new Date(date);
      
      // Check if attendance already exists for this date
      let attendance = await Attendance.findOne({
        employee: id,
        date: {
          $gte: new Date(attendanceDate.setHours(0, 0, 0, 0)),
          $lt: new Date(attendanceDate.setHours(23, 59, 59, 999))
        }
      });

      if (attendance) {
        // Update existing attendance
        attendance.checkIn = checkIn ? new Date(checkIn) : attendance.checkIn;
        attendance.checkOut = checkOut ? new Date(checkOut) : attendance.checkOut;
        attendance.status = status || attendance.status;
        attendance.remarks = remarks || attendance.remarks;
        attendance.markedBy = req.user.id;
      } else {
        // Create new attendance record
        attendance = new Attendance({
          employee: id,
          date: attendanceDate,
          checkIn: checkIn ? new Date(checkIn) : null,
          checkOut: checkOut ? new Date(checkOut) : null,
          status: status || 'present',
          remarks,
          markedBy: req.user.id
        });
      }

      await attendance.save();

      await attendance.populate('employee', 'name employeeId role');

      res.json({
        success: true,
        message: 'Attendance marked successfully',
        data: { attendance }
      });
    } catch (error) {
      next(error);
    }
  }

  // Get attendance records
  async getAttendanceRecords(req, res, next) {
    try {
      const { id } = req.params;
      const { month, year, page = 1, limit = 31 } = req.query;
      const skip = (page - 1) * limit;

      const filter = { employee: id };
      
      if (month && year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        filter.date = { $gte: startDate, $lte: endDate };
      }

      const attendance = await Attendance.find(filter)
        .populate('employee', 'name employeeId role')
        .populate('markedBy', 'name email')
        .sort({ date: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Attendance.countDocuments(filter);

      // Calculate statistics
      const stats = await Attendance.aggregate([
        { $match: filter },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]);

      res.json({
        success: true,
        data: {
          attendance,
          stats,
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
}

export default new SupportStaffController();
