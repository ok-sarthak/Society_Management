import mongoose from 'mongoose';

const securityLogSchema = new mongoose.Schema({
  eventType: {
    type: String,
    required: [true, 'Event type is required'],
    enum: [
      'login_success', 'login_failed', 'logout', 'password_change',
      'permission_denied', 'data_access', 'data_modification',
      'security_breach', 'account_locked', 'account_unlocked',
      'session_expired', 'unauthorized_access'
    ]
  },
  severity: {
    type: String,
    required: [true, 'Severity is required'],
    enum: ['info', 'warning', 'critical'],
    default: 'info'
  },
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  ipAddress: {
    type: String,
    required: [true, 'IP address is required'],
    match: [/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/, 'Please enter a valid IP address']
  },
  userAgent: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: [true, 'Action description is required'],
    trim: true
  },
  resource: {
    type: String,
    required: [true, 'Resource is required'],
    trim: true
  },
  details: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  sessionId: String,
  requestId: String,
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Index for efficient querying
securityLogSchema.index({ eventType: 1, severity: 1 });
securityLogSchema.index({ userId: 1, createdAt: -1 });
securityLogSchema.index({ ipAddress: 1 });
securityLogSchema.index({ createdAt: -1 });

export default mongoose.model('SecurityLog', securityLogSchema);
