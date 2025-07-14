import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Electronics', 'Groceries', 'Household', 'Personal Care', 'Books', 'Clothing', 'Sports', 'Other']
  },
  subcategory: {
    type: String,
    trim: true
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: [true, 'Vendor is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  discountPrice: {
    type: Number,
    min: [0, 'Discount price cannot be negative']
  },
  currency: {
    type: String,
    default: 'INR'
  },
  inventory: {
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative']
    },
    unit: {
      type: String,
      required: [true, 'Unit is required'],
      enum: ['piece', 'kg', 'gram', 'liter', 'ml', 'meter', 'cm', 'pack', 'box']
    },
    minimumStock: {
      type: Number,
      default: 5
    }
  },
  images: [{
    url: String,
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  specifications: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  ratings: {
    average: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  deliveryInfo: {
    availableForDelivery: {
      type: Boolean,
      default: true
    },
    estimatedDeliveryTime: String,
    deliveryCharge: {
      type: Number,
      default: 0
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Virtual for effective price
productSchema.virtual('effectivePrice').get(function() {
  return this.discountPrice || this.price;
});

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.discountPrice && this.discountPrice < this.price) {
    return Math.round(((this.price - this.discountPrice) / this.price) * 100);
  }
  return 0;
});

// Index for efficient querying
productSchema.index({ name: 1 });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ vendor: 1 });
productSchema.index({ isActive: 1, isFeatured: 1 });
productSchema.index({ 'ratings.average': -1 });

export default mongoose.model('Product', productSchema);
