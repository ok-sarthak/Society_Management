import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['general', 'urgent', 'maintenance', 'event', 'rule', 'meeting', 'emergency'],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  targetAudience: {
    type: String,
    enum: ['all', 'owners', 'tenants', 'specific_building', 'specific_block'],
    default: 'all'
  },
  targetBuildings: [{
    type: Number
  }],
  targetBlocks: [{
    buildingNumber: Number,
    blockNumber: Number
  }],
  publishDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    required: true
  },
  isSticky: {
    type: Boolean,
    default: false
  },
  attachments: [{
    fileName: String,
    filePath: String,
    fileType: String,
    fileSize: Number
  }],
  readBy: [{
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
    },
    readAt: {
      type: Date,
      default: Date.now
    }
  }],
  acknowledgmentRequired: {
    type: Boolean,
    default: false
  },
  acknowledgedBy: [{
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
    },
    acknowledgedAt: {
      type: Date,
      default: Date.now
    },
    comments: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastUpdatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Virtual for read percentage
noticeSchema.virtual('readPercentage').get(function() {
  // This would need to be calculated based on total members in target audience
  return 0; // Placeholder
});

// Virtual for acknowledgment percentage
noticeSchema.virtual('acknowledgmentPercentage').get(function() {
  if (!this.acknowledgmentRequired) return 100;
  // This would need to be calculated based on total members in target audience
  return 0; // Placeholder
});

// Index for better query performance
noticeSchema.index({ type: 1 });
noticeSchema.index({ status: 1 });
noticeSchema.index({ publishDate: -1 });
noticeSchema.index({ expiryDate: 1 });
noticeSchema.index({ isSticky: -1 });

export default mongoose.model('Notice', noticeSchema);
