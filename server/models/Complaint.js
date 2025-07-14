import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    unique: true,
    required: true
  },
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
    enum: ['maintenance', 'plumbing', 'electrical', 'security', 'noise', 'parking', 'cleaning', 'other'],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'resolved', 'closed', 'rejected'],
    default: 'open'
  },
  submittedBy: {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      required: true
    },
    memberName: String,
    memberPhone: String,
    buildingNumber: Number,
    blockNumber: Number,
    flatNumber: String
  },
  location: {
    buildingNumber: Number,
    blockNumber: Number,
    floorNumber: Number,
    specificLocation: String
  },
  assignedTo: {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SupportStaff'
    },
    staffName: String,
    assignedAt: Date
  },
  timeline: [{
    action: String,
    description: String,
    performedBy: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      name: String
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  resolution: {
    description: String,
    resolvedBy: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      name: String
    },
    resolvedAt: Date,
    timeToResolve: Number // in hours
  },
  attachments: [{
    fileName: String,
    filePath: String,
    fileType: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    submittedAt: Date
  },
  estimatedCost: {
    type: Number,
    default: 0
  },
  actualCost: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Generate ticket ID before saving
complaintSchema.pre('save', async function(next) {
  if (!this.ticketId) {
    const count = await this.constructor.countDocuments();
    this.ticketId = `CMP${Date.now().toString().slice(-6)}${(count + 1).toString().padStart(3, '0')}`;
  }
  next();
});

// Calculate time to resolve when status changes to resolved
complaintSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'resolved' && !this.resolution.timeToResolve) {
    const timeToResolve = Math.round((new Date() - this.createdAt) / (1000 * 60 * 60)); // in hours
    this.resolution.timeToResolve = timeToResolve;
    this.resolution.resolvedAt = new Date();
  }
  next();
});

// Index for better query performance
complaintSchema.index({ status: 1 });
complaintSchema.index({ category: 1 });
complaintSchema.index({ priority: 1 });
complaintSchema.index({ 'submittedBy.memberId': 1 });

export default mongoose.model('Complaint', complaintSchema);
