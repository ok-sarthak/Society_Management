import mongoose from 'mongoose';

const helpdeskTicketSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    required: [true, 'Ticket ID is required'],
    unique: true,
    uppercase: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Maintenance', 'Security', 'Services', 'Finance']
  },
  issue: {
    type: String,
    required: [true, 'Issue description is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Detailed description is required'],
    trim: true
  },
  priority: {
    type: String,
    required: [true, 'Priority is required'],
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: ['pending', 'assigned', 'in-progress', 'resolved', 'closed'],
    default: 'pending'
  },
  reportedBy: {
    type: String,
    required: [true, 'Reporter name is required'],
    trim: true
  },
  reporterContact: {
    phone: String,
    email: String,
    apartment: String
  },
  assignedTo: {
    type: String,
    trim: true
  },
  assignedDate: {
    type: Date
  },
  expectedResolution: {
    type: Date
  },
  actualResolution: {
    type: Date
  },
  resolution: {
    type: String,
    trim: true
  },
  attachments: [{
    filename: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    user: String,
    comment: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  lastUpdate: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Middleware to update lastUpdate field
helpdeskTicketSchema.pre('save', function(next) {
  this.lastUpdate = new Date();
  next();
});

// Auto-generate ticket ID
helpdeskTicketSchema.pre('save', async function(next) {
  if (!this.ticketId) {
    const count = await this.constructor.countDocuments();
    this.ticketId = `HD${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

// Index for efficient querying
helpdeskTicketSchema.index({ category: 1, status: 1 });
helpdeskTicketSchema.index({ priority: 1 });
helpdeskTicketSchema.index({ reportedBy: 1 });

export default mongoose.model('HelpdeskTicket', helpdeskTicketSchema);
