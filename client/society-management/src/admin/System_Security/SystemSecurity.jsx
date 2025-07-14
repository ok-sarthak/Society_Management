import React, { useState, useEffect } from 'react';
import './SystemSecurity.css';
import '../AdminTheme.css';

export default function SystemSecurity() {
  const [activeTab, setActiveTab] = useState('access');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [accessControl, setAccessControl] = useState([]);
  const [securityLogs, setSecurityLogs] = useState([]);
  const [systemSettings, setSystemSettings] = useState({});
  const [backupSettings, setBackupSettings] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  // Initialize data
  useEffect(() => {
    const mockAccessControl = [
      {
        id: 1,
        userId: 'USER001',
        userName: 'John Smith',
        role: 'Admin',
        department: 'Management',
        accessLevel: 'full',
        permissions: ['read', 'write', 'delete', 'admin'],
        status: 'active',
        lastLogin: '2024-01-15 14:30',
        loginCount: 156,
        ipAddress: '192.168.1.10',
        deviceInfo: 'Windows 11, Chrome 120',
        createdDate: '2024-01-01',
        expiryDate: '2024-12-31'
      },
      {
        id: 2,
        userId: 'USER002',
        userName: 'Sarah Johnson',
        role: 'Security Manager',
        department: 'Security',
        accessLevel: 'high',
        permissions: ['read', 'write', 'security'],
        status: 'active',
        lastLogin: '2024-01-15 16:45',
        loginCount: 234,
        ipAddress: '192.168.1.15',
        deviceInfo: 'Windows 10, Edge 119',
        createdDate: '2024-01-01',
        expiryDate: '2024-12-31'
      },
      {
        id: 3,
        userId: 'USER003',
        userName: 'Mike Davis',
        role: 'Maintenance Head',
        department: 'Maintenance',
        accessLevel: 'medium',
        permissions: ['read', 'write'],
        status: 'active',
        lastLogin: '2024-01-15 09:20',
        loginCount: 89,
        ipAddress: '192.168.1.20',
        deviceInfo: 'Android, Chrome Mobile 120',
        createdDate: '2024-01-05',
        expiryDate: '2024-12-31'
      },
      {
        id: 4,
        userId: 'USER004',
        userName: 'Lisa Chen',
        role: 'Resident Coordinator',
        department: 'Services',
        accessLevel: 'medium',
        permissions: ['read', 'write'],
        status: 'suspended',
        lastLogin: '2024-01-14 18:00',
        loginCount: 45,
        ipAddress: '192.168.1.25',
        deviceInfo: 'MacOS, Safari 17',
        createdDate: '2024-01-10',
        expiryDate: '2024-12-31'
      },
      {
        id: 5,
        userId: 'USER005',
        userName: 'Robert Wilson',
        role: 'Finance Manager',
        department: 'Finance',
        accessLevel: 'high',
        permissions: ['read', 'write', 'finance'],
        status: 'active',
        lastLogin: '2024-01-15 11:15',
        loginCount: 67,
        ipAddress: '192.168.1.30',
        deviceInfo: 'Windows 11, Firefox 121',
        createdDate: '2024-01-03',
        expiryDate: '2024-12-31'
      }
    ];

    const mockSecurityLogs = [
      {
        id: 1,
        timestamp: '2024-01-15 16:45:23',
        eventType: 'login_success',
        severity: 'info',
        userId: 'USER002',
        userName: 'Sarah Johnson',
        ipAddress: '192.168.1.15',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        action: 'User logged in successfully',
        resource: 'Dashboard',
        details: 'Successful authentication from trusted device',
        location: 'Building Office'
      },
      {
        id: 2,
        timestamp: '2024-01-15 16:40:15',
        eventType: 'login_failed',
        severity: 'warning',
        userId: 'UNKNOWN',
        userName: 'Unknown',
        ipAddress: '203.45.67.89',
        userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-G973F)',
        action: 'Failed login attempt',
        resource: 'Login Page',
        details: 'Invalid credentials - 3rd attempt in 5 minutes',
        location: 'External'
      },
      {
        id: 3,
        timestamp: '2024-01-15 16:35:42',
        eventType: 'permission_denied',
        severity: 'warning',
        userId: 'USER003',
        userName: 'Mike Davis',
        ipAddress: '192.168.1.20',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        action: 'Attempted to access restricted resource',
        resource: 'Financial Reports',
        details: 'User tried to access finance module without permission',
        location: 'Maintenance Office'
      },
      {
        id: 4,
        timestamp: '2024-01-15 16:30:18',
        eventType: 'data_access',
        severity: 'info',
        userId: 'USER001',
        userName: 'John Smith',
        ipAddress: '192.168.1.10',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        action: 'Exported resident data',
        resource: 'Member Database',
        details: 'Downloaded member list for monthly report',
        location: 'Admin Office'
      },
      {
        id: 5,
        timestamp: '2024-01-15 16:25:55',
        eventType: 'security_breach',
        severity: 'critical',
        userId: 'UNKNOWN',
        userName: 'Unknown',
        ipAddress: '45.123.67.200',
        userAgent: 'Python-requests/2.28.1',
        action: 'Suspicious automated requests detected',
        resource: 'API Endpoints',
        details: 'Multiple rapid requests from unknown IP - possible bot attack',
        location: 'External'
      },
      {
        id: 6,
        timestamp: '2024-01-15 16:20:33',
        eventType: 'password_change',
        severity: 'info',
        userId: 'USER004',
        userName: 'Lisa Chen',
        ipAddress: '192.168.1.25',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        action: 'Password changed successfully',
        resource: 'User Settings',
        details: 'User updated password following security policy',
        location: 'Services Office'
      }
    ];

    const mockSystemSettings = {
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSymbols: true,
        maxAge: 90,
        preventReuse: 5
      },
      sessionSettings: {
        timeout: 30,
        maxConcurrentSessions: 3,
        requireReauth: 4
      },
      loginSecurity: {
        maxFailedAttempts: 5,
        lockoutDuration: 15,
        enableTwoFactor: true,
        enableCaptcha: true
      },
      encryptionSettings: {
        algorithm: 'AES-256',
        keyRotation: 365,
        tlsVersion: '1.3',
        enableHSTS: true
      },
      auditSettings: {
        enableLogging: true,
        logRetention: 365,
        logLevel: 'INFO',
        enableRealTimeAlerts: true
      }
    };

    const mockBackupSettings = {
      automated: {
        enabled: true,
        frequency: 'daily',
        time: '02:00',
        retention: 30
      },
      location: {
        local: true,
        cloud: true,
        offsite: false
      },
      encryption: {
        enabled: true,
        algorithm: 'AES-256'
      },
      lastBackup: '2024-01-15 02:00:00',
      nextBackup: '2024-01-16 02:00:00',
      backupSize: '2.4 GB',
      status: 'success'
    };

    setAccessControl(mockAccessControl);
    setSecurityLogs(mockSecurityLogs);
    setSystemSettings(mockSystemSettings);
    setBackupSettings(mockBackupSettings);
  }, []);

  // Filter functions
  const filteredAccessControl = accessControl.filter(user => {
    const matchesSearch = user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredSecurityLogs = securityLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.ipAddress.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || log.severity === statusFilter;
    return matchesSearch && matchesStatus;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  const stats = {
    totalUsers: accessControl.length,
    activeUsers: accessControl.filter(user => user.status === 'active').length,
    securityIncidents: securityLogs.filter(log => log.severity === 'critical' || log.severity === 'warning').length,
    lastBackup: backupSettings.lastBackup
  };

  return (
    <div className="admin-container">
      <div className="admin-bg-elements"></div>
      <div className="admin-content">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
          <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            System Security
          </h1>
          <p className="text-gray-400 mt-2">Access control, security monitoring, and system protection</p>
        </div>

        {/* Summary Cards */}
        <div className="summary-grid">
          <div className="summary-card users">
            <div className="summary-icon">
              👥
            </div>
            <div className="summary-info">
              <h3>Total Users</h3>
              <div className="summary-value">{stats.totalUsers}</div>
              <span className="summary-change positive">{stats.activeUsers} active</span>
            </div>
          </div>
          <div className="summary-card incidents">
            <div className="summary-icon">
              🚨
            </div>
            <div className="summary-info">
              <h3>Security Incidents</h3>
              <div className="summary-value">{stats.securityIncidents}</div>
              <span className="summary-change negative">Today</span>
            </div>
          </div>
          <div className="summary-card backup">
            <div className="summary-icon">
              💾
            </div>
            <div className="summary-info">
              <h3>Last Backup</h3>
              <div className="summary-value">Success</div>
              <span className="summary-change neutral">{backupSettings.backupSize}</span>
            </div>
          </div>
          <div className="summary-card encryption">
            <div className="summary-icon">
              🔐
            </div>
            <div className="summary-info">
              <h3>Encryption</h3>
              <div className="summary-value">AES-256</div>
              <span className="summary-change positive">Active</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === 'access' ? 'active' : ''}`}
            onClick={() => setActiveTab('access')}
          >
            🔑 Access Control
          </button>
          <button
            className={`tab-btn ${activeTab === 'logs' ? 'active' : ''}`}
            onClick={() => setActiveTab('logs')}
          >
            📋 Security Logs
          </button>
          <button
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Security Settings
          </button>
          <button
            className={`tab-btn ${activeTab === 'backup' ? 'active' : ''}`}
            onClick={() => setActiveTab('backup')}
          >
            💾 Backup & Recovery
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
                  activeTab === 'access' ? "Search users..." :
                  activeTab === 'logs' ? "Search logs..." :
                  "Search..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            {(activeTab === 'access' || activeTab === 'logs') && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                {activeTab === 'access' && (
                  <>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="inactive">Inactive</option>
                  </>
                )}
                {activeTab === 'logs' && (
                  <>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="critical">Critical</option>
                  </>
                )}
              </select>
            )}
          </div>
          <div className="action-buttons">
            {activeTab === 'access' && (
              <button onClick={() => openModal('user')} className="add-btn">
                ➕ Add User
              </button>
            )}
            {activeTab === 'backup' && (
              <button onClick={() => openModal('backup')} className="add-btn">
                🔄 Start Backup
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {activeTab === 'access' && (
            <div className="access-table">
              <div className="table-header">
                <div className="header-cell">User</div>
                <div className="header-cell">Role & Department</div>
                <div className="header-cell">Access Level</div>
                <div className="header-cell">Last Login</div>
                <div className="header-cell">Status</div>
                <div className="header-cell">Actions</div>
              </div>
              {filteredAccessControl.map(user => (
                <div key={user.id} className="table-row">
                  <div className="table-cell">
                    <div className="user-info">
                      <div className="user-avatar">👤</div>
                      <div className="user-details">
                        <div className="user-name">{user.userName}</div>
                        <div className="user-id">{user.userId}</div>
                      </div>
                    </div>
                  </div>
                  <div className="table-cell">
                    <div className="role-info">
                      <div className="user-role">{user.role}</div>
                      <div className="user-department">{user.department}</div>
                    </div>
                  </div>
                  <div className="table-cell">
                    <div className="access-info">
                      <span className={`access-badge access-${user.accessLevel}`}>
                        {user.accessLevel}
                      </span>
                      <div className="permissions-list">
                        {user.permissions.map(perm => (
                          <span key={perm} className="permission-tag">{perm}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="table-cell">
                    <div className="login-info">
                      <div className="login-time">{user.lastLogin}</div>
                      <div className="login-count">{user.loginCount} logins</div>
                    </div>
                  </div>
                  <div className="table-cell">
                    <span className={`status-badge status-${user.status}`}>
                      {user.status}
                    </span>
                  </div>
                  <div className="table-cell">
                    <div className="row-actions">
                      <button className="view-btn" onClick={() => openModal('user', user)}>
                        👁️
                      </button>
                      <button className="edit-btn" onClick={() => openModal('user', user)}>
                        ✏️
                      </button>
                      <button className="suspend-btn">
                        🚫
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="logs-table">
              <div className="table-header">
                <div className="header-cell">Timestamp</div>
                <div className="header-cell">Event</div>
                <div className="header-cell">User</div>
                <div className="header-cell">IP Address</div>
                <div className="header-cell">Severity</div>
                <div className="header-cell">Actions</div>
              </div>
              {filteredSecurityLogs.map(log => (
                <div key={log.id} className="table-row">
                  <div className="table-cell">
                    <div className="timestamp">{log.timestamp}</div>
                  </div>
                  <div className="table-cell">
                    <div className="event-info">
                      <div className="event-action">{log.action}</div>
                      <div className="event-resource">{log.resource}</div>
                    </div>
                  </div>
                  <div className="table-cell">
                    <div className="log-user-info">
                      <div className="log-user-name">{log.userName}</div>
                      <div className="log-user-id">{log.userId}</div>
                    </div>
                  </div>
                  <div className="table-cell">
                    <div className="ip-info">
                      <div className="ip-address">{log.ipAddress}</div>
                      <div className="location">{log.location}</div>
                    </div>
                  </div>
                  <div className="table-cell">
                    <span className={`severity-badge severity-${log.severity}`}>
                      {log.severity}
                    </span>
                  </div>
                  <div className="table-cell">
                    <div className="row-actions">
                      <button className="view-btn" onClick={() => openModal('log', log)}>
                        👁️
                      </button>
                      <button className="investigate-btn">
                        🔍
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-grid">
              <div className="settings-card">
                <div className="settings-header">
                  <h3>Password Policy</h3>
                  <button className="edit-settings-btn">⚙️</button>
                </div>
                <div className="settings-content">
                  <div className="setting-item">
                    <span>Minimum Length:</span>
                    <span>{systemSettings.passwordPolicy?.minLength} characters</span>
                  </div>
                  <div className="setting-item">
                    <span>Password Age:</span>
                    <span>{systemSettings.passwordPolicy?.maxAge} days</span>
                  </div>
                  <div className="setting-item">
                    <span>Complexity:</span>
                    <span>High (Upper/Lower/Numbers/Symbols)</span>
                  </div>
                  <div className="setting-item">
                    <span>Prevent Reuse:</span>
                    <span>{systemSettings.passwordPolicy?.preventReuse} passwords</span>
                  </div>
                </div>
              </div>

              <div className="settings-card">
                <div className="settings-header">
                  <h3>Session Security</h3>
                  <button className="edit-settings-btn">⚙️</button>
                </div>
                <div className="settings-content">
                  <div className="setting-item">
                    <span>Session Timeout:</span>
                    <span>{systemSettings.sessionSettings?.timeout} minutes</span>
                  </div>
                  <div className="setting-item">
                    <span>Max Sessions:</span>
                    <span>{systemSettings.sessionSettings?.maxConcurrentSessions} concurrent</span>
                  </div>
                  <div className="setting-item">
                    <span>Re-auth Required:</span>
                    <span>Every {systemSettings.sessionSettings?.requireReauth} hours</span>
                  </div>
                </div>
              </div>

              <div className="settings-card">
                <div className="settings-header">
                  <h3>Login Security</h3>
                  <button className="edit-settings-btn">⚙️</button>
                </div>
                <div className="settings-content">
                  <div className="setting-item">
                    <span>Max Failed Attempts:</span>
                    <span>{systemSettings.loginSecurity?.maxFailedAttempts}</span>
                  </div>
                  <div className="setting-item">
                    <span>Lockout Duration:</span>
                    <span>{systemSettings.loginSecurity?.lockoutDuration} minutes</span>
                  </div>
                  <div className="setting-item">
                    <span>Two-Factor Auth:</span>
                    <span className={systemSettings.loginSecurity?.enableTwoFactor ? 'status-enabled' : 'status-disabled'}>
                      {systemSettings.loginSecurity?.enableTwoFactor ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="setting-item">
                    <span>CAPTCHA:</span>
                    <span className={systemSettings.loginSecurity?.enableCaptcha ? 'status-enabled' : 'status-disabled'}>
                      {systemSettings.loginSecurity?.enableCaptcha ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="settings-card">
                <div className="settings-header">
                  <h3>Encryption</h3>
                  <button className="edit-settings-btn">⚙️</button>
                </div>
                <div className="settings-content">
                  <div className="setting-item">
                    <span>Algorithm:</span>
                    <span>{systemSettings.encryptionSettings?.algorithm}</span>
                  </div>
                  <div className="setting-item">
                    <span>Key Rotation:</span>
                    <span>Every {systemSettings.encryptionSettings?.keyRotation} days</span>
                  </div>
                  <div className="setting-item">
                    <span>TLS Version:</span>
                    <span>{systemSettings.encryptionSettings?.tlsVersion}</span>
                  </div>
                  <div className="setting-item">
                    <span>HSTS:</span>
                    <span className={systemSettings.encryptionSettings?.enableHSTS ? 'status-enabled' : 'status-disabled'}>
                      {systemSettings.encryptionSettings?.enableHSTS ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="settings-card">
                <div className="settings-header">
                  <h3>Audit & Logging</h3>
                  <button className="edit-settings-btn">⚙️</button>
                </div>
                <div className="settings-content">
                  <div className="setting-item">
                    <span>Audit Logging:</span>
                    <span className={systemSettings.auditSettings?.enableLogging ? 'status-enabled' : 'status-disabled'}>
                      {systemSettings.auditSettings?.enableLogging ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="setting-item">
                    <span>Log Retention:</span>
                    <span>{systemSettings.auditSettings?.logRetention} days</span>
                  </div>
                  <div className="setting-item">
                    <span>Log Level:</span>
                    <span>{systemSettings.auditSettings?.logLevel}</span>
                  </div>
                  <div className="setting-item">
                    <span>Real-time Alerts:</span>
                    <span className={systemSettings.auditSettings?.enableRealTimeAlerts ? 'status-enabled' : 'status-disabled'}>
                      {systemSettings.auditSettings?.enableRealTimeAlerts ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="backup-section">
              <div className="backup-status-card">
                <div className="backup-header">
                  <h3>Backup Status</h3>
                  <span className={`backup-status-badge status-${backupSettings.status}`}>
                    {backupSettings.status}
                  </span>
                </div>
                <div className="backup-details">
                  <div className="backup-info-grid">
                    <div className="backup-info-item">
                      <span className="info-label">Last Backup:</span>
                      <span className="info-value">{backupSettings.lastBackup}</span>
                    </div>
                    <div className="backup-info-item">
                      <span className="info-label">Next Backup:</span>
                      <span className="info-value">{backupSettings.nextBackup}</span>
                    </div>
                    <div className="backup-info-item">
                      <span className="info-label">Backup Size:</span>
                      <span className="info-value">{backupSettings.backupSize}</span>
                    </div>
                    <div className="backup-info-item">
                      <span className="info-label">Retention:</span>
                      <span className="info-value">{backupSettings.automated?.retention} days</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="backup-settings-grid">
                <div className="backup-settings-card">
                  <div className="settings-header">
                    <h3>Automated Backup</h3>
                    <button className="edit-settings-btn">⚙️</button>
                  </div>
                  <div className="settings-content">
                    <div className="setting-item">
                      <span>Status:</span>
                      <span className={backupSettings.automated?.enabled ? 'status-enabled' : 'status-disabled'}>
                        {backupSettings.automated?.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <div className="setting-item">
                      <span>Frequency:</span>
                      <span>{backupSettings.automated?.frequency}</span>
                    </div>
                    <div className="setting-item">
                      <span>Time:</span>
                      <span>{backupSettings.automated?.time}</span>
                    </div>
                    <div className="setting-item">
                      <span>Retention:</span>
                      <span>{backupSettings.automated?.retention} days</span>
                    </div>
                  </div>
                </div>

                <div className="backup-settings-card">
                  <div className="settings-header">
                    <h3>Backup Locations</h3>
                    <button className="edit-settings-btn">⚙️</button>
                  </div>
                  <div className="settings-content">
                    <div className="setting-item">
                      <span>Local Storage:</span>
                      <span className={backupSettings.location?.local ? 'status-enabled' : 'status-disabled'}>
                        {backupSettings.location?.local ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <div className="setting-item">
                      <span>Cloud Storage:</span>
                      <span className={backupSettings.location?.cloud ? 'status-enabled' : 'status-disabled'}>
                        {backupSettings.location?.cloud ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <div className="setting-item">
                      <span>Offsite Backup:</span>
                      <span className={backupSettings.location?.offsite ? 'status-enabled' : 'status-disabled'}>
                        {backupSettings.location?.offsite ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="backup-settings-card">
                  <div className="settings-header">
                    <h3>Backup Security</h3>
                    <button className="edit-settings-btn">⚙️</button>
                  </div>
                  <div className="settings-content">
                    <div className="setting-item">
                      <span>Encryption:</span>
                      <span className={backupSettings.encryption?.enabled ? 'status-enabled' : 'status-disabled'}>
                        {backupSettings.encryption?.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <div className="setting-item">
                      <span>Algorithm:</span>
                      <span>{backupSettings.encryption?.algorithm}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="backup-actions">
                <button className="backup-action-btn start-backup">
                  🔄 Start Manual Backup
                </button>
                <button className="backup-action-btn restore-backup">
                  📥 Restore from Backup
                </button>
                <button className="backup-action-btn test-backup">
                  🧪 Test Backup Integrity
                </button>
                <button className="backup-action-btn download-backup">
                  💾 Download Latest Backup
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>
                  {modalType === 'user' ? (editingItem ? 'Edit User Access' : 'Add New User') :
                   modalType === 'log' ? 'Security Log Details' :
                   modalType === 'backup' ? 'Manual Backup' : ''}
                </h2>
                <button className="modal-close" onClick={closeModal}>✕</button>
              </div>
              <form className="modal-form" onSubmit={handleSubmit}>
                {modalType === 'user' && (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label>User ID</label>
                        <input type="text" className="form-input" defaultValue={editingItem?.userId} />
                      </div>
                      <div className="form-group">
                        <label>User Name</label>
                        <input type="text" className="form-input" defaultValue={editingItem?.userName} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Role</label>
                        <input type="text" className="form-input" defaultValue={editingItem?.role} />
                      </div>
                      <div className="form-group">
                        <label>Department</label>
                        <select className="form-select" defaultValue={editingItem?.department}>
                          <option value="Management">Management</option>
                          <option value="Security">Security</option>
                          <option value="Maintenance">Maintenance</option>
                          <option value="Services">Services</option>
                          <option value="Finance">Finance</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Access Level</label>
                        <select className="form-select" defaultValue={editingItem?.accessLevel}>
                          <option value="full">Full Access</option>
                          <option value="high">High Access</option>
                          <option value="medium">Medium Access</option>
                          <option value="low">Low Access</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Status</label>
                        <select className="form-select" defaultValue={editingItem?.status}>
                          <option value="active">Active</option>
                          <option value="suspended">Suspended</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry Date</label>
                        <input type="date" className="form-input" defaultValue={editingItem?.expiryDate} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Permissions</label>
                      <div className="permissions-checkboxes">
                        <label><input type="checkbox" defaultChecked={editingItem?.permissions?.includes('read')} /> Read</label>
                        <label><input type="checkbox" defaultChecked={editingItem?.permissions?.includes('write')} /> Write</label>
                        <label><input type="checkbox" defaultChecked={editingItem?.permissions?.includes('delete')} /> Delete</label>
                        <label><input type="checkbox" defaultChecked={editingItem?.permissions?.includes('admin')} /> Admin</label>
                        <label><input type="checkbox" defaultChecked={editingItem?.permissions?.includes('security')} /> Security</label>
                        <label><input type="checkbox" defaultChecked={editingItem?.permissions?.includes('finance')} /> Finance</label>
                      </div>
                    </div>
                  </>
                )}

                {modalType === 'log' && editingItem && (
                  <div className="log-details">
                    <div className="form-group">
                      <label>Event Details</label>
                      <textarea className="form-textarea" rows="3" value={editingItem.details} readOnly></textarea>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>User Agent</label>
                        <input type="text" className="form-input" value={editingItem.userAgent} readOnly />
                      </div>
                    </div>
                  </div>
                )}

                {modalType === 'backup' && (
                  <>
                    <div className="form-group">
                      <label>Backup Type</label>
                      <select className="form-select">
                        <option value="full">Full Backup</option>
                        <option value="incremental">Incremental Backup</option>
                        <option value="differential">Differential Backup</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Backup Location</label>
                      <div className="backup-locations">
                        <label><input type="checkbox" defaultChecked /> Local Storage</label>
                        <label><input type="checkbox" defaultChecked /> Cloud Storage</label>
                        <label><input type="checkbox" /> Offsite Storage</label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea className="form-textarea" rows="2" placeholder="Optional backup description..."></textarea>
                    </div>
                  </>
                )}

                <div className="form-actions">
                  {modalType !== 'log' && (
                    <button type="submit" className="submit-btn">
                      {modalType === 'backup' ? 'Start Backup' : editingItem ? 'Update' : 'Create'}
                    </button>
                  )}
                  <button type="button" className="cancel-btn" onClick={closeModal}>
                    {modalType === 'log' ? 'Close' : 'Cancel'}
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
