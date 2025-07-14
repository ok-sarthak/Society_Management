import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
    trim: true
  },
  serviceType: {
    type: String,
    enum: ['maintenance', 'cleaning', 'security', 'utility', 'transport', 'health', 'education', 'recreational', 'other'],
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  provider: {
    name: String,
    contactPerson: String,
    phone: String,
    email: String,
    address: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 0
    }
  },
  pricing: {
    type: {
      type: String,
      enum: ['fixed', 'hourly', 'per_unit', 'monthly', 'yearly'],
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  availability: {
    days: [{
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }],
    timeSlots: [{
      startTime: String,
      endTime: String
    }],
    emergencyAvailable: {
      type: Boolean,
      default: false
    }
  },
  serviceArea: {
    buildings: [{
      type: Number
    }],
    allBuildings: {
      type: Boolean,
      default: true
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  bookings: [{
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
    },
    memberName: String,
    bookingDate: Date,
    timeSlot: {
      startTime: String,
      endTime: String
    },
    buildingNumber: Number,
    blockNumber: Number,
    flatNumber: String,
    status: {
      type: String,
      enum: ['booked', 'confirmed', 'in_progress', 'completed', 'cancelled'],
      default: 'booked'
    },
    amount: Number,
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending'
    },
    specialInstructions: String,
    feedback: {
      rating: Number,
      comment: String,
      submittedAt: Date
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  requirements: [{
    item: String,
    quantity: String,
    providedBy: {
      type: String,
      enum: ['service_provider', 'customer', 'society'],
      default: 'service_provider'
    }
  }],
  terms: {
    cancellationPolicy: String,
    advanceBookingRequired: {
      type: Number,
      default: 24 // hours
    },
    maxBookingsPerMember: {
      type: Number,
      default: 5
    }
  },
  attachments: [{
    fileName: String,
    filePath: String,
    fileType: String,
    description: String
  }],
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Virtual for average rating
serviceSchema.virtual('averageRating').get(function() {
  if (this.bookings.length === 0) return 0;
  const ratings = this.bookings.filter(booking => booking.feedback && booking.feedback.rating);
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, booking) => acc + booking.feedback.rating, 0);
  return (sum / ratings.length).toFixed(1);
});

// Index for better query performance
serviceSchema.index({ serviceType: 1 });
serviceSchema.index({ status: 1 });
serviceSchema.index({ 'provider.name': 1 });

export default mongoose.model('Service', serviceSchema);
