import React, { useState, useEffect } from 'react';
import './Shopping.css';
import '../AdminTheme.css';

export default function Shopping() {
  const [orders, setOrders] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedTab, setSelectedTab] = useState('orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editingVendor, setEditingVendor] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  // Initialize mock data
  useEffect(() => {
    const mockOrders = [
      {
        id: 1,
        orderNumber: 'ORD-2024-001',
        customerName: 'Rajesh Sharma',
        flat: 'A-101',
        items: [
          { name: 'Fresh Vegetables', quantity: 2, price: 250 },
          { name: 'Dairy Products', quantity: 1, price: 180 }
        ],
        totalAmount: 430,
        status: 'delivered',
        orderDate: '2024-01-15',
        deliveryDate: '2024-01-16',
        vendor: 'Fresh Farm Store',
        paymentStatus: 'paid',
        deliveryAddress: 'A-101, Green Valley Society'
      },
      {
        id: 2,
        orderNumber: 'ORD-2024-002',
        customerName: 'Priya Patel',
        flat: 'B-205',
        items: [
          { name: 'Organic Fruits', quantity: 3, price: 420 },
          { name: 'Breakfast Items', quantity: 2, price: 150 }
        ],
        totalAmount: 570,
        status: 'in-transit',
        orderDate: '2024-01-16',
        deliveryDate: '2024-01-17',
        vendor: 'Organic Market',
        paymentStatus: 'paid',
        deliveryAddress: 'B-205, Green Valley Society'
      },
      {
        id: 3,
        orderNumber: 'ORD-2024-003',
        customerName: 'Amit Kumar',
        flat: 'C-302',
        items: [
          { name: 'Household Items', quantity: 5, price: 750 }
        ],
        totalAmount: 750,
        status: 'processing',
        orderDate: '2024-01-17',
        deliveryDate: '2024-01-18',
        vendor: 'Daily Needs Store',
        paymentStatus: 'pending',
        deliveryAddress: 'C-302, Green Valley Society'
      },
      {
        id: 4,
        orderNumber: 'ORD-2024-004',
        customerName: 'Meera Singh',
        flat: 'A-405',
        items: [
          { name: 'Pharmacy Items', quantity: 1, price: 320 }
        ],
        totalAmount: 320,
        status: 'confirmed',
        orderDate: '2024-01-18',
        deliveryDate: '2024-01-19',
        vendor: 'HealthPlus Pharmacy',
        paymentStatus: 'paid',
        deliveryAddress: 'A-405, Green Valley Society'
      }
    ];

    const mockVendors = [
      {
        id: 1,
        name: 'Fresh Farm Store',
        category: 'groceries',
        contact: '+91 98765 43210',
        email: 'orders@freshfarm.com',
        address: 'Shop 15, Market Street',
        rating: 4.5,
        isActive: true,
        deliveryTime: '2-4 hours',
        minOrder: 200,
        commission: 5,
        totalOrders: 156,
        revenue: 45600,
        specialties: ['Fresh Vegetables', 'Organic Products', 'Daily Groceries']
      },
      {
        id: 2,
        name: 'Organic Market',
        category: 'groceries',
        contact: '+91 87654 32109',
        email: 'info@organicmarket.com',
        address: 'Shop 8, Central Plaza',
        rating: 4.7,
        isActive: true,
        deliveryTime: '3-5 hours',
        minOrder: 300,
        commission: 7,
        totalOrders: 89,
        revenue: 32400,
        specialties: ['Organic Fruits', 'Natural Products', 'Health Foods']
      },
      {
        id: 3,
        name: 'Daily Needs Store',
        category: 'household',
        contact: '+91 76543 21098',
        email: 'support@dailyneeds.com',
        address: 'Shop 22, Shopping Complex',
        rating: 4.3,
        isActive: true,
        deliveryTime: '1-3 hours',
        minOrder: 150,
        commission: 6,
        totalOrders: 203,
        revenue: 58900,
        specialties: ['Household Items', 'Cleaning Supplies', 'Personal Care']
      },
      {
        id: 4,
        name: 'HealthPlus Pharmacy',
        category: 'pharmacy',
        contact: '+91 65432 10987',
        email: 'orders@healthplus.com',
        address: 'Shop 5, Medical Center',
        rating: 4.8,
        isActive: true,
        deliveryTime: '30 minutes',
        minOrder: 100,
        commission: 8,
        totalOrders: 124,
        revenue: 28700,
        specialties: ['Medicines', 'Health Supplements', 'Medical Supplies']
      },
      {
        id: 5,
        name: 'Book Corner',
        category: 'books',
        contact: '+91 54321 09876',
        email: 'info@bookcorner.com',
        address: 'Shop 12, Education Hub',
        rating: 4.4,
        isActive: false,
        deliveryTime: '1-2 days',
        minOrder: 250,
        commission: 10,
        totalOrders: 67,
        revenue: 18500,
        specialties: ['Academic Books', 'Stationery', 'Educational Materials']
      }
    ];

    const mockProducts = [
      {
        id: 1,
        name: 'Fresh Vegetables Bundle',
        category: 'groceries',
        vendor: 'Fresh Farm Store',
        price: 250,
        originalPrice: 300,
        description: 'Fresh seasonal vegetables bundle including tomatoes, onions, potatoes, and green vegetables',
        image: '🥬',
        inStock: true,
        stock: 25,
        rating: 4.5,
        reviews: 45,
        discount: 17,
        tags: ['fresh', 'organic', 'daily-need']
      },
      {
        id: 2,
        name: 'Organic Fruits Basket',
        category: 'groceries',
        vendor: 'Organic Market',
        price: 420,
        originalPrice: 480,
        description: 'Premium organic fruits basket with apples, bananas, oranges, and seasonal fruits',
        image: '🍎',
        inStock: true,
        stock: 18,
        rating: 4.7,
        reviews: 32,
        discount: 13,
        tags: ['organic', 'premium', 'healthy']
      },
      {
        id: 3,
        name: 'Household Essentials Kit',
        category: 'household',
        vendor: 'Daily Needs Store',
        price: 750,
        originalPrice: 850,
        description: 'Complete household essentials including cleaning supplies, toiletries, and daily use items',
        image: '🧽',
        inStock: true,
        stock: 12,
        rating: 4.3,
        reviews: 28,
        discount: 12,
        tags: ['essentials', 'cleaning', 'bundle']
      },
      {
        id: 4,
        name: 'Health & Wellness Pack',
        category: 'pharmacy',
        vendor: 'HealthPlus Pharmacy',
        price: 320,
        originalPrice: 350,
        description: 'Basic health and wellness products including vitamins, first aid, and health supplements',
        image: '💊',
        inStock: true,
        stock: 8,
        rating: 4.8,
        reviews: 56,
        discount: 9,
        tags: ['health', 'wellness', 'supplements']
      },
      {
        id: 5,
        name: 'Student Study Kit',
        category: 'books',
        vendor: 'Book Corner',
        price: 450,
        originalPrice: 500,
        description: 'Complete study kit with notebooks, pens, pencils, and essential stationery items',
        image: '📚',
        inStock: false,
        stock: 0,
        rating: 4.4,
        reviews: 23,
        discount: 10,
        tags: ['education', 'stationery', 'student']
      },
      {
        id: 6,
        name: 'Dairy Products Combo',
        category: 'groceries',
        vendor: 'Fresh Farm Store',
        price: 180,
        originalPrice: 200,
        description: 'Fresh dairy products including milk, yogurt, cheese, and butter',
        image: '🥛',
        inStock: true,
        stock: 22,
        rating: 4.6,
        reviews: 41,
        discount: 10,
        tags: ['dairy', 'fresh', 'daily-need']
      }
    ];

    setOrders(mockOrders);
    setVendors(mockVendors);
    setProducts(mockProducts);
  }, []);

  // Filter functions
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.flat.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || vendor.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // CRUD Functions
  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderData = {
      id: editingOrder ? editingOrder.id : Date.now(),
      orderNumber: editingOrder ? editingOrder.orderNumber : `ORD-2024-${Date.now().toString().slice(-3)}`,
      customerName: formData.get('customerName'),
      flat: formData.get('flat'),
      items: JSON.parse(formData.get('items') || '[]'),
      totalAmount: parseInt(formData.get('totalAmount')),
      status: formData.get('status'),
      orderDate: formData.get('orderDate'),
      deliveryDate: formData.get('deliveryDate'),
      vendor: formData.get('vendor'),
      paymentStatus: formData.get('paymentStatus'),
      deliveryAddress: formData.get('deliveryAddress')
    };

    if (editingOrder) {
      setOrders(orders.map(o => o.id === editingOrder.id ? orderData : o));
    } else {
      setOrders([...orders, orderData]);
    }

    setShowOrderModal(false);
    setEditingOrder(null);
  };

  const handleVendorSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const vendorData = {
      id: editingVendor ? editingVendor.id : Date.now(),
      name: formData.get('name'),
      category: formData.get('category'),
      contact: formData.get('contact'),
      email: formData.get('email'),
      address: formData.get('address'),
      deliveryTime: formData.get('deliveryTime'),
      minOrder: parseInt(formData.get('minOrder')),
      commission: parseInt(formData.get('commission')),
      isActive: formData.get('isActive') === 'true',
      specialties: formData.get('specialties').split(',').map(s => s.trim()),
      rating: editingVendor ? editingVendor.rating : 0,
      totalOrders: editingVendor ? editingVendor.totalOrders : 0,
      revenue: editingVendor ? editingVendor.revenue : 0
    };

    if (editingVendor) {
      setVendors(vendors.map(v => v.id === editingVendor.id ? vendorData : v));
    } else {
      setVendors([...vendors, vendorData]);
    }

    setShowVendorModal(false);
    setEditingVendor(null);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productData = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: formData.get('name'),
      category: formData.get('category'),
      vendor: formData.get('vendor'),
      price: parseInt(formData.get('price')),
      originalPrice: parseInt(formData.get('originalPrice')),
      description: formData.get('description'),
      image: formData.get('image') || '🛍️',
      inStock: formData.get('inStock') === 'true',
      stock: parseInt(formData.get('stock')),
      tags: formData.get('tags').split(',').map(t => t.trim()),
      rating: editingProduct ? editingProduct.rating : 0,
      reviews: editingProduct ? editingProduct.reviews : 0,
      discount: Math.round(((parseInt(formData.get('originalPrice')) - parseInt(formData.get('price'))) / parseInt(formData.get('originalPrice'))) * 100)
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? productData : p));
    } else {
      setProducts([...products, productData]);
    }

    setShowProductModal(false);
    setEditingProduct(null);
  };

  const deleteOrder = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  const deleteVendor = (id) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      setVendors(vendors.filter(v => v.id !== id));
    }
  };

  const deleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'status-confirmed';
      case 'processing': return 'status-processing';
      case 'in-transit': return 'status-transit';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'groceries': return '🛒';
      case 'household': return '🏠';
      case 'pharmacy': return '💊';
      case 'books': return '📚';
      case 'electronics': return '📱';
      default: return '🛍️';
    }
  };

  // Calculate summary stats
  const totalOrders = orders.length;
  const totalRevenue = orders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + o.totalAmount, 0);
  const activeVendors = vendors.filter(v => v.isActive).length;
  const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  return (
    <div className="admin-container">
      <div className="admin-bg-elements"></div>
      <div className="admin-content">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
          <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Shopping Management
          </h1>
          <p className="text-gray-400 mt-2">Manage orders, vendors and products for society shopping</p>
        </div>

        {/* Summary Cards */}
        <div className="summary-grid">
          <div className="summary-card revenue">
            <div className="summary-icon">💰</div>
            <div className="summary-info">
              <h3>Total Revenue</h3>
              <div className="summary-value">₹{totalRevenue.toLocaleString()}</div>
              <div className="summary-change positive">+15% vs last month</div>
            </div>
          </div>
          <div className="summary-card orders">
            <div className="summary-icon">📦</div>
            <div className="summary-info">
              <h3>Total Orders</h3>
              <div className="summary-value">{totalOrders}</div>
              <div className="summary-change positive">+8 new today</div>
            </div>
          </div>
          <div className="summary-card vendors">
            <div className="summary-icon">🏪</div>
            <div className="summary-info">
              <h3>Active Vendors</h3>
              <div className="summary-value">{activeVendors}</div>
              <div className="summary-change neutral">All verified</div>
            </div>
          </div>
          <div className="summary-card avg-order">
            <div className="summary-icon">📊</div>
            <div className="summary-info">
              <h3>Avg Order Value</h3>
              <div className="summary-value">₹{averageOrderValue}</div>
              <div className="summary-change positive">+₹50 increase</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${selectedTab === 'orders' ? 'active' : ''}`}
            onClick={() => setSelectedTab('orders')}
          >
            📦 Orders
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'vendors' ? 'active' : ''}`}
            onClick={() => setSelectedTab('vendors')}
          >
            🏪 Vendors
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'products' ? 'active' : ''}`}
            onClick={() => setSelectedTab('products')}
          >
            🛍️ Products
          </button>
        </div>

        {/* Controls */}
        <div className="controls-section">
          <div className="search-filter-group">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder={`Search ${selectedTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            {selectedTab === 'orders' && (
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="in-transit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            )}

            {(selectedTab === 'vendors' || selectedTab === 'products') && (
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Categories</option>
                <option value="groceries">Groceries</option>
                <option value="household">Household</option>
                <option value="pharmacy">Pharmacy</option>
                <option value="books">Books</option>
                <option value="electronics">Electronics</option>
              </select>
            )}
          </div>

          <div className="action-buttons">
            {selectedTab === 'orders' && (
              <button
                onClick={() => setShowOrderModal(true)}
                className="add-btn"
              >
                ➕ New Order
              </button>
            )}
            {selectedTab === 'vendors' && (
              <button
                onClick={() => setShowVendorModal(true)}
                className="add-btn"
              >
                ➕ Add Vendor
              </button>
            )}
            {selectedTab === 'products' && (
              <button
                onClick={() => setShowProductModal(true)}
                className="add-btn"
              >
                ➕ Add Product
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {selectedTab === 'orders' && (
            <div className="orders-grid">
              {filteredOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <h3 className="order-number">{order.orderNumber}</h3>
                      <span className={`status-badge ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-amount">₹{order.totalAmount}</div>
                  </div>

                  <div className="order-content">
                    <div className="customer-details">
                      <div className="customer-name">{order.customerName}</div>
                      <div className="customer-flat">{order.flat}</div>
                    </div>

                    <div className="order-items">
                      <h4>Items ({order.items.length}):</h4>
                      <div className="items-list">
                        {order.items.map((item, index) => (
                          <div key={index} className="item-entry">
                            <span className="item-name">{item.name}</span>
                            <span className="item-details">Qty: {item.quantity} | ₹{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="order-details">
                      <div className="detail-row">
                        <span className="detail-label">Vendor:</span>
                        <span className="detail-value">{order.vendor}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Order Date:</span>
                        <span className="detail-value">{order.orderDate}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Delivery Date:</span>
                        <span className="detail-value">{order.deliveryDate}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Payment:</span>
                        <span className={`payment-status ${order.paymentStatus}`}>{order.paymentStatus}</span>
                      </div>
                    </div>
                  </div>

                  <div className="order-actions">
                    <button
                      onClick={() => {
                        setEditingOrder(order);
                        setShowOrderModal(true);
                      }}
                      className="edit-btn"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="delete-btn"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'vendors' && (
            <div className="vendors-grid">
              {filteredVendors.map(vendor => (
                <div key={vendor.id} className="vendor-card">
                  <div className="vendor-header">
                    <div className="vendor-info">
                      <h3 className="vendor-name">{vendor.name}</h3>
                      <p className="vendor-category">{getCategoryIcon(vendor.category)} {vendor.category}</p>
                      <span className={`vendor-status ${vendor.isActive ? 'active' : 'inactive'}`}>
                        {vendor.isActive ? '🟢 Active' : '🔴 Inactive'}
                      </span>
                    </div>
                    <div className="vendor-rating">
                      <span className="rating-value">⭐ {vendor.rating}</span>
                    </div>
                  </div>

                  <div className="vendor-content">
                    <div className="vendor-specialties">
                      <h4>Specialties:</h4>
                      <div className="specialties-list">
                        {vendor.specialties.map((specialty, index) => (
                          <span key={index} className="specialty-tag">{specialty}</span>
                        ))}
                      </div>
                    </div>

                    <div className="vendor-stats">
                      <div className="stat-grid">
                        <div className="stat-item">
                          <span className="stat-label">Orders:</span>
                          <span className="stat-value">{vendor.totalOrders}</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Revenue:</span>
                          <span className="stat-value">₹{vendor.revenue.toLocaleString()}</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Delivery:</span>
                          <span className="stat-value">{vendor.deliveryTime}</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Min Order:</span>
                          <span className="stat-value">₹{vendor.minOrder}</span>
                        </div>
                      </div>
                    </div>

                    <div className="vendor-contact">
                      <div className="contact-item">
                        <span className="contact-icon">📞</span>
                        <span className="contact-value">{vendor.contact}</span>
                      </div>
                      <div className="contact-item">
                        <span className="contact-icon">✉️</span>
                        <span className="contact-value">{vendor.email}</span>
                      </div>
                      <div className="contact-item">
                        <span className="contact-icon">📍</span>
                        <span className="contact-value">{vendor.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="vendor-actions">
                    <button
                      onClick={() => {
                        setEditingVendor(vendor);
                        setShowVendorModal(true);
                      }}
                      className="edit-btn"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteVendor(vendor.id)}
                      className="delete-btn"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'products' && (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <span className="product-icon">{product.image}</span>
                    {product.discount > 0 && (
                      <span className="discount-badge">{product.discount}% OFF</span>
                    )}
                    <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  <div className="product-content">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-vendor">{getCategoryIcon(product.category)} {product.vendor}</p>
                    <p className="product-description">{product.description}</p>

                    <div className="product-pricing">
                      <span className="current-price">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="original-price">₹{product.originalPrice}</span>
                      )}
                    </div>

                    <div className="product-rating">
                      <span className="rating-stars">⭐ {product.rating}</span>
                      <span className="rating-count">({product.reviews} reviews)</span>
                    </div>

                    <div className="product-stock">
                      <span className="stock-label">Stock:</span>
                      <span className="stock-count">{product.stock} units</span>
                    </div>

                    <div className="product-tags">
                      {product.tags.map((tag, index) => (
                        <span key={index} className="product-tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="product-actions">
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setShowProductModal(true);
                      }}
                      className="edit-btn"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="delete-btn"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Modal */}
        {showOrderModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{editingOrder ? 'Edit Order' : 'New Order'}</h2>
                <button
                  onClick={() => {
                    setShowOrderModal(false);
                    setEditingOrder(null);
                  }}
                  className="modal-close"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleOrderSubmit} className="modal-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Customer Name</label>
                    <input
                      type="text"
                      name="customerName"
                      defaultValue={editingOrder?.customerName}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Flat Number</label>
                    <input
                      type="text"
                      name="flat"
                      defaultValue={editingOrder?.flat}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Vendor</label>
                  <select
                    name="vendor"
                    defaultValue={editingOrder?.vendor}
                    required
                    className="form-select"
                  >
                    <option value="">Select Vendor</option>
                    {vendors.filter(v => v.isActive).map(vendor => (
                      <option key={vendor.id} value={vendor.name}>
                        {vendor.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Items (JSON format)</label>
                  <textarea
                    name="items"
                    defaultValue={editingOrder ? JSON.stringify(editingOrder.items, null, 2) : '[]'}
                    required
                    className="form-textarea"
                    rows="4"
                    placeholder='[{"name": "Item Name", "quantity": 1, "price": 100}]'
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Total Amount (₹)</label>
                    <input
                      type="number"
                      name="totalAmount"
                      defaultValue={editingOrder?.totalAmount}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      defaultValue={editingOrder?.status}
                      required
                      className="form-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="in-transit">In Transit</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Order Date</label>
                    <input
                      type="date"
                      name="orderDate"
                      defaultValue={editingOrder?.orderDate}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Delivery Date</label>
                    <input
                      type="date"
                      name="deliveryDate"
                      defaultValue={editingOrder?.deliveryDate}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Payment Status</label>
                    <select
                      name="paymentStatus"
                      defaultValue={editingOrder?.paymentStatus}
                      required
                      className="form-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Delivery Address</label>
                    <input
                      type="text"
                      name="deliveryAddress"
                      defaultValue={editingOrder?.deliveryAddress}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    {editingOrder ? 'Update Order' : 'Create Order'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowOrderModal(false);
                      setEditingOrder(null);
                    }}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Vendor Modal */}
        {showVendorModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{editingVendor ? 'Edit Vendor' : 'Add New Vendor'}</h2>
                <button
                  onClick={() => {
                    setShowVendorModal(false);
                    setEditingVendor(null);
                  }}
                  className="modal-close"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleVendorSubmit} className="modal-form">
                <div className="form-group">
                  <label>Vendor Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingVendor?.name}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    defaultValue={editingVendor?.category}
                    required
                    className="form-select"
                  >
                    <option value="">Select Category</option>
                    <option value="groceries">Groceries</option>
                    <option value="household">Household</option>
                    <option value="pharmacy">Pharmacy</option>
                    <option value="books">Books</option>
                    <option value="electronics">Electronics</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Contact Number</label>
                    <input
                      type="tel"
                      name="contact"
                      defaultValue={editingVendor?.contact}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={editingVendor?.email}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    defaultValue={editingVendor?.address}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Delivery Time</label>
                    <input
                      type="text"
                      name="deliveryTime"
                      defaultValue={editingVendor?.deliveryTime}
                      placeholder="e.g., 2-4 hours"
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Minimum Order (₹)</label>
                    <input
                      type="number"
                      name="minOrder"
                      defaultValue={editingVendor?.minOrder}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Commission (%)</label>
                    <input
                      type="number"
                      name="commission"
                      defaultValue={editingVendor?.commission}
                      min="0"
                      max="100"
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="isActive"
                      defaultValue={editingVendor?.isActive}
                      required
                      className="form-select"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Specialties (comma-separated)</label>
                  <input
                    type="text"
                    name="specialties"
                    defaultValue={editingVendor?.specialties?.join(', ')}
                    placeholder="e.g., Fresh Vegetables, Organic Products"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    {editingVendor ? 'Update Vendor' : 'Add Vendor'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowVendorModal(false);
                      setEditingVendor(null);
                    }}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Product Modal */}
        {showProductModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button
                  onClick={() => {
                    setShowProductModal(false);
                    setEditingProduct(null);
                  }}
                  className="modal-close"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleProductSubmit} className="modal-form">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingProduct?.name}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      name="category"
                      defaultValue={editingProduct?.category}
                      required
                      className="form-select"
                    >
                      <option value="">Select Category</option>
                      <option value="groceries">Groceries</option>
                      <option value="household">Household</option>
                      <option value="pharmacy">Pharmacy</option>
                      <option value="books">Books</option>
                      <option value="electronics">Electronics</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Vendor</label>
                    <select
                      name="vendor"
                      defaultValue={editingProduct?.vendor}
                      required
                      className="form-select"
                    >
                      <option value="">Select Vendor</option>
                      {vendors.filter(v => v.isActive).map(vendor => (
                        <option key={vendor.id} value={vendor.name}>
                          {vendor.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    defaultValue={editingProduct?.description}
                    required
                    className="form-textarea"
                    rows="3"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Price (₹)</label>
                    <input
                      type="number"
                      name="price"
                      defaultValue={editingProduct?.price}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Original Price (₹)</label>
                    <input
                      type="number"
                      name="originalPrice"
                      defaultValue={editingProduct?.originalPrice}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Stock Quantity</label>
                    <input
                      type="number"
                      name="stock"
                      defaultValue={editingProduct?.stock}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>In Stock</label>
                    <select
                      name="inStock"
                      defaultValue={editingProduct?.inStock}
                      required
                      className="form-select"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Image/Icon</label>
                    <input
                      type="text"
                      name="image"
                      defaultValue={editingProduct?.image}
                      placeholder="Emoji or icon"
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Tags (comma-separated)</label>
                    <input
                      type="text"
                      name="tags"
                      defaultValue={editingProduct?.tags?.join(', ')}
                      placeholder="e.g., fresh, organic, daily-need"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowProductModal(false);
                      setEditingProduct(null);
                    }}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
