import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MemberList',
    required: true
  },
  month: {
    type: String,
    required: true,
    match: [/^\d{4}-\d{2}$/, 'Month should be in YYYY-MM format']
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  dueDate: {
    type: Date,
    required: true
  },
  paidDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'overdue'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'online', 'cheque', 'card'],
    default: 'cash'
  },
  transactionId: {
    type: String
  },
  receiptNumber: {
    type: String,
    unique: true
  },
  lateFee: {
    type: Number,
    default: 0,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  notes: {
    type: String
  },
  collectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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

// Generate unique receipt number before saving
maintenanceSchema.pre('save', async function(next) {
  if (!this.receiptNumber && this.status === 'paid') {
    const count = await this.constructor.countDocuments({ status: 'paid' });
    this.receiptNumber = `REC${new Date().getFullYear()}${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

// Calculate total amount before saving
maintenanceSchema.pre('save', function(next) {
  this.totalAmount = this.amount + this.lateFee - this.discount;
  next();
});

// Update status based on payment
maintenanceSchema.pre('save', function(next) {
  if (this.paidDate && this.status === 'pending') {
    this.status = 'paid';
  } else if (!this.paidDate && this.dueDate < new Date()) {
    this.status = 'overdue';
  }
  next();
});

// Index for efficient querying
maintenanceSchema.index({ member: 1, month: 1 }, { unique: true });
maintenanceSchema.index({ status: 1 });
maintenanceSchema.index({ dueDate: 1 });

export default mongoose.model('Maintenance', maintenanceSchema);
