import mongoose from 'mongoose';

const maintenanceRateSchema = new mongoose.Schema({
  buildingNumber: {
    type: Number,
    required: true
  },
  blockNumber: {
    type: Number,
    required: true
  },
  floorNumber: {
    type: Number
  },
  rate: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  effectiveFrom: {
    type: Date,
    required: true,
    default: Date.now
  },
  effectiveTo: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
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

// Index for efficient querying
maintenanceRateSchema.index({ buildingNumber: 1, blockNumber: 1, floorNumber: 1 });
maintenanceRateSchema.index({ effectiveFrom: 1, effectiveTo: 1 });

export default mongoose.model('MaintenanceRate', maintenanceRateSchema);
