import mongoose from 'mongoose';

const reportTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Template name is required'],
    trim: true
  },
  description: String,
  category: {
    type: String,
    required: [true, 'Report category is required'],
    enum: ['Financial', 'Maintenance', 'Members', 'Events', 'Complaints', 'Services', 'Health', 'Security', 'Staff', 'Visitors', 'Custom']
  },
  type: {
    type: String,
    enum: ['summary', 'detailed', 'analytical', 'comparative'],
    required: true
  },
  dataSource: {
    type: String,
    required: [true, 'Data source is required'],
    enum: ['accounts', 'maintenance', 'members', 'events', 'complaints', 'services', 'health', 'security', 'staff', 'visitors', 'multiple']
  },
  fields: [{
    name: String,
    label: String,
    type: {
      type: String,
      enum: ['text', 'number', 'date', 'boolean', 'select', 'multiselect']
    },
    required: Boolean,
    options: [String]
  }],
  filters: [{
    field: String,
    operator: {
      type: String,
      enum: ['equals', 'not_equals', 'greater_than', 'less_than', 'contains', 'between', 'in', 'not_in']
    },
    value: mongoose.Schema.Types.Mixed,
    defaultValue: mongoose.Schema.Types.Mixed
  }],
  groupBy: [String],
  sortBy: [{
    field: String,
    order: {
      type: String,
      enum: ['asc', 'desc'],
      default: 'asc'
    }
  }],
  chartConfig: {
    enabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      enum: ['bar', 'line', 'pie', 'doughnut', 'area', 'scatter']
    },
    xAxis: String,
    yAxis: String,
    colors: [String]
  },
  schedule: {
    enabled: {
      type: Boolean,
      default: false
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'quarterly', 'yearly']
    },
    dayOfWeek: Number,
    dayOfMonth: Number,
    time: String,
    recipients: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const reportInstanceSchema = new mongoose.Schema({
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReportTemplate',
    required: true
  },
  reportId: {
    type: String,
    unique: true,
    required: true
  },
  title: String,
  description: String,
  parameters: {
    dateRange: {
      startDate: Date,
      endDate: Date
    },
    filters: [{
      field: String,
      value: mongoose.Schema.Types.Mixed
    }],
    groupBy: [String],
    customFields: mongoose.Schema.Types.Mixed
  },
  data: {
    raw: mongoose.Schema.Types.Mixed,
    processed: mongoose.Schema.Types.Mixed,
    summary: {
      totalRecords: Number,
      totalValue: Number,
      averageValue: Number,
      maxValue: Number,
      minValue: Number,
      trends: mongoose.Schema.Types.Mixed
    }
  },
  charts: [{
    type: String,
    config: mongoose.Schema.Types.Mixed,
    data: mongoose.Schema.Types.Mixed
  }],
  status: {
    type: String,
    enum: ['generating', 'completed', 'failed', 'scheduled'],
    default: 'generating'
  },
  executionTime: {
    startedAt: Date,
    completedAt: Date,
    duration: Number
  },
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sharedWith: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    permission: {
      type: String,
      enum: ['view', 'download', 'edit'],
      default: 'view'
    },
    sharedAt: {
      type: Date,
      default: Date.now
    }
  }],
  downloadCount: {
    type: Number,
    default: 0
  },
  lastDownloadedAt: Date,
  fileUrl: String,
  fileSize: Number,
  format: {
    type: String,
    enum: ['pdf', 'excel', 'csv', 'json'],
    default: 'pdf'
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  tags: [String]
}, {
  timestamps: true
});

// Pre-save middleware to generate report ID
reportInstanceSchema.pre('save', function(next) {
  if (!this.reportId) {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.reportId = `RPT${timestamp}${random}`;
  }
  next();
});

// Virtual to calculate report age
reportInstanceSchema.virtual('age').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Index for efficient querying
reportTemplateSchema.index({ name: 1 });
reportTemplateSchema.index({ category: 1 });
reportTemplateSchema.index({ dataSource: 1 });
reportTemplateSchema.index({ isActive: 1 });

reportInstanceSchema.index({ template: 1 });
reportInstanceSchema.index({ generatedBy: 1 });
reportInstanceSchema.index({ status: 1 });
reportInstanceSchema.index({ createdAt: -1 });

const ReportTemplate = mongoose.model('ReportTemplate', reportTemplateSchema);
const ReportInstance = mongoose.model('ReportInstance', reportInstanceSchema);

export { ReportTemplate, ReportInstance };
