import SupportContact from '../../models/SupportContact.js';
import EmergencyContact from '../../models/EmergencyContact.js';
import HelpdeskTicket from '../../models/HelpdeskTicket.js';

// Support Contacts Controllers
export const getSupportContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, department, isActive, search } = req.query;
    
    const filter = {};
    if (department) filter.department = department;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { designation: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const contacts = await SupportContact.find(filter)
      .sort({ name: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('createdBy', 'name email');

    const total = await SupportContact.countDocuments(filter);

    res.json({
      contacts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching support contacts', error: error.message });
  }
};

export const createSupportContact = async (req, res) => {
  try {
    const contactData = {
      ...req.body,
      createdBy: req.user.id
    };

    const contact = new SupportContact(contactData);
    await contact.save();

    res.status(201).json({ message: 'Support contact created successfully', contact });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Contact with this email already exists' });
    }
    res.status(400).json({ message: 'Error creating support contact', error: error.message });
  }
};

export const updateSupportContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await SupportContact.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Support contact not found' });
    }

    res.json({ message: 'Support contact updated successfully', contact });
  } catch (error) {
    res.status(400).json({ message: 'Error updating support contact', error: error.message });
  }
};

export const deleteSupportContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await SupportContact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ message: 'Support contact not found' });
    }

    res.json({ message: 'Support contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting support contact', error: error.message });
  }
};

export const rateSupportContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const contact = await SupportContact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: 'Support contact not found' });
    }

    contact.ratings.push({
      rating,
      comment,
      ratedBy: req.user.id
    });

    await contact.save();

    res.json({ message: 'Rating added successfully', contact });
  } catch (error) {
    res.status(400).json({ message: 'Error adding rating', error: error.message });
  }
};

// Emergency Contacts Controllers
export const getEmergencyContacts = async (req, res) => {
  try {
    const { service, priority, isActive, search } = req.query;
    
    const filter = {};
    if (service) filter.service = service;
    if (priority) filter.priority = priority;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (search) {
      filter.$or = [
        { service: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'primaryContact.name': { $regex: search, $options: 'i' } }
      ];
    }

    const contacts = await EmergencyContact.find(filter)
      .sort({ priority: 1, service: 1 })
      .populate('createdBy', 'name email');

    res.json({ contacts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching emergency contacts', error: error.message });
  }
};

export const createEmergencyContact = async (req, res) => {
  try {
    const contactData = {
      ...req.body,
      createdBy: req.user.id
    };

    const contact = new EmergencyContact(contactData);
    await contact.save();

    res.status(201).json({ message: 'Emergency contact created successfully', contact });
  } catch (error) {
    res.status(400).json({ message: 'Error creating emergency contact', error: error.message });
  }
};

export const updateEmergencyContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await EmergencyContact.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Emergency contact not found' });
    }

    res.json({ message: 'Emergency contact updated successfully', contact });
  } catch (error) {
    res.status(400).json({ message: 'Error updating emergency contact', error: error.message });
  }
};

export const deleteEmergencyContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await EmergencyContact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ message: 'Emergency contact not found' });
    }

    res.json({ message: 'Emergency contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting emergency contact', error: error.message });
  }
};

// Helpdesk Tickets Controllers
export const getHelpdeskTickets = async (req, res) => {
  try {
    const { page = 1, limit = 10, priority, status, category, assignedTo, search } = req.query;
    
    const filter = {};
    if (priority) filter.priority = priority;
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (assignedTo) filter.assignedTo = assignedTo;
    if (search) {
      filter.$or = [
        { ticketId: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const tickets = await HelpdeskTicket.find(filter)
      .sort({ priority: 1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('submittedBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('comments.author', 'name email');

    const total = await HelpdeskTicket.countDocuments(filter);

    res.json({
      tickets,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching helpdesk tickets', error: error.message });
  }
};

export const createHelpdeskTicket = async (req, res) => {
  try {
    const ticketData = {
      ...req.body,
      submittedBy: req.user.id
    };

    const ticket = new HelpdeskTicket(ticketData);
    await ticket.save();

    res.status(201).json({ message: 'Helpdesk ticket created successfully', ticket });
  } catch (error) {
    res.status(400).json({ message: 'Error creating helpdesk ticket', error: error.message });
  }
};

export const updateHelpdeskTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await HelpdeskTicket.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    ).populate('submittedBy assignedTo', 'name email');

    if (!ticket) {
      return res.status(404).json({ message: 'Helpdesk ticket not found' });
    }

    res.json({ message: 'Helpdesk ticket updated successfully', ticket });
  } catch (error) {
    res.status(400).json({ message: 'Error updating helpdesk ticket', error: error.message });
  }
};

export const addTicketComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, isInternal = false } = req.body;

    const ticket = await HelpdeskTicket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Helpdesk ticket not found' });
    }

    ticket.comments.push({
      comment,
      author: req.user.id,
      isInternal
    });

    await ticket.save();
    await ticket.populate('comments.author', 'name email');

    res.json({ message: 'Comment added successfully', ticket });
  } catch (error) {
    res.status(400).json({ message: 'Error adding comment', error: error.message });
  }
};

export const assignTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { assignedTo } = req.body;

    const ticket = await HelpdeskTicket.findByIdAndUpdate(
      id,
      { assignedTo, status: 'in-progress' },
      { new: true, runValidators: true }
    ).populate('submittedBy assignedTo', 'name email');

    if (!ticket) {
      return res.status(404).json({ message: 'Helpdesk ticket not found' });
    }

    res.json({ message: 'Ticket assigned successfully', ticket });
  } catch (error) {
    res.status(400).json({ message: 'Error assigning ticket', error: error.message });
  }
};

export const closeTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { resolution } = req.body;

    const ticket = await HelpdeskTicket.findByIdAndUpdate(
      id,
      { 
        status: 'resolved',
        resolution,
        resolvedAt: new Date()
      },
      { new: true, runValidators: true }
    ).populate('submittedBy assignedTo', 'name email');

    if (!ticket) {
      return res.status(404).json({ message: 'Helpdesk ticket not found' });
    }

    res.json({ message: 'Ticket closed successfully', ticket });
  } catch (error) {
    res.status(400).json({ message: 'Error closing ticket', error: error.message });
  }
};
