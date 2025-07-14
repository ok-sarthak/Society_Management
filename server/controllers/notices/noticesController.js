import Notice from '../../models/Notice.js';
import logger from '../../utils/logger.js';

// Get all notices
export const getAllNotices = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      type, 
      status, 
      priority,
      active = false 
    } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    
    // Filter for active notices
    if (active === 'true') {
      filter.status = 'published';
      filter.expiryDate = { $gte: new Date() };
    }

    const notices = await Notice.find(filter)
      .populate('createdBy', 'name email')
      .populate('lastUpdatedBy', 'name email')
      .sort({ isSticky: -1, publishDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Notice.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        notices,
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
    logger.error('Error fetching notices:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notices',
      error: error.message
    });
  }
};

// Get notice by ID
export const getNoticeById = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('lastUpdatedBy', 'name email')
      .populate('readBy.memberId', 'name email')
      .populate('acknowledgedBy.memberId', 'name email');

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { notice }
    });
  } catch (error) {
    logger.error('Error fetching notice:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notice',
      error: error.message
    });
  }
};

// Create new notice
export const createNotice = async (req, res) => {
  try {
    const noticeData = {
      ...req.body,
      createdBy: req.user.id
    };

    const notice = new Notice(noticeData);
    await notice.save();

    await notice.populate('createdBy', 'name email');

    logger.info(`Notice created: ${notice.title} by user ${req.user.id}`);

    res.status(201).json({
      success: true,
      message: 'Notice created successfully',
      data: { notice }
    });
  } catch (error) {
    logger.error('Error creating notice:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create notice',
      error: error.message
    });
  }
};

// Update notice
export const updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      { 
        ...req.body, 
        lastUpdatedBy: req.user.id 
      },
      { new: true, runValidators: true }
    )
      .populate('createdBy', 'name email')
      .populate('lastUpdatedBy', 'name email');

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    logger.info(`Notice updated: ${notice.title} by user ${req.user.id}`);

    res.status(200).json({
      success: true,
      message: 'Notice updated successfully',
      data: { notice }
    });
  } catch (error) {
    logger.error('Error updating notice:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update notice',
      error: error.message
    });
  }
};

// Delete notice
export const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    logger.info(`Notice deleted: ${notice.title} by user ${req.user.id}`);

    res.status(200).json({
      success: true,
      message: 'Notice deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting notice:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete notice',
      error: error.message
    });
  }
};

// Mark notice as read
export const markNoticeAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const { memberId } = req.body;

    const notice = await Notice.findById(id);
    
    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    // Check if already marked as read
    const alreadyRead = notice.readBy.some(
      read => read.memberId.toString() === memberId
    );

    if (!alreadyRead) {
      notice.readBy.push({
        memberId,
        readAt: new Date()
      });
      await notice.save();
    }

    res.status(200).json({
      success: true,
      message: 'Notice marked as read',
      data: { notice }
    });
  } catch (error) {
    logger.error('Error marking notice as read:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to mark notice as read',
      error: error.message
    });
  }
};

// Acknowledge notice
export const acknowledgeNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { memberId, comments } = req.body;

    const notice = await Notice.findById(id);
    
    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    if (!notice.acknowledgmentRequired) {
      return res.status(400).json({
        success: false,
        message: 'This notice does not require acknowledgment'
      });
    }

    // Check if already acknowledged
    const alreadyAcknowledged = notice.acknowledgedBy.some(
      ack => ack.memberId.toString() === memberId
    );

    if (alreadyAcknowledged) {
      return res.status(400).json({
        success: false,
        message: 'Notice already acknowledged'
      });
    }

    notice.acknowledgedBy.push({
      memberId,
      comments,
      acknowledgedAt: new Date()
    });

    await notice.save();

    res.status(200).json({
      success: true,
      message: 'Notice acknowledged successfully',
      data: { notice }
    });
  } catch (error) {
    logger.error('Error acknowledging notice:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to acknowledge notice',
      error: error.message
    });
  }
};
