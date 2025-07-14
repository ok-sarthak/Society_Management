import mongoose from 'mongoose';

const preApprovedVisitorSchema = new mongoose.Schema({
  visitorName: {
    type: String,
    required: true,
    trim: true
  },
  visitorPhone: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MemberList',
    required: true
  },
  buildingNumber: {
    type: Number,
    required: true
  },
  blockNumber: {
    type: Number,
    required: true
  },
  floorNumber: {
    type: Number,
    required: true
  },
  purpose: {
    type: String,
    required: true,
    enum: ['personal', 'delivery', 'maintenance', 'official', 'other']
  },
  validFrom: {
    type: Date,
    required: true,
    default: Date.now
  },
  validTo: {
    type: Date,
    required: true
  },
  visitingDays: [{
    type: String,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  }],
  visitingTimeStart: {
    type: String,
    required: true,
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter time in HH:MM format']
  },
  visitingTimeEnd: {
    type: String,
    required: true,
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter time in HH:MM format']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  notes: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for efficient querying
preApprovedVisitorSchema.index({ approvedBy: 1 });
preApprovedVisitorSchema.index({ validFrom: 1, validTo: 1 });
preApprovedVisitorSchema.index({ buildingNumber: 1, blockNumber: 1, floorNumber: 1 });

export default mongoose.model('PreApprovedVisitor', preApprovedVisitorSchema);
