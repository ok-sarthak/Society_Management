import mongoose from 'mongoose';

const buildingSchema = new mongoose.Schema({
  buildingNumber: {
    type: Number,
    required: true,
    unique: true
  },
  buildingName: {
    type: String,
    required: true,
    trim: true
  },
  totalFloors: {
    type: Number,
    required: true,
    min: 1
  },
  totalBlocks: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  unitsPerFloor: {
    type: Number,
    required: true,
    min: 1
  },
  totalUnits: {
    type: Number,
    required: true
  },
  buildingType: {
    type: String,
    enum: ['residential', 'commercial', 'mixed'],
    default: 'residential'
  },
  constructionYear: {
    type: Number,
    required: true
  },
  amenities: [{
    name: String,
    status: {
      type: String,
      enum: ['active', 'inactive', 'maintenance'],
      default: 'active'
    },
    description: String
  }],
  maintenanceSchedule: [{
    type: {
      type: String,
      enum: ['elevator', 'generator', 'plumbing', 'electrical', 'cleaning', 'security'],
      required: true
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'quarterly', 'annually'],
      required: true
    },
    lastMaintenance: Date,
    nextMaintenance: Date,
    cost: Number,
    assignedTo: String
  }],
  status: {
    type: String,
    enum: ['active', 'under_construction', 'maintenance'],
    default: 'active'
  },
  address: {
    street: String,
    area: String,
    city: String,
    state: String,
    pincode: String
  },
  emergencyContacts: [{
    name: String,
    role: String,
    phone: String,
    email: String
  }],
  utilities: {
    electricity: {
      provider: String,
      accountNumber: String,
      monthlyAverage: Number
    },
    water: {
      provider: String,
      accountNumber: String,
      monthlyAverage: Number
    },
    gas: {
      provider: String,
      accountNumber: String,
      monthlyAverage: Number
    }
  }
}, {
  timestamps: true
});

// Calculate total units before saving
buildingSchema.pre('save', function(next) {
  this.totalUnits = this.totalFloors * this.totalBlocks * this.unitsPerFloor;
  next();
});

// Index for better query performance
buildingSchema.index({ buildingName: 1 });

export default mongoose.model('Building', buildingSchema);
