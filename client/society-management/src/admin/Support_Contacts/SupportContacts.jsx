import React, { useState, useEffect } from 'react';
import apiService from '../../services/apiService';
import './SupportContacts.css';
import '../AdminTheme.css';

export default function SupportContacts() {
  const [activeTab, setActiveTab] = useState('contacts');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [contacts, setContacts] = useState([]);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [helpdesk, setHelpdesk] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  // Initialize data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load Support Contacts
        const contactsResponse = await apiService.getSupportContacts();
        setContacts(contactsResponse.data || []);

        // Load Emergency Contacts
        const emergencyResponse = await apiService.getEmergencyContacts();
        setEmergencyContacts(emergencyResponse.data || []);

        // Mock helpdesk data for now - you can add API endpoint later
        setHelpdesk([
          {
            id: 1,
            ticketId: 'HD001',
            issue: 'Internet connectivity problem',
            reporter: 'John Doe',
            apartmentNumber: 'A-101',
            priority: 'high',
            status: 'open',
            assignedTo: 'Tech Support',
            createdAt: '2024-01-15 10:30 AM',
            lastUpdate: '2024-01-15 11:45 AM',
            description: 'Unable to connect to internet since morning'
          }
        ]);
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to mock data
        loadMockData();
      }
    };

    const loadMockData = () => {
    const mockContacts = [
      {
        id: 1,
        name: 'John Smith',
        designation: 'Building Manager',
        department: 'Administration',
        phone: '+1 234 567 8901',
        email: 'john.smith@society.com',
        category: 'management',
        availability: 'Mon-Fri 9AM-5PM',
        floor: '1st Floor',
        emergencyOnly: false,
        rating: 4.8,
        totalCalls: 156,
        averageResponseTime: '15 minutes'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        designation: 'Security Supervisor',
        department: 'Security',
        phone: '+1 234 567 8902',
        email: 'sarah.johnson@society.com',
        category: 'security',
        availability: '24/7',
        floor: 'Ground Floor',
        emergencyOnly: false,
        rating: 4.9,
        totalCalls: 289,
        averageResponseTime: '5 minutes'
      },
      {
        id: 3,
        name: 'Mike Davis',
        designation: 'Maintenance Head',
        department: 'Maintenance',
        phone: '+1 234 567 8903',
        email: 'mike.davis@society.com',
        category: 'maintenance',
        availability: 'Mon-Sat 8AM-6PM',
        floor: 'Basement',
        emergencyOnly: false,
        rating: 4.7,
        totalCalls: 234,
        averageResponseTime: '20 minutes'
      },
      {
        id: 4,
        name: 'Lisa Chen',
        designation: 'Resident Coordinator',
        department: 'Resident Services',
        phone: '+1 234 567 8904',
        email: 'lisa.chen@society.com',
        category: 'services',
        availability: 'Mon-Fri 10AM-6PM',
        floor: '2nd Floor',
        emergencyOnly: false,
        rating: 4.6,
        totalCalls: 178,
        averageResponseTime: '10 minutes'
      },
      {
        id: 5,
        name: 'Robert Wilson',
        designation: 'Finance Manager',
        department: 'Finance',
        phone: '+1 234 567 8905',
        email: 'robert.wilson@society.com',
        category: 'finance',
        availability: 'Mon-Fri 9AM-5PM',
        floor: '3rd Floor',
        emergencyOnly: false,
        rating: 4.5,
        totalCalls: 92,
        averageResponseTime: '25 minutes'
      }
    ];

    const mockEmergencyContacts = [
      {
        id: 1,
        service: 'Fire Department',
        number: '911',
        alternateNumber: '+1 234 567 9911',
        description: 'For fire emergencies, smoke detection, and evacuation assistance',
        responseTime: '5-8 minutes',
        availability: '24/7',
        priority: 'critical'
      },
      {
        id: 2,
        service: 'Police',
        number: '911',
        alternateNumber: '+1 234 567 9112',
        description: 'For security threats, theft, violence, and law enforcement',
        responseTime: '3-5 minutes',
        availability: '24/7',
        priority: 'critical'
      },
      {
        id: 3,
        service: 'Ambulance/Medical',
        number: '911',
        alternateNumber: '+1 234 567 9113',
        description: 'For medical emergencies, injuries, and health crises',
        responseTime: '6-10 minutes',
        availability: '24/7',
        priority: 'critical'
      },
      {
        id: 4,
        service: 'Gas Emergency',
        number: '+1 800 GAS LEAK',
        alternateNumber: '+1 234 567 4271',
        description: 'For gas leaks, gas appliance issues, and related emergencies',
        responseTime: '10-15 minutes',
        availability: '24/7',
        priority: 'high'
      },
      {
        id: 5,
        service: 'Electric Emergency',
        number: '+1 800 ELECTRIC',
        alternateNumber: '+1 234 567 3532',
        description: 'For power outages, electrical hazards, and grid failures',
        responseTime: '15-30 minutes',
        availability: '24/7',
        priority: 'high'
      },
      {
        id: 6,
        service: 'Water Emergency',
        number: '+1 800 H2O HELP',
        alternateNumber: '+1 234 567 4201',
        description: 'For water main breaks, flooding, and plumbing emergencies',
        responseTime: '20-45 minutes',
        availability: '24/7',
        priority: 'medium'
      },
      {
        id: 7,
        service: 'Society Emergency Line',
        number: '+1 234 567 0000',
        alternateNumber: '+1 234 567 0001',
        description: 'Internal emergency line for building-specific emergencies',
        responseTime: '2-5 minutes',
        availability: '24/7',
        priority: 'critical'
      }
    ];

    const mockHelpdesk = [
      {
        id: 1,
        ticketId: 'HD001',
        category: 'Maintenance',
        issue: 'Air conditioning not working in Apt 501',
        priority: 'high',
        status: 'in-progress',
        assignedTo: 'Mike Davis',
        reportedBy: 'John Doe',
        reportedDate: '2024-01-15',
        expectedResolution: '2024-01-16',
        description: 'AC unit stopped working yesterday evening. Room temperature very high.',
        lastUpdate: '2024-01-15 14:30'
      },
      {
        id: 2,
        ticketId: 'HD002',
        category: 'Security',
        issue: 'Visitor access card not working',
        priority: 'medium',
        status: 'pending',
        assignedTo: 'Sarah Johnson',
        reportedBy: 'Jane Smith',
        reportedDate: '2024-01-15',
        expectedResolution: '2024-01-15',
        description: 'Guest access card for visitor not allowing entry to building.',
        lastUpdate: '2024-01-15 10:15'
      },
      {
        id: 3,
        ticketId: 'HD003',
        category: 'Services',
        issue: 'Package delivery not received',
        priority: 'low',
        status: 'resolved',
        assignedTo: 'Lisa Chen',
        reportedBy: 'Bob Wilson',
        reportedDate: '2024-01-14',
        expectedResolution: '2024-01-14',
        description: 'Package was marked as delivered but not received by resident.',
        lastUpdate: '2024-01-14 16:45'
      },
      {
        id: 4,
        ticketId: 'HD004',
        category: 'Finance',
        issue: 'Billing discrepancy in monthly statement',
        priority: 'medium',
        status: 'pending',
        assignedTo: 'Robert Wilson',
        reportedBy: 'Mary Johnson',
        reportedDate: '2024-01-15',
        expectedResolution: '2024-01-17',
        description: 'Maintenance charge seems incorrect on the latest billing statement.',
        lastUpdate: '2024-01-15 09:20'
      },
      {
        id: 5,
        ticketId: 'HD005',
        category: 'Maintenance',
        issue: 'Elevator making unusual noise',
        priority: 'high',
        status: 'assigned',
        assignedTo: 'Mike Davis',
        reportedBy: 'David Lee',
        reportedDate: '2024-01-15',
        expectedResolution: '2024-01-16',
        description: 'Elevator #2 making grinding noise during operation.',
        lastUpdate: '2024-01-15 11:30'
      }
    ];

    setContacts(mockContacts);
    setEmergencyContacts(mockEmergencyContacts);
    setHelpdesk(mockHelpdesk);
  };
  
  // Call loadData on component mount
  loadData();
  }, []);

  // Filter functions
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || contact.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredEmergencyContacts = emergencyContacts.filter(contact =>
    contact.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHelpdesk = helpdesk.filter(ticket => {
    const matchesSearch = ticket.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.reportedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || ticket.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Modal handlers
  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('');
    setEditingItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      if (modalType === 'contact') {
        if (editingItem) {
          await apiService.updateSupportContact(editingItem.id, data);
        } else {
          await apiService.createSupportContact(data);
        }
        // Reload contacts
        const contactsResponse = await apiService.getSupportContacts();
        setContacts(contactsResponse.data || []);
      } else if (modalType === 'emergency') {
        if (editingItem) {
          await apiService.updateEmergencyContact(editingItem.id, data);
        } else {
          await apiService.createEmergencyContact(data);
        }
        // Reload emergency contacts
        const emergencyResponse = await apiService.getEmergencyContacts();
        setEmergencyContacts(emergencyResponse.data || []);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data. Please try again.');
    }

    closeModal();
  };

  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      if (type === 'contact') {
        await apiService.deleteSupportContact(id);
        const contactsResponse = await apiService.getSupportContacts();
        setContacts(contactsResponse.data || []);
      } else if (type === 'emergency') {
        await apiService.deleteEmergencyContact(id);
        const emergencyResponse = await apiService.getEmergencyContacts();
        setEmergencyContacts(emergencyResponse.data || []);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Error deleting item. Please try again.');
    }
  };

  const stats = {
    totalContacts: contacts.length,
    emergencyServices: emergencyContacts.length,
    activeTickets: helpdesk.filter(ticket => ticket.status !== 'resolved').length,
    avgResponseTime: '12 minutes'
  };

  return (
    <div className="admin-container">
      <div className="admin-bg-elements"></div>
      <div className="admin-content">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
          <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Support Contacts
          </h1>
          <p className="text-gray-400 mt-2">Emergency contacts, support staff, and helpdesk management</p>
        </div>

        {/* Summary Cards */}
        <div className="summary-grid">
          <div className="summary-card total">
            <div className="summary-icon">
              📞
            </div>
            <div className="summary-info">
              <h3>Total Contacts</h3>
              <div className="summary-value">{stats.totalContacts}</div>
              <span className="summary-change positive">+2 this month</span>
            </div>
          </div>
          <div className="summary-card emergency">
            <div className="summary-icon">
              🚨
            </div>
            <div className="summary-info">
              <h3>Emergency Services</h3>
              <div className="summary-value">{stats.emergencyServices}</div>
              <span className="summary-change neutral">24/7 Available</span>
            </div>
          </div>
          <div className="summary-card tickets">
            <div className="summary-icon">
              🎫
            </div>
            <div className="summary-info">
              <h3>Active Tickets</h3>
              <div className="summary-value">{stats.activeTickets}</div>
              <span className="summary-change negative">+3 today</span>
            </div>
          </div>
          <div className="summary-card response">
            <div className="summary-icon">
              ⏱️
            </div>
            <div className="summary-info">
              <h3>Avg Response</h3>
              <div className="summary-value">{stats.avgResponseTime}</div>
              <span className="summary-change positive">-2 min improvement</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            📞 Support Contacts
          </button>
          <button
            className={`tab-btn ${activeTab === 'emergency' ? 'active' : ''}`}
            onClick={() => setActiveTab('emergency')}
          >
            🚨 Emergency Contacts
          </button>
          <button
            className={`tab-btn ${activeTab === 'helpdesk' ? 'active' : ''}`}
            onClick={() => setActiveTab('helpdesk')}
          >
            🎫 Helpdesk Tickets
          </button>
        </div>

        {/* Controls */}
        <div className="controls-section">
          <div className="search-filter-group">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder={
                  activeTab === 'contacts' ? "Search contacts..." :
                  activeTab === 'emergency' ? "Search emergency services..." :
                  "Search tickets..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              {activeTab === 'contacts' && (
                <>
                  <option value="management">Management</option>
                  <option value="security">Security</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="services">Services</option>
                  <option value="finance">Finance</option>
                </>
              )}
              {activeTab === 'helpdesk' && (
                <>
                  <option value="maintenance">Maintenance</option>
                  <option value="security">Security</option>
                  <option value="services">Services</option>
                  <option value="finance">Finance</option>
                </>
              )}
            </select>
          </div>
          <div className="action-buttons">
            <button
              onClick={() => openModal(activeTab === 'emergency' ? 'emergency' : activeTab === 'helpdesk' ? 'ticket' : 'contact')}
              className="add-btn"
            >
              ➕ Add {activeTab === 'emergency' ? 'Emergency Contact' : activeTab === 'helpdesk' ? 'Ticket' : 'Contact'}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {activeTab === 'contacts' && (
            <div className="contacts-grid">
              {filteredContacts.map(contact => (
                <div key={contact.id} className="contact-card">
                  <div className="contact-header">
                    <div className="contact-avatar">
                      👤
                    </div>
                    <div className="contact-basic-info">
                      <h3 className="contact-name">{contact.name}</h3>
                      <p className="contact-designation">{contact.designation}</p>
                      <span className="department-badge">{contact.department}</span>
                    </div>
                    <div className="contact-rating">
                      <div className="rating-stars">
                        ⭐ {contact.rating}
                      </div>
                      <div className="rating-details">
                        {contact.totalCalls} calls
                      </div>
                    </div>
                  </div>
                  
                  <div className="contact-content">
                    <div className="contact-details">
                      <div className="contact-info-grid">
                        <div className="contact-item">
                          <span className="contact-icon">📞</span>
                          <span className="contact-value">{contact.phone}</span>
                        </div>
                        <div className="contact-item">
                          <span className="contact-icon">📧</span>
                          <span className="contact-value">{contact.email}</span>
                        </div>
                        <div className="contact-item">
                          <span className="contact-icon">🏢</span>
                          <span className="contact-value">{contact.floor}</span>
                        </div>
                        <div className="contact-item">
                          <span className="contact-icon">🕒</span>
                          <span className="contact-value">{contact.availability}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="contact-stats">
                      <div className="stat-item">
                        <span className="stat-label">Response Time</span>
                        <span className="stat-value">{contact.averageResponseTime}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Category</span>
                        <span className={`category-badge category-${contact.category}`}>
                          {contact.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="contact-actions">
                    <button className="call-btn">
                      📞 Call
                    </button>
                    <button className="edit-btn" onClick={() => openModal('contact', contact)}>
                      ✏️ Edit
                    </button>
                    <button className="delete-btn">
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'emergency' && (
            <div className="emergency-grid">
              {filteredEmergencyContacts.map(contact => (
                <div key={contact.id} className={`emergency-card priority-${contact.priority}`}>
                  <div className="emergency-header">
                    <div className="emergency-icon">
                      🚨
                    </div>
                    <div className="emergency-info">
                      <h3 className="emergency-service">{contact.service}</h3>
                      <span className={`priority-badge priority-${contact.priority}`}>
                        {contact.priority.toUpperCase()}
                      </span>
                    </div>
                    <div className="emergency-availability">
                      <span className="availability-badge">{contact.availability}</span>
                    </div>
                  </div>
                  
                  <div className="emergency-content">
                    <div className="emergency-numbers">
                      <div className="primary-number">
                        <span className="number-label">Primary</span>
                        <span className="number-value">{contact.number}</span>
                      </div>
                      <div className="alternate-number">
                        <span className="number-label">Alternate</span>
                        <span className="number-value">{contact.alternateNumber}</span>
                      </div>
                    </div>
                    
                    <div className="emergency-description">
                      <p>{contact.description}</p>
                    </div>
                    
                    <div className="emergency-stats">
                      <div className="response-time">
                        <span className="stat-icon">⏱️</span>
                        <span className="stat-text">Response: {contact.responseTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="emergency-actions">
                    <button className="call-primary-btn">
                      📞 Call Primary
                    </button>
                    <button className="call-alternate-btn">
                      📞 Call Alternate
                    </button>
                    <button className="edit-btn" onClick={() => openModal('emergency', contact)}>
                      ✏️ Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'helpdesk' && (
            <div className="helpdesk-table">
              <div className="table-header">
                <div className="header-cell">Ticket ID</div>
                <div className="header-cell">Issue</div>
                <div className="header-cell">Reporter</div>
                <div className="header-cell">Assigned To</div>
                <div className="header-cell">Priority</div>
                <div className="header-cell">Status</div>
                <div className="header-cell">Actions</div>
              </div>
              {filteredHelpdesk.map(ticket => (
                <div key={ticket.id} className="table-row">
                  <div className="table-cell">
                    <div className="ticket-id">{ticket.ticketId}</div>
                    <div className="ticket-category">{ticket.category}</div>
                  </div>
                  <div className="table-cell">
                    <div className="ticket-issue">{ticket.issue}</div>
                    <div className="ticket-date">Reported: {ticket.reportedDate}</div>
                  </div>
                  <div className="table-cell">
                    <div className="reporter-name">{ticket.reportedBy}</div>
                  </div>
                  <div className="table-cell">
                    <div className="assigned-name">{ticket.assignedTo}</div>
                    <div className="expected-resolution">Due: {ticket.expectedResolution}</div>
                  </div>
                  <div className="table-cell">
                    <span className={`priority-badge priority-${ticket.priority}`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <div className="table-cell">
                    <span className={`status-badge status-${ticket.status}`}>
                      {ticket.status}
                    </span>
                  </div>
                  <div className="table-cell">
                    <div className="row-actions">
                      <button className="view-btn" onClick={() => openModal('ticket', ticket)}>
                        👁️
                      </button>
                      <button className="edit-btn" onClick={() => openModal('ticket', ticket)}>
                        ✏️
                      </button>
                      <button className="delete-btn">
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>
                  {modalType === 'contact' ? (editingItem ? 'Edit Contact' : 'Add Contact') :
                   modalType === 'emergency' ? (editingItem ? 'Edit Emergency Contact' : 'Add Emergency Contact') :
                   modalType === 'ticket' ? (editingItem ? 'View/Edit Ticket' : 'Create Ticket') : ''}
                </h2>
                <button className="modal-close" onClick={closeModal}>✕</button>
              </div>
              <form className="modal-form" onSubmit={handleSubmit}>
                {modalType === 'contact' && (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-input" defaultValue={editingItem?.name} />
                      </div>
                      <div className="form-group">
                        <label>Designation</label>
                        <input type="text" className="form-input" defaultValue={editingItem?.designation} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Department</label>
                        <select className="form-select" defaultValue={editingItem?.department}>
                          <option value="Administration">Administration</option>
                          <option value="Security">Security</option>
                          <option value="Maintenance">Maintenance</option>
                          <option value="Resident Services">Resident Services</option>
                          <option value="Finance">Finance</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <select className="form-select" defaultValue={editingItem?.category}>
                          <option value="management">Management</option>
                          <option value="security">Security</option>
                          <option value="maintenance">Maintenance</option>
                          <option value="services">Services</option>
                          <option value="finance">Finance</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Phone</label>
                        <input type="tel" className="form-input" defaultValue={editingItem?.phone} />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-input" defaultValue={editingItem?.email} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Floor/Location</label>
                        <input type="text" className="form-input" defaultValue={editingItem?.floor} />
                      </div>
                      <div className="form-group">
                        <label>Availability</label>
                        <input type="text" className="form-input" defaultValue={editingItem?.availability} />
                      </div>
                    </div>
                  </>
                )}

                {modalType === 'emergency' && (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Service Name</label>
                        <input type="text" className="form-input" defaultValue={editingItem?.service} />
                      </div>
                      <div className="form-group">
                        <label>Priority</label>
                        <select className="form-select" defaultValue={editingItem?.priority}>
                          <option value="critical">Critical</option>
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Primary Number</label>
                        <input type="tel" className="form-input" defaultValue={editingItem?.number} />
                      </div>
                      <div className="form-group">
                        <label>Alternate Number</label>
                        <input type="tel" className="form-input" defaultValue={editingItem?.alternateNumber} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea className="form-textarea" rows="3" defaultValue={editingItem?.description}></textarea>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Response Time</label>
                        <input type="text" className="form-input" defaultValue={editingItem?.responseTime} />
                      </div>
                      <div className="form-group">
                        <label>Availability</label>
                        <input type="text" className="form-input" defaultValue={editingItem?.availability} />
                      </div>
                    </div>
                  </>
                )}

                {modalType === 'ticket' && (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Ticket ID</label>
                        <input type="text" className="form-input" defaultValue={editingItem?.ticketId} readOnly={!!editingItem} />
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <select className="form-select" defaultValue={editingItem?.category}>
                          <option value="Maintenance">Maintenance</option>
                          <option value="Security">Security</option>
                          <option value="Services">Services</option>
                          <option value="Finance">Finance</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Issue Description</label>
                      <input type="text" className="form-input" defaultValue={editingItem?.issue} />
                    </div>
                    <div className="form-group">
                      <label>Detailed Description</label>
                      <textarea className="form-textarea" rows="3" defaultValue={editingItem?.description}></textarea>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Priority</label>
                        <select className="form-select" defaultValue={editingItem?.priority}>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="critical">Critical</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Status</label>
                        <select className="form-select" defaultValue={editingItem?.status}>
                          <option value="pending">Pending</option>
                          <option value="assigned">Assigned</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Reported By</label>
                        <input type="text" className="form-input" defaultValue={editingItem?.reportedBy} />
                      </div>
                      <div className="form-group">
                        <label>Assigned To</label>
                        <input type="text" className="form-input" defaultValue={editingItem?.assignedTo} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Expected Resolution</label>
                        <input type="date" className="form-input" defaultValue={editingItem?.expectedResolution} />
                      </div>
                      <div className="form-group">
                        <label>Last Update</label>
                        <input type="datetime-local" className="form-input" defaultValue={editingItem?.lastUpdate} />
                      </div>
                    </div>
                  </>
                )}

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    {editingItem ? 'Update' : 'Create'}
                  </button>
                  <button type="button" className="cancel-btn" onClick={closeModal}>
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
