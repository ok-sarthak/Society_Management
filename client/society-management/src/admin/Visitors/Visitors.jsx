import { useState, useEffect } from 'react';
import apiService from '../../services/apiService';
import "./Visitors.css";
import '../AdminTheme.css';

const  Visitors = () => {
  const [visitors, setVisitors] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [newVisitor, setNewVisitor] = useState({
    visitorName: '',
    visitorPhone: '',
    idProofType: 'aadhar',
    idProofNumber: '',
    purpose: 'personal',
    purposeDescription: '',
    visitingMember: '',
    buildingNumber: 1,
    blockNumber: 1,
    floorNumber: 1,
    vehicleNumber: '',
    vehicleType: 'car',
    remarks: ''
  });

  useEffect(() => {
    fetchVisitors();
    fetchMembers();
  }, []);

  const fetchVisitors = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/visitors');
      setVisitors(response.data.data.visitors || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch visitors');
      console.error('Error fetching visitors:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await apiService.get('/members');
      setMembers(response.data.data.members || []);
    } catch (err) {
      console.error('Error fetching members:', err);
    }
  };

  const handleAddVisitor = async (e) => {
    e.preventDefault();
    
    if (members.length === 0) {
      setError('No members available. Please add members first from the Members page.');
      return;
    }
    
    if (!newVisitor.visitorName.trim()) {
      setError('Visitor name is required');
      return;
    }
    if (newVisitor.visitorPhone.length !== 10) {
      setError('Phone number must be exactly 10 digits');
      return;
    }
    if (!newVisitor.idProofNumber.trim()) {
      setError('ID proof number is required');
      return;
    }
    if (!newVisitor.visitingMember.trim()) {
      setError('Visiting member is required');
      return;
    }
    
    const existingActiveVisitor = visitors.find(v => 
      v.visitorPhone === newVisitor.visitorPhone && 
      v.status === 'entered'
    );
    
    if (existingActiveVisitor) {
      setError('This visitor is already checked-in and active. Please check them out first before registering a new entry.');
      return;
    }
    
    try {
      await apiService.post('/visitors', newVisitor);
      setShowAddModal(false);
      setNewVisitor({
        visitorName: '',
        visitorPhone: '',
        idProofType: 'aadhar',
        idProofNumber: '',
        purpose: 'personal',
        purposeDescription: '',
        visitingMember: '',
        buildingNumber: 1,
        blockNumber: 1,
        floorNumber: 1,
        vehicleNumber: '',
        vehicleType: 'car',
        remarks: ''
      });
      setError('');
      fetchVisitors();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to add visitor';
      setError(errorMessage);
      console.error('Error adding visitor:', err);
    }
  };

  const handleCheckOut = async (visitorId) => {
    try {
      await apiService.put(`/visitors/${visitorId}/checkout`);
      fetchVisitors();
    } catch (err) {
      setError('Failed to check out visitor');
      console.error('Error checking out visitor:', err);
    }
  };

  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch = visitor.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visitor.visitorPhone.includes(searchTerm) ||
                         visitor.purposeDescription?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && visitor.status === 'entered') ||
                         (filterStatus === 'checked-out' && visitor.status === 'exited');
    
    return matchesSearch && matchesStatus;
  });

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
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
              Visitors Management
            </h1>
            <p className="text-gray-400 mt-2">Track and manage all society visitors</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Register New Visitor
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

        {/* Search and Filter Section */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 transform hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search visitors by name, phone, or purpose..."
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
                <option value="all">All Visitors</option>
                <option value="active">Active Visitors</option>
                <option value="checked-out">Checked Out</option>
              </select>
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Visitors</p>
                <p className="text-3xl font-bold text-gray-800">{visitors.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Active Visitors</p>
                <p className="text-3xl font-bold text-green-600">{visitors.filter(v => v.status === 'entered').length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Checked Out</p>
                <p className="text-3xl font-bold text-gray-600">{visitors.filter(v => v.status === 'exited').length}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Visitors Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Visitor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Purpose
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Entry Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredVisitors.map((visitor, index) => (
                  <tr key={visitor._id} className="hover:bg-gray-50 transition-colors duration-200"
                      style={{ animationDelay: `${index * 100}ms` }}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">
                              {visitor.visitorName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{visitor.visitorName}</div>
                          <div className="text-sm text-gray-500">
                            {visitor.idProofType.toUpperCase()}: {visitor.idProofNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{visitor.visitorPhone}</div>
                      <div className="text-sm text-gray-500">
                        B-{visitor.buildingNumber}, Block-{visitor.blockNumber}, Floor-{visitor.floorNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium capitalize">{visitor.purpose}</div>
                      <div className="text-sm text-gray-500">
                        {visitor.purposeDescription || 'Visiting Member'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDateTime(visitor.entryTime)}
                      </div>
                      {visitor.exitTime && (
                        <div className="text-sm text-gray-500">
                          Out: {formatDateTime(visitor.exitTime)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        visitor.status === 'entered' 
                          ? 'bg-green-100 text-green-800' 
                          : visitor.status === 'exited'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {visitor.status === 'entered' ? 'Active' : visitor.status === 'exited' ? 'Checked Out' : 'Overstayed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {visitor.status === 'entered' ? (
                        <button
                          onClick={() => handleCheckOut(visitor._id)}
                          className="text-blue-600 hover:text-blue-900 font-medium hover:underline transition-colors duration-200"
                        >
                          Check Out
                        </button>
                      ) : (
                        <span className="text-gray-400">Checked Out</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredVisitors.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg mt-8">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No visitors found matching your criteria.</p>
          </div>
        )}

        {/* Add Visitor Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden transform animate-pulse">
              <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Register New Visitor</h2>
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
                <form onSubmit={handleAddVisitor} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Visitor Name</label>
                      <input
                        type="text"
                        required
                        value={newVisitor.visitorName}
                        onChange={(e) => setNewVisitor({...newVisitor, visitorName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder="Enter 10-digit phone number"
                        value={newVisitor.visitorPhone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setNewVisitor({...newVisitor, visitorPhone: value});
                        }}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      <p className="text-xs text-gray-500">Must be exactly 10 digits</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">ID Type</label>
                      <select
                        value={newVisitor.idProofType}
                        onChange={(e) => setNewVisitor({...newVisitor, idProofType: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="aadhar">Aadhar Card</option>
                        <option value="pan">PAN Card</option>
                        <option value="driving_license">Driving License</option>
                        <option value="voter_id">Voter ID</option>
                        <option value="passport">Passport</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">ID Number</label>
                      <input
                        type="text"
                        required
                        value={newVisitor.idProofNumber}
                        onChange={(e) => setNewVisitor({...newVisitor, idProofNumber: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Purpose</label>
                      <select
                        value={newVisitor.purpose}
                        onChange={(e) => setNewVisitor({...newVisitor, purpose: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="personal">Personal</option>
                        <option value="delivery">Delivery</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="official">Official</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Visiting Member</label>
                      <select
                        required
                        value={newVisitor.visitingMember}
                        onChange={(e) => {
                          const selectedMember = members.find(m => m.name === e.target.value);
                          setNewVisitor({
                            ...newVisitor, 
                            visitingMember: e.target.value,
                            buildingNumber: selectedMember?.buildingNumber || 1,
                            blockNumber: selectedMember?.blockNumber || 1,
                            floorNumber: selectedMember?.floorNumber || 1
                          });
                        }}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select a member</option>
                        {members.length > 0 ? (
                          members.map((member) => (
                            <option key={member._id} value={member.name}>
                              {member.name} - B{member.buildingNumber}/Bl{member.blockNumber}/F{member.floorNumber}
                            </option>
                          ))
                        ) : (
                          <option value="" disabled>No members available - Please add members first</option>
                        )}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Building Number</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={newVisitor.buildingNumber}
                        onChange={(e) => setNewVisitor({...newVisitor, buildingNumber: parseInt(e.target.value)})}
                        className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${newVisitor.visitingMember ? 'bg-gray-50' : ''}`}
                        readOnly={newVisitor.visitingMember !== ''}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Block Number</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={newVisitor.blockNumber}
                        onChange={(e) => setNewVisitor({...newVisitor, blockNumber: parseInt(e.target.value)})}
                        className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${newVisitor.visitingMember ? 'bg-gray-50' : ''}`}
                        readOnly={newVisitor.visitingMember !== ''}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Floor Number</label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={newVisitor.floorNumber}
                        onChange={(e) => setNewVisitor({...newVisitor, floorNumber: parseInt(e.target.value)})}
                        className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${newVisitor.visitingMember ? 'bg-gray-50' : ''}`}
                        readOnly={newVisitor.visitingMember !== ''}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Vehicle Type</label>
                      <select
                        value={newVisitor.vehicleType}
                        onChange={(e) => setNewVisitor({...newVisitor, vehicleType: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="car">Car</option>
                        <option value="bike">Bike</option>
                        <option value="scooter">Scooter</option>
                        <option value="bicycle">Bicycle</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Vehicle Number (Optional)</label>
                      <input
                        type="text"
                        value={newVisitor.vehicleNumber}
                        onChange={(e) => setNewVisitor({...newVisitor, vehicleNumber: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Purpose Description</label>
                      <input
                        type="text"
                        value={newVisitor.purposeDescription}
                        onChange={(e) => setNewVisitor({...newVisitor, purposeDescription: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Remarks</label>
                      <textarea
                        value={newVisitor.remarks}
                        onChange={(e) => setNewVisitor({...newVisitor, remarks: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        rows={3}
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
                      Register Visitor
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
};

export default Visitors;  