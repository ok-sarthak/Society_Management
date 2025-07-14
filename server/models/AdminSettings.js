import mongoose from 'mongoose';

const systemConfigSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Configuration category is required'],
    enum: ['general', 'security', 'notifications', 'payments', 'maintenance', 'user', 'api', 'backup', 'system']
  },
  key: {
    type: String,
    required: [true, 'Configuration key is required'],
    trim: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'Configuration value is required']
  },
  description: String,
  dataType: {
    type: String,
    enum: ['string', 'number', 'boolean', 'array', 'object'],
    required: true
  },
  isEditable: {
    type: Boolean,
    default: true
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  validation: {
    required: Boolean,
    minValue: Number,
    maxValue: Number,
    minLength: Number,
    maxLength: Number,
    pattern: String,
    allowedValues: [mongoose.Schema.Types.Mixed]
  },
  lastModified: {
    date: {
      type: Date,
      default: Date.now
    },
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  version: {
    type: Number,
    default: 1
  },
  history: [{
    value: mongoose.Schema.Types.Mixed,
    changedAt: {
      type: Date,
      default: Date.now
    },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String
  }]
}, {
  timestamps: true
});

const themeConfigSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Theme name is required'],
    trim: true
  },
  description: String,
  isDefault: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  colors: {
    primary: {
      type: String,
      required: [true, 'Primary color is required']
    },
    secondary: String,
    accent: String,
    background: String,
    surface: String,
    text: {
      primary: String,
      secondary: String
    },
    success: String,
    warning: String,
    error: String,
    info: String
  },
  typography: {
    fontFamily: String,
    fontSize: {
      small: String,
      medium: String,
      large: String,
      xlarge: String
    },
    fontWeight: {
      light: Number,
      normal: Number,
      bold: Number
    }
  },
  layout: {
    borderRadius: String,
    spacing: String,
    shadows: Boolean,
    animations: Boolean
  },
  components: {
    navbar: mongoose.Schema.Types.Mixed,
    sidebar: mongoose.Schema.Types.Mixed,
    cards: mongoose.Schema.Types.Mixed,
    buttons: mongoose.Schema.Types.Mixed,
    forms: mongoose.Schema.Types.Mixed
  },
  customCSS: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const emailTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Template name is required'],
    trim: true
  },
  description: String,
  category: {
    type: String,
    required: [true, 'Template category is required'],
    enum: ['welcome', 'notification', 'reminder', 'alert', 'invoice', 'confirmation', 'newsletter', 'custom']
  },
  subject: {
    type: String,
    required: [true, 'Email subject is required']
  },
  htmlContent: {
    type: String,
    required: [true, 'HTML content is required']
  },
  textContent: String,
  variables: [{
    name: String,
    description: String,
    defaultValue: String,
    required: Boolean
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  usageCount: {
    type: Number,
    default: 0
  },
  lastUsed: Date,
  attachments: [{
    name: String,
    url: String,
    isRequired: Boolean
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const backupConfigSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Backup configuration name is required'],
    trim: true
  },
  description: String,
  schedule: {
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      required: true
    },
    time: {
      type: String,
      required: [true, 'Backup time is required']
    },
    dayOfWeek: Number, // For weekly backups (0-6)
    dayOfMonth: Number, // For monthly backups (1-31)
    timezone: {
      type: String,
      default: 'Asia/Kolkata'
    }
  },
  dataTypes: [{
    type: String,
    enum: ['users', 'members', 'accounts', 'maintenance', 'events', 'complaints', 'notices', 'all']
  }],
  retention: {
    keepDaily: {
      type: Number,
      default: 7
    },
    keepWeekly: {
      type: Number,
      default: 4
    },
    keepMonthly: {
      type: Number,
      default: 12
    }
  },
  storage: {
    type: {
      type: String,
      enum: ['local', 'cloud', 'ftp'],
      required: true
    },
    path: String,
    credentials: mongoose.Schema.Types.Mixed
  },
  compression: {
    enabled: {
      type: Boolean,
      default: true
    },
    format: {
      type: String,
      enum: ['zip', 'gzip', 'tar'],
      default: 'zip'
    }
  },
  encryption: {
    enabled: {
      type: Boolean,
      default: false
    },
    algorithm: String,
    keyPath: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastRun: {
    date: Date,
    status: {
      type: String,
      enum: ['success', 'failed', 'partial']
    },
    size: Number,
    duration: Number,
    errorMessage: String
  },
  notifications: {
    onSuccess: Boolean,
    onFailure: Boolean,
    recipients: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Ensure unique configuration keys within categories
systemConfigSchema.index({ category: 1, key: 1 }, { unique: true });

// Pre-save middleware to update version and history
systemConfigSchema.pre('save', function(next) {
  if (this.isModified('value') && !this.isNew) {
    this.history.push({
      value: this.value,
      changedAt: new Date(),
      changedBy: this.lastModified.by
    });
    this.version += 1;
  }
  next();
});

// Index for efficient querying
systemConfigSchema.index({ category: 1 });
systemConfigSchema.index({ key: 1 });
systemConfigSchema.index({ isVisible: 1 });

themeConfigSchema.index({ name: 1 });
themeConfigSchema.index({ isDefault: 1 });
themeConfigSchema.index({ isActive: 1 });

emailTemplateSchema.index({ name: 1 });
emailTemplateSchema.index({ category: 1 });
emailTemplateSchema.index({ isActive: 1 });

backupConfigSchema.index({ name: 1 });
backupConfigSchema.index({ isActive: 1 });
backupConfigSchema.index({ 'schedule.frequency': 1 });

const SystemConfig = mongoose.model('SystemConfig', systemConfigSchema);
const ThemeConfig = mongoose.model('ThemeConfig', themeConfigSchema);
const EmailTemplate = mongoose.model('EmailTemplate', emailTemplateSchema);
const BackupConfig = mongoose.model('BackupConfig', backupConfigSchema);

export { SystemConfig, ThemeConfig, EmailTemplate, BackupConfig };
