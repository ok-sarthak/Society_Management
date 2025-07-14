import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MemberList',
    required: true
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    total: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  orderSummary: {
    subtotal: {
      type: Number,
      required: true,
      min: 0
    },
    taxAmount: {
      type: Number,
      default: 0,
      min: 0
    },
    deliveryCharges: {
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
    }
  },
  deliveryAddress: {
    flatNumber: {
      type: String,
      required: true
    },
    building: String,
    floor: String,
    landmark: String,
    notes: String
  },
  paymentDetails: {
    method: {
      type: String,
      enum: ['online', 'cod', 'wallet', 'card'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paymentDate: Date,
    refundAmount: Number,
    refundDate: Date
  },
  orderStatus: {
    current: {
      type: String,
      enum: ['placed', 'confirmed', 'preparing', 'ready', 'dispatched', 'delivered', 'cancelled'],
      default: 'placed'
    },
    timeline: [{
      status: String,
      timestamp: {
        type: Date,
        default: Date.now
      },
      note: String
    }]
  },
  delivery: {
    expectedDate: Date,
    deliveredDate: Date,
    deliverySlot: String,
    instructions: String,
    deliveryPerson: {
      name: String,
      phone: String
    }
  },
  ratings: {
    overall: {
      type: Number,
      min: 1,
      max: 5
    },
    delivery: {
      type: Number,
      min: 1,
      max: 5
    },
    quality: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    ratedAt: Date
  },
  cancellation: {
    reason: String,
    cancelledBy: {
      type: String,
      enum: ['customer', 'vendor', 'admin']
    },
    cancelledAt: Date,
    refundProcessed: {
      type: Boolean,
      default: false
    }
  },
  specialInstructions: String,
  isGift: {
    type: Boolean,
    default: false
  },
  giftMessage: String
}, {
  timestamps: true
});

// Pre-save middleware to generate order ID
orderSchema.pre('save', function(next) {
  if (!this.orderId) {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.orderId = `ORD${timestamp}${random}`;
  }
  next();
});

// Pre-save middleware to update order timeline
orderSchema.pre('save', function(next) {
  if (this.isModified('orderStatus.current')) {
    this.orderStatus.timeline.push({
      status: this.orderStatus.current,
      timestamp: new Date()
    });
  }
  next();
});

// Virtual to calculate order age
orderSchema.virtual('orderAge').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Index for efficient querying
orderSchema.index({ customer: 1 });
orderSchema.index({ vendor: 1 });
orderSchema.index({ 'orderStatus.current': 1 });
orderSchema.index({ 'paymentDetails.status': 1 });
orderSchema.index({ createdAt: -1 });

export default mongoose.model('Order', orderSchema);
