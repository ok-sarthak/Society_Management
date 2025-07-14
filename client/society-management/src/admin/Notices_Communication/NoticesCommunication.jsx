import React, { useState, useEffect } from 'react';
import './NoticesCommunication.css';
import '../AdminTheme.css';

const NoticesCommunication = () => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: 'Water Supply Maintenance',
      content: 'Water supply will be interrupted tomorrow from 10 AM to 2 PM for maintenance work.',
      category: 'maintenance',
      priority: 'high',
      status: 'active',
      author: 'Admin',
      createdAt: '2024-01-15T09:00:00Z',
      expiryDate: '2024-01-16T18:00:00Z',
      targetAudience: 'all',
      attachments: [],
      readBy: [],
      pinned: true
    },
    {
      id: 2,
      title: 'Monthly Maintenance Fee Due',
      content: 'Reminder: Monthly maintenance fees for January 2024 are due by 25th January. Please make payments online or visit the office.',
      category: 'payment',
      priority: 'medium',
      status: 'active',
      author: 'Accounts Department',
      createdAt: '2024-01-10T14:30:00Z',
      expiryDate: '2024-01-25T23:59:59Z',
      targetAudience: 'all',
      attachments: [],
      readBy: [],
      pinned: false
    },
    {
      id: 3,
      title: 'New Year Celebration Event',
      content: 'Join us for a community New Year celebration on 31st December at the clubhouse. Potluck dinner and cultural programs.',
      category: 'event',
      priority: 'low',
      status: 'active',
      author: 'Events Committee',
      createdAt: '2024-01-08T16:15:00Z',
      expiryDate: '2024-12-31T23:59:59Z',
      targetAudience: 'all',
      attachments: [],
      readBy: [],
      pinned: false
    },
    {
      id: 4,
      title: 'Parking Guidelines Update',
      content: 'Updated parking guidelines are now in effect. Please ensure vehicles are parked within designated areas only.',
      category: 'general',
      priority: 'medium',
      status: 'active',
      author: 'Security Team',
      createdAt: '2024-01-05T11:20:00Z',
      expiryDate: '2024-06-30T23:59:59Z',
      targetAudience: 'all',
      attachments: [],
      readBy: [],
      pinned: false
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    priority: 'medium',
    targetAudience: 'all',
    expiryDate: '',
    pinned: false
  });

  const categories = [
    { value: 'general', label: 'General', icon: '📢' },
    { value: 'maintenance', label: 'Maintenance', icon: '🔧' },
    { value: 'payment', label: 'Payment', icon: '💳' },
    { value: 'event', label: 'Events', icon: '🎉' },
    { value: 'safety', label: 'Safety', icon: '🚨' },
    { value: 'emergency', label: 'Emergency', icon: '⚠️' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: '#10b981' },
    { value: 'medium', label: 'Medium', color: '#f59e0b' },
    { value: 'high', label: 'High', color: '#ef4444' },
    { value: 'urgent', label: 'Urgent', color: '#dc2626' }
  ];

  useEffect(() => {
    // Load notices from localStorage
    const savedNotices = localStorage.getItem('societyNotices');
    if (savedNotices) {
      setNotices(JSON.parse(savedNotices));
    }
  }, []);

  useEffect(() => {
    // Save notices to localStorage
    localStorage.setItem('societyNotices', JSON.stringify(notices));
  }, [notices]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingNotice) {
      setNotices(notices.map(notice => 
        notice.id === editingNotice.id 
          ? { 
              ...notice, 
              ...formData, 
              updatedAt: new Date().toISOString() 
            }
          : notice
      ));
    } else {
      const newNotice = {
        ...formData,
        id: Date.now(),
        author: 'Admin',
        createdAt: new Date().toISOString(),
        status: 'active',
        readBy: [],
        attachments: []
      };
      setNotices([newNotice, ...notices]);
    }
    
    setShowModal(false);
    setEditingNotice(null);
    setFormData({
      title: '',
      content: '',
      category: 'general',
      priority: 'medium',
      targetAudience: 'all',
      expiryDate: '',
      pinned: false
    });
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content,
      category: notice.category,
      priority: notice.priority,
      targetAudience: notice.targetAudience,
      expiryDate: notice.expiryDate ? notice.expiryDate.split('T')[0] : '',
      pinned: notice.pinned || false
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      setNotices(notices.filter(notice => notice.id !== id));
    }
  };

  const toggleNoticeStatus = (id) => {
    setNotices(notices.map(notice => 
      notice.id === id 
        ? { ...notice, status: notice.status === 'active' ? 'archived' : 'active' }
        : notice
    ));
  };

  const togglePin = (id) => {
    setNotices(notices.map(notice => 
      notice.id === id 
        ? { ...notice, pinned: !notice.pinned }
        : notice
    ));
  };

  const filteredNotices = notices.filter(notice => {
    const matchesCategory = filterCategory === 'all' || notice.category === filterCategory;
    const matchesPriority = filterPriority === 'all' || notice.priority === filterPriority;
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesPriority && matchesSearch;
  });

  const sortedNotices = filteredNotices.sort((a, b) => {
    // Pinned notices first
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    
    // Then by creation date (newest first)
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const getPriorityColor = (priority) => {
    const priorityObj = priorities.find(p => p.value === priority);
    return priorityObj ? priorityObj.color : '#6b7280';
  };

  const getCategoryIcon = (category) => {
    const categoryObj = categories.find(c => c.value === category);
    return categoryObj ? categoryObj.icon : '📢';
  };

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateSummary = () => {
    const total = notices.length;
    const active = notices.filter(n => n.status === 'active' && !isExpired(n.expiryDate)).length;
    const pinned = notices.filter(n => n.pinned).length;
    const urgent = notices.filter(n => n.priority === 'urgent' || n.priority === 'high').length;

    return { total, active, pinned, urgent };
  };

  const summary = calculateSummary();

  return (
    <div className="admin-container">
      <div className="admin-bg-elements"></div>
      <div className="admin-content">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
          <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Notices & Communication
          </h1>
          <p className="text-gray-400 mt-2">Manage community announcements and communications</p>
        </div>

        {/* Summary Cards */}
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>📋</div>
            <div className="summary-content">
              <h3 className="summary-title">Total Notices</h3>
              <p className="summary-value">{summary.total}</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>✅</div>
            <div className="summary-content">
              <h3 className="summary-title">Active Notices</h3>
              <p className="summary-value">{summary.active}</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>📌</div>
            <div className="summary-content">
              <h3 className="summary-title">Pinned Notices</h3>
              <p className="summary-value">{summary.pinned}</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>🚨</div>
            <div className="summary-content">
              <h3 className="summary-title">Urgent Notices</h3>
              <p className="summary-value">{summary.urgent}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="controls-container">
          <div className="search-filter-container">
            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.icon} {category.label}
                </option>
              ))}
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Priorities</option>
              {priorities.map(priority => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="add-notice-btn"
          >
            ➕ Create Notice
          </button>
        </div>

        {/* Notices List */}
        <div className="notices-container">
          {sortedNotices.map(notice => (
            <div 
              key={notice.id} 
              className={`notice-card ${notice.pinned ? 'pinned' : ''} ${isExpired(notice.expiryDate) ? 'expired' : ''} ${notice.status === 'archived' ? 'archived' : ''}`}
            >
              {notice.pinned && (
                <div className="pin-indicator">
                  📌 Pinned
                </div>
              )}

              <div className="notice-header">
                <div className="notice-meta">
                  <div className="notice-category">
                    <span className="category-icon">{getCategoryIcon(notice.category)}</span>
                    <span className="category-name">{categories.find(c => c.value === notice.category)?.label}</span>
                  </div>
                  <div 
                    className="priority-badge"
                    style={{ 
                      background: `linear-gradient(135deg, ${getPriorityColor(notice.priority)}, ${getPriorityColor(notice.priority)}cc)`,
                      color: 'white'
                    }}
                  >
                    {priorities.find(p => p.value === notice.priority)?.label}
                  </div>
                </div>
                <div className="notice-actions-header">
                  <button
                    onClick={() => togglePin(notice.id)}
                    className={`pin-btn ${notice.pinned ? 'pinned' : ''}`}
                    title={notice.pinned ? 'Unpin notice' : 'Pin notice'}
                  >
                    📌
                  </button>
                </div>
              </div>

              <div className="notice-content">
                <h3 className="notice-title">{notice.title}</h3>
                <p className="notice-text">{notice.content}</p>
              </div>

              <div className="notice-footer">
                <div className="notice-info">
                  <div className="author-info">
                    <span className="author-label">By:</span>
                    <span className="author-name">{notice.author}</span>
                  </div>
                  <div className="date-info">
                    <span className="date-label">Posted:</span>
                    <span className="date-value">{formatDate(notice.createdAt)}</span>
                  </div>
                  {notice.expiryDate && (
                    <div className="expiry-info">
                      <span className="expiry-label">Expires:</span>
                      <span className={`expiry-value ${isExpired(notice.expiryDate) ? 'expired' : ''}`}>
                        {formatDate(notice.expiryDate)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="notice-actions">
                  <button
                    onClick={() => toggleNoticeStatus(notice.id)}
                    className={`status-toggle-btn ${notice.status === 'active' ? 'archive-btn' : 'activate-btn'}`}
                  >
                    {notice.status === 'active' ? '📦 Archive' : '📤 Activate'}
                  </button>
                  <button
                    onClick={() => handleEdit(notice)}
                    className="edit-btn"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(notice.id)}
                    className="delete-btn"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>

              {isExpired(notice.expiryDate) && (
                <div className="expired-overlay">
                  <span>⏰ Expired</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {sortedNotices.length === 0 && (
          <div className="no-notices">
            <div className="no-notices-icon">📢</div>
            <h3>No notices found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">
                  {editingNotice ? 'Edit Notice' : 'Create New Notice'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingNotice(null);
                    setFormData({
                      title: '',
                      content: '',
                      category: 'general',
                      priority: 'medium',
                      targetAudience: 'all',
                      expiryDate: '',
                      pinned: false
                    });
                  }}
                  className="close-btn"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="notice-form">
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label className="form-label">Notice Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="form-input"
                      placeholder="Enter notice title..."
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="form-select"
                      required
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.icon} {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Priority *</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      className="form-select"
                      required
                    >
                      {priorities.map(priority => (
                        <option key={priority.value} value={priority.value}>
                          {priority.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Target Audience</label>
                    <select
                      value={formData.targetAudience}
                      onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                      className="form-select"
                    >
                      <option value="all">All Residents</option>
                      <option value="owners">Owners Only</option>
                      <option value="tenants">Tenants Only</option>
                      <option value="committee">Committee Members</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Expiry Date</label>
                    <input
                      type="datetime-local"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.pinned}
                        onChange={(e) => setFormData({...formData, pinned: e.target.checked})}
                        className="form-checkbox"
                      />
                      <span className="checkbox-indicator"></span>
                      Pin this notice
                    </label>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Notice Content *</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      className="form-textarea"
                      rows="6"
                      placeholder="Enter the notice content..."
                      required
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingNotice(null);
                      setFormData({
                        title: '',
                        content: '',
                        category: 'general',
                        priority: 'medium',
                        targetAudience: 'all',
                        expiryDate: '',
                        pinned: false
                      });
                    }}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    {editingNotice ? 'Update Notice' : 'Create Notice'}
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
};

export default NoticesCommunication;
