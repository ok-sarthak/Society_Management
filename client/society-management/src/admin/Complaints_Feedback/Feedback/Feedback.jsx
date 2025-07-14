import React, { useState, useEffect } from 'react'
import { 
  MessageSquare, 
  Star, 
  TrendingUp, 
  Users, 
  Calendar, 
  Filter, 
  Search, 
  Plus, 
  Eye, 
  ThumbsUp, 
  ThumbsDown,
  BarChart3,
  PieChart,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react'

export default function Feedback() {
  const [activeSection, setActiveSection] = useState('overview')
  const [feedbacks, setFeedbacks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    category: 'all',
    rating: 'all',
    status: 'all',
    dateRange: 'all'
  })
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState(null)
  const [newFeedback, setNewFeedback] = useState({
    category: 'general',
    rating: 5,
    title: '',
    message: '',
    suggestions: '',
    anonymous: false,
    contact: ''
  })

  // Initialize feedback data
  useEffect(() => {
    setFeedbacks([
      {
        id: 1,
        feedbackId: 'FB001',
        category: 'maintenance',
        rating: 4,
        title: 'Great maintenance service',
        message: 'The maintenance team was very prompt in fixing the elevator issue. Really appreciate their quick response.',
        suggestions: 'Maybe they could provide SMS updates when work is completed.',
        submittedBy: 'Apartment 2A',
        submittedDate: '2025-01-10',
        status: 'reviewed',
        response: 'Thank you for your feedback! We will implement SMS notifications soon.',
        anonymous: false,
        contact: '+91 98765 43210',
        helpful: 12,
        notHelpful: 2
      },
      {
        id: 2,
        feedbackId: 'FB002',
        category: 'security',
        rating: 5,
        title: 'Excellent security measures',
        message: 'The new visitor management system is working great. Security guards are very professional and courteous.',
        suggestions: 'Could we have a mobile app for visitor pre-registration?',
        submittedBy: 'Anonymous',
        submittedDate: '2025-01-08',
        status: 'pending',
        anonymous: true,
        contact: '',
        helpful: 8,
        notHelpful: 0
      },
      {
        id: 3,
        feedbackId: 'FB003',
        category: 'amenities',
        rating: 3,
        title: 'Swimming pool needs attention',
        message: 'The pool area is nice but needs better maintenance. Water quality could be improved.',
        suggestions: 'Regular water testing and cleaning schedule should be posted.',
        submittedBy: 'Apartment 4B',
        submittedDate: '2025-01-06',
        status: 'action_taken',
        response: 'Pool maintenance has been increased to daily cleaning. Water testing reports will be posted weekly.',
        anonymous: false,
        contact: '+91 98765 43211',
        helpful: 15,
        notHelpful: 3
      },
      {
        id: 4,
        feedbackId: 'FB004',
        category: 'management',
        rating: 2,
        title: 'Communication could be better',
        message: 'Society management needs to improve communication about events and maintenance schedules.',
        suggestions: 'Regular WhatsApp updates or email newsletters would help.',
        submittedBy: 'Apartment 1C',
        submittedDate: '2025-01-05',
        status: 'in_progress',
        response: 'We are working on implementing a digital communication system.',
        anonymous: false,
        contact: '+91 98765 43212',
        helpful: 20,
        notHelpful: 1
      },
      {
        id: 5,
        feedbackId: 'FB005',
        category: 'events',
        rating: 5,
        title: 'Loved the cultural night!',
        message: 'The recent cultural event was fantastic! Great organization and participation from residents.',
        suggestions: 'Maybe we could have such events monthly.',
        submittedBy: 'Apartment 3A',
        submittedDate: '2025-01-03',
        status: 'reviewed',
        response: 'So glad you enjoyed it! Monthly events are being planned.',
        anonymous: false,
        contact: '+91 98765 43213',
        helpful: 25,
        notHelpful: 0
      }
    ])
  }, [])

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-400'
    if (rating >= 3) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'reviewed': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'in_progress': return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      case 'action_taken': return 'bg-green-500/20 text-green-300 border-green-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.feedbackId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filters.category === 'all' || feedback.category === filters.category
    const matchesRating = filters.rating === 'all' || feedback.rating.toString() === filters.rating
    const matchesStatus = filters.status === 'all' || feedback.status === filters.status
    
    return matchesSearch && matchesCategory && matchesRating && matchesStatus
  })

  const handleSubmitFeedback = (e) => {
    e.preventDefault()
    const feedback = {
      id: feedbacks.length + 1,
      feedbackId: `FB${String(feedbacks.length + 1).padStart(3, '0')}`,
      ...newFeedback,
      submittedBy: newFeedback.anonymous ? 'Anonymous' : `Apartment ${Math.floor(Math.random() * 50) + 1}${['A', 'B', 'C'][Math.floor(Math.random() * 3)]}`,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      helpful: 0,
      notHelpful: 0
    }
    setFeedbacks([feedback, ...feedbacks])
    setNewFeedback({
      category: 'general',
      rating: 5,
      title: '',
      message: '',
      suggestions: '',
      anonymous: false,
      contact: ''
    })
    setShowFeedbackModal(false)
  }

  const calculateStats = () => {
    const totalFeedbacks = feedbacks.length
    const averageRating = feedbacks.length > 0 
      ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
      : 0
    const positiveRatio = feedbacks.length > 0 
      ? ((feedbacks.filter(f => f.rating >= 4).length / feedbacks.length) * 100).toFixed(0)
      : 0
    const responseRate = feedbacks.length > 0 
      ? ((feedbacks.filter(f => f.status !== 'pending').length / feedbacks.length) * 100).toFixed(0)
      : 0

    return { totalFeedbacks, averageRating, positiveRatio, responseRate }
  }

  const stats = calculateStats()

  const renderStars = (rating, size = 'w-4 h-4') => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
        <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Feedback Management
        </h1>
        <p className="text-gray-400 mt-2">Collect and analyze resident feedback to improve society services</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'overview', name: 'Overview', icon: BarChart3 },
          { id: 'all', name: 'All Feedback', icon: MessageSquare },
          { id: 'analytics', name: 'Analytics', icon: TrendingUp },
          { id: 'categories', name: 'Categories', icon: Target },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              activeSection === tab.id
                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300'
                : 'bg-white/5 border border-white/20 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.name}
          </button>
        ))}
        <button
          onClick={() => setShowFeedbackModal(true)}
          className="ml-auto flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Add Feedback
        </button>
      </div>

      {/* Content based on active section */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Feedback</p>
                  <p className="text-2xl font-bold text-white">{stats.totalFeedbacks}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Average Rating</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-white">{stats.averageRating}</p>
                    {renderStars(Math.round(parseFloat(stats.averageRating)))}
                  </div>
                </div>
                <Star className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Positive Feedback</p>
                  <p className="text-2xl font-bold text-green-400">{stats.positiveRatio}%</p>
                </div>
                <ThumbsUp className="h-8 w-8 text-green-400" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Response Rate</p>
                  <p className="text-2xl font-bold text-purple-400">{stats.responseRate}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Recent Feedback */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Recent Feedback</h3>
            <div className="space-y-4">
              {feedbacks.slice(0, 5).map((feedback) => (
                <div key={feedback.id} className="flex items-start justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-white font-medium">{feedback.title}</h4>
                      {renderStars(feedback.rating)}
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(feedback.status)}`}>
                        {feedback.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm line-clamp-2">{feedback.message}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                      <span>{feedback.submittedBy}</span>
                      <span>{feedback.submittedDate}</span>
                      <span className="capitalize">{feedback.category}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedFeedback(feedback)}
                    className="p-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all duration-300"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSection === 'all' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search feedback..."
                  className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  <option value="all">All Categories</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="security">Security</option>
                  <option value="amenities">Amenities</option>
                  <option value="management">Management</option>
                  <option value="events">Events</option>
                  <option value="general">General</option>
                </select>
              </div>
              <select
                className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={filters.rating}
                onChange={(e) => setFilters({...filters, rating: e.target.value})}
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
              <select
                className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="in_progress">In Progress</option>
                <option value="action_taken">Action Taken</option>
              </select>
            </div>
          </div>

          {/* Feedback List */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden">
            <div className="divide-y divide-white/10">
              {filteredFeedbacks.map((feedback) => (
                <div key={feedback.id} className="p-6 hover:bg-white/5 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-white">{feedback.title}</h3>
                        {renderStars(feedback.rating)}
                        <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(feedback.status)}`}>
                          {feedback.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-3">{feedback.message}</p>
                      {feedback.suggestions && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-400 mb-1">Suggestions:</p>
                          <p className="text-gray-300 text-sm italic">{feedback.suggestions}</p>
                        </div>
                      )}
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>ID: {feedback.feedbackId}</span>
                        <span>From: {feedback.submittedBy}</span>
                        <span>Category: {feedback.category}</span>
                        <span>Date: {feedback.submittedDate}</span>
                      </div>
                      {feedback.response && (
                        <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <p className="text-sm text-gray-400 mb-1">Response:</p>
                          <p className="text-blue-300 text-sm">{feedback.response}</p>
                        </div>
                      )}
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-2">
                          <ThumbsUp className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-gray-400">{feedback.helpful}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ThumbsDown className="h-4 w-4 text-red-400" />
                          <span className="text-sm text-gray-400">{feedback.notHelpful}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedFeedback(feedback)}
                      className="p-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all duration-300 ml-4"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredFeedbacks.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No feedback found</h3>
                <p className="text-gray-400">No feedback matches your current filters.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeSection === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rating Distribution */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Rating Distribution</h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = feedbacks.filter(f => f.rating === rating).length
                  const percentage = feedbacks.length > 0 ? (count / feedbacks.length) * 100 : 0
                  return (
                    <div key={rating} className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <span className="text-white text-sm w-2">{rating}</span>
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getRatingColor(rating)} bg-current`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-gray-400 text-sm w-12">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Feedback by Category</h3>
              <div className="space-y-3">
                {['maintenance', 'security', 'amenities', 'management', 'events', 'general'].map((category) => {
                  const count = feedbacks.filter(f => f.category === category).length
                  const percentage = feedbacks.length > 0 ? (count / feedbacks.length) * 100 : 0
                  return (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-white capitalize">{category}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-blue-400"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-gray-400 text-sm w-8">{count}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Monthly Trends</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-gray-400 text-sm">This Month</p>
                <p className="text-2xl font-bold text-white">{feedbacks.length}</p>
                <p className="text-green-400 text-sm">+25% from last month</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Avg Response Time</p>
                <p className="text-2xl font-bold text-white">2.3 days</p>
                <p className="text-blue-400 text-sm">-0.5 days improvement</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Satisfaction Score</p>
                <p className="text-2xl font-bold text-white">{stats.averageRating}/5</p>
                <p className="text-purple-400 text-sm">+0.3 from last month</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'categories' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Maintenance', count: feedbacks.filter(f => f.category === 'maintenance').length, icon: '🔧', color: 'from-blue-500 to-blue-600' },
              { name: 'Security', count: feedbacks.filter(f => f.category === 'security').length, icon: '🛡️', color: 'from-red-500 to-red-600' },
              { name: 'Amenities', count: feedbacks.filter(f => f.category === 'amenities').length, icon: '🏊', color: 'from-green-500 to-green-600' },
              { name: 'Management', count: feedbacks.filter(f => f.category === 'management').length, icon: '👥', color: 'from-purple-500 to-purple-600' },
              { name: 'Events', count: feedbacks.filter(f => f.category === 'events').length, icon: '🎉', color: 'from-yellow-500 to-yellow-600' },
              { name: 'General', count: feedbacks.filter(f => f.category === 'general').length, icon: '💬', color: 'from-gray-500 to-gray-600' },
            ].map((category) => (
              <div key={category.name} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center text-2xl mb-4`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-2xl font-bold text-gray-300 mb-1">{category.count}</p>
                  <p className="text-gray-400 text-sm">Feedback received</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Submit Feedback</h2>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitFeedback} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Category *</label>
                  <select
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={newFeedback.category}
                    onChange={(e) => setNewFeedback({...newFeedback, category: e.target.value})}
                  >
                    <option value="general">General</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="security">Security</option>
                    <option value="amenities">Amenities</option>
                    <option value="management">Management</option>
                    <option value="events">Events</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Rating *</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewFeedback({...newFeedback, rating: star})}
                        className="p-1"
                      >
                        <Star
                          className={`w-8 h-8 ${star <= newFeedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'} hover:text-yellow-400 transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-white text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="Brief title for your feedback"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={newFeedback.title}
                    onChange={(e) => setNewFeedback({...newFeedback, title: e.target.value})}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-white text-sm font-medium mb-2">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Detailed feedback message"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={newFeedback.message}
                    onChange={(e) => setNewFeedback({...newFeedback, message: e.target.value})}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-white text-sm font-medium mb-2">Suggestions (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Any suggestions for improvement"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={newFeedback.suggestions}
                    onChange={(e) => setNewFeedback({...newFeedback, suggestions: e.target.value})}
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="anonymous"
                      className="w-4 h-4 text-blue-600 bg-white/5 border border-white/20 rounded focus:ring-blue-500"
                      checked={newFeedback.anonymous}
                      onChange={(e) => setNewFeedback({...newFeedback, anonymous: e.target.checked})}
                    />
                    <label htmlFor="anonymous" className="text-white text-sm">Submit anonymously</label>
                  </div>
                </div>

                {!newFeedback.anonymous && (
                  <div className="md:col-span-2">
                    <label className="block text-white text-sm font-medium mb-2">Contact (Optional)</label>
                    <input
                      type="text"
                      placeholder="Your contact information"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      value={newFeedback.contact}
                      onChange={(e) => setNewFeedback({...newFeedback, contact: e.target.value})}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium"
                >
                  Submit Feedback
                </button>
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Feedback Detail Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 max-w-4xl w-full m-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Feedback Details</h2>
              <button
                onClick={() => setSelectedFeedback(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Feedback ID</label>
                  <p className="text-gray-300">{selectedFeedback.feedbackId}</p>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Category</label>
                  <p className="text-gray-300 capitalize">{selectedFeedback.category}</p>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Rating</label>
                  <div className="flex items-center gap-2">
                    {renderStars(selectedFeedback.rating, 'w-5 h-5')}
                    <span className="text-white">({selectedFeedback.rating}/5)</span>
                  </div>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Status</label>
                  <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(selectedFeedback.status)}`}>
                    {selectedFeedback.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Title</label>
                <p className="text-gray-300">{selectedFeedback.title}</p>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Message</label>
                <p className="text-gray-300">{selectedFeedback.message}</p>
              </div>

              {selectedFeedback.suggestions && (
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Suggestions</label>
                  <p className="text-gray-300">{selectedFeedback.suggestions}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Submitted By</label>
                  <p className="text-gray-300">{selectedFeedback.submittedBy}</p>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Date</label>
                  <p className="text-gray-300">{selectedFeedback.submittedDate}</p>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Contact</label>
                  <p className="text-gray-300">{selectedFeedback.contact || 'Not provided'}</p>
                </div>
              </div>

              {selectedFeedback.response && (
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Response</label>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-blue-300">{selectedFeedback.response}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5 text-green-400" />
                  <span className="text-white">{selectedFeedback.helpful} found helpful</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsDown className="h-5 w-5 text-red-400" />
                  <span className="text-white">{selectedFeedback.notHelpful} found not helpful</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="flex-1 bg-white/10 border border-white/20 text-white py-2 px-4 rounded-lg hover:bg-white/20 transition-all duration-300"
                >
                  Close
                </button>
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                  Add Response
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
