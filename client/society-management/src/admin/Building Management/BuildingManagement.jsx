import { useState, useEffect } from 'react';
import './BuildingManagement.css';
import '../AdminTheme.css';

const BuildingManagement = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [newBuilding, setNewBuilding] = useState({
    buildingNumber: '',
    buildingName: '',
    address: '',
    totalFloors: '',
    totalFlats: '',
    status: 'active',
    description: '',
    amenities: [],
    contactPerson: '',
    contactPhone: '',
    constructionYear: '',
    buildingType: 'residential'
  });

  const amenitiesList = [
    'Parking', 'Elevator', 'Security', 'Garden', 'Gym', 'Swimming Pool', 
    'Playground', 'Clubhouse', 'Generator', 'Water Tank', 'CCTV', 'Intercom'
  ];

  useEffect(() => {
    fetchBuildings();
  }, []);

  const fetchBuildings = async () => {
    try {
      setLoading(true);
      // Simulated data - replace with actual API call
      const mockBuildings = [
        {
          id: 1,
          buildingNumber: 1,
          buildingName: 'Rose Apartment',
          address: '123 Garden Street, Green Valley',
          totalFloors: 5,
          totalFlats: 20,
          occupiedFlats: 18,
          status: 'active',
          description: 'Modern residential building with all amenities',
          amenities: ['Parking', 'Elevator', 'Security', 'Garden'],
          contactPerson: 'Mr. Sharma',
          contactPhone: '9876543210',
          constructionYear: 2018,
          buildingType: 'residential',
          lastMaintenance: '2024-01-15'
        },
        {
          id: 2,
          buildingNumber: 2,
          buildingName: 'Lotus Tower',
          address: '456 Heights Road, Hill View',
          totalFloors: 8,
          totalFlats: 32,
          occupiedFlats: 30,
          status: 'active',
          description: 'High-rise apartment with premium facilities',
          amenities: ['Parking', 'Elevator', 'Security', 'Gym', 'Swimming Pool'],
          contactPerson: 'Mrs. Patel',
          contactPhone: '9876543211',
          constructionYear: 2020,
          buildingType: 'residential',
          lastMaintenance: '2024-01-20'
        },
        {
          id: 3,
          buildingNumber: 3,
          buildingName: 'Jasmine Heights',
          address: '789 Valley View, Garden City',
          totalFloors: 4,
          totalFlats: 16,
          occupiedFlats: 14,
          status: 'maintenance',
          description: 'Cozy residential building in peaceful location',
          amenities: ['Parking', 'Security', 'Garden', 'Generator'],
          contactPerson: 'Mr. Kumar',
          contactPhone: '9876543212',
          constructionYear: 2015,
          buildingType: 'residential',
          lastMaintenance: '2024-01-10'
        }
      ];
      setBuildings(mockBuildings);
    } catch (error) {
      console.error('Error fetching buildings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBuilding = async (e) => {
    e.preventDefault();
    try {
      const buildingData = {
        ...newBuilding,
        id: Date.now(),
        buildingNumber: parseInt(newBuilding.buildingNumber),
        totalFloors: parseInt(newBuilding.totalFloors),
        totalFlats: parseInt(newBuilding.totalFlats),
        occupiedFlats: 0,
        constructionYear: parseInt(newBuilding.constructionYear),
        lastMaintenance: new Date().toISOString().split('T')[0]
      };

      setBuildings([buildingData, ...buildings]);
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      console.error('Error adding building:', error);
    }
  };

  const handleEditBuilding = async (e) => {
    e.preventDefault();
    try {
      const updatedBuildings = buildings.map(building =>
        building.id === editingBuilding.id ? {
          ...editingBuilding,
          buildingNumber: parseInt(editingBuilding.buildingNumber),
          totalFloors: parseInt(editingBuilding.totalFloors),
          totalFlats: parseInt(editingBuilding.totalFlats),
          constructionYear: parseInt(editingBuilding.constructionYear)
        } : building
      );

      setBuildings(updatedBuildings);
      setShowEditModal(false);
      setEditingBuilding(null);
    } catch (error) {
      console.error('Error updating building:', error);
    }
  };

  const handleDeleteBuilding = (buildingId) => {
    if (window.confirm('Are you sure you want to delete this building?')) {
      setBuildings(buildings.filter(building => building.id !== buildingId));
    }
  };

  const resetForm = () => {
    setNewBuilding({
      buildingNumber: '',
      buildingName: '',
      address: '',
      totalFloors: '',
      totalFlats: '',
      status: 'active',
      description: '',
      amenities: [],
      contactPerson: '',
      contactPhone: '',
      constructionYear: '',
      buildingType: 'residential'
    });
  };

  const handleAmenityToggle = (amenity, isEditing = false) => {
    if (isEditing) {
      const currentAmenities = editingBuilding.amenities || [];
      const updatedAmenities = currentAmenities.includes(amenity)
        ? currentAmenities.filter(a => a !== amenity)
        : [...currentAmenities, amenity];
      setEditingBuilding({...editingBuilding, amenities: updatedAmenities});
    } else {
      const currentAmenities = newBuilding.amenities || [];
      const updatedAmenities = currentAmenities.includes(amenity)
        ? currentAmenities.filter(a => a !== amenity)
        : [...currentAmenities, amenity];
      setNewBuilding({...newBuilding, amenities: updatedAmenities});
    }
  };

  const filteredBuildings = buildings.filter(building => {
    const matchesSearch = building.buildingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         building.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         building.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || building.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getOccupancyPercentage = (occupied, total) => {
    return total > 0 ? Math.round((occupied / total) * 100) : 0;
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
            Building Management
          </h1>
          <p className="text-gray-400 mt-2">Manage society buildings and their information</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Buildings</p>
                <p className="text-2xl font-bold text-blue-600">{buildings.length}</p>
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
                <p className="text-sm font-medium text-gray-600">Active Buildings</p>
                <p className="text-2xl font-bold text-green-600">
                  {buildings.filter(b => b.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Flats</p>
                <p className="text-2xl font-bold text-purple-600">
                  {buildings.reduce((sum, building) => sum + building.totalFlats, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Occupied Flats</p>
                <p className="text-2xl font-bold text-orange-600">
                  {buildings.reduce((sum, building) => sum + building.occupiedFlats, 0)}
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
                placeholder="Search buildings..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="maintenance">Under Maintenance</option>
              <option value="inactive">Inactive</option>
            </select>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Building
            </button>
          </div>
        </div>

        {/* Buildings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuildings.map((building) => (
            <div key={building.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{building.buildingName}</h3>
                    <p className="text-sm text-gray-600">Building #{building.buildingNumber}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(building.status)}`}>
                    {building.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {building.address}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    </svg>
                    {building.totalFloors} Floors • {building.totalFlats} Flats
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {building.contactPerson} • {building.contactPhone}
                  </div>
                </div>

                {/* Occupancy Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Occupancy</span>
                    <span className="text-sm text-gray-600">
                      {building.occupiedFlats}/{building.totalFlats} ({getOccupancyPercentage(building.occupiedFlats, building.totalFlats)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getOccupancyPercentage(building.occupiedFlats, building.totalFlats)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Amenities</p>
                  <div className="flex flex-wrap gap-1">
                    {building.amenities.slice(0, 3).map((amenity) => (
                      <span key={amenity} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        {amenity}
                      </span>
                    ))}
                    {building.amenities.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                        +{building.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <button
                    onClick={() => {
                      setEditingBuilding(building);
                      setShowEditModal(true);
                    }}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBuilding(building.id)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBuildings.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No buildings found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new building.</p>
          </div>
        )}

        {/* Add Building Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-4xl w-full m-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Add New Building</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleAddBuilding} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Building Number</label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newBuilding.buildingNumber}
                      onChange={(e) => setNewBuilding({...newBuilding, buildingNumber: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Building Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newBuilding.buildingName}
                      onChange={(e) => setNewBuilding({...newBuilding, buildingName: e.target.value})}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      required
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newBuilding.address}
                      onChange={(e) => setNewBuilding({...newBuilding, address: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Floors</label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newBuilding.totalFloors}
                      onChange={(e) => setNewBuilding({...newBuilding, totalFloors: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Flats</label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newBuilding.totalFlats}
                      onChange={(e) => setNewBuilding({...newBuilding, totalFlats: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Construction Year</label>
                    <input
                      type="number"
                      required
                      min="1900"
                      max={new Date().getFullYear()}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newBuilding.constructionYear}
                      onChange={(e) => setNewBuilding({...newBuilding, constructionYear: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Building Type</label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newBuilding.buildingType}
                      onChange={(e) => setNewBuilding({...newBuilding, buildingType: e.target.value})}
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="mixed">Mixed Use</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newBuilding.contactPerson}
                      onChange={(e) => setNewBuilding({...newBuilding, contactPerson: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newBuilding.contactPhone}
                      onChange={(e) => setNewBuilding({...newBuilding, contactPhone: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newBuilding.status}
                      onChange={(e) => setNewBuilding({...newBuilding, status: e.target.value})}
                    >
                      <option value="active">Active</option>
                      <option value="maintenance">Under Maintenance</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newBuilding.description}
                      onChange={(e) => setNewBuilding({...newBuilding, description: e.target.value})}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {amenitiesList.map((amenity) => (
                        <label key={amenity} className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2 text-blue-600 focus:ring-blue-500"
                            checked={newBuilding.amenities.includes(amenity)}
                            onChange={() => handleAmenityToggle(amenity)}
                          />
                          <span className="text-sm text-gray-700">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                  >
                    Add Building
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

        {/* Edit Building Modal */}
        {showEditModal && editingBuilding && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-4xl w-full m-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Edit Building</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleEditBuilding} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Building Number</label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editingBuilding.buildingNumber}
                      onChange={(e) => setEditingBuilding({...editingBuilding, buildingNumber: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Building Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editingBuilding.buildingName}
                      onChange={(e) => setEditingBuilding({...editingBuilding, buildingName: e.target.value})}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      required
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editingBuilding.address}
                      onChange={(e) => setEditingBuilding({...editingBuilding, address: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Floors</label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editingBuilding.totalFloors}
                      onChange={(e) => setEditingBuilding({...editingBuilding, totalFloors: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Flats</label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editingBuilding.totalFlats}
                      onChange={(e) => setEditingBuilding({...editingBuilding, totalFlats: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Construction Year</label>
                    <input
                      type="number"
                      required
                      min="1900"
                      max={new Date().getFullYear()}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editingBuilding.constructionYear}
                      onChange={(e) => setEditingBuilding({...editingBuilding, constructionYear: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Building Type</label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editingBuilding.buildingType}
                      onChange={(e) => setEditingBuilding({...editingBuilding, buildingType: e.target.value})}
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="mixed">Mixed Use</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editingBuilding.contactPerson}
                      onChange={(e) => setEditingBuilding({...editingBuilding, contactPerson: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editingBuilding.contactPhone}
                      onChange={(e) => setEditingBuilding({...editingBuilding, contactPhone: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editingBuilding.status}
                      onChange={(e) => setEditingBuilding({...editingBuilding, status: e.target.value})}
                    >
                      <option value="active">Active</option>
                      <option value="maintenance">Under Maintenance</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editingBuilding.description}
                      onChange={(e) => setEditingBuilding({...editingBuilding, description: e.target.value})}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {amenitiesList.map((amenity) => (
                        <label key={amenity} className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2 text-blue-600 focus:ring-blue-500"
                            checked={editingBuilding.amenities.includes(amenity)}
                            onChange={() => handleAmenityToggle(amenity, true)}
                          />
                          <span className="text-sm text-gray-700">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
                  >
                    Update Building
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

export default BuildingManagement;
