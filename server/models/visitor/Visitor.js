import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  visitorName: {
    type: String,
    required: true,
    trim: true
  },
  visitorPhone: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  visitorId: {
    type: String,
    unique: true,
    sparse: true
  },
  idProofType: {
    type: String,
    enum: ['aadhar', 'pan', 'driving_license', 'passport', 'voter_id', 'other'],
    required: true
  },
  idProofNumber: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true,
    enum: ['personal', 'delivery', 'maintenance', 'official', 'other']
  },
  purposeDescription: {
    type: String
  },
  visitingMember: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MemberList',
    required: true
  },
  buildingNumber: {
    type: Number,
    required: true
  },
  blockNumber: {
    type: Number,
    required: true
  },
  floorNumber: {
    type: Number,
    required: true
  },
  entryTime: {
    type: Date,
    default: Date.now,
    required: true
  },
  exitTime: {
    type: Date
  },
  status: {
    type: String,
    enum: ['entered', 'exited', 'overstayed'],
    default: 'entered'
  },
  vehicleNumber: {
    type: String
  },
  vehicleType: {
    type: String,
    enum: ['car', 'bike', 'scooter', 'bicycle', 'auto', 'taxi', 'other']
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MemberList'
  },
  isPreApproved: {
    type: Boolean,
    default: false
  },
  expectedDuration: {
    type: Number, // in minutes
    default: 60
  },
  actualDuration: {
    type: Number // in minutes
  },
  remarks: {
    type: String
  },
  photo: {
    type: String // URL to visitor photo
  },
  guardName: {
    type: String
  },
  entryGate: {
    type: String,
    enum: ['main', 'side', 'back', 'parking'],
    default: 'main'
  },
  exitGate: {
    type: String,
    enum: ['main', 'side', 'back', 'parking']
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

// Generate unique visitor ID before saving
visitorSchema.pre('save', async function(next) {
  if (!this.visitorId) {
    let attempts = 0;
    const maxAttempts = 10;
    
    while (attempts < maxAttempts) {
      try {
        const today = new Date();
        const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
        const count = await this.constructor.countDocuments({
          createdAt: {
            $gte: new Date(today.setHours(0, 0, 0, 0)),
            $lt: new Date(today.setHours(23, 59, 59, 999))
          }
        });
        
        const newVisitorId = `VIS${dateStr}${(count + 1 + attempts).toString().padStart(3, '0')}`;
        
        // Check if this visitorId already exists
        const existingVisitor = await this.constructor.findOne({ visitorId: newVisitorId });
        if (!existingVisitor) {
          this.visitorId = newVisitorId;
          break;
        }
        attempts++;
      } catch (error) {
        attempts++;
        if (attempts >= maxAttempts) {
          // Fallback to timestamp-based ID
          this.visitorId = `VIS${Date.now().toString().slice(-8)}`;
        }
      }
    }
  }
  next();
});

// Calculate actual duration when visitor exits
visitorSchema.pre('save', function(next) {
  if (this.exitTime && this.entryTime) {
    this.actualDuration = Math.floor((this.exitTime - this.entryTime) / (1000 * 60));
    this.status = 'exited';
  } else if (this.entryTime && !this.exitTime) {
    const now = new Date();
    const timeDiff = Math.floor((now - this.entryTime) / (1000 * 60));
    if (timeDiff > this.expectedDuration + 60) { // 1 hour grace period
      this.status = 'overstayed';
    }
  }
  next();
});

// Index for efficient querying
visitorSchema.index({ visitingMember: 1 });
visitorSchema.index({ entryTime: 1 });
visitorSchema.index({ status: 1 });
visitorSchema.index({ buildingNumber: 1, blockNumber: 1, floorNumber: 1 });

export default mongoose.model('Visitor', visitorSchema);
