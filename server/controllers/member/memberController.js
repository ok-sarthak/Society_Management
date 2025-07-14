import MemberList from '../../models/member/MemberList.js';
import MemberLogger from '../../utils/memberLogger.js';
import notifier from '../../utils/notifier.js';
import logger from '../../utils/logger.js';

class MemberController {
  // Get all members
  async getAllMembers(req, res, next) {
    try {
      const { page = 1, limit = 10, active = 'true' } = req.query;
      const skip = (page - 1) * limit;
      
      const filter = active === 'true' ? { isActive: true } : {};
      
      const members = await MemberList.find(filter)
        .populate('createdBy', 'name email')
        .populate('updatedBy', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await MemberList.countDocuments(filter);

      res.json({
        success: true,
        data: {
          members,
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

  // Get member by ID
  async getMemberById(req, res, next) {
    try {
      const member = await MemberList.findById(req.params.id)
        .populate('createdBy', 'name email')
        .populate('updatedBy', 'name email');

      if (!member) {
        return res.status(404).json({
          success: false,
          message: 'Member not found'
        });
      }

      res.json({
        success: true,
        data: { member }
      });
    } catch (error) {
      next(error);
    }
  }

  // Create new member
  async createMember(req, res, next) {
    try {
      const memberData = {
        ...req.body,
        createdBy: req.user.id
      };

      const member = new MemberList(memberData);
      await member.save();

      // Log the action
      MemberLogger.logMemberCreation(member, req.user.id);

      // Send welcome email
      if (member.email) {
        await notifier.sendWelcomeMessage(member);
      }

      res.status(201).json({
        success: true,
        message: 'Member created successfully',
        data: { member }
      });
    } catch (error) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        let message = `${field} already exists`;
        
        // Provide more user-friendly error messages
        if (field === 'aadharNumber') {
          message = 'This Aadhar number is already registered with another member';
        } else if (field === 'email') {
          message = 'This email address is already registered with another member';
        } else if (field === 'phoneNumber') {
          message = 'This phone number is already registered with another member';
        } else if (field === 'memberID') {
          message = 'Member ID generation failed. Please try again.';
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

  // Update member (admin/watchman only)
  async updateMember(req, res, next) {
    try {
      const updates = {
        ...req.body,
        updatedBy: req.user.id
      };

      const member = await MemberList.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true, runValidators: true }
      );

      if (!member) {
        return res.status(404).json({
          success: false,
          message: 'Member not found'
        });
      }

      // Log the action
      MemberLogger.logMemberUpdate(member._id, updates, req.user.id);

      res.json({
        success: true,
        message: 'Member updated successfully',
        data: { member }
      });
    } catch (error) {
      next(error);
    }
  }

  // Update member profile (for members to update their own info)
  async updateMemberProfile(req, res, next) {
    try {
      // Find member by user email (assuming user email matches member email)
      const member = await MemberList.findOne({ 
        email: req.user.email,
        isActive: true 
      });

      if (!member) {
        return res.status(404).json({
          success: false,
          message: 'Member profile not found'
        });
      }

      // Restrict what fields members can update
      const allowedUpdates = [
        'phoneNumber', 
        'email', 
        'emergencyContact',
        'occupation',
        'workAddress'
      ];

      const updates = {};
      Object.keys(req.body).forEach(key => {
        if (allowedUpdates.includes(key)) {
          updates[key] = req.body[key];
        }
      });

      // Add updatedBy field
      updates.updatedBy = req.user.id;

      const updatedMember = await MemberList.findByIdAndUpdate(
        member._id,
        updates,
        { new: true, runValidators: true }
      );

      // Log the action
      MemberLogger.logMemberUpdate(member._id, updates, req.user.id);

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: { member: updatedMember }
      });
    } catch (error) {
      next(error);
    }
  }

  // Get member profile (for members to view their own info)
  async getMemberProfile(req, res, next) {
    try {
      // Find member by user email (assuming user email matches member email)
      const member = await MemberList.findOne({ 
        email: req.user.email,
        isActive: true 
      });

      if (!member) {
        return res.status(404).json({
          success: false,
          message: 'Member profile not found'
        });
      }

      res.json({
        success: true,
        data: { member }
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete member (soft delete)
  async deleteMember(req, res, next) {
    try {
      const member = await MemberList.findByIdAndUpdate(
        req.params.id,
        { 
          isActive: false,
          updatedBy: req.user.id,
          moveOutDate: new Date()
        },
        { new: true }
      );

      if (!member) {
        return res.status(404).json({
          success: false,
          message: 'Member not found'
        });
      }

      // Log the action
      MemberLogger.logMemberDeletion(member._id, req.user.id);

      res.json({
        success: true,
        message: 'Member deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // Get members by location
  async getMembersByLocation(req, res, next) {
    try {
      const { building, block, floor } = req.query;
      
      if (!building || !block || !floor) {
        return res.status(400).json({
          success: false,
          message: 'Building, block, and floor query parameters are required'
        });
      }
      
      const members = await MemberList.find({
        buildingNumber: building,
        blockNumber: block,
        floorNumber: floor,
        isActive: true
      }).sort({ memberID: 1 });

      res.json({
        success: true,
        data: { members, count: members.length }
      });
    } catch (error) {
      next(error);
    }
  }

  // Get members by building
  async getMembersByBuilding(req, res, next) {
    try {
      const { building } = req.params;
      
      const members = await MemberList.find({
        buildingNumber: building,
        isActive: true
      }).sort({ blockNumber: 1, floorNumber: 1 });

      res.json({
        success: true,
        data: { members, count: members.length }
      });
    } catch (error) {
      next(error);
    }
  }

  // Search members
  async searchMembers(req, res, next) {
    try {
      const { query } = req.params;
      const searchRegex = new RegExp(query, 'i');

      const members = await MemberList.find({
        $and: [
          { isActive: true },
          {
            $or: [
              { name: searchRegex },
              { email: searchRegex },
              { phoneNumber: searchRegex },
              { memberID: searchRegex }
            ]
          }
        ]
      }).limit(20);

      res.json({
        success: true,
        data: { members, count: members.length }
      });
    } catch (error) {
      next(error);
    }
  }

  // Get member statistics
  async getMemberStats(req, res, next) {
    try {
      const totalMembers = await MemberList.countDocuments({ isActive: true });
      const totalOwners = await MemberList.countDocuments({ isActive: true, memberType: 'owner' });
      const totalTenants = await MemberList.countDocuments({ isActive: true, memberType: 'tenant' });
      const totalFamily = await MemberList.countDocuments({ isActive: true, memberType: 'family' });

      // Building-wise statistics
      const buildingStats = await MemberList.aggregate([
        { $match: { isActive: true } },
        {
          $group: {
            _id: '$buildingNumber',
            count: { $sum: 1 },
            owners: { $sum: { $cond: [{ $eq: ['$memberType', 'owner'] }, 1, 0] } },
            tenants: { $sum: { $cond: [{ $eq: ['$memberType', 'tenant'] }, 1, 0] } }
          }
        },
        { $sort: { _id: 1 } }
      ]);

      // Age group statistics
      const ageStats = await MemberList.aggregate([
        { $match: { isActive: true } },
        {
          $group: {
            _id: {
              $switch: {
                branches: [
                  { case: { $lt: ['$age', 18] }, then: '0-17' },
                  { case: { $lt: ['$age', 35] }, then: '18-34' },
                  { case: { $lt: ['$age', 60] }, then: '35-59' },
                  { case: { $gte: ['$age', 60] }, then: '60+' }
                ],
                default: 'Unknown'
              }
            },
            count: { $sum: 1 }
          }
        }
      ]);

      res.json({
        success: true,
        data: {
          summary: {
            totalMembers,
            totalOwners,
            totalTenants,
            totalFamily
          },
          buildingStats,
          ageStats
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new MemberController();
