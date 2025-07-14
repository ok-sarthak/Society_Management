import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: [true, 'Employee ID is required'],
    unique: true,
    uppercase: true
  },
  personalInfo: {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required']
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: [true, 'Gender is required']
    },
    maritalStatus: {
      type: String,
      enum: ['Single', 'Married', 'Divorced', 'Widowed'],
      default: 'Single'
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    }
  },
  contactInfo: {
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String
    },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: {
        type: String,
        default: 'India'
      }
    }
  },
  employment: {
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: [true, 'Department is required']
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true
    },
    employmentType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Temporary'],
      default: 'Full-time'
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: Date,
    workingHours: {
      start: String,
      end: String,
      workingDays: [String]
    },
    reportingTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff'
    }
  },
  salary: {
    basicSalary: {
      type: Number,
      required: [true, 'Basic salary is required'],
      min: [0, 'Salary cannot be negative']
    },
    allowances: {
      hra: { type: Number, default: 0 },
      transport: { type: Number, default: 0 },
      medical: { type: Number, default: 0 },
      other: { type: Number, default: 0 }
    },
    deductions: {
      pf: { type: Number, default: 0 },
      esi: { type: Number, default: 0 },
      tax: { type: Number, default: 0 },
      other: { type: Number, default: 0 }
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  documents: [{
    type: {
      type: String,
      enum: ['Aadhar', 'PAN', 'Passport', 'Driving License', 'Resume', 'Photo', 'Other'],
      required: true
    },
    filename: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  performance: {
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    lastReviewDate: Date,
    nextReviewDate: Date,
    goals: [String],
    achievements: [String]
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'terminated', 'on-leave'],
    default: 'active'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Virtual for full name
staffSchema.virtual('fullName').get(function() {
  return `${this.personalInfo.firstName} ${this.personalInfo.lastName}`;
});

// Virtual for total salary
staffSchema.virtual('totalSalary').get(function() {
  const allowances = Object.values(this.salary.allowances).reduce((sum, val) => sum + val, 0);
  const deductions = Object.values(this.salary.deductions).reduce((sum, val) => sum + val, 0);
  return this.salary.basicSalary + allowances - deductions;
});

// Auto-generate employee ID
staffSchema.pre('save', async function(next) {
  if (!this.employeeId) {
    const count = await this.constructor.countDocuments();
    this.employeeId = `EMP${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Index for efficient querying
staffSchema.index({ 'employment.department': 1 });
staffSchema.index({ status: 1 });
staffSchema.index({ 'personalInfo.firstName': 1, 'personalInfo.lastName': 1 });

export default mongoose.model('Staff', staffSchema);
