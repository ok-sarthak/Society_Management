import Product from '../../models/Product.js';
import Vendor from '../../models/Vendor.js';
import Order from '../../models/Order.js';

// Product Controllers
export const getProducts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      category, 
      vendor, 
      search, 
      minPrice, 
      maxPrice,
      isActive,
      sortBy = 'name',
      sortOrder = 'asc'
    } = req.query;
    
    const filter = {};
    if (category) filter.category = category;
    if (vendor) filter.vendor = vendor;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const products = await Product.find(filter)
      .populate('vendor', 'name businessName contact')
      .populate('category', 'name')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate('vendor', 'name businessName contact address ratings')
      .populate('reviews.customer', 'name email');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      createdBy: req.user.id
    };

    const product = new Product(productData);
    await product.save();

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Product with this SKU already exists' });
    }
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    ).populate('vendor', 'name businessName');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

export const addProductReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user already reviewed this product
    const existingReview = product.reviews.find(
      review => review.customer.toString() === req.user.id
    );

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    product.reviews.push({
      customer: req.user.id,
      rating,
      comment
    });

    await product.save();

    res.json({ message: 'Review added successfully', product });
  } catch (error) {
    res.status(400).json({ message: 'Error adding review', error: error.message });
  }
};

export const updateProductStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, operation } = req.body; // operation: 'add' or 'subtract'

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (operation === 'add') {
      product.inventory.quantity += quantity;
    } else if (operation === 'subtract') {
      if (product.inventory.quantity < quantity) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }
      product.inventory.quantity -= quantity;
    }

    await product.save();

    res.json({ message: 'Stock updated successfully', product });
  } catch (error) {
    res.status(400).json({ message: 'Error updating stock', error: error.message });
  }
};

// Vendor Controllers
export const getVendors = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      status, 
      isVerified,
      search 
    } = req.query;
    
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (isVerified !== undefined) filter['verification.isVerified'] = isVerified === 'true';
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { businessName: { $regex: search, $options: 'i' } },
        { 'contact.email': { $regex: search, $options: 'i' } }
      ];
    }

    const vendors = await Vendor.find(filter)
      .populate('createdBy', 'name email')
      .sort({ businessName: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Vendor.countDocuments(filter);

    res.json({
      vendors,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vendors', error: error.message });
  }
};

export const createVendor = async (req, res) => {
  try {
    const vendorData = {
      ...req.body,
      createdBy: req.user.id
    };

    const vendor = new Vendor(vendorData);
    await vendor.save();

    res.status(201).json({ message: 'Vendor created successfully', vendor });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Vendor with this email already exists' });
    }
    res.status(400).json({ message: 'Error creating vendor', error: error.message });
  }
};

export const updateVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.json({ message: 'Vendor updated successfully', vendor });
  } catch (error) {
    res.status(400).json({ message: 'Error updating vendor', error: error.message });
  }
};

export const verifyVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findByIdAndUpdate(
      id,
      {
        'verification.isVerified': true,
        'verification.verifiedAt': new Date(),
        'verification.verifiedBy': req.user.id,
        status: 'active'
      },
      { new: true }
    );

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.json({ message: 'Vendor verified successfully', vendor });
  } catch (error) {
    res.status(400).json({ message: 'Error verifying vendor', error: error.message });
  }
};

// Order Controllers
export const getOrders = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      customer, 
      vendor, 
      status, 
      paymentStatus,
      startDate,
      endDate,
      search 
    } = req.query;
    
    const filter = {};
    if (customer) filter.customer = customer;
    if (vendor) filter.vendor = vendor;
    if (status) filter['orderStatus.current'] = status;
    if (paymentStatus) filter['paymentDetails.status'] = paymentStatus;
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }
    
    if (search) {
      filter.$or = [
        { orderId: { $regex: search, $options: 'i' } },
        { 'deliveryAddress.flatNumber': { $regex: search, $options: 'i' } }
      ];
    }

    const orders = await Order.find(filter)
      .populate('customer', 'name email flatNumber')
      .populate('vendor', 'businessName contact')
      .populate('items.product', 'name price')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(filter);

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      customer: req.user.id
    };

    // Validate product availability
    for (let item of orderData.items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ message: `Product ${item.product} not found` });
      }
      if (product.inventory.quantity < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}. Available: ${product.inventory.quantity}` 
        });
      }
    }

    const order = new Order(orderData);
    await order.save();

    // Update product inventory
    for (let item of orderData.items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { 'inventory.quantity': -item.quantity } }
      );
    }

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.orderStatus.current = status;
    if (note) {
      order.orderStatus.timeline.push({
        status,
        note,
        timestamp: new Date()
      });
    }

    if (status === 'delivered') {
      order.delivery.deliveredDate = new Date();
    }

    await order.save();

    res.json({ message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(400).json({ message: 'Error updating order status', error: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason, cancelledBy = 'customer' } = req.body;

    const order = await Order.findById(id).populate('items.product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (['delivered', 'cancelled'].includes(order.orderStatus.current)) {
      return res.status(400).json({ message: 'Cannot cancel this order' });
    }

    // Restore product inventory
    for (let item of order.items) {
      await Product.findByIdAndUpdate(
        item.product._id,
        { $inc: { 'inventory.quantity': item.quantity } }
      );
    }

    order.orderStatus.current = 'cancelled';
    order.cancellation = {
      reason,
      cancelledBy,
      cancelledAt: new Date()
    };

    await order.save();

    res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    res.status(400).json({ message: 'Error cancelling order', error: error.message });
  }
};

export const getShoppingDashboard = async (req, res) => {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Total counts
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalVendors = await Vendor.countDocuments({ status: 'active' });
    const totalOrders = await Order.countDocuments();

    // This month's orders
    const monthlyOrders = await Order.countDocuments({
      createdAt: { $gte: startOfMonth }
    });

    // Order status distribution
    const orderStatusStats = await Order.aggregate([
      {
        $group: {
          _id: '$orderStatus.current',
          count: { $sum: 1 }
        }
      }
    ]);

    // Top selling products
    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          totalSold: { $sum: '$items.quantity' },
          revenue: { $sum: '$items.total' }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productInfo'
        }
      }
    ]);

    // Revenue stats
    const revenueStats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$orderSummary.totalAmount' },
          averageOrderValue: { $avg: '$orderSummary.totalAmount' }
        }
      }
    ]);

    res.json({
      totalProducts,
      totalVendors,
      totalOrders,
      monthlyOrders,
      orderStatusStats,
      topProducts,
      revenueStats: revenueStats[0] || { totalRevenue: 0, averageOrderValue: 0 }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shopping dashboard', error: error.message });
  }
};
