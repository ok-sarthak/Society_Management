import mongoose from 'mongoose';

const healthRecordSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  memberName: String,
  recordType: {
    type: String,
    enum: ['medical_history', 'emergency_contact', 'health_checkup', 'medication', 'allergy', 'vaccination'],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  // Medical History specific fields
  medicalHistory: {
    condition: String,
    diagnosedDate: Date,
    doctor: String,
    hospital: String,
    status: {
      type: String,
      enum: ['ongoing', 'resolved', 'chronic'],
      default: 'ongoing'
    }
  },
  // Emergency Contact specific fields
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
    email: String,
    address: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  },
  // Health Checkup specific fields
  healthCheckup: {
    doctor: String,
    hospital: String,
    checkupType: String,
    findings: String,
    recommendations: String,
    nextCheckupDate: Date
  },
  // Medication specific fields
  medication: {
    name: String,
    dosage: String,
    frequency: String,
    startDate: Date,
    endDate: Date,
    prescribedBy: String,
    purpose: String,
    sideEffects: String,
    status: {
      type: String,
      enum: ['active', 'completed', 'discontinued'],
      default: 'active'
    }
  },
  // Allergy specific fields
  allergy: {
    allergen: String,
    severity: {
      type: String,
      enum: ['mild', 'moderate', 'severe', 'life_threatening'],
      required: true
    },
    symptoms: String,
    treatment: String,
    firstOccurrence: Date
  },
  // Vaccination specific fields
  vaccination: {
    vaccineName: String,
    doseNumber: Number,
    vaccinatedAt: String,
    vaccinatedBy: String,
    batchNumber: String,
    nextDueDate: Date,
    sideEffects: String
  },
  // Common fields
  attachments: [{
    fileName: String,
    filePath: String,
    fileType: String,
    description: String
  }],
  isPrivate: {
    type: Boolean,
    default: true
  },
  accessLevel: {
    type: String,
    enum: ['member_only', 'emergency_only', 'admin_access'],
    default: 'member_only'
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastUpdatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for better query performance
healthRecordSchema.index({ memberId: 1 });
healthRecordSchema.index({ recordType: 1 });
healthRecordSchema.index({ date: -1 });

export default mongoose.model('HealthRecord', healthRecordSchema);
