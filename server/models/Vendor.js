import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vendor name is required'],
    trim: true
  },
  businessName: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Business category is required'],
    enum: ['Electronics', 'Groceries', 'Household', 'Personal Care', 'Books', 'Clothing', 'Sports', 'Services', 'Other']
  },
  specialties: [String],
  contact: {
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
    whatsapp: String,
    website: String
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required'],
      match: [/^[0-9]{6}$/, 'Please enter a valid 6-digit pincode']
    },
    country: {
      type: String,
      default: 'India'
    }
  },
  businessDetails: {
    registrationNumber: String,
    gstNumber: String,
    panNumber: String,
    licenseNumber: String,
    establishedYear: Number
  },
  bankDetails: {
    accountName: String,
    accountNumber: String,
    bankName: String,
    ifscCode: String,
    upiId: String
  },
  serviceAreas: [String],
  operatingHours: {
    monday: { open: String, close: String, isOpen: Boolean },
    tuesday: { open: String, close: String, isOpen: Boolean },
    wednesday: { open: String, close: String, isOpen: Boolean },
    thursday: { open: String, close: String, isOpen: Boolean },
    friday: { open: String, close: String, isOpen: Boolean },
    saturday: { open: String, close: String, isOpen: Boolean },
    sunday: { open: String, close: String, isOpen: Boolean }
  },
  ratings: {
    average: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  verification: {
    isVerified: {
      type: Boolean,
      default: false
    },
    verifiedAt: Date,
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    documents: [{
      type: String,
      url: String,
      verified: Boolean
    }]
  },
  commissionRate: {
    type: Number,
    min: 0,
    max: 100,
    default: 5
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'pending'],
    default: 'pending'
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },
  lastOrderDate: Date,
  totalOrders: {
    type: Number,
    default: 0
  },
  totalRevenue: {
    type: Number,
    default: 0
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
vendorSchema.index({ name: 1 });
vendorSchema.index({ businessName: 1 });
vendorSchema.index({ category: 1 });
vendorSchema.index({ status: 1 });
vendorSchema.index({ 'verification.isVerified': 1 });
vendorSchema.index({ 'ratings.average': -1 });

export default mongoose.model('Vendor', vendorSchema);
