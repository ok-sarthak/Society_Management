import mongoose from 'mongoose';

const supportContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Contact name is required'],
    trim: true
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: ['Administration', 'Security', 'Maintenance', 'Resident Services', 'Finance']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['management', 'security', 'maintenance', 'services', 'finance']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  availability: {
    type: String,
    required: [true, 'Availability is required']
  },
  floor: {
    type: String,
    required: [true, 'Floor/Location is required']
  },
  emergencyOnly: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  totalCalls: {
    type: Number,
    default: 0
  },
  averageResponseTime: {
    type: String,
    default: '0 minutes'
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
supportContactSchema.index({ department: 1, category: 1 });
supportContactSchema.index({ name: 1 });

export default mongoose.model('SupportContact', supportContactSchema);
