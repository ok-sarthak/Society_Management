import React, { useState, useEffect } from 'react';
import './StaffManagement.css';
import '../AdminTheme.css';

export default function StaffManagement() {
  const [staff, setStaff] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selectedTab, setSelectedTab] = useState('staff');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editingAttendance, setEditingAttendance] = useState(null);

  // Initialize mock data
  useEffect(() => {
    const mockStaff = [
      {
        id: 1,
        employeeId: 'EMP001',
        name: 'Rajesh Kumar',
        department: 'Security',
        position: 'Security Guard',
        phone: '+91 98765 43210',
        email: 'rajesh.kumar@society.com',
        address: '123 Staff Quarters',
        dateOfJoining: '2020-01-15',
        salary: 25000,
        status: 'active',
        shift: 'day',
        emergencyContact: '+91 87654 32109',
        documents: ['Aadhar', 'PAN', 'Police Verification'],
        photo: '👤',
        performance: 4.5,
        leaves: 5
      },
      {
        id: 2,
        employeeId: 'EMP002',
        name: 'Sunita Sharma',
        department: 'Housekeeping',
        position: 'Housekeeper',
        phone: '+91 87654 32109',
        email: 'sunita.sharma@society.com',
        address: '456 Staff Quarters',
        dateOfJoining: '2019-03-20',
        salary: 20000,
        status: 'active',
        shift: 'day',
        emergencyContact: '+91 76543 21098',
        documents: ['Aadhar', 'PAN'],
        photo: '👩',
        performance: 4.7,
        leaves: 3
      },
      {
        id: 3,
        employeeId: 'EMP003',
        name: 'Ramesh Patel',
        department: 'Maintenance',
        position: 'Electrician',
        phone: '+91 76543 21098',
        email: 'ramesh.patel@society.com',
        address: '789 Staff Quarters',
        dateOfJoining: '2021-06-10',
        salary: 30000,
        status: 'active',
        shift: 'day',
        emergencyContact: '+91 65432 10987',
        documents: ['Aadhar', 'PAN', 'Trade Certificate'],
        photo: '👨‍🔧',
        performance: 4.3,
        leaves: 8
      },
      {
        id: 4,
        employeeId: 'EMP004',
        name: 'Priya Singh',
        department: 'Administration',
        position: 'Admin Assistant',
        phone: '+91 65432 10987',
        email: 'priya.singh@society.com',
        address: '321 Staff Quarters',
        dateOfJoining: '2022-01-05',
        salary: 35000,
        status: 'active',
        shift: 'day',
        emergencyContact: '+91 54321 09876',
        documents: ['Aadhar', 'PAN', 'Educational Certificate'],
        photo: '👩‍💼',
        performance: 4.8,
        leaves: 2
      },
      {
        id: 5,
        employeeId: 'EMP005',
        name: 'Mohan Das',
        department: 'Security',
        position: 'Night Security',
        phone: '+91 54321 09876',
        email: 'mohan.das@society.com',
        address: '654 Staff Quarters',
        dateOfJoining: '2020-08-15',
        salary: 27000,
        status: 'on-leave',
        shift: 'night',
        emergencyContact: '+91 43210 98765',
        documents: ['Aadhar', 'PAN', 'Police Verification'],
        photo: '👤',
        performance: 4.2,
        leaves: 12
      }
    ];

    const mockDepartments = [
      {
        id: 1,
        name: 'Security',
        head: 'Rajesh Kumar',
        totalStaff: 3,
        budget: 150000,
        description: 'Responsible for society security and safety',
        responsibilities: ['24/7 Security', 'Visitor Management', 'Emergency Response'],
        workingHours: '24 hours (3 shifts)',
        location: 'Security Office, Main Gate'
      },
      {
        id: 2,
        name: 'Housekeeping',
        head: 'Sunita Sharma',
        totalStaff: 2,
        budget: 80000,
        description: 'Maintains cleanliness and hygiene of common areas',
        responsibilities: ['Daily Cleaning', 'Waste Management', 'Garden Maintenance'],
        workingHours: '8:00 AM - 6:00 PM',
        location: 'Maintenance Room, Block A'
      },
      {
        id: 3,
        name: 'Maintenance',
        head: 'Ramesh Patel',
        totalStaff: 4,
        budget: 200000,
        description: 'Handles all maintenance and repair work',
        responsibilities: ['Electrical Work', 'Plumbing', 'General Repairs', 'Equipment Maintenance'],
        workingHours: '9:00 AM - 5:00 PM',
        location: 'Maintenance Workshop, Basement'
      },
      {
        id: 4,
        name: 'Administration',
        head: 'Priya Singh',
        totalStaff: 2,
        budget: 120000,
        description: 'Manages administrative tasks and documentation',
        responsibilities: ['Documentation', 'Resident Services', 'Billing Support', 'Communication'],
        workingHours: '10:00 AM - 6:00 PM',
        location: 'Admin Office, Ground Floor'
      }
    ];

    const mockAttendance = [
      {
        id: 1,
        employeeId: 'EMP001',
        employeeName: 'Rajesh Kumar',
        date: '2024-01-15',
        checkIn: '08:00 AM',
        checkOut: '08:00 PM',
        status: 'present',
        workingHours: 12,
        overtime: 0,
        notes: 'Day shift completed'
      },
      {
        id: 2,
        employeeId: 'EMP002',
        employeeName: 'Sunita Sharma',
        date: '2024-01-15',
        checkIn: '08:30 AM',
        checkOut: '06:30 PM',
        status: 'present',
        workingHours: 10,
        overtime: 2,
        notes: 'Extra cleaning for event preparation'
      },
      {
        id: 3,
        employeeId: 'EMP003',
        employeeName: 'Ramesh Patel',
        date: '2024-01-15',
        checkIn: '09:00 AM',
        checkOut: '05:00 PM',
        status: 'present',
        workingHours: 8,
        overtime: 0,
        notes: 'Regular maintenance tasks'
      },
      {
        id: 4,
        employeeId: 'EMP004',
        employeeName: 'Priya Singh',
        date: '2024-01-15',
        checkIn: '10:00 AM',
        checkOut: '06:00 PM',
        status: 'present',
        workingHours: 8,
        overtime: 0,
        notes: 'Administrative duties'
      },
      {
        id: 5,
        employeeId: 'EMP005',
        employeeName: 'Mohan Das',
        date: '2024-01-15',
        checkIn: '-',
        checkOut: '-',
        status: 'absent',
        workingHours: 0,
        overtime: 0,
        notes: 'Medical leave'
      }
    ];

    setStaff(mockStaff);
    setDepartments(mockDepartments);
    setAttendance(mockAttendance);
  }, []);

  // Filter functions
  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || member.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.head.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const filteredAttendance = attendance.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // CRUD Functions
  const handleStaffSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const staffData = {
      id: editingStaff ? editingStaff.id : Date.now(),
      employeeId: editingStaff ? editingStaff.employeeId : `EMP${String(Date.now()).slice(-3)}`,
      name: formData.get('name'),
      department: formData.get('department'),
      position: formData.get('position'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      address: formData.get('address'),
      dateOfJoining: formData.get('dateOfJoining'),
      salary: parseInt(formData.get('salary')),
      status: formData.get('status'),
      shift: formData.get('shift'),
      emergencyContact: formData.get('emergencyContact'),
      documents: formData.get('documents').split(',').map(d => d.trim()),
      photo: formData.get('photo') || '👤',
      performance: editingStaff ? editingStaff.performance : 0,
      leaves: editingStaff ? editingStaff.leaves : 0
    };

    if (editingStaff) {
      setStaff(staff.map(s => s.id === editingStaff.id ? staffData : s));
    } else {
      setStaff([...staff, staffData]);
    }

    setShowStaffModal(false);
    setEditingStaff(null);
  };

  const handleDepartmentSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const departmentData = {
      id: editingDepartment ? editingDepartment.id : Date.now(),
      name: formData.get('name'),
      head: formData.get('head'),
      budget: parseInt(formData.get('budget')),
      description: formData.get('description'),
      responsibilities: formData.get('responsibilities').split(',').map(r => r.trim()),
      workingHours: formData.get('workingHours'),
      location: formData.get('location'),
      totalStaff: editingDepartment ? editingDepartment.totalStaff : 0
    };

    if (editingDepartment) {
      setDepartments(departments.map(d => d.id === editingDepartment.id ? departmentData : d));
    } else {
      setDepartments([...departments, departmentData]);
    }

    setShowDepartmentModal(false);
    setEditingDepartment(null);
  };

  const handleAttendanceSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const attendanceData = {
      id: editingAttendance ? editingAttendance.id : Date.now(),
      employeeId: formData.get('employeeId'),
      employeeName: staff.find(s => s.employeeId === formData.get('employeeId'))?.name || '',
      date: formData.get('date'),
      checkIn: formData.get('checkIn'),
      checkOut: formData.get('checkOut'),
      status: formData.get('status'),
      workingHours: parseInt(formData.get('workingHours') || 0),
      overtime: parseInt(formData.get('overtime') || 0),
      notes: formData.get('notes')
    };

    if (editingAttendance) {
      setAttendance(attendance.map(a => a.id === editingAttendance.id ? attendanceData : a));
    } else {
      setAttendance([...attendance, attendanceData]);
    }

    setShowAttendanceModal(false);
    setEditingAttendance(null);
  };

  const deleteStaff = (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      setStaff(staff.filter(s => s.id !== id));
    }
  };

  const deleteDepartment = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(d => d.id !== id));
    }
  };

  const deleteAttendance = (id) => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      setAttendance(attendance.filter(a => a.id !== id));
    }
  };

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'on-leave': return 'status-leave';
      case 'terminated': return 'status-terminated';
      case 'present': return 'status-present';
      case 'absent': return 'status-absent';
      case 'late': return 'status-late';
      default: return 'status-inactive';
    }
  };

  const getDepartmentIcon = (department) => {
    switch (department) {
      case 'Security': return '🛡️';
      case 'Housekeeping': return '🧹';
      case 'Maintenance': return '🔧';
      case 'Administration': return '📋';
      case 'Gardening': return '🌱';
      default: return '👥';
    }
  };

  // Calculate summary stats
  const totalStaff = staff.length;
  const activeStaff = staff.filter(s => s.status === 'active').length;
  const totalSalary = staff.reduce((sum, s) => sum + s.salary, 0);
  const averagePerformance = staff.length > 0 ? (staff.reduce((sum, s) => sum + s.performance, 0) / staff.length).toFixed(1) : 0;

  return (
    <div className="admin-container">
      <div className="admin-bg-elements"></div>
      <div className="admin-content">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
            <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Staff Management
            </h1>
            <p className="text-gray-400 mt-2">Manage staff, departments and attendance</p>
          </div>

          {/* Summary Cards */}
          <div className="summary-grid">
          <div className="summary-card total">
            <div className="summary-icon">👥</div>
            <div className="summary-info">
              <h3>Total Staff</h3>
              <div className="summary-value">{totalStaff}</div>
              <div className="summary-change neutral">All departments</div>
            </div>
          </div>
          <div className="summary-card active">
            <div className="summary-icon">✅</div>
            <div className="summary-info">
              <h3>Active Staff</h3>
              <div className="summary-value">{activeStaff}</div>
              <div className="summary-change positive">{Math.round((activeStaff/totalStaff)*100)}% active</div>
            </div>
          </div>
          <div className="summary-card salary">
            <div className="summary-icon">💰</div>
            <div className="summary-info">
              <h3>Total Salary</h3>
              <div className="summary-value">₹{totalSalary.toLocaleString()}</div>
              <div className="summary-change neutral">Monthly expense</div>
            </div>
          </div>
          <div className="summary-card performance">
            <div className="summary-icon">⭐</div>
            <div className="summary-info">
              <h3>Avg Performance</h3>
              <div className="summary-value">{averagePerformance}</div>
              <div className="summary-change positive">Out of 5.0</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${selectedTab === 'staff' ? 'active' : ''}`}
            onClick={() => setSelectedTab('staff')}
          >
            👤 Staff Members
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'departments' ? 'active' : ''}`}
            onClick={() => setSelectedTab('departments')}
          >
            🏢 Departments
          </button>
          <button 
            className={`tab-btn ${selectedTab === 'attendance' ? 'active' : ''}`}
            onClick={() => setSelectedTab('attendance')}
          >
            📅 Attendance
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
            
            {selectedTab === 'staff' && (
              <>
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Departments</option>
                  <option value="Security">Security</option>
                  <option value="Housekeeping">Housekeeping</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Administration">Administration</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="on-leave">On Leave</option>
                  <option value="terminated">Terminated</option>
                </select>
              </>
            )}

            {selectedTab === 'attendance' && (
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
              </select>
            )}
          </div>

          <div className="action-buttons">
            {selectedTab === 'staff' && (
              <button
                onClick={() => setShowStaffModal(true)}
                className="add-btn"
              >
                ➕ Add Staff
              </button>
            )}
            {selectedTab === 'departments' && (
              <button
                onClick={() => setShowDepartmentModal(true)}
                className="add-btn"
              >
                ➕ Add Department
              </button>
            )}
            {selectedTab === 'attendance' && (
              <button
                onClick={() => setShowAttendanceModal(true)}
                className="add-btn"
              >
                ➕ Mark Attendance
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {selectedTab === 'staff' && (
            <div className="staff-grid">
              {filteredStaff.map(member => (
                <div key={member.id} className="staff-card">
                  <div className="staff-header">
                    <div className="staff-avatar">{member.photo}</div>
                    <div className="staff-basic-info">
                      <h3 className="staff-name">{member.name}</h3>
                      <p className="staff-id">{member.employeeId}</p>
                      <span className={`status-badge ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </div>
                  </div>

                  <div className="staff-content">
                    <div className="staff-details">
                      <div className="detail-item">
                        <span className="detail-label">Department:</span>
                        <span className="detail-value">{getDepartmentIcon(member.department)} {member.department}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Position:</span>
                        <span className="detail-value">{member.position}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Salary:</span>
                        <span className="detail-value">₹{member.salary.toLocaleString()}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Shift:</span>
                        <span className="detail-value">{member.shift}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Joining Date:</span>
                        <span className="detail-value">{member.dateOfJoining}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Performance:</span>
                        <span className="detail-value">⭐ {member.performance}/5</span>
                      </div>
                    </div>

                    <div className="staff-contact">
                      <div className="contact-item">
                        <span className="contact-icon">📞</span>
                        <span className="contact-value">{member.phone}</span>
                      </div>
                      <div className="contact-item">
                        <span className="contact-icon">✉️</span>
                        <span className="contact-value">{member.email}</span>
                      </div>
                      <div className="contact-item">
                        <span className="contact-icon">📍</span>
                        <span className="contact-value">{member.address}</span>
                      </div>
                    </div>

                    <div className="staff-documents">
                      <h4>Documents:</h4>
                      <div className="documents-list">
                        {member.documents.map((doc, index) => (
                          <span key={index} className="document-tag">{doc}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="staff-actions">
                    <button
                      onClick={() => {
                        setEditingStaff(member);
                        setShowStaffModal(true);
                      }}
                      className="edit-btn"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteStaff(member.id)}
                      className="delete-btn"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'departments' && (
            <div className="departments-grid">
              {filteredDepartments.map(dept => (
                <div key={dept.id} className="department-card">
                  <div className="department-header">
                    <div className="department-icon">{getDepartmentIcon(dept.name)}</div>
                    <div className="department-info">
                      <h3 className="department-name">{dept.name}</h3>
                      <p className="department-head">Head: {dept.head}</p>
                    </div>
                    <div className="department-stats">
                      <div className="stat-item">
                        <span className="stat-value">{dept.totalStaff}</span>
                        <span className="stat-label">Staff</span>
                      </div>
                    </div>
                  </div>

                  <div className="department-content">
                    <p className="department-description">{dept.description}</p>

                    <div className="department-details">
                      <div className="detail-row">
                        <span className="detail-label">Budget:</span>
                        <span className="detail-value">₹{dept.budget.toLocaleString()}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Working Hours:</span>
                        <span className="detail-value">{dept.workingHours}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Location:</span>
                        <span className="detail-value">{dept.location}</span>
                      </div>
                    </div>

                    <div className="department-responsibilities">
                      <h4>Responsibilities:</h4>
                      <div className="responsibilities-list">
                        {dept.responsibilities.map((resp, index) => (
                          <span key={index} className="responsibility-tag">{resp}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="department-actions">
                    <button
                      onClick={() => {
                        setEditingDepartment(dept);
                        setShowDepartmentModal(true);
                      }}
                      className="edit-btn"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteDepartment(dept.id)}
                      className="delete-btn"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'attendance' && (
            <div className="attendance-table">
              <div className="table-header">
                <div className="header-cell">Employee</div>
                <div className="header-cell">Date</div>
                <div className="header-cell">Check In/Out</div>
                <div className="header-cell">Status</div>
                <div className="header-cell">Hours</div>
                <div className="header-cell">Actions</div>
              </div>
              
              {filteredAttendance.map(record => (
                <div key={record.id} className="table-row">
                  <div className="table-cell">
                    <div className="employee-info">
                      <div className="employee-name">{record.employeeName}</div>
                      <div className="employee-id">{record.employeeId}</div>
                    </div>
                  </div>
                  <div className="table-cell">
                    <div className="attendance-date">{record.date}</div>
                  </div>
                  <div className="table-cell">
                    <div className="time-info">
                      <div className="check-in">In: {record.checkIn}</div>
                      <div className="check-out">Out: {record.checkOut}</div>
                    </div>
                  </div>
                  <div className="table-cell">
                    <span className={`status-badge ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </div>
                  <div className="table-cell">
                    <div className="hours-info">
                      <div className="working-hours">{record.workingHours}h</div>
                      {record.overtime > 0 && (
                        <div className="overtime">+{record.overtime}h OT</div>
                      )}
                    </div>
                  </div>
                  <div className="table-cell">
                    <div className="row-actions">
                      <button
                        onClick={() => {
                          setEditingAttendance(record);
                          setShowAttendanceModal(true);
                        }}
                        className="row-edit-btn"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteAttendance(record.id)}
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

        {/* Staff Modal */}
        {showStaffModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}</h2>
                <button
                  onClick={() => {
                    setShowStaffModal(false);
                    setEditingStaff(null);
                  }}
                  className="modal-close"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleStaffSubmit} className="modal-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={editingStaff?.name}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Department</label>
                    <select
                      name="department"
                      defaultValue={editingStaff?.department}
                      required
                      className="form-select"
                    >
                      <option value="">Select Department</option>
                      <option value="Security">Security</option>
                      <option value="Housekeeping">Housekeeping</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Administration">Administration</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Position</label>
                    <input
                      type="text"
                      name="position"
                      defaultValue={editingStaff?.position}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Salary (₹)</label>
                    <input
                      type="number"
                      name="salary"
                      defaultValue={editingStaff?.salary}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      defaultValue={editingStaff?.phone}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={editingStaff?.email}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    defaultValue={editingStaff?.address}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Date of Joining</label>
                    <input
                      type="date"
                      name="dateOfJoining"
                      defaultValue={editingStaff?.dateOfJoining}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Shift</label>
                    <select
                      name="shift"
                      defaultValue={editingStaff?.shift}
                      required
                      className="form-select"
                    >
                      <option value="">Select Shift</option>
                      <option value="day">Day</option>
                      <option value="night">Night</option>
                      <option value="rotating">Rotating</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      defaultValue={editingStaff?.status}
                      required
                      className="form-select"
                    >
                      <option value="active">Active</option>
                      <option value="on-leave">On Leave</option>
                      <option value="terminated">Terminated</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Emergency Contact</label>
                    <input
                      type="tel"
                      name="emergencyContact"
                      defaultValue={editingStaff?.emergencyContact}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Photo/Avatar</label>
                    <input
                      type="text"
                      name="photo"
                      defaultValue={editingStaff?.photo}
                      placeholder="Emoji or icon"
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Documents (comma-separated)</label>
                    <input
                      type="text"
                      name="documents"
                      defaultValue={editingStaff?.documents?.join(', ')}
                      placeholder="e.g., Aadhar, PAN, Police Verification"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    {editingStaff ? 'Update Staff' : 'Add Staff'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowStaffModal(false);
                      setEditingStaff(null);
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

        {/* Department Modal */}
        {showDepartmentModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{editingDepartment ? 'Edit Department' : 'Add New Department'}</h2>
                <button
                  onClick={() => {
                    setShowDepartmentModal(false);
                    setEditingDepartment(null);
                  }}
                  className="modal-close"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleDepartmentSubmit} className="modal-form">
                <div className="form-group">
                  <label>Department Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingDepartment?.name}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Department Head</label>
                    <input
                      type="text"
                      name="head"
                      defaultValue={editingDepartment?.head}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Budget (₹)</label>
                    <input
                      type="number"
                      name="budget"
                      defaultValue={editingDepartment?.budget}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    defaultValue={editingDepartment?.description}
                    required
                    className="form-textarea"
                    rows="3"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Working Hours</label>
                    <input
                      type="text"
                      name="workingHours"
                      defaultValue={editingDepartment?.workingHours}
                      placeholder="e.g., 9:00 AM - 5:00 PM"
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      defaultValue={editingDepartment?.location}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Responsibilities (comma-separated)</label>
                  <input
                    type="text"
                    name="responsibilities"
                    defaultValue={editingDepartment?.responsibilities?.join(', ')}
                    placeholder="e.g., Security, Visitor Management, Emergency Response"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    {editingDepartment ? 'Update Department' : 'Add Department'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowDepartmentModal(false);
                      setEditingDepartment(null);
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

        {/* Attendance Modal */}
        {showAttendanceModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{editingAttendance ? 'Edit Attendance' : 'Mark Attendance'}</h2>
                <button
                  onClick={() => {
                    setShowAttendanceModal(false);
                    setEditingAttendance(null);
                  }}
                  className="modal-close"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleAttendanceSubmit} className="modal-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Employee</label>
                    <select
                      name="employeeId"
                      defaultValue={editingAttendance?.employeeId}
                      required
                      className="form-select"
                    >
                      <option value="">Select Employee</option>
                      {staff.map(member => (
                        <option key={member.id} value={member.employeeId}>
                          {member.name} ({member.employeeId})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      name="date"
                      defaultValue={editingAttendance?.date}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Check In Time</label>
                    <input
                      type="time"
                      name="checkIn"
                      defaultValue={editingAttendance?.checkIn}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Check Out Time</label>
                    <input
                      type="time"
                      name="checkOut"
                      defaultValue={editingAttendance?.checkOut}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      defaultValue={editingAttendance?.status}
                      required
                      className="form-select"
                    >
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                      <option value="late">Late</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Working Hours</label>
                    <input
                      type="number"
                      name="workingHours"
                      defaultValue={editingAttendance?.workingHours}
                      min="0"
                      max="24"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Overtime Hours</label>
                    <input
                      type="number"
                      name="overtime"
                      defaultValue={editingAttendance?.overtime}
                      min="0"
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Notes</label>
                    <input
                      type="text"
                      name="notes"
                      defaultValue={editingAttendance?.notes}
                      className="form-input"
                      placeholder="Additional notes"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    {editingAttendance ? 'Update Attendance' : 'Mark Attendance'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAttendanceModal(false);
                      setEditingAttendance(null);
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
