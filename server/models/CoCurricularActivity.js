import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Activity title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Activity description is required']
  },
  category: {
    type: String,
    required: [true, 'Activity category is required'],
    enum: ['Sports', 'Arts', 'Music', 'Dance', 'Drama', 'Debate', 'Quiz', 'Technology', 'Science', 'Literature', 'Photography', 'Cooking', 'Fitness', 'Yoga', 'Other']
  },
  type: {
    type: String,
    enum: ['workshop', 'competition', 'class', 'event', 'club', 'training'],
    required: true
  },
  ageGroups: [{
    type: String,
    enum: ['Kids (5-12)', 'Teens (13-17)', 'Adults (18-59)', 'Seniors (60+)', 'All Ages']
  }],
  instructor: {
    name: {
      type: String,
      required: [true, 'Instructor name is required']
    },
    qualification: String,
    experience: String,
    specialization: [String],
    contact: {
      phone: String,
      email: String
    },
    bio: String,
    image: String
  },
  schedule: {
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: Date,
    duration: String,
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'biweekly', 'monthly', 'one-time'],
      default: 'weekly'
    },
    timings: [{
      day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      startTime: String,
      endTime: String
    }],
    totalSessions: Number
  },
  venue: {
    location: {
      type: String,
      required: [true, 'Venue location is required']
    },
    capacity: {
      type: Number,
      required: [true, 'Venue capacity is required'],
      min: 1
    },
    facilities: [String],
    equipment: [String]
  },
  fees: {
    amount: {
      type: Number,
      required: [true, 'Fee amount is required'],
      min: 0
    },
    type: {
      type: String,
      enum: ['per-session', 'monthly', 'quarterly', 'one-time'],
      default: 'monthly'
    },
    currency: {
      type: String,
      default: 'INR'
    },
    earlyBirdDiscount: {
      percentage: Number,
      validUntil: Date
    },
    familyDiscount: {
      percentage: Number,
      minMembers: Number
    }
  },
  enrollment: {
    maxParticipants: {
      type: Number,
      required: [true, 'Maximum participants limit is required'],
      min: 1
    },
    currentEnrollment: {
      type: Number,
      default: 0
    },
    waitingList: {
      type: Number,
      default: 0
    },
    registrationDeadline: Date,
    requirements: [String],
    prerequisites: [String]
  },
  participants: [{
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MemberList',
      required: true
    },
    enrolledDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'completed', 'dropped'],
      default: 'active'
    },
    attendance: [{
      date: Date,
      present: Boolean,
      notes: String
    }],
    progress: {
      level: String,
      achievements: [String],
      feedback: String
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'pending', 'overdue'],
      default: 'pending'
    }
  }],
  materials: [{
    name: String,
    description: String,
    type: {
      type: String,
      enum: ['required', 'optional', 'provided']
    },
    cost: Number
  }],
  achievements: [{
    title: String,
    description: String,
    criteria: String,
    badge: String
  }],
  gallery: [{
    type: String,
    caption: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  feedback: [{
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MemberList'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['planning', 'registration-open', 'ongoing', 'completed', 'cancelled', 'postponed'],
    default: 'planning'
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  tags: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Virtual to check if enrollment is full
activitySchema.virtual('isEnrollmentFull').get(function() {
  return this.enrollment.currentEnrollment >= this.enrollment.maxParticipants;
});

// Virtual to calculate availability
activitySchema.virtual('availableSlots').get(function() {
  return this.enrollment.maxParticipants - this.enrollment.currentEnrollment;
});

// Virtual to calculate average rating
activitySchema.virtual('averageRating').get(function() {
  if (this.feedback.length === 0) return 0;
  const total = this.feedback.reduce((sum, fb) => sum + fb.rating, 0);
  return (total / this.feedback.length).toFixed(1);
});

// Pre-save middleware to update enrollment count
activitySchema.pre('save', function(next) {
  this.enrollment.currentEnrollment = this.participants.filter(p => p.status === 'active').length;
  next();
});

// Index for efficient querying
activitySchema.index({ title: 1 });
activitySchema.index({ category: 1 });
activitySchema.index({ type: 1 });
activitySchema.index({ status: 1 });
activitySchema.index({ 'schedule.startDate': 1 });
activitySchema.index({ 'instructor.name': 1 });

export default mongoose.model('CoCurricularActivity', activitySchema);
