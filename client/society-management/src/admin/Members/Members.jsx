import { useState } from 'react';
import "./Members.css";
import '../AdminTheme.css';

const Members = () => {
  // State for the currently viewed member
  const [viewingMember, setViewingMember] = useState(null);
  // State for the currently editing member
  const [editingMember, setEditingMember] = useState(null);
  // State for the list of members

  const [members, setMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phoneNumber: "1234567890",
      buildingNumber: 1,
      blockNumber: 1,
      floorNumber: 1,
      address: "123 Main St",
      memberType: "owner",
      isPrimaryOwner: true,
      age: 35,
      sex: "Male",
      bloodGroup: "O+",
      aadharNumber: "1234-5678-9012",
      panNumber: "ABCDE1234F",
      relationWithPrimaryOwner: "Self",
      emergencyContact: {
        name: "Jane Doe",
        relationship: "Spouse",
        phoneNumber: "0987654321"
      }
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phoneNumber: "0987654321",
      buildingNumber: 2,
      blockNumber: 1,
      floorNumber: 2,
      address: "456 Oak Ave",
      memberType: "tenant",
      isPrimaryOwner: false,
      age: 28,
      sex: "Female",
      bloodGroup: "A+",
      aadharNumber: "2345-6789-0123",
      panNumber: "FGHIJ5678K",
      relationWithPrimaryOwner: "Self",
      emergencyContact: {
        name: "Bob Smith",
        relationship: "Brother",
        phoneNumber: "1122334455"
      }
    }
  ]);

  // Initial form state
  const initialFormState = {
    name: '',
    email: '',
    phoneNumber: '',
    buildingNumber: 1,
    blockNumber: 1,
    floorNumber: 1,
    address: '',
    memberType: 'owner',
    isPrimaryOwner: false,
    age: 18,
    sex: 'Male',
    bloodGroup: '',
    aadharNumber: '',
    panNumber: '',
    relationWithPrimaryOwner: 'Self',
    emergencyContact: {
      name: '',
      relationship: '',
      phoneNumber: ''
    }
  };

  const [formData, setFormData] = useState(initialFormState);

  // Function to handle viewing member details
  const handleView = (member) => {
    setViewingMember(member);
  };

  // Function to handle editing member - FIXED
  const handleEdit = (member) => {
    setEditingMember(member);
    // Properly populate all form fields with member data
    setFormData({
      name: member.name || '',
      email: member.email || '',
      phoneNumber: member.phoneNumber || '',
      buildingNumber: member.buildingNumber || 1,
      blockNumber: member.blockNumber || 1,
      floorNumber: member.floorNumber || 1,
      address: member.address || '',
      memberType: member.memberType || 'owner',
      isPrimaryOwner: member.isPrimaryOwner || false,
      age: member.age || 18,
      sex: member.sex || 'Male',
      bloodGroup: member.bloodGroup || '',
      aadharNumber: member.aadharNumber || '',
      panNumber: member.panNumber || '',
      relationWithPrimaryOwner: member.relationWithPrimaryOwner || 'Self',
      emergencyContact: {
        name: member.emergencyContact?.name || '',
        relationship: member.emergencyContact?.relationship || '',
        phoneNumber: member.emergencyContact?.phoneNumber || ''
      }
    });
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('emergencyContact.')) {
      const contactField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
          [contactField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
      }));
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setMembers(prev => 
      prev.map(member => 
        member.id === editingMember.id 
          ? { ...formData, id: editingMember.id }
          : member
      )
    );
    setEditingMember(null);
    setFormData(initialFormState);
  };

  // Member Card Component
  const MemberCard = ({ member }) => (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {member.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.memberType}</p>
            </div>
          </div>
          {member.isPrimaryOwner && (
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Primary Owner
            </span>
          )}
        </div>
        
        <div className="space-y-2 mb-4">
          <p className="text-gray-700"><span className="font-medium">Email:</span> {member.email}</p>
          <p className="text-gray-700"><span className="font-medium">Phone:</span> {member.phoneNumber}</p>
          <p className="text-gray-700"><span className="font-medium">Building:</span> {member.buildingNumber} | <span className="font-medium">Block:</span> {member.blockNumber} | <span className="font-medium">Floor:</span> {member.floorNumber}</p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => handleView(member)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
          >
            View Details
          </button>
          <button
            onClick={() => handleEdit(member)}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );

  // Detail Modal Component
  const DetailModal = ({ member, onClose }) => {
    if (!member) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-fadeIn">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center">
            <div>
              <h3 className="text-3xl font-bold">Member Details</h3>
              <p className="text-blue-100 mt-1">Complete member information</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[70vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h4>
                <div className="space-y-3">
                  <p className="flex justify-between"><span className="font-medium text-gray-600">Name:</span> <span className="text-gray-800">{member.name}</span></p>
                  <p className="flex justify-between"><span className="font-medium text-gray-600">Email:</span> <span className="text-gray-800">{member.email}</span></p>
                  <p className="flex justify-between"><span className="font-medium text-gray-600">Phone:</span> <span className="text-gray-800">{member.phoneNumber}</span></p>
                  <p className="flex justify-between"><span className="font-medium text-gray-600">Age:</span> <span className="text-gray-800">{member.age}</span></p>
                  <p className="flex justify-between"><span className="font-medium text-gray-600">Sex:</span> <span className="text-gray-800">{member.sex}</span></p>
                  <p className="flex justify-between"><span className="font-medium text-gray-600">Blood Group:</span> <span className="text-gray-800">{member.bloodGroup}</span></p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Residence Information</h4>
                <div className="space-y-3">
                  <p className="flex justify-between"><span className="font-medium text-gray-600">Building:</span> <span className="text-gray-800">{member.buildingNumber}</span></p>
                  <p className="flex justify-between"><span className="font-medium text-gray-600">Block:</span> <span className="text-gray-800">{member.blockNumber}</span></p>
                  <p className="flex justify-between"><span className="font-medium text-gray-600">Floor:</span> <span className="text-gray-800">{member.floorNumber}</span></p>
                  <p className="flex justify-between"><span className="font-medium text-gray-600">Address:</span> <span className="text-gray-800">{member.address}</span></p>
                  <p className="flex justify-between"><span className="font-medium text-gray-600">Member Type:</span> <span className="text-gray-800 capitalize">{member.memberType}</span></p>
                  <p className="flex justify-between"><span className="font-medium text-gray-600">Primary Owner:</span> <span className="text-gray-800">{member.isPrimaryOwner ? 'Yes' : 'No'}</span></p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Identity Information</h4>
                <div className="space-y-3">
                  <p className="flex justify-between"><span className="font-medium text-gray-600">Aadhar Number:</span> <span className="text-gray-800">{member.aadharNumber}</span></p>
                  <p className="flex justify-between"><span className="font-medium text-gray-600">PAN Number:</span> <span className="text-gray-800">{member.panNumber}</span></p>
                  <p className="flex justify-between"><span className="font-medium text-gray-600">Relation with Primary Owner:</span> <span className="text-gray-800">{member.relationWithPrimaryOwner}</span></p>
                </div>
              </div>
              
              {member.emergencyContact && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Emergency Contact</h4>
                  <div className="space-y-3">
                    <p className="flex justify-between"><span className="font-medium text-gray-600">Name:</span> <span className="text-gray-800">{member.emergencyContact.name}</span></p>
                    <p className="flex justify-between"><span className="font-medium text-gray-600">Relationship:</span> <span className="text-gray-800">{member.emergencyContact.relationship}</span></p>
                    <p className="flex justify-between"><span className="font-medium text-gray-600">Phone:</span> <span className="text-gray-800">{member.emergencyContact.phoneNumber}</span></p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Edit Modal Component
  const EditModal = ({ member, onClose }) => {
    if (!member) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-fadeIn">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 flex justify-between items-center">
            <div>
              <h3 className="text-3xl font-bold">Edit Member</h3>
              <p className="text-green-100 mt-1">Update member information</p>
            </div>
            
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[70vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age || ''}
                    onChange={handleInputChange}
                    min="18"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                  <select
                    name="sex"
                    value={formData.sex || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Residence Information</h4>
                
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Building</label>
                    <input
                      type="number"
                      name="buildingNumber"
                      value={formData.buildingNumber || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Block</label>
                    <input
                      type="number"
                      name="blockNumber"
                      value={formData.blockNumber || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Floor</label>
                    <input
                      type="number"
                      name="floorNumber"
                      value={formData.floorNumber || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    name="address"
                    value={formData.address || ''}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Member Type</label>
                  <select
                    name="memberType"
                    value={formData.memberType || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900"
                  >
                    <option value="owner">Owner</option>
                    <option value="tenant">Tenant</option>
                    <option value="family">Family</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPrimaryOwner"
                    checked={formData.isPrimaryOwner || false}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Primary Owner</label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
                  <input
                    type="text"
                    name="aadharNumber"
                    value={formData.aadharNumber || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relation with Primary Owner</label>
                  <input
                    type="text"
                    name="relationWithPrimaryOwner"
                    value={formData.relationWithPrimaryOwner || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Emergency Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="emergencyContact.name"
                    value={formData.emergencyContact?.name || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                  <input
                    type="text"
                    name="emergencyContact.relationship"
                    value={formData.emergencyContact?.relationship || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="emergencyContact.phoneNumber"
                    value={formData.emergencyContact?.phoneNumber || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 mt-6 -mx-6 -mb-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-container">
      <div className="admin-bg-elements"></div>
      <div className="admin-content">
      <div className="max-w-7xl mx-auto">
        <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
            <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Society Members 
            </h1>
            <p className="text-gray-400 mt-2">Manage and view all society member details</p>
          </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {viewingMember && (
        <DetailModal
          member={viewingMember}
          onClose={() => setViewingMember(null)}
        />
      )}

{/* Edit Modal */}
      {editingMember && (
        <EditModal
          member={editingMember}
          onClose={() => {
            setEditingMember(null);
            setFormData(initialFormState);
          }}
        />
      )}
      </div>
    </div>
  );
};

export default Members;