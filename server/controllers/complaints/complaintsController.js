import Complaint from '../../models/Complaint.js';
import logger from '../../utils/logger.js';

// Get all complaints
export const getAllComplaints = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status, 
      category, 
      priority,
      buildingNumber,
      memberId 
    } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    if (buildingNumber) filter['location.buildingNumber'] = buildingNumber;
    if (memberId) filter['submittedBy.memberId'] = memberId;

    const complaints = await Complaint.find(filter)
      .populate('submittedBy.memberId', 'name email phoneNumber buildingNumber blockNumber flatNumber')
      .populate('assignedTo.staffId', 'name phoneNumber department')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Complaint.countDocuments(filter);

    // Get status statistics
    const statusStats = await Complaint.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        complaints,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalRecords: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        },
        statistics: {
          byStatus: statusStats
        }
      }
    });
  } catch (error) {
    logger.error('Error fetching complaints:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch complaints',
      error: error.message
    });
  }
};

// Get complaint by ID
export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('submittedBy.memberId', 'name email phoneNumber buildingNumber blockNumber flatNumber')
      .populate('assignedTo.staffId', 'name phoneNumber department')
      .populate('timeline.performedBy.userId', 'name email');

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { complaint }
    });
  } catch (error) {
    logger.error('Error fetching complaint:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch complaint',
      error: error.message
    });
  }
};

// Create new complaint
export const createComplaint = async (req, res) => {
  try {
    const complaintData = {
      ...req.body,
      timeline: [{
        action: 'created',
        description: 'Complaint submitted',
        performedBy: {
          userId: req.user.id,
          name: req.user.name
        }
      }]
    };

    const complaint = new Complaint(complaintData);
    await complaint.save();

    await complaint.populate('submittedBy.memberId', 'name email phoneNumber buildingNumber blockNumber flatNumber');

    logger.info(`Complaint created: ${complaint.ticketId} by user ${req.user.id}`);

    res.status(201).json({
      success: true,
      message: 'Complaint created successfully',
      data: { complaint }
    });
  } catch (error) {
    logger.error('Error creating complaint:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create complaint',
      error: error.message
    });
  }
};

// Update complaint status
export const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedTo, resolution, notes } = req.body;

    const complaint = await Complaint.findById(id);
    
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    // Update status
    if (status) {
      complaint.status = status;
      complaint.timeline.push({
        action: 'status_updated',
        description: `Status changed to ${status}`,
        performedBy: {
          userId: req.user.id,
          name: req.user.name
        }
      });
    }

    // Assign to staff
    if (assignedTo) {
      complaint.assignedTo = {
        ...assignedTo,
        assignedAt: new Date()
      };
      complaint.timeline.push({
        action: 'assigned',
        description: `Assigned to ${assignedTo.staffName}`,
        performedBy: {
          userId: req.user.id,
          name: req.user.name
        }
      });
    }

    // Add resolution
    if (resolution && status === 'resolved') {
      complaint.resolution = {
        ...resolution,
        resolvedBy: {
          userId: req.user.id,
          name: req.user.name
        },
        resolvedAt: new Date()
      };
      complaint.timeline.push({
        action: 'resolved',
        description: resolution.description,
        performedBy: {
          userId: req.user.id,
          name: req.user.name
        }
      });
    }

    // Add notes
    if (notes) {
      complaint.timeline.push({
        action: 'note_added',
        description: notes,
        performedBy: {
          userId: req.user.id,
          name: req.user.name
        }
      });
    }

    await complaint.save();

    await complaint.populate('submittedBy.memberId', 'name email phoneNumber buildingNumber blockNumber flatNumber');
    await complaint.populate('assignedTo.staffId', 'name phoneNumber department');

    logger.info(`Complaint updated: ${complaint.ticketId} by user ${req.user.id}`);

    res.status(200).json({
      success: true,
      message: 'Complaint updated successfully',
      data: { complaint }
    });
  } catch (error) {
    logger.error('Error updating complaint:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update complaint',
      error: error.message
    });
  }
};

// Delete complaint
export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    logger.info(`Complaint deleted: ${complaint.ticketId} by user ${req.user.id}`);

    res.status(200).json({
      success: true,
      message: 'Complaint deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting complaint:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete complaint',
      error: error.message
    });
  }
};

// Add feedback to complaint
export const addComplaintFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const complaint = await Complaint.findById(id);
    
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    if (complaint.status !== 'resolved') {
      return res.status(400).json({
        success: false,
        message: 'Can only provide feedback for resolved complaints'
      });
    }

    complaint.feedback = {
      rating,
      comment,
      submittedAt: new Date()
    };

    complaint.timeline.push({
      action: 'feedback_added',
      description: `Feedback provided with rating: ${rating}/5`,
      performedBy: {
        userId: req.user.id,
        name: req.user.name
      }
    });

    await complaint.save();

    res.status(200).json({
      success: true,
      message: 'Feedback added successfully',
      data: { complaint }
    });
  } catch (error) {
    logger.error('Error adding complaint feedback:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to add feedback',
      error: error.message
    });
  }
};
