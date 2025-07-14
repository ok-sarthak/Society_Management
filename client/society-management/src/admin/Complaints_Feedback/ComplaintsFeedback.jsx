import React, { useState, useEffect } from 'react'
import SlideNavbar from '../Navbar.jsx'
import '../AdminTheme.css'
import { 
  AlertCircle, 
  FileText, 
  Clock, 
  CheckCircle, 
  MessageSquare,
  TrendingUp,
  Users,
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Tag,
  AlertTriangle,
  Zap,
  Shield
} from 'lucide-react'
import Feedback from './Feedback/Feedback.jsx'

const ComplaintsFeedback = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [complaints, setComplaints] = useState([])
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    category: 'all',
    building: 'all'
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedComplaint, setSelectedComplaint] = useState(null)

  // Define navigation items for complaints management
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: AlertCircle },
    { id: 'newcomplaint', name: 'New Complaint', icon: Plus },
    { id: 'allcomplaints', name: 'All Complaints', icon: FileText, badge: complaints.length.toString() },
    { id: 'inprogress', name: 'In Progress', icon: Clock, badge: complaints.filter(c => c.status === 'in_progress').length.toString() },
    { id: 'resolved', name: 'Resolved', icon: CheckCircle, badge: complaints.filter(c => c.status === 'resolved').length.toString() },
    { id: 'categories', name: 'Categories', icon: Tag },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'feedback', name: 'Feedback', icon: MessageSquare },
  ]

  const [newComplaint, setNewComplaint] = useState({
    title: '',
    description: '',
    category: 'maintenance',
    priority: 'medium',
    building: '1',
    block: '1',
    apartment: '',
    contactNumber: '',
    images: []
  })

  // Initialize complaints data
  useEffect(() => {
    // Mock complaint data for demonstration
    setComplaints([
      {
        id: 1,
        complainantId: 'COMP001',
        title: 'Water leakage in common area',
        description: 'There is continuous water leakage in the ground floor common area near the mailboxes.',
        category: 'maintenance',
        priority: 'high',
        status: 'in_progress',
        building: '1',
        block: 'A',
        apartment: '2A',
        contactNumber: '+91 98765 43210',
        createdDate: '2025-01-10',
        updatedDate: '2025-01-12',
        assignedTo: 'Ravi Kumar (Maintenance)',
        estimatedResolution: '2025-01-15',
        images: [],
        comments: [
          { id: 1, author: 'Admin', message: 'Assigned to maintenance team', date: '2025-01-10' },
          { id: 2, author: 'Ravi Kumar', message: 'Parts ordered, will fix by tomorrow', date: '2025-01-12' }
        ]
      },
      {
        id: 2,
        complainantId: 'COMP002',
        title: 'Elevator not working - Block B',
        description: 'Elevator in Block B has been out of order for 2 days. Residents are facing difficulty.',
        category: 'technical',
        priority: 'high',
        status: 'pending',
        building: '1',
        block: 'B',
        apartment: '3C',
        contactNumber: '+91 98765 43211',
        createdDate: '2025-01-08',
        updatedDate: '2025-01-08',
        assignedTo: 'Unassigned',
        estimatedResolution: 'TBD',
        images: [],
        comments: []
      },
      {
        id: 3,
        complainantId: 'COMP003',
        title: 'Noise complaint from neighbor',
        description: 'Excessive noise from apartment 2B during late hours. This has been ongoing for a week.',
        category: 'behavioral',
        priority: 'medium',
        status: 'resolved',
        building: '1',
        block: 'A',
        apartment: '1B',
        contactNumber: '+91 98765 43212',
        createdDate: '2025-01-05',
        updatedDate: '2025-01-09',
        assignedTo: 'Society Manager',
        estimatedResolution: '2025-01-09',
        resolutionDate: '2025-01-09',
        resolutionNotes: 'Spoke with resident in 2B. They agreed to keep noise levels down after 10 PM.',
        images: [],
        comments: [
          { id: 1, author: 'Admin', message: 'Will speak with the concerned resident', date: '2025-01-05' },
          { id: 2, author: 'Society Manager', message: 'Issue resolved after discussion', date: '2025-01-09' }
        ]
      },
      {
        id: 4,
        complainantId: 'COMP004',
        title: 'Parking space unauthorized usage',
        description: 'My designated parking space is being used by someone else regularly.',
        category: 'security',
        priority: 'medium',
        status: 'in_progress',
        building: '1',
        block: 'C',
        apartment: '4A',
        contactNumber: '+91 98765 43213',
        createdDate: '2025-01-11',
        updatedDate: '2025-01-12',
        assignedTo: 'Security Team',
        estimatedResolution: '2025-01-14',
        images: [],
        comments: [
          { id: 1, author: 'Admin', message: 'Assigned to security team for monitoring', date: '2025-01-11' }
        ]
      },
      {
        id: 5,
        complainantId: 'COMP005',
        title: 'Garbage collection delay',
        description: 'Garbage has not been collected for 3 days in Block C. It\'s creating hygiene issues.',
        category: 'maintenance',
        priority: 'high',
        status: 'pending',
        building: '1',
        block: 'C',
        apartment: '2C',
        contactNumber: '+91 98765 43214',
        createdDate: '2025-01-12',
        updatedDate: '2025-01-12',
        assignedTo: 'Unassigned',
        estimatedResolution: 'TBD',
        images: [],
        comments: []
      }
    ])
  }, [])

  const handleNavClick = (item) => {
    setActiveTab(item.id)
    console.log('Clicked on:', item.name)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-red-500/20 text-red-300 border-red-500/30'
      case 'in_progress': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'resolved': return 'bg-green-500/20 text-green-300 border-green-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'low': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4" />
      case 'medium': return <Zap className="h-4 w-4" />
      case 'low': return <Shield className="h-4 w-4" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.complainantId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filters.status === 'all' || complaint.status === filters.status
    const matchesPriority = filters.priority === 'all' || complaint.priority === filters.priority
    const matchesCategory = filters.category === 'all' || complaint.category === filters.category
    const matchesBuilding = filters.building === 'all' || complaint.building === filters.building
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesBuilding
  })

  const handleComplaintSubmit = (e) => {
    e.preventDefault()
    const complaint = {
      id: complaints.length + 1,
      complainantId: `COMP${String(complaints.length + 1).padStart(3, '0')}`,
      ...newComplaint,
      status: 'pending',
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
      assignedTo: 'Unassigned',
      estimatedResolution: 'TBD',
      comments: []
    }
    setComplaints([complaint, ...complaints])
    setNewComplaint({
      title: '',
      description: '',
      category: 'maintenance',
      priority: 'medium',
      building: '1',
      block: '1',
      apartment: '',
      contactNumber: '',
      images: []
    })
  }

  const handleViewComplaint = (complaint) => {
    setSelectedComplaint(complaint)
    setShowDetailModal(true)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-6 space-y-6">
            <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
              <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Complaints Dashboard
              </h1>
              <p className="text-gray-400 mt-2">Manage and track all society complaints efficiently</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Complaints</p>
                    <p className="text-2xl font-bold text-white">{complaints.length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Pending</p>
                    <p className="text-2xl font-bold text-red-400">{complaints.filter(c => c.status === 'pending').length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-red-400" />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">In Progress</p>
                    <p className="text-2xl font-bold text-yellow-400">{complaints.filter(c => c.status === 'in_progress').length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Resolved</p>
                    <p className="text-2xl font-bold text-green-400">{complaints.filter(c => c.status === 'resolved').length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </div>
            </div>

            {/* Recent Complaints */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Recent Complaints</h3>
                <div className="space-y-3">
                  {complaints.slice(0, 5).map((complaint) => (
                    <div key={complaint.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex-1">
                        <p className="text-white font-medium truncate">{complaint.title}</p>
                        <p className="text-gray-400 text-sm">Apt {complaint.apartment} - {complaint.createdDate}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(complaint.status)}`}>
                        {complaint.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Priority Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { priority: 'high', count: complaints.filter(c => c.priority === 'high').length, color: 'text-red-400' },
                    { priority: 'medium', count: complaints.filter(c => c.priority === 'medium').length, color: 'text-yellow-400' },
                    { priority: 'low', count: complaints.filter(c => c.priority === 'low').length, color: 'text-blue-400' },
                  ].map((item) => (
                    <div key={item.priority} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getPriorityIcon(item.priority)}
                        <span className="text-white capitalize">{item.priority} Priority</span>
                      </div>
                      <span className={`font-bold ${item.color}`}>{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'newcomplaint':
        return (
          <div className="p-6 space-y-6">
            <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
              <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                New Complaint
              </h1>
              <p className="text-gray-400 mt-2">Submit a new complaint for quick resolution</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <form onSubmit={handleComplaintSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-white text-sm font-medium mb-2">Complaint Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="Brief title for your complaint"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      value={newComplaint.title}
                      onChange={(e) => setNewComplaint({...newComplaint, title: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Category *</label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      value={newComplaint.category}
                      onChange={(e) => setNewComplaint({...newComplaint, category: e.target.value})}
                    >
                      <option value="maintenance">Maintenance</option>
                      <option value="technical">Technical</option>
                      <option value="security">Security</option>
                      <option value="behavioral">Behavioral</option>
                      <option value="hygiene">Hygiene</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Priority *</label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      value={newComplaint.priority}
                      onChange={(e) => setNewComplaint({...newComplaint, priority: e.target.value})}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Building *</label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      value={newComplaint.building}
                      onChange={(e) => setNewComplaint({...newComplaint, building: e.target.value})}
                    >
                      <option value="1">Building 1</option>
                      <option value="2">Building 2</option>
                      <option value="3">Building 3</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Block *</label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      value={newComplaint.block}
                      onChange={(e) => setNewComplaint({...newComplaint, block: e.target.value})}
                    >
                      <option value="A">Block A</option>
                      <option value="B">Block B</option>
                      <option value="C">Block C</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Apartment *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., 2A, 3B"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      value={newComplaint.apartment}
                      onChange={(e) => setNewComplaint({...newComplaint, apartment: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Contact Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      value={newComplaint.contactNumber}
                      onChange={(e) => setNewComplaint({...newComplaint, contactNumber: e.target.value})}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-white text-sm font-medium mb-2">Description *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Detailed description of the complaint"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      value={newComplaint.description}
                      onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium"
                  >
                    Submit Complaint
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewComplaint({
                      title: '',
                      description: '',
                      category: 'maintenance',
                      priority: 'medium',
                      building: '1',
                      block: '1',
                      apartment: '',
                      contactNumber: '',
                      images: []
                    })}
                    className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
                  >
                    Clear Form
                  </button>
                </div>
              </form>
            </div>
          </div>
        )

      case 'allcomplaints':
      case 'inprogress':
      case 'resolved': {
        const displayComplaints = activeTab === 'allcomplaints' ? filteredComplaints : 
                                filteredComplaints.filter(c => c.status === (activeTab === 'inprogress' ? 'in_progress' : 'resolved'))
        
        return (
          <div className="p-6 space-y-6">
            <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
              <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {activeTab === 'allcomplaints' ? 'All Complaints' : 
                 activeTab === 'inprogress' ? 'In Progress Complaints' : 'Resolved Complaints'}
              </h1>
              <p className="text-gray-400 mt-2">
                {activeTab === 'allcomplaints' ? 'View and manage all complaints' : 
                 activeTab === 'inprogress' ? 'Track ongoing complaint resolutions' : 'Review resolved complaints'}
              </p>
            </div>

            {/* Filters */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 mb-6">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search complaints..."
                    className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={filters.priority}
                    onChange={(e) => setFilters({...filters, priority: e.target.value})}
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                  >
                    <option value="all">All Categories</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="technical">Technical</option>
                    <option value="security">Security</option>
                    <option value="behavioral">Behavioral</option>
                    <option value="hygiene">Hygiene</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Complaints List */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden">
              <div className="divide-y divide-white/10">
                {displayComplaints.map((complaint) => (
                  <div key={complaint.id} className="p-6 hover:bg-white/5 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{complaint.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(complaint.priority)}`}>
                            {complaint.priority.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(complaint.status)}`}>
                            {complaint.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-3 line-clamp-2">{complaint.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>ID: {complaint.complainantId}</span>
                          <span>Apt: {complaint.apartment}</span>
                          <span>Category: {complaint.category}</span>
                          <span>Date: {complaint.createdDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleViewComplaint(complaint)}
                          className="p-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all duration-300"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 bg-green-500/20 border border-green-500/30 text-green-300 rounded-lg hover:bg-green-500/30 transition-all duration-300">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {displayComplaints.length === 0 && (
                <div className="text-center py-12">
                  <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No complaints found</h3>
                  <p className="text-gray-400">No complaints match your current filters.</p>
                </div>
              )}
            </div>
          </div>
        )
      }

      case 'categories':
        return (
          <div className="p-6 space-y-6">
            <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
              <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Complaint Categories
              </h1>
              <p className="text-gray-400 mt-2">Manage and organize complaint categories</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Maintenance', count: complaints.filter(c => c.category === 'maintenance').length, icon: '🔧', color: 'from-blue-500 to-blue-600' },
                { name: 'Technical', count: complaints.filter(c => c.category === 'technical').length, icon: '⚡', color: 'from-yellow-500 to-yellow-600' },
                { name: 'Security', count: complaints.filter(c => c.category === 'security').length, icon: '🛡️', color: 'from-red-500 to-red-600' },
                { name: 'Behavioral', count: complaints.filter(c => c.category === 'behavioral').length, icon: '👥', color: 'from-purple-500 to-purple-600' },
                { name: 'Hygiene', count: complaints.filter(c => c.category === 'hygiene').length, icon: '🧹', color: 'from-green-500 to-green-600' },
                { name: 'Other', count: complaints.filter(c => c.category === 'other').length, icon: '📋', color: 'from-gray-500 to-gray-600' },
              ].map((category) => (
                <div key={category.name} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center text-2xl mb-4`}>
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-2xl font-bold text-gray-300 mb-1">{category.count}</p>
                    <p className="text-gray-400 text-sm">Complaints</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'analytics':
        return (
          <div className="p-6 space-y-6">
            <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
              <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Complaints Analytics
              </h1>
              <p className="text-gray-400 mt-2">Analyze complaint trends and performance metrics</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Resolution Time Analytics */}
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Resolution Time Analysis</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Average Resolution Time</span>
                    <span className="text-white font-bold">3.2 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Fastest Resolution</span>
                    <span className="text-green-400 font-bold">4 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Slowest Resolution</span>
                    <span className="text-red-400 font-bold">7 days</span>
                  </div>
                </div>
              </div>

              {/* Monthly Trends */}
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Monthly Trends</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">This Month</span>
                    <span className="text-white font-bold">{complaints.length} complaints</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Last Month</span>
                    <span className="text-gray-400 font-bold">8 complaints</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Trend</span>
                    <span className="text-red-400 font-bold">↑ 37.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'feedback':
        return (
          <div className="p-6">
            <Feedback />
          </div>
        )

      default:
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-white mb-2">Content Coming Soon</h3>
              <p className="text-gray-400">This section is under development</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="admin-container">
      <div className="admin-bg-elements"></div>
      <div className="admin-content">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Sliding Navbar */}
          <SlideNavbar
            navItems={navItems}
            activeItem={activeTab}
            onItemClick={handleNavClick}
            variant="glass"
            className="mb-8"
          />

          {/* Content Area */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
            {renderContent()}
          </div>

          {/* Complaint Detail Modal */}
          {showDetailModal && selectedComplaint && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 max-w-4xl w-full m-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Complaint Details</h2>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Trash2 className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Complaint ID</label>
                      <p className="text-gray-300">{selectedComplaint.complainantId}</p>
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Status</label>
                      <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(selectedComplaint.status)}`}>
                        {selectedComplaint.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Priority</label>
                      <span className={`px-3 py-1 rounded-full text-sm border ${getPriorityColor(selectedComplaint.priority)}`}>
                        {selectedComplaint.priority.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Category</label>
                      <p className="text-gray-300 capitalize">{selectedComplaint.category}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Title</label>
                    <p className="text-gray-300">{selectedComplaint.title}</p>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Description</label>
                    <p className="text-gray-300">{selectedComplaint.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Building</label>
                      <p className="text-gray-300">Building {selectedComplaint.building}</p>
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Block</label>
                      <p className="text-gray-300">Block {selectedComplaint.block}</p>
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Apartment</label>
                      <p className="text-gray-300">{selectedComplaint.apartment}</p>
                    </div>
                  </div>

                  {selectedComplaint.comments && selectedComplaint.comments.length > 0 && (
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">Comments</label>
                      <div className="space-y-3">
                        {selectedComplaint.comments.map((comment) => (
                          <div key={comment.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-white font-medium">{comment.author}</span>
                              <span className="text-gray-400 text-sm">{comment.date}</span>
                            </div>
                            <p className="text-gray-300">{comment.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowDetailModal(false)}
                      className="flex-1 bg-white/10 border border-white/20 text-white py-2 px-4 rounded-lg hover:bg-white/20 transition-all duration-300"
                    >
                      Close
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ComplaintsFeedback