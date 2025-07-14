import { useState, useEffect } from 'react';
import './Health.css';
import '../AdminTheme.css';

const Health = () => {
  const [healthRecords, setHealthRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterUrgency, setFilterUrgency] = useState('all');

  const [newRecord, setNewRecord] = useState({
    memberName: '',
    memberId: '',
    recordType: 'checkup',
    description: '',
    symptoms: '',
    diagnosis: '',
    treatment: '',
    medications: '',
    doctorName: '',
    facilityName: '',
    visitDate: '',
    followUpDate: '',
    urgency: 'low',
    status: 'active',
    notes: '',
    cost: '',
    insuranceClaimed: false
  });

  const recordTypes = [
    'checkup', 'emergency', 'vaccination', 'prescription', 'lab_test', 
    'specialist_visit', 'surgery', 'therapy', 'dental', 'eye_care', 'other'
  ];

  const urgencyLevels = ['low', 'medium', 'high', 'critical'];

  useEffect(() => {
    fetchHealthRecords();
  }, []);

  const fetchHealthRecords = async () => {
    try {
      setLoading(true);
      // Simulated data - replace with actual API call
      const mockRecords = [
        {
          id: 1,
          memberName: 'John Doe',
          memberId: 'MEM001',
          recordType: 'checkup',
          description: 'Annual health checkup and routine blood work',
          symptoms: 'Routine checkup, no specific symptoms',
          diagnosis: 'Overall good health, slightly elevated cholesterol',
          treatment: 'Lifestyle modifications and dietary changes recommended',
          medications: 'Multivitamin supplements',
          doctorName: 'Dr. Smith',
          facilityName: 'City Hospital',
          visitDate: '2024-01-15',
          followUpDate: '2024-07-15',
          urgency: 'low',
          status: 'completed',
          notes: 'Patient advised to reduce salt intake and increase exercise',
          cost: 2500,
          insuranceClaimed: true,
          createdAt: '2024-01-15'
        },
        {
          id: 2,
          memberName: 'Jane Smith',
          memberId: 'MEM002',
          recordType: 'emergency',
          description: 'Emergency visit due to severe chest pain',
          symptoms: 'Chest pain, shortness of breath, dizziness',
          diagnosis: 'Panic attack, stress-related symptoms',
          treatment: 'Anxiety management, stress reduction techniques',
          medications: 'Short-term anti-anxiety medication',
          doctorName: 'Dr. Johnson',
          facilityName: 'Emergency Care Center',
          visitDate: '2024-01-20',
          followUpDate: '2024-02-05',
          urgency: 'high',
          status: 'follow_up_required',
          notes: 'Patient referred to mental health counselor',
          cost: 5000,
          insuranceClaimed: false,
          createdAt: '2024-01-20'
        },
        {
          id: 3,
          memberName: 'Robert Brown',
          memberId: 'MEM003',
          recordType: 'vaccination',
          description: 'COVID-19 booster vaccination',
          symptoms: 'No symptoms, preventive care',
          diagnosis: 'Vaccination administration',
          treatment: 'COVID-19 booster shot',
          medications: 'Pfizer COVID-19 vaccine',
          doctorName: 'Dr. Wilson',
          facilityName: 'Community Health Center',
          visitDate: '2024-01-10',
          followUpDate: '',
          urgency: 'low',
          status: 'completed',
          notes: 'No adverse reactions observed',
          cost: 0,
          insuranceClaimed: false,
          createdAt: '2024-01-10'
        },
        {
          id: 4,
          memberName: 'Mary Johnson',
          memberId: 'MEM004',
          recordType: 'specialist_visit',
          description: 'Cardiology consultation for irregular heartbeat',
          symptoms: 'Irregular heartbeat, fatigue, occasional chest discomfort',
          diagnosis: 'Atrial fibrillation, requires ongoing monitoring',
          treatment: 'Medication management and lifestyle changes',
          medications: 'Blood thinner, beta-blocker',
          doctorName: 'Dr. Cardiologist',
          facilityName: 'Heart Care Clinic',
          visitDate: '2024-01-25',
          followUpDate: '2024-03-25',
          urgency: 'medium',
          status: 'ongoing_treatment',
          notes: 'Regular monitoring required, ECG scheduled monthly',
          cost: 8000,
          insuranceClaimed: true,
          createdAt: '2024-01-25'
        }
      ];
      setHealthRecords(mockRecords);
    } catch (error) {
      console.error('Error fetching health records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecord = async (e) => {
    e.preventDefault();
    try {
      const recordData = {
        ...newRecord,
        id: Date.now(),
        cost: parseFloat(newRecord.cost) || 0,
        createdAt: new Date().toISOString().split('T')[0]
      };

      setHealthRecords([recordData, ...healthRecords]);
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      console.error('Error adding health record:', error);
    }
  };

  const handleEditRecord = async (e) => {
    e.preventDefault();
    try {
      const updatedRecords = healthRecords.map(record =>
        record.id === editingRecord.id ? {
          ...editingRecord,
          cost: parseFloat(editingRecord.cost) || 0
        } : record
      );

      setHealthRecords(updatedRecords);
      setShowEditModal(false);
      setEditingRecord(null);
    } catch (error) {
      console.error('Error updating health record:', error);
    }
  };

  const handleDeleteRecord = (recordId) => {
    if (window.confirm('Are you sure you want to delete this health record?')) {
      setHealthRecords(healthRecords.filter(record => record.id !== recordId));
    }
  };

  const resetForm = () => {
    setNewRecord({
      memberName: '',
      memberId: '',
      recordType: 'checkup',
      description: '',
      symptoms: '',
      diagnosis: '',
      treatment: '',
      medications: '',
      doctorName: '',
      facilityName: '',
      visitDate: '',
      followUpDate: '',
      urgency: 'low',
      status: 'active',
      notes: '',
      cost: '',
      insuranceClaimed: false
    });
  };

  const filteredRecords = healthRecords.filter(record => {
    const matchesSearch = record.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || record.recordType === filterType;
    const matchesUrgency = filterUrgency === 'all' || record.urgency === filterUrgency;
    return matchesSearch && matchesType && matchesUrgency;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'ongoing_treatment': return 'text-yellow-600 bg-yellow-100';
      case 'follow_up_required': return 'text-orange-600 bg-orange-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      checkup: 'text-blue-600 bg-blue-100',
      emergency: 'text-red-600 bg-red-100',
      vaccination: 'text-green-600 bg-green-100',
      prescription: 'text-purple-600 bg-purple-100',
      lab_test: 'text-indigo-600 bg-indigo-100',
      specialist_visit: 'text-pink-600 bg-pink-100',
      surgery: 'text-red-600 bg-red-100',
      therapy: 'text-teal-600 bg-teal-100',
      dental: 'text-cyan-600 bg-cyan-100',
      eye_care: 'text-amber-600 bg-amber-100',
      other: 'text-gray-600 bg-gray-100'
    };
    return colors[type] || 'text-gray-600 bg-gray-100';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-bg-elements"></div>
      <div className="admin-content">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
          <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Health Records
          </h1>
          <p className="text-gray-400 mt-2">Manage society members' health records and medical information</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Records</p>
                <p className="text-2xl font-bold text-blue-600">{healthRecords.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Emergency Records</p>
                <p className="text-2xl font-bold text-red-600">
                  {healthRecords.filter(r => r.recordType === 'emergency').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Follow-ups Required</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {healthRecords.filter(r => r.status === 'follow_up_required').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Records</p>
                <p className="text-2xl font-bold text-green-600">
                  {healthRecords.filter(r => r.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Add Button */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search health records..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              {recordTypes.map(type => (
                <option key={type} value={type}>
                  {type.replace('_', ' ').charAt(0).toUpperCase() + type.replace('_', ' ').slice(1)}
                </option>
              ))}
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterUrgency}
              onChange={(e) => setFilterUrgency(e.target.value)}
            >
              <option value="all">All Urgency</option>
              {urgencyLevels.map(urgency => (
                <option key={urgency} value={urgency}>
                  {urgency.charAt(0).toUpperCase() + urgency.slice(1)}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Record
            </button>
          </div>
        </div>

        {/* Health Records Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRecords.map((record) => (
            <div key={record.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{record.memberName}</h3>
                    <p className="text-sm text-gray-600 mb-2">Member ID: {record.memberId}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(record.recordType)}`}>
                        {record.recordType.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(record.urgency)}`}>
                        {record.urgency.toUpperCase()} PRIORITY
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Description</h4>
                    <p className="text-sm text-gray-600">{record.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Diagnosis</h4>
                    <p className="text-sm text-gray-600">{record.diagnosis}</p>
                  </div>

                  {record.treatment && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">Treatment</h4>
                      <p className="text-sm text-gray-600">{record.treatment}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {record.doctorName}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {record.facilityName}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(record.visitDate)}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      {formatCurrency(record.cost)}
                    </div>
                  </div>

                  {record.followUpDate && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex items-center">
                        <svg className="h-4 w-4 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium text-yellow-800">
                          Follow-up: {formatDate(record.followUpDate)}
                        </span>
                      </div>
                    </div>
                  )}

                  {record.insuranceClaimed && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center">
                        <svg className="h-4 w-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium text-green-800">Insurance Claimed</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <button
                    onClick={() => {
                      setEditingRecord(record);
                      setShowEditModal(true);
                    }}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRecord(record.id)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No health records found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new health record.</p>
          </div>
        )}

        {/* Add Record Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-4xl w-full m-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Add New Health Record</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleAddRecord} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Member Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newRecord.memberName}
                      onChange={(e) => setNewRecord({...newRecord, memberName: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Member ID</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newRecord.memberId}
                      onChange={(e) => setNewRecord({...newRecord, memberId: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Record Type</label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newRecord.recordType}
                      onChange={(e) => setNewRecord({...newRecord, recordType: e.target.value})}
                    >
                      {recordTypes.map(type => (
                        <option key={type} value={type}>
                          {type.replace('_', ' ').charAt(0).toUpperCase() + type.replace('_', ' ').slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newRecord.urgency}
                      onChange={(e) => setNewRecord({...newRecord, urgency: e.target.value})}
                    >
                      {urgencyLevels.map(urgency => (
                        <option key={urgency} value={urgency}>
                          {urgency.charAt(0).toUpperCase() + urgency.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      required
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newRecord.description}
                      onChange={(e) => setNewRecord({...newRecord, description: e.target.value})}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms</label>
                    <textarea
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newRecord.symptoms}
                      onChange={(e) => setNewRecord({...newRecord, symptoms: e.target.value})}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis</label>
                    <textarea
                      required
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newRecord.diagnosis}
                      onChange={(e) => setNewRecord({...newRecord, diagnosis: e.target.value})}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Treatment</label>
                    <textarea
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newRecord.treatment}
                      onChange={(e) => setNewRecord({...newRecord, treatment: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newRecord.doctorName}
                      onChange={(e) => setNewRecord({...newRecord, doctorName: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Facility Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newRecord.facilityName}
                      onChange={(e) => setNewRecord({...newRecord, facilityName: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Visit Date</label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newRecord.visitDate}
                      onChange={(e) => setNewRecord({...newRecord, visitDate: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newRecord.followUpDate}
                      onChange={(e) => setNewRecord({...newRecord, followUpDate: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cost (₹)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newRecord.cost}
                      onChange={(e) => setNewRecord({...newRecord, cost: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newRecord.status}
                      onChange={(e) => setNewRecord({...newRecord, status: e.target.value})}
                    >
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="ongoing_treatment">Ongoing Treatment</option>
                      <option value="follow_up_required">Follow-up Required</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Medications</label>
                    <textarea
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newRecord.medications}
                      onChange={(e) => setNewRecord({...newRecord, medications: e.target.value})}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newRecord.notes}
                      onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                        checked={newRecord.insuranceClaimed}
                        onChange={(e) => setNewRecord({...newRecord, insuranceClaimed: e.target.checked})}
                      />
                      <span className="text-sm text-gray-700">Insurance Claimed</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                  >
                    Add Record
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Record Modal - Similar structure to Add Modal */}
        {showEditModal && editingRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-4xl w-full m-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Edit Health Record</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleEditRecord} className="space-y-6">
                {/* Similar form fields as Add Modal with editingRecord values */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Member Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editingRecord.memberName}
                      onChange={(e) => setEditingRecord({...editingRecord, memberName: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Member ID</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editingRecord.memberId}
                      onChange={(e) => setEditingRecord({...editingRecord, memberId: e.target.value})}
                    />
                  </div>

                  {/* Add all other fields similar to Add Modal */}
                  
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
                  >
                    Update Record
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-all duration-300"
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
};

export default Health;
