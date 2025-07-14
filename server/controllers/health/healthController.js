import HealthRecord from '../../models/HealthRecord.js';
import logger from '../../utils/logger.js';

// Get all health records
export const getAllHealthRecords = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      memberId, 
      recordType,
      accessLevel 
    } = req.query;

    const filter = {};
    if (memberId) filter.memberId = memberId;
    if (recordType) filter.recordType = recordType;
    
    // Apply access level filtering based on user role
    if (req.user.role !== 'admin') {
      if (req.user.role === 'member') {
        // Members can only see their own records
        filter.memberId = req.user.memberId;
      } else {
        // Other roles can see non-private records or emergency access records
        filter.$or = [
          { isPrivate: false },
          { accessLevel: 'emergency_only' }
        ];
      }
    }

    const healthRecords = await HealthRecord.find(filter)
      .populate('memberId', 'name email phoneNumber buildingNumber blockNumber flatNumber')
      .populate('addedBy', 'name email')
      .populate('lastUpdatedBy', 'name email')
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await HealthRecord.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        healthRecords,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalRecords: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    logger.error('Error fetching health records:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch health records',
      error: error.message
    });
  }
};

// Get health record by ID
export const getHealthRecordById = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findById(req.params.id)
      .populate('memberId', 'name email phoneNumber buildingNumber blockNumber flatNumber')
      .populate('addedBy', 'name email')
      .populate('lastUpdatedBy', 'name email');

    if (!healthRecord) {
      return res.status(404).json({
        success: false,
        message: 'Health record not found'
      });
    }

    // Check access permissions
    if (healthRecord.isPrivate && req.user.role !== 'admin') {
      if (req.user.role === 'member' && healthRecord.memberId.toString() !== req.user.memberId) {
        return res.status(403).json({
          success: false,
          message: 'Access denied to this health record'
        });
      }
    }

    res.status(200).json({
      success: true,
      data: { healthRecord }
    });
  } catch (error) {
    logger.error('Error fetching health record:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch health record',
      error: error.message
    });
  }
};

// Create new health record
export const createHealthRecord = async (req, res) => {
  try {
    const healthRecordData = {
      ...req.body,
      addedBy: req.user.id
    };

    const healthRecord = new HealthRecord(healthRecordData);
    await healthRecord.save();

    await healthRecord.populate('memberId', 'name email phoneNumber buildingNumber blockNumber flatNumber');
    await healthRecord.populate('addedBy', 'name email');

    logger.info(`Health record created for member ${healthRecord.memberName} by user ${req.user.id}`);

    res.status(201).json({
      success: true,
      message: 'Health record created successfully',
      data: { healthRecord }
    });
  } catch (error) {
    logger.error('Error creating health record:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create health record',
      error: error.message
    });
  }
};

// Update health record
export const updateHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findByIdAndUpdate(
      req.params.id,
      { 
        ...req.body, 
        lastUpdatedBy: req.user.id 
      },
      { new: true, runValidators: true }
    )
      .populate('memberId', 'name email phoneNumber buildingNumber blockNumber flatNumber')
      .populate('addedBy', 'name email')
      .populate('lastUpdatedBy', 'name email');

    if (!healthRecord) {
      return res.status(404).json({
        success: false,
        message: 'Health record not found'
      });
    }

    logger.info(`Health record updated: ${healthRecord._id} by user ${req.user.id}`);

    res.status(200).json({
      success: true,
      message: 'Health record updated successfully',
      data: { healthRecord }
    });
  } catch (error) {
    logger.error('Error updating health record:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update health record',
      error: error.message
    });
  }
};

// Delete health record
export const deleteHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findByIdAndDelete(req.params.id);

    if (!healthRecord) {
      return res.status(404).json({
        success: false,
        message: 'Health record not found'
      });
    }

    logger.info(`Health record deleted: ${healthRecord._id} by user ${req.user.id}`);

    res.status(200).json({
      success: true,
      message: 'Health record deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting health record:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete health record',
      error: error.message
    });
  }
};

// Get health records by member ID
export const getHealthRecordsByMember = async (req, res) => {
  try {
    const { memberId } = req.params;
    const { recordType } = req.query;

    const filter = { memberId };
    if (recordType) filter.recordType = recordType;

    // Check access permissions
    if (req.user.role === 'member' && memberId !== req.user.memberId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied to this member\'s health records'
      });
    }

    const healthRecords = await HealthRecord.find(filter)
      .populate('memberId', 'name email phoneNumber buildingNumber blockNumber flatNumber')
      .populate('addedBy', 'name email')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: { healthRecords }
    });
  } catch (error) {
    logger.error('Error fetching health records by member:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch health records',
      error: error.message
    });
  }
};
