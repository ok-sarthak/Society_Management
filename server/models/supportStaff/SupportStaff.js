import mongoose from 'mongoose';

const supportStaffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  employeeId: {
    type: String,
    unique: true,
    sparse: true
  },
  role: {
    type: String,
    required: true,
    enum: ['watchman', 'cleaner', 'gardener', 'maintenance', 'security', 'plumber', 'electrician', 'other']
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  email: {
    type: String,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  address: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 65
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  aadharNumber: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{12}$/, 'Please enter a valid 12-digit Aadhar number']
  },
  panNumber: {
    type: String,
    match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Please enter a valid PAN number']
  },
  bankDetails: {
    accountNumber: String,
    ifscCode: String,
    bankName: String,
    branchName: String
  },
  salary: {
    type: Number,
    required: true,
    min: 0
  },
  joinDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  workingDays: [{
    type: String,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  }],
  workingHours: {
    start: {
      type: String,
      required: true,
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter time in HH:MM format']
    },
    end: {
      type: String,
      required: true,
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter time in HH:MM format']
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phoneNumber: String
  },
  documents: [{
    type: {
      type: String,
      enum: ['aadhar', 'pan', 'photo', 'address_proof', 'bank_passbook', 'police_verification', 'other']
    },
    url: String,
    uploadedDate: {
      type: Date,
      default: Date.now
    }
  }],
  performanceRating: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
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

// Generate unique employee ID before saving
supportStaffSchema.pre('save', async function(next) {
  if (!this.employeeId) {
    const rolePrefix = this.role.substring(0, 3).toUpperCase();
    const count = await this.constructor.countDocuments({ role: this.role });
    this.employeeId = `${rolePrefix}${(count + 1).toString().padStart(3, '0')}`;
  }
  next();
});

// Index for efficient querying
supportStaffSchema.index({ role: 1 });
supportStaffSchema.index({ isActive: 1 });

export default mongoose.model('SupportStaff', supportStaffSchema);
