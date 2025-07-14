import React, { useState, useEffect } from 'react';
import './CoCurricular.css';
import '../AdminTheme.css';

const CoCurricular = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      name: 'Chess Club',
      category: 'Sports & Games',
      instructor: 'Mr. Rajesh Kumar',
      schedule: 'Monday, Wednesday, Friday - 6:00 PM',
      participants: 15,
      maxParticipants: 20,
      ageGroup: '8-60 years',
      fee: 500,
      status: 'active',
      description: 'Learn and improve your chess skills with guided practice sessions',
      location: 'Community Hall A',
      startDate: '2024-01-15',
      endDate: '2024-06-15',
      image: '♟️'
    },
    {
      id: 2,
      name: 'Yoga Classes',
      category: 'Health & Wellness',
      instructor: 'Ms. Priya Sharma',
      schedule: 'Tuesday, Thursday, Saturday - 7:00 AM',
      participants: 25,
      maxParticipants: 30,
      ageGroup: '16+ years',
      fee: 800,
      status: 'active',
      description: 'Morning yoga sessions for physical and mental wellness',
      location: 'Terrace Garden',
      startDate: '2024-01-10',
      endDate: '2024-12-31',
      image: '🧘'
    },
    {
      id: 3,
      name: 'Art & Craft Workshop',
      category: 'Creative Arts',
      instructor: 'Mrs. Anjali Patel',
      schedule: 'Saturday, Sunday - 4:00 PM',
      participants: 12,
      maxParticipants: 15,
      ageGroup: '5-50 years',
      fee: 600,
      status: 'active',
      description: 'Creative workshop covering painting, pottery, and handicrafts',
      location: 'Activity Room B',
      startDate: '2024-02-01',
      endDate: '2024-07-31',
      image: '🎨'
    },
    {
      id: 4,
      name: 'Swimming Classes',
      category: 'Sports & Games',
      instructor: 'Mr. Vikram Singh',
      schedule: 'Daily - 5:00 PM to 7:00 PM',
      participants: 18,
      maxParticipants: 25,
      ageGroup: '6+ years',
      fee: 1200,
      status: 'active',
      description: 'Professional swimming lessons for beginners and advanced swimmers',
      location: 'Society Swimming Pool',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      image: '🏊'
    },
    {
      id: 5,
      name: 'Music Lessons',
      category: 'Performing Arts',
      instructor: 'Mr. Suresh Iyer',
      schedule: 'Monday, Wednesday - 5:30 PM',
      participants: 8,
      maxParticipants: 12,
      ageGroup: '8+ years',
      fee: 1000,
      status: 'upcoming',
      description: 'Learn classical and contemporary music instruments',
      location: 'Music Room',
      startDate: '2024-02-15',
      endDate: '2024-08-15',
      image: '🎵'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    instructor: '',
    schedule: '',
    maxParticipants: '',
    ageGroup: '',
    fee: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    image: ''
  });

  const categories = ['Sports & Games', 'Health & Wellness', 'Creative Arts', 'Performing Arts', 'Academic', 'Technology'];

  useEffect(() => {
    // Load activities from localStorage
    const savedActivities = localStorage.getItem('coCurricularActivities');
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    }
  }, []);

  useEffect(() => {
    // Save activities to localStorage
    localStorage.setItem('coCurricularActivities', JSON.stringify(activities));
  }, [activities]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingActivity) {
      setActivities(activities.map(activity => 
        activity.id === editingActivity.id 
          ? { ...formData, id: editingActivity.id, participants: activity.participants, status: activity.status }
          : activity
      ));
    } else {
      const newActivity = {
        ...formData,
        id: Date.now(),
        participants: 0,
        status: 'upcoming'
      };
      setActivities([...activities, newActivity]);
    }
    
    setShowModal(false);
    setEditingActivity(null);
    setFormData({
      name: '',
      category: '',
      instructor: '',
      schedule: '',
      maxParticipants: '',
      ageGroup: '',
      fee: '',
      description: '',
      location: '',
      startDate: '',
      endDate: '',
      image: ''
    });
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);
    setFormData(activity);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      setActivities(activities.filter(activity => activity.id !== id));
    }
  };

  const toggleActivityStatus = (id) => {
    setActivities(activities.map(activity => 
      activity.id === id 
        ? { ...activity, status: activity.status === 'active' ? 'paused' : 'active' }
        : activity
    ));
  };

  const filteredActivities = activities.filter(activity => {
    const matchesCategory = filterCategory === 'all' || activity.category === filterCategory;
    const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'status-active',
      upcoming: 'status-upcoming',
      paused: 'status-paused',
      completed: 'status-completed'
    };
    return statusClasses[status] || 'status-active';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Sports & Games': '⚽',
      'Health & Wellness': '💪',
      'Creative Arts': '🎨',
      'Performing Arts': '🎭',
      'Academic': '📚',
      'Technology': '💻'
    };
    return icons[category] || '📋';
  };

  const calculateSummary = () => {
    const totalActivities = activities.length;
    const activeActivities = activities.filter(a => a.status === 'active').length;
    const totalParticipants = activities.reduce((sum, a) => sum + a.participants, 0);
    const averageParticipation = totalActivities > 0 ? 
      Math.round((activities.reduce((sum, a) => sum + (a.participants / a.maxParticipants * 100), 0) / totalActivities)) : 0;

    return { totalActivities, activeActivities, totalParticipants, averageParticipation };
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
            Co-Curricular Activities
          </h1>
          <p className="text-gray-400 mt-2">Manage society's extra-curricular programs and activities</p>
        </div>

        {/* Summary Cards */}
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-icon">📊</div>
            <div className="summary-content">
              <h3 className="summary-title">Total Activities</h3>
              <p className="summary-value">{summary.totalActivities}</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">✅</div>
            <div className="summary-content">
              <h3 className="summary-title">Active Programs</h3>
              <p className="summary-value">{summary.activeActivities}</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">👥</div>
            <div className="summary-content">
              <h3 className="summary-title">Total Participants</h3>
              <p className="summary-value">{summary.totalParticipants}</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">📈</div>
            <div className="summary-content">
              <h3 className="summary-title">Avg. Participation</h3>
              <p className="summary-value">{summary.averageParticipation}%</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="controls-container">
          <div className="search-filter-container">
            <input
              type="text"
              placeholder="Search activities or instructors..."
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
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="add-activity-btn"
          >
            ➕ Add New Activity
          </button>
        </div>

        {/* Activities Grid */}
        <div className="activities-grid">
          {filteredActivities.map(activity => (
            <div key={activity.id} className="activity-card">
              <div className="activity-header">
                <div className="activity-image">
                  {activity.image}
                </div>
                <div className="activity-basic-info">
                  <h3 className="activity-name">{activity.name}</h3>
                  <div className="activity-category">
                    <span className="category-icon">{getCategoryIcon(activity.category)}</span>
                    <span>{activity.category}</span>
                  </div>
                </div>
                <div className={`status-badge ${getStatusBadge(activity.status)}`}>
                  {activity.status}
                </div>
              </div>

              <div className="activity-details">
                <div className="detail-item">
                  <span className="detail-label">👨‍🏫 Instructor:</span>
                  <span className="detail-value">{activity.instructor}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">📅 Schedule:</span>
                  <span className="detail-value">{activity.schedule}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">📍 Location:</span>
                  <span className="detail-value">{activity.location}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">👥 Age Group:</span>
                  <span className="detail-value">{activity.ageGroup}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">💰 Fee:</span>
                  <span className="detail-value fee-amount">₹{activity.fee}/month</span>
                </div>
              </div>

              <div className="activity-description">
                <p>{activity.description}</p>
              </div>

              <div className="participation-info">
                <div className="participation-header">
                  <span className="participation-label">Participation</span>
                  <span className="participation-count">
                    {activity.participants}/{activity.maxParticipants}
                  </span>
                </div>
                <div className="participation-bar">
                  <div 
                    className="participation-progress" 
                    style={{ width: `${(activity.participants / activity.maxParticipants) * 100}%` }}
                  ></div>
                </div>
                <div className="participation-percentage">
                  {Math.round((activity.participants / activity.maxParticipants) * 100)}% Full
                </div>
              </div>

              <div className="activity-dates">
                <div className="date-item">
                  <span className="date-label">Start:</span>
                  <span className="date-value">{new Date(activity.startDate).toLocaleDateString()}</span>
                </div>
                <div className="date-item">
                  <span className="date-label">End:</span>
                  <span className="date-value">{new Date(activity.endDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="activity-actions">
                <button
                  onClick={() => toggleActivityStatus(activity.id)}
                  className={`status-toggle-btn ${activity.status === 'active' ? 'pause-btn' : 'activate-btn'}`}
                >
                  {activity.status === 'active' ? '⏸️ Pause' : '▶️ Activate'}
                </button>
                <button
                  onClick={() => handleEdit(activity)}
                  className="edit-btn"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(activity.id)}
                  className="delete-btn"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="no-activities">
            <div className="no-activities-icon">🎯</div>
            <h3>No activities found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">
                  {editingActivity ? 'Edit Activity' : 'Add New Activity'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingActivity(null);
                    setFormData({
                      name: '',
                      category: '',
                      instructor: '',
                      schedule: '',
                      maxParticipants: '',
                      ageGroup: '',
                      fee: '',
                      description: '',
                      location: '',
                      startDate: '',
                      endDate: '',
                      image: ''
                    });
                  }}
                  className="close-btn"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="activity-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Activity Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="form-input"
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
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Instructor *</label>
                    <input
                      type="text"
                      value={formData.instructor}
                      onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Schedule *</label>
                    <input
                      type="text"
                      value={formData.schedule}
                      onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                      className="form-input"
                      placeholder="e.g., Monday, Wednesday - 6:00 PM"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Location *</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Age Group *</label>
                    <input
                      type="text"
                      value={formData.ageGroup}
                      onChange={(e) => setFormData({...formData, ageGroup: e.target.value})}
                      className="form-input"
                      placeholder="e.g., 8-60 years"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Max Participants *</label>
                    <input
                      type="number"
                      value={formData.maxParticipants}
                      onChange={(e) => setFormData({...formData, maxParticipants: parseInt(e.target.value)})}
                      className="form-input"
                      min="1"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Monthly Fee (₹) *</label>
                    <input
                      type="number"
                      value={formData.fee}
                      onChange={(e) => setFormData({...formData, fee: parseInt(e.target.value)})}
                      className="form-input"
                      min="0"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Start Date *</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">End Date *</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Icon/Emoji</label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="form-input"
                      placeholder="e.g., 🎨, ⚽, 🎵"
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="form-textarea"
                    rows="4"
                    placeholder="Describe the activity, its benefits, and what participants can expect..."
                    required
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingActivity(null);
                      setFormData({
                        name: '',
                        category: '',
                        instructor: '',
                        schedule: '',
                        maxParticipants: '',
                        ageGroup: '',
                        fee: '',
                        description: '',
                        location: '',
                        startDate: '',
                        endDate: '',
                        image: ''
                      });
                    }}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    {editingActivity ? 'Update Activity' : 'Add Activity'}
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

export default CoCurricular;
