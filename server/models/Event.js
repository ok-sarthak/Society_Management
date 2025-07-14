import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
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
  type: {
    type: String,
    enum: ['cultural', 'sports', 'educational', 'social', 'religious', 'maintenance', 'meeting', 'other'],
    required: true
  },
  category: {
    type: String,
    enum: ['indoor', 'outdoor', 'virtual', 'hybrid'],
    default: 'indoor'
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true,
    trim: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  registrationRequired: {
    type: Boolean,
    default: false
  },
  registrationDeadline: {
    type: Date,
    required: function() {
      return this.registrationRequired;
    }
  },
  entryFee: {
    type: Number,
    default: 0,
    min: 0
  },
  organizer: {
    name: String,
    contact: String,
    email: String
  },
  status: {
    type: String,
    enum: ['planned', 'ongoing', 'completed', 'cancelled', 'postponed'],
    default: 'planned'
  },
  targetAudience: [{
    type: String,
    enum: ['children', 'adults', 'seniors', 'families', 'all']
  }],
  registrations: [{
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
    },
    memberName: String,
    memberPhone: String,
    registrationDate: {
      type: Date,
      default: Date.now
    },
    attendanceStatus: {
      type: String,
      enum: ['registered', 'attended', 'absent'],
      default: 'registered'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'exempt'],
      default: 'pending'
    }
  }],
  requirements: [{
    item: String,
    quantity: Number,
    status: {
      type: String,
      enum: ['pending', 'arranged', 'delivered'],
      default: 'pending'
    }
  }],
  budget: {
    estimated: Number,
    actual: Number,
    expenses: [{
      description: String,
      amount: Number,
      category: String,
      date: Date
    }]
  },
  photos: [{
    fileName: String,
    filePath: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  feedback: [{
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    submittedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Virtual for registration count
eventSchema.virtual('registrationCount').get(function() {
  return this.registrations.length;
});

// Virtual for average rating
eventSchema.virtual('averageRating').get(function() {
  if (this.feedback.length === 0) return 0;
  const sum = this.feedback.reduce((acc, fb) => acc + fb.rating, 0);
  return (sum / this.feedback.length).toFixed(1);
});

// Index for better query performance
eventSchema.index({ date: 1 });
eventSchema.index({ type: 1 });
eventSchema.index({ status: 1 });

export default mongoose.model('Event', eventSchema);
