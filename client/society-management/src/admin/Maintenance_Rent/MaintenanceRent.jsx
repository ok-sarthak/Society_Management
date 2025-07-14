import React, { useState, useEffect } from 'react';
import apiService from '../../services/apiService';
import './MaintenanceRent.css';
import '../AdminTheme.css';

export default function MaintenanceRent() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    category: 'other',
    priority: 'medium',
    location: '',
    buildingNumber: 1,
    blockNumber: 1,
    floorNumber: 1,
    estimatedCost: 0,
    notes: ''
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      // const response = await apiService.get('/maintenance/requests');
      // setRequests(response.data.data.requests || []);
      setRequests([]); // Placeholder for now
      setError('');
    } catch (err) {
      setError('Failed to fetch maintenance requests');
      console.error('Error fetching maintenance requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRequest = async (e) => {
    e.preventDefault();
    try {
      // await apiService.post('/maintenance/requests', newRequest);
      setShowAddModal(false);
      setNewRequest({
        title: '',
        description: '',
        category: 'other',
        priority: 'medium',
        location: '',
        buildingNumber: 1,
        blockNumber: 1,
        floorNumber: 1,
        estimatedCost: 0,
        notes: ''
      });
      fetchRequests();
    } catch (err) {
      setError('Failed to add maintenance request');
      console.error('Error adding maintenance request:', err);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      // await apiService.put(`/maintenance/requests/${id}`, { status });
      fetchRequests();
    } catch (err) {
      setError('Failed to update request status');
      console.error('Error updating request status:', err);
    }
  };

  const handleDeleteRequest = async (id) => {
    if (window.confirm('Are you sure you want to delete this maintenance request?')) {
      try {
        // await apiService.delete(`/maintenance/requests/${id}`);
        fetchRequests();
      } catch (err) {
        setError('Failed to delete maintenance request');
        console.error('Error deleting maintenance request:', err);
      }
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || request.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white shadow-lg';
      case 'high': return 'bg-orange-500 text-white shadow-md';
      case 'medium': return 'bg-yellow-500 text-white shadow-md';
      case 'low': return 'bg-green-500 text-white shadow-md';
      default: return 'bg-gray-500 text-white shadow-md';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-amber-500 text-white shadow-md';
      case 'in_progress': return 'bg-blue-500 text-white shadow-md';
      case 'completed': return 'bg-emerald-500 text-white shadow-md';
      case 'cancelled': return 'bg-red-500 text-white shadow-md';
      default: return 'bg-gray-500 text-white shadow-md';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
        <div className="flex justify-center items-center h-64">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-solid rounded-full animate-spin"></div>
            <div className="w-16 h-16 border-4 border-blue-600 border-solid rounded-full animate-spin absolute top-0 left-0" 
                 style={{ borderTopColor: 'transparent', animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-bg-elements"></div>
      <div className="admin-content">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="transform hover:scale-[1.02] transition-transform duration-200">
            <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Maintenance & Rent
            </h1>
            <p className="text-gray-400 mt-2">Manage all maintenance requests and rental information</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Request
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg animate-pulse">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Requests</p>
                <p className="text-3xl font-bold text-gray-800">{requests.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Pending</p>
                <p className="text-3xl font-bold text-amber-600">{requests.filter(r => r.status === 'pending').length}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">In Progress</p>
                <p className="text-3xl font-bold text-blue-600">{requests.filter(r => r.status === 'in_progress').length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Completed</p>
                <p className="text-3xl font-bold text-emerald-600">{requests.filter(r => r.status === 'completed').length}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-full">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 transform hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search requests by title, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white min-w-[200px]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="relative">
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white min-w-[200px]"
              >
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRequests.map((request, index) => (
            <div key={request._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100 overflow-hidden"
                 style={{ animationDelay: `${index * 100}ms` }}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{request.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{request.description}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(request.priority)}`}>
                      {request.priority}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(request.status)}`}>
                      {request.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{request.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>Building {request.buildingNumber}, Block {request.blockNumber}, Floor {request.floorNumber}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span className="capitalize">{request.category}</span>
                  </div>
                  {request.estimatedCost > 0 && (
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <span>₹{request.estimatedCost}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    {formatDate(request.createdAt)}
                  </span>
                  <div className="flex space-x-2">
                    {request.status === 'pending' && (
                      <button
                        onClick={() => handleUpdateStatus(request._id, 'in_progress')}
                        className="text-blue-600 hover:text-blue-900 font-medium hover:underline transition-colors duration-200"
                      >
                        Start Work
                      </button>
                    )}
                    {request.status === 'in_progress' && (
                      <button
                        onClick={() => handleUpdateStatus(request._id, 'completed')}
                        className="text-emerald-600 hover:text-emerald-900 font-medium hover:underline transition-colors duration-200"
                      >
                        Complete
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteRequest(request._id)}
                      className="text-red-600 hover:text-red-900 font-medium hover:underline transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg mt-8">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No maintenance requests found matching your criteria.</p>
          </div>
        )}

        {/* Add Request Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden transform animate-fadeIn">
              <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Create New Maintenance Request</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                <form onSubmit={handleAddRequest} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Title</label>
                      <input
                        type="text"
                        required
                        value={newRequest.title}
                        onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter request title"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Category</label>
                      <select
                        value={newRequest.category}
                        onChange={(e) => setNewRequest({...newRequest, category: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="electrical">Electrical</option>
                        <option value="plumbing">Plumbing</option>
                        <option value="structural">Structural</option>
                        <option value="cleaning">Cleaning</option>
                        <option value="security">Security</option>
                        <option value="landscaping">Landscaping</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Description</label>
                      <textarea
                        required
                        rows={3}
                        value={newRequest.description}
                        onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Describe the maintenance issue"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Priority</label>
                      <select
                        value={newRequest.priority}
                        onChange={(e) => setNewRequest({...newRequest, priority: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Building Number</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={newRequest.buildingNumber}
                        onChange={(e) => setNewRequest({...newRequest, buildingNumber: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Block Number</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={newRequest.blockNumber}
                        onChange={(e) => setNewRequest({...newRequest, blockNumber: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Floor Number</label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={newRequest.floorNumber}
                        onChange={(e) => setNewRequest({...newRequest, floorNumber: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Estimated Cost (₹)</label>
                      <input
                        type="number"
                        min="0"
                        value={newRequest.estimatedCost}
                        onChange={(e) => setNewRequest({...newRequest, estimatedCost: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Location</label>
                      <input
                        type="text"
                        required
                        value={newRequest.location}
                        onChange={(e) => setNewRequest({...newRequest, location: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Specific location details"
                      />
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Notes</label>
                      <textarea
                        rows={3}
                        value={newRequest.notes}
                        onChange={(e) => setNewRequest({...newRequest, notes: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Additional notes (optional)"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-6 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      Create Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}