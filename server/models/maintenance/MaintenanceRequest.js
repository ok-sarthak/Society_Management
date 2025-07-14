import mongoose from 'mongoose';

const maintenanceRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['electrical', 'plumbing', 'structural', 'cleaning', 'security', 'landscaping', 'other'],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SupportStaff'
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  buildingNumber: {
    type: Number,
    required: true,
    min: 1
  },
  blockNumber: {
    type: Number,
    required: true,
    min: 1
  },
  floorNumber: {
    type: Number,
    required: true,
    min: 0
  },
  estimatedCost: {
    type: Number,
    min: 0,
    default: 0
  },
  actualCost: {
    type: Number,
    min: 0
  },
  completionDate: {
    type: Date
  },
  notes: {
    type: String,
    trim: true
  },
  images: [{
    type: String // URLs to uploaded images
  }],
  workStartDate: {
    type: Date
  },
  workEndDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for efficient querying
maintenanceRequestSchema.index({ status: 1, priority: 1 });
maintenanceRequestSchema.index({ requestedBy: 1 });
maintenanceRequestSchema.index({ assignedTo: 1 });
maintenanceRequestSchema.index({ createdAt: -1 });

export default mongoose.model('MaintenanceRequest', maintenanceRequestSchema);
