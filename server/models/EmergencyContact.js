import mongoose from 'mongoose';

const emergencyContactSchema = new mongoose.Schema({
  service: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true
  },
  number: {
    type: String,
    required: [true, 'Primary number is required'],
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  alternateNumber: {
    type: String,
    required: [true, 'Alternate number is required'],
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  responseTime: {
    type: String,
    required: [true, 'Response time is required']
  },
  availability: {
    type: String,
    required: [true, 'Availability is required'],
    default: '24/7'
  },
  priority: {
    type: String,
    required: [true, 'Priority is required'],
    enum: ['critical', 'high', 'medium', 'low'],
    default: 'medium'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for efficient querying
emergencyContactSchema.index({ priority: 1 });
emergencyContactSchema.index({ service: 1 });

export default mongoose.model('EmergencyContact', emergencyContactSchema);
