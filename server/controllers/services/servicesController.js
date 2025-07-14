import Service from '../../models/Service.js';
import logger from '../../utils/logger.js';

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      serviceType, 
      status,
      buildingNumber 
    } = req.query;

    const filter = {};
    if (serviceType) filter.serviceType = serviceType;
    if (status) filter.status = status;
    
    // Filter by building if specified
    if (buildingNumber) {
      filter.$or = [
        { 'serviceArea.allBuildings': true },
        { 'serviceArea.buildings': { $in: [parseInt(buildingNumber)] } }
      ];
    }

    const services = await Service.find(filter)
      .populate('addedBy', 'name email')
      .sort({ serviceName: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Service.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        services,
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
    logger.error('Error fetching services:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch services',
      error: error.message
    });
  }
};

// Get service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('addedBy', 'name email')
      .populate('bookings.memberId', 'name email phoneNumber buildingNumber blockNumber flatNumber');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { service }
    });
  } catch (error) {
    logger.error('Error fetching service:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service',
      error: error.message
    });
  }
};

// Create new service
export const createService = async (req, res) => {
  try {
    const serviceData = {
      ...req.body,
      addedBy: req.user.id
    };

    const service = new Service(serviceData);
    await service.save();

    await service.populate('addedBy', 'name email');

    logger.info(`Service created: ${service.serviceName} by user ${req.user.id}`);

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: { service }
    });
  } catch (error) {
    logger.error('Error creating service:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create service',
      error: error.message
    });
  }
};

// Update service
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('addedBy', 'name email');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    logger.info(`Service updated: ${service.serviceName} by user ${req.user.id}`);

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: { service }
    });
  } catch (error) {
    logger.error('Error updating service:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update service',
      error: error.message
    });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    logger.info(`Service deleted: ${service.serviceName} by user ${req.user.id}`);

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting service:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete service',
      error: error.message
    });
  }
};

// Book service
export const bookService = async (req, res) => {
  try {
    const { id } = req.params;
    const bookingData = req.body;

    const service = await Service.findById(id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    if (service.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Service is not available for booking'
      });
    }

    // Check if slot is available
    const existingBooking = service.bookings.find(booking => 
      booking.bookingDate.toDateString() === new Date(bookingData.bookingDate).toDateString() &&
      booking.timeSlot.startTime === bookingData.timeSlot.startTime &&
      booking.status !== 'cancelled'
    );

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }

    // Add booking
    const booking = {
      ...bookingData,
      amount: service.pricing.amount,
      createdAt: new Date()
    };

    service.bookings.push(booking);
    await service.save();

    logger.info(`Service booked: ${service.serviceName} by member ${bookingData.memberName}`);

    res.status(200).json({
      success: true,
      message: 'Service booked successfully',
      data: { service }
    });
  } catch (error) {
    logger.error('Error booking service:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to book service',
      error: error.message
    });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { id, bookingId } = req.params;
    const { status } = req.body;

    const service = await Service.findById(id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    const booking = service.bookings.id(bookingId);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    booking.status = status;
    await service.save();

    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      data: { service }
    });
  } catch (error) {
    logger.error('Error updating booking status:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update booking status',
      error: error.message
    });
  }
};

// Add service feedback
export const addServiceFeedback = async (req, res) => {
  try {
    const { id, bookingId } = req.params;
    const { rating, comment } = req.body;

    const service = await Service.findById(id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    const booking = service.bookings.id(bookingId);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Can only provide feedback for completed bookings'
      });
    }

    booking.feedback = {
      rating,
      comment,
      submittedAt: new Date()
    };

    await service.save();

    res.status(200).json({
      success: true,
      message: 'Feedback added successfully',
      data: { service }
    });
  } catch (error) {
    logger.error('Error adding service feedback:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to add feedback',
      error: error.message
    });
  }
};
