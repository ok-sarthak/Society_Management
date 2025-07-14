import mongoose from 'mongoose';

const systemSettingsSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Settings category is required'],
    enum: ['password_policy', 'session_settings', 'login_security', 'encryption_settings', 'audit_settings', 'backup_settings']
  },
  settings: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'Settings object is required']
  },
  version: {
    type: Number,
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true
  },
  modifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  changeLog: [{
    previousSettings: mongoose.Schema.Types.Mixed,
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Ensure only one active setting per category
systemSettingsSchema.index({ category: 1, isActive: 1 }, { unique: true });

// Middleware to increment version on update
systemSettingsSchema.pre('save', function(next) {
  if (this.isModified('settings') && !this.isNew) {
    this.version += 1;
  }
  next();
});

export default mongoose.model('SystemSettings', systemSettingsSchema);
