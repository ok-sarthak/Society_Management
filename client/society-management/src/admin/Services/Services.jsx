import React, { useState, useEffect } from 'react';
import './Services.css';
import '../AdminTheme.css';

export default function Services() {
  const [services, setServices] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedTab, setSelectedTab] = useState('services');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showProviderModal, setShowProviderModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [editingProvider, setEditingProvider] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);

  // Initialize mock data
  useEffect(() => {
    const mockServices = [
      {
        id: 1,
        name: 'House Cleaning',
        category: 'cleaning',
        description: 'Professional house cleaning service',
        basePrice: 500,
        duration: '2-3 hours',
        availability: true,
        rating: 4.5,
        bookings: 25,
        image: '🧹',
        features: ['Deep cleaning', 'Eco-friendly products', 'Professional staff']
      },
      {
        id: 2,
        name: 'Plumbing Services',
        category: 'maintenance',
        description: 'Emergency and routine plumbing services',
        basePrice: 300,
        duration: '1-2 hours',
        availability: true,
        rating: 4.7,
        bookings: 18,
        image: '🔧',
        features: ['24/7 availability', 'Licensed plumbers', 'Quality parts']
      },
      {
        id: 3,
        name: 'Electrical Repair',
        category: 'maintenance',
        description: 'Electrical installation and repair services',
        basePrice: 400,
        duration: '2-4 hours',
        availability: true,
        rating: 4.6,
        bookings: 22,
        image: '⚡',
        features: ['Licensed electricians', 'Safety certified', 'Warranty included']
      },
      {
        id: 4,
        name: 'Pest Control',
        category: 'cleaning',
        description: 'Professional pest control and prevention',
        basePrice: 800,
        duration: '3-4 hours',
        availability: false,
        rating: 4.3,
        bookings: 12,
        image: '🐛',
        features: ['Safe chemicals', 'Follow-up service', 'Guarantee period']
      },
      {
        id: 5,
        name: 'AC Maintenance',
        category: 'maintenance',
        description: 'Air conditioning service and repair',
        basePrice: 600,
        duration: '2-3 hours',
        availability: true,
        rating: 4.4,
        bookings: 30,
        image: '❄️',
        features: ['Annual maintenance', 'Emergency repair', 'Genuine parts']
      },
      {
        id: 6,
        name: 'Catering Services',
        category: 'events',
        description: 'Event catering and food services',
        basePrice: 200,
        duration: '4-6 hours',
        availability: true,
        rating: 4.8,
        bookings: 35,
        image: '🍽️',
        features: ['Custom menus', 'Setup included', 'Professional staff']
      }
    ];

    const mockProviders = [
      {
        id: 1,
        name: 'CleanPro Services',
        category: 'cleaning',
        services: ['House Cleaning', 'Pest Control'],
        contact: '+91 98765 43210',
        email: 'info@cleanpro.com',
        rating: 4.5,
        experience: '5 years',
        verified: true,
        activeJobs: 8,
        completedJobs: 245
      },
      {
        id: 2,
        name: 'FixIt Solutions',
        category: 'maintenance',
        services: ['Plumbing Services', 'Electrical Repair'],
        contact: '+91 87654 32109',
        email: 'contact@fixit.com',
        rating: 4.7,
        experience: '8 years',
        verified: true,
        activeJobs: 12,
        completedJobs: 380
      },
      {
        id: 3,
        name: 'Cool Air Technologies',
        category: 'maintenance',
        services: ['AC Maintenance'],
        contact: '+91 76543 21098',
        email: 'service@coolair.com',
        rating: 4.4,
        experience: '6 years',
        verified: true,
        activeJobs: 5,
        completedJobs: 195
      },
      {
        id: 4,
        name: 'Delicious Catering',
        category: 'events',
        services: ['Catering Services'],
        contact: '+91 65432 10987',
        email: 'orders@delicious.com',
        rating: 4.8,
        experience: '10 years',
        verified: true,
        activeJobs: 15,
        completedJobs: 450
      }
    ];

    const mockBookings = [
      {
        id: 1,
        serviceId: 1,
        serviceName: 'House Cleaning',
        customerName: 'Rajesh Sharma',
        flat: 'A-101',
        date: '2024-01-15',
        time: '10:00 AM',
        status: 'confirmed',
        amount: 500,
        provider: 'CleanPro Services',
        notes: 'Deep cleaning required for kitchen and bathrooms'
      },
      {
        id: 2,
        serviceId: 2,
        serviceName: 'Plumbing Services',
        customerName: 'Priya Patel',
        flat: 'B-205',
        date: '2024-01-16',
        time: '02:00 PM',
        status: 'in-progress',
        amount: 300,
        provider: 'FixIt Solutions',
        notes: 'Kitchen sink drainage issue'
      },
      {
        id: 3,
        serviceId: 5,
        serviceName: 'AC Maintenance',
        customerName: 'Amit Kumar',
        flat: 'C-302',
        date: '2024-01-17',
        time: '11:00 AM',
        status: 'pending',
        amount: 600,
        provider: 'Cool Air Technologies',
        notes: 'Annual maintenance for 2 AC units'
      },
      {
        id: 4,
        serviceId: 6,
        serviceName: 'Catering Services',
        customerName: 'Meera Singh',
        flat: 'A-405',
        date: '2024-01-20',
        time: '06:00 PM',
        status: 'completed',
        amount: 2500,
        provider: 'Delicious Catering',
        notes: 'Birthday party for 25 people'
      }
    ];

    setServices(mockServices);
    setServiceProviders(mockProviders);
    setBookings(mockBookings);
  }, []);

  // Filter functions
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'available' && service.availability) ||
                         (filterStatus === 'unavailable' && !service.availability);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredProviders = serviceProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || provider.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.flat.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Service management functions
  const handleServiceSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const serviceData = {
      id: editingService ? editingService.id : Date.now(),
      name: formData.get('name'),
      category: formData.get('category'),
      description: formData.get('description'),
      basePrice: parseInt(formData.get('basePrice')),
      duration: formData.get('duration'),
      availability: formData.get('availability') === 'true',
      rating: editingService ? editingService.rating : 0,
      bookings: editingService ? editingService.bookings : 0,
      image: formData.get('image') || '🔧',
      features: formData.get('features').split(',').map(f => f.trim())
    };

    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? serviceData : s));
    } else {
      setServices([...services, serviceData]);
    }

    setShowServiceModal(false);
    setEditingService(null);
  };

  const handleProviderSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const providerData = {
      id: editingProvider ? editingProvider.id : Date.now(),
      name: formData.get('name'),
      category: formData.get('category'),
      services: formData.get('services').split(',').map(s => s.trim()),
      contact: formData.get('contact'),
      email: formData.get('email'),
      experience: formData.get('experience'),
      rating: editingProvider ? editingProvider.rating : 0,
      verified: editingProvider ? editingProvider.verified : false,
      activeJobs: editingProvider ? editingProvider.activeJobs : 0,
      completedJobs: editingProvider ? editingProvider.completedJobs : 0
    };

    if (editingProvider) {
      setServiceProviders(serviceProviders.map(p => p.id === editingProvider.id ? providerData : p));
    } else {
      setServiceProviders([...serviceProviders, providerData]);
    }

    setShowProviderModal(false);
    setEditingProvider(null);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bookingData = {
      id: editingBooking ? editingBooking.id : Date.now(),
      serviceId: parseInt(formData.get('serviceId')),
      serviceName: services.find(s => s.id === parseInt(formData.get('serviceId')))?.name || '',
      customerName: formData.get('customerName'),
      flat: formData.get('flat'),
      date: formData.get('date'),
      time: formData.get('time'),
      status: formData.get('status'),
      amount: parseInt(formData.get('amount')),
      provider: formData.get('provider'),
      notes: formData.get('notes')
    };

    if (editingBooking) {
      setBookings(bookings.map(b => b.id === editingBooking.id ? bookingData : b));
    } else {
      setBookings([...bookings, bookingData]);
    }

    setShowBookingModal(false);
    setEditingBooking(null);
  };

  const deleteService = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const deleteProvider = (id) => {
    if (window.confirm('Are you sure you want to delete this provider?')) {
      setServiceProviders(serviceProviders.filter(p => p.id !== id));
    }
  };

  const deleteBooking = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  // Get status styling
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'status-confirmed';
      case 'in-progress': return 'status-progress';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'cleaning': return '🧹';
      case 'maintenance': return '🔧';
      case 'events': return '🎉';
      case 'security': return '🛡️';
      default: return '🏠';
    }
  };

  // Calculate summary stats
  const totalRevenue = bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.amount, 0);
  const activeBookings = bookings.filter(b => ['confirmed', 'in-progress'].includes(b.status)).length;
  const totalProviders = serviceProviders.length;
  const averageRating = services.length > 0 ? (services.reduce((sum, s) => sum + s.rating, 0) / services.length).toFixed(1) : 0;

  return (
    <div className="admin-container">
      <div className="admin-bg-elements"></div>
      <div className="admin-content">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
          <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Services Management
          </h1>
          <p className="text-gray-400 mt-2">Manage society services, providers and bookings</p>
        </div>

        {/* Summary Cards */}
        <div className="summary-grid">
          <div className="summary-card revenue">
            <div className="summary-icon">💰</div>
            <div className="summary-info">
              <h3>Total Revenue</h3>
              <div className="summary-value">₹{totalRevenue.toLocaleString()}</div>
              <div className="summary-change positive">+12% vs last month</div>
            </div>
          </div>
          <div className="summary-card bookings">
            <div className="summary-icon">📅</div>
            <div className="summary-info">
              <h3>Active Bookings</h3>
              <div className="summary-value">{activeBookings}</div>
              <div className="summary-change positive">+5 new today</div>
            </div>
          </div>
          <div className="summary-card providers">
            <div className="summary-icon">👥</div>
            <div className="summary-info">
              <h3>Service Providers</h3>
              <div className="summary-value">{totalProviders}</div>
              <div className="summary-change neutral">All verified</div>
            </div>
          </div>
          <div className="summary-card rating">
            <div className="summary-icon">⭐</div>
            <div className="summary-info">
              <h3>Average Rating</h3>
              <div className="summary-value">{averageRating}</div>
              <div className="summary-change positive">+0.2 this month</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${selectedTab === 'services' ? 'active' : ''}`}
            onClick={() => setSelectedTab('services')}
          >
            🏠 Services
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'providers' ? 'active' : ''}`}
            onClick={() => setSelectedTab('providers')}
          >
            👥 Providers
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setSelectedTab('bookings')}
          >
            📅 Bookings
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
            
            {selectedTab === 'services' && (
              <>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Categories</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="events">Events</option>
                  <option value="security">Security</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </>
            )}

            {selectedTab === 'providers' && (
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Categories</option>
                <option value="cleaning">Cleaning</option>
                <option value="maintenance">Maintenance</option>
                <option value="events">Events</option>
                <option value="security">Security</option>
              </select>
            )}

            {selectedTab === 'bookings' && (
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            )}
          </div>

          <div className="action-buttons">
            {selectedTab === 'services' && (
              <button
                onClick={() => setShowServiceModal(true)}
                className="add-btn"
              >
                ➕ Add Service
              </button>
            )}
            {selectedTab === 'providers' && (
              <button
                onClick={() => setShowProviderModal(true)}
                className="add-btn"
              >
                ➕ Add Provider
              </button>
            )}
            {selectedTab === 'bookings' && (
              <button
                onClick={() => setShowBookingModal(true)}
                className="add-btn"
              >
                ➕ New Booking
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {selectedTab === 'services' && (
            <div className="services-grid">
              {filteredServices.map(service => (
                <div key={service.id} className="service-card">
                  <div className="service-header">
                    <div className="service-image">{service.image}</div>
                    <div className="service-status">
                      <span className={`availability-badge ${service.availability ? 'available' : 'unavailable'}`}>
                        {service.availability ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="service-content">
                    <h3 className="service-name">{service.name}</h3>
                    <p className="service-category">{getCategoryIcon(service.category)} {service.category}</p>
                    <p className="service-description">{service.description}</p>
                    
                    <div className="service-details">
                      <div className="detail-item">
                        <span className="detail-label">Price:</span>
                        <span className="detail-value">₹{service.basePrice}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Duration:</span>
                        <span className="detail-value">{service.duration}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Rating:</span>
                        <span className="detail-value">⭐ {service.rating}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Bookings:</span>
                        <span className="detail-value">{service.bookings}</span>
                      </div>
                    </div>

                    <div className="service-features">
                      {service.features.map((feature, index) => (
                        <span key={index} className="feature-tag">{feature}</span>
                      ))}
                    </div>
                  </div>

                  <div className="service-actions">
                    <button
                      onClick={() => {
                        setEditingService(service);
                        setShowServiceModal(true);
                      }}
                      className="edit-btn"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteService(service.id)}
                      className="delete-btn"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'providers' && (
            <div className="providers-grid">
              {filteredProviders.map(provider => (
                <div key={provider.id} className="provider-card">
                  <div className="provider-header">
                    <div className="provider-info">
                      <h3 className="provider-name">{provider.name}</h3>
                      <p className="provider-category">{getCategoryIcon(provider.category)} {provider.category}</p>
                      {provider.verified && <span className="verified-badge">✅ Verified</span>}
                    </div>
                    <div className="provider-rating">
                      <span className="rating-value">⭐ {provider.rating}</span>
                    </div>
                  </div>

                  <div className="provider-content">
                    <div className="provider-services">
                      <h4>Services Offered:</h4>
                      <div className="services-list">
                        {provider.services.map((service, index) => (
                          <span key={index} className="service-tag">{service}</span>
                        ))}
                      </div>
                    </div>

                    <div className="provider-stats">
                      <div className="stat-item">
                        <span className="stat-label">Experience:</span>
                        <span className="stat-value">{provider.experience}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Active Jobs:</span>
                        <span className="stat-value">{provider.activeJobs}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Completed:</span>
                        <span className="stat-value">{provider.completedJobs}</span>
                      </div>
                    </div>

                    <div className="provider-contact">
                      <div className="contact-item">
                        <span className="contact-icon">📞</span>
                        <span className="contact-value">{provider.contact}</span>
                      </div>
                      <div className="contact-item">
                        <span className="contact-icon">✉️</span>
                        <span className="contact-value">{provider.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="provider-actions">
                    <button
                      onClick={() => {
                        setEditingProvider(provider);
                        setShowProviderModal(true);
                      }}
                      className="edit-btn"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteProvider(provider.id)}
                      className="delete-btn"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'bookings' && (
            <div className="bookings-table">
              <div className="table-header">
                <div className="header-cell">Customer</div>
                <div className="header-cell">Service</div>
                <div className="header-cell">Date & Time</div>
                <div className="header-cell">Amount</div>
                <div className="header-cell">Status</div>
                <div className="header-cell">Actions</div>
              </div>
              
              {filteredBookings.map(booking => (
                <div key={booking.id} className="table-row">
                  <div className="table-cell">
                    <div className="customer-info">
                      <div className="customer-name">{booking.customerName}</div>
                      <div className="customer-flat">{booking.flat}</div>
                    </div>
                  </div>
                  <div className="table-cell">
                    <div className="service-info">
                      <div className="service-name">{booking.serviceName}</div>
                      <div className="service-provider">{booking.provider}</div>
                    </div>
                  </div>
                  <div className="table-cell">
                    <div className="datetime-info">
                      <div className="booking-date">{booking.date}</div>
                      <div className="booking-time">{booking.time}</div>
                    </div>
                  </div>
                  <div className="table-cell">
                    <div className="booking-amount">₹{booking.amount}</div>
                  </div>
                  <div className="table-cell">
                    <span className={`status-badge ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="table-cell">
                    <div className="row-actions">
                      <button
                        onClick={() => {
                          setEditingBooking(booking);
                          setShowBookingModal(true);
                        }}
                        className="row-edit-btn"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteBooking(booking.id)}
                        className="row-delete-btn"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Service Modal */}
        {showServiceModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{editingService ? 'Edit Service' : 'Add New Service'}</h2>
                <button
                  onClick={() => {
                    setShowServiceModal(false);
                    setEditingService(null);
                  }}
                  className="modal-close"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleServiceSubmit} className="modal-form">
                <div className="form-group">
                  <label>Service Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingService?.name}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    defaultValue={editingService?.category}
                    required
                    className="form-select"
                  >
                    <option value="">Select Category</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="events">Events</option>
                    <option value="security">Security</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    defaultValue={editingService?.description}
                    required
                    className="form-textarea"
                    rows="3"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Base Price (₹)</label>
                    <input
                      type="number"
                      name="basePrice"
                      defaultValue={editingService?.basePrice}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      name="duration"
                      defaultValue={editingService?.duration}
                      placeholder="e.g., 2-3 hours"
                      required
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Image/Icon</label>
                    <input
                      type="text"
                      name="image"
                      defaultValue={editingService?.image}
                      placeholder="Emoji or icon"
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Availability</label>
                    <select
                      name="availability"
                      defaultValue={editingService?.availability}
                      required
                      className="form-select"
                    >
                      <option value="true">Available</option>
                      <option value="false">Unavailable</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Features (comma-separated)</label>
                  <input
                    type="text"
                    name="features"
                    defaultValue={editingService?.features?.join(', ')}
                    placeholder="e.g., 24/7 availability, Licensed professionals"
                    className="form-input"
                  />
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    {editingService ? 'Update Service' : 'Add Service'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowServiceModal(false);
                      setEditingService(null);
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

        {/* Provider Modal */}
        {showProviderModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{editingProvider ? 'Edit Provider' : 'Add New Provider'}</h2>
                <button
                  onClick={() => {
                    setShowProviderModal(false);
                    setEditingProvider(null);
                  }}
                  className="modal-close"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleProviderSubmit} className="modal-form">
                <div className="form-group">
                  <label>Provider Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingProvider?.name}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    defaultValue={editingProvider?.category}
                    required
                    className="form-select"
                  >
                    <option value="">Select Category</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="events">Events</option>
                    <option value="security">Security</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Services Offered (comma-separated)</label>
                  <input
                    type="text"
                    name="services"
                    defaultValue={editingProvider?.services?.join(', ')}
                    required
                    className="form-input"
                    placeholder="e.g., House Cleaning, Pest Control"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Contact Number</label>
                    <input
                      type="tel"
                      name="contact"
                      defaultValue={editingProvider?.contact}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={editingProvider?.email}
                      required
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Experience</label>
                  <input
                    type="text"
                    name="experience"
                    defaultValue={editingProvider?.experience}
                    placeholder="e.g., 5 years"
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    {editingProvider ? 'Update Provider' : 'Add Provider'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowProviderModal(false);
                      setEditingProvider(null);
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

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{editingBooking ? 'Edit Booking' : 'New Booking'}</h2>
                <button
                  onClick={() => {
                    setShowBookingModal(false);
                    setEditingBooking(null);
                  }}
                  className="modal-close"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleBookingSubmit} className="modal-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Customer Name</label>
                    <input
                      type="text"
                      name="customerName"
                      defaultValue={editingBooking?.customerName}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Flat Number</label>
                    <input
                      type="text"
                      name="flat"
                      defaultValue={editingBooking?.flat}
                      required
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Service</label>
                  <select
                    name="serviceId"
                    defaultValue={editingBooking?.serviceId}
                    required
                    className="form-select"
                  >
                    <option value="">Select Service</option>
                    {services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name} - ₹{service.basePrice}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      name="date"
                      defaultValue={editingBooking?.date}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Time</label>
                    <input
                      type="time"
                      name="time"
                      defaultValue={editingBooking?.time}
                      required
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Amount (₹)</label>
                    <input
                      type="number"
                      name="amount"
                      defaultValue={editingBooking?.amount}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      defaultValue={editingBooking?.status}
                      required
                      className="form-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Provider</label>
                  <select
                    name="provider"
                    defaultValue={editingBooking?.provider}
                    required
                    className="form-select"
                  >
                    <option value="">Select Provider</option>
                    {serviceProviders.map(provider => (
                      <option key={provider.id} value={provider.name}>
                        {provider.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    name="notes"
                    defaultValue={editingBooking?.notes}
                    className="form-textarea"
                    rows="3"
                    placeholder="Special instructions or requirements"
                  />
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    {editingBooking ? 'Update Booking' : 'Create Booking'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowBookingModal(false);
                      setEditingBooking(null);
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
