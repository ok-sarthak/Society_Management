import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    unique: true,
    required: true
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  category: {
    type: String,
    enum: ['maintenance', 'utility', 'repair', 'salary', 'purchase', 'security', 'cleaning', 'gardening', 'festive', 'donation', 'penalty', 'other'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount must be positive']
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'bank_transfer', 'cheque', 'online', 'card', 'upi'],
    default: 'cash'
  },
  buildingNumber: {
    type: Number,
    required: false,
    min: [1, 'Building number must be at least 1']
  },
  blockNumber: {
    type: Number,
    required: false,
    min: [1, 'Block number must be at least 1']
  },
  flatNumber: {
    type: String,
    required: false,
    trim: true
  },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: false
  },
  receiptNumber: {
    type: String,
    required: false,
    trim: true
  },
  invoiceNumber: {
    type: String,
    required: false,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'completed'
  },
  remarks: {
    type: String,
    trim: true,
    maxlength: [1000, 'Remarks cannot exceed 1000 characters']
  },
  vendorName: {
    type: String,
    trim: true
  },
  vendorContact: {
    type: String,
    trim: true
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  attachments: [{
    fileName: String,
    filePath: String,
    fileType: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [{
    type: String,
    trim: true
  }],
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringFrequency: {
    type: String,
    enum: ['monthly', 'quarterly', 'yearly'],
    required: false
  },
  nextDueDate: {
    type: Date,
    required: false
  }
}, {
  timestamps: true
});

// Generate transaction ID before saving
transactionSchema.pre('save', async function(next) {
  if (!this.transactionId) {
    const count = await this.constructor.countDocuments();
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    this.transactionId = `TXN${year}${month}${(count + 1).toString().padStart(6, '0')}`;
  }
  next();
});

// Virtual for formatted amount
transactionSchema.virtual('formattedAmount').get(function() {
  return `₹${this.amount.toLocaleString('en-IN')}`;
});

// Virtual for transaction type display
transactionSchema.virtual('typeDisplay').get(function() {
  return this.type === 'income' ? '↑ INCOME' : '↓ EXPENSE';
});

// Index for better query performance
transactionSchema.index({ date: -1 });
transactionSchema.index({ type: 1, category: 1 });
transactionSchema.index({ memberId: 1 });
transactionSchema.index({ buildingNumber: 1, blockNumber: 1 });
transactionSchema.index({ status: 1 });
transactionSchema.index({ createdAt: -1 });

// Ensure virtuals are included in JSON output
transactionSchema.set('toJSON', { virtuals: true });
transactionSchema.set('toObject', { virtuals: true });

export default mongoose.model('Transaction', transactionSchema);
