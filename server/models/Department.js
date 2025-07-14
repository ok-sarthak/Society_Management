import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Department name is required'],
    trim: true,
    unique: true
  },
  code: {
    type: String,
    required: [true, 'Department code is required'],
    uppercase: true,
    unique: true,
    maxlength: [5, 'Department code cannot exceed 5 characters']
  },
  description: {
    type: String,
    trim: true
  },
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff'
  },
  budget: {
    annual: {
      type: Number,
      min: [0, 'Budget cannot be negative'],
      default: 0
    },
    spent: {
      type: Number,
      min: [0, 'Spent amount cannot be negative'],
      default: 0
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  workingHours: {
    start: {
      type: String,
      required: [true, 'Working start time is required']
    },
    end: {
      type: String,
      required: [true, 'Working end time is required']
    },
    workingDays: [{
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }]
  },
  responsibilities: [{
    type: String,
    trim: true
  }],
  location: {
    floor: String,
    block: String,
    room: String
  },
  contact: {
    phone: String,
    email: String,
    extension: String
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

// Virtual for employee count
departmentSchema.virtual('employeeCount', {
  ref: 'Staff',
  localField: '_id',
  foreignField: 'employment.department',
  count: true
});

// Virtual for remaining budget
departmentSchema.virtual('remainingBudget').get(function() {
  return this.budget.annual - this.budget.spent;
});

// Index for efficient querying
departmentSchema.index({ isActive: 1 });

export default mongoose.model('Department', departmentSchema);
