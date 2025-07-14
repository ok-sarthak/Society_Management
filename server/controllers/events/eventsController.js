import Event from '../../models/Event.js';
import logger from '../../utils/logger.js';

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      type, 
      status, 
      upcoming = false,
      startDate,
      endDate 
    } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    
    if (upcoming === 'true') {
      filter.date = { $gte: new Date() };
    }
    
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const events = await Event.find(filter)
      .populate('createdBy', 'name email')
      .populate('registrations.memberId', 'name email phoneNumber')
      .sort({ date: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Event.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        events,
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
    logger.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events',
      error: error.message
    });
  }
};

// Get event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('registrations.memberId', 'name email phoneNumber buildingNumber blockNumber flatNumber')
      .populate('feedback.memberId', 'name email');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { event }
    });
  } catch (error) {
    logger.error('Error fetching event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event',
      error: error.message
    });
  }
};

// Create new event
export const createEvent = async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      createdBy: req.user.id
    };

    const event = new Event(eventData);
    await event.save();

    await event.populate('createdBy', 'name email');

    logger.info(`Event created: ${event.title} by user ${req.user.id}`);

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: { event }
    });
  } catch (error) {
    logger.error('Error creating event:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create event',
      error: error.message
    });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('createdBy', 'name email')
      .populate('registrations.memberId', 'name email phoneNumber');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    logger.info(`Event updated: ${event.title} by user ${req.user.id}`);

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: { event }
    });
  } catch (error) {
    logger.error('Error updating event:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update event',
      error: error.message
    });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    logger.info(`Event deleted: ${event.title} by user ${req.user.id}`);

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete event',
      error: error.message
    });
  }
};

// Register for event
export const registerForEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { memberId, memberName, memberPhone } = req.body;

    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if registration is required and open
    if (event.registrationRequired && event.registrationDeadline < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Registration deadline has passed'
      });
    }

    // Check if member is already registered
    const existingRegistration = event.registrations.find(
      reg => reg.memberId.toString() === memberId
    );

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'Member is already registered for this event'
      });
    }

    // Check capacity
    if (event.registrations.length >= event.capacity) {
      return res.status(400).json({
        success: false,
        message: 'Event is full'
      });
    }

    // Add registration
    event.registrations.push({
      memberId,
      memberName,
      memberPhone,
      paymentStatus: event.entryFee > 0 ? 'pending' : 'exempt'
    });

    await event.save();

    logger.info(`Member ${memberName} registered for event: ${event.title}`);

    res.status(200).json({
      success: true,
      message: 'Successfully registered for event',
      data: { event }
    });
  } catch (error) {
    logger.error('Error registering for event:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to register for event',
      error: error.message
    });
  }
};

// Update attendance
export const updateAttendance = async (req, res) => {
  try {
    const { id, registrationId } = req.params;
    const { attendanceStatus } = req.body;

    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    const registration = event.registrations.id(registrationId);
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    registration.attendanceStatus = attendanceStatus;
    await event.save();

    res.status(200).json({
      success: true,
      message: 'Attendance updated successfully',
      data: { event }
    });
  } catch (error) {
    logger.error('Error updating attendance:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update attendance',
      error: error.message
    });
  }
};

// Add feedback
export const addEventFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { memberId, rating, comment } = req.body;

    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if member already provided feedback
    const existingFeedback = event.feedback.find(
      fb => fb.memberId.toString() === memberId
    );

    if (existingFeedback) {
      return res.status(400).json({
        success: false,
        message: 'Feedback already provided for this event'
      });
    }

    event.feedback.push({
      memberId,
      rating,
      comment
    });

    await event.save();

    res.status(200).json({
      success: true,
      message: 'Feedback added successfully',
      data: { event }
    });
  } catch (error) {
    logger.error('Error adding event feedback:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to add feedback',
      error: error.message
    });
  }
};
