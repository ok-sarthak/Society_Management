import React, { useState, useEffect } from 'react';
import apiService from '../../services/apiService';
import './AdminSettings.css';
import '../AdminTheme.css';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      societyName: 'Green Valley Society',
      societyCode: 'GVS001',
      address: '123 Green Valley Road, Mumbai',
      phone: '+91 9876543210',
      email: 'admin@greenvalley.com',
      website: 'www.greenvalley.com',
      registrationNumber: 'REG/MUM/2020/001',
      establishedYear: '2020'
    },
    security: {
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        expiryDays: 90
      },
      sessionTimeout: 30,
      maxLoginAttempts: 3,
      twoFactorAuth: false,
      loginNotifications: true
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      maintenanceReminders: true,
      paymentReminders: true,
      eventNotifications: true,
      emergencyAlerts: true
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionPeriod: 30,
      cloudSync: true,
      lastBackup: '2024-01-15 03:00:00'
    },
    maintenance: {
      systemStatus: 'operational',
      lastMaintenance: '2024-01-10 02:00:00',
      nextMaintenance: '2024-01-20 02:00:00',
      maintenanceWindow: '02:00 - 04:00',
      autoUpdates: true
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState('');
  const [tempSettings, setTempSettings] = useState({});

  useEffect(() => {
    // Load settings from API
    const loadSettings = async () => {
      try {
        const response = await apiService.getAdminSettings();
        setSettings(response.data);
      } catch (error) {
        console.error('Error loading settings:', error);
        // Fallback to localStorage
        const savedSettings = localStorage.getItem('adminSettings');
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
      }
    };
    
    loadSettings();
  }, []);

  const handleSave = async () => {
    try {
      await apiService.updateAdminSettings(tempSettings);
      setSettings(tempSettings);
      // Also save to localStorage as backup
      localStorage.setItem('adminSettings', JSON.stringify(tempSettings));
      setIsEditing(false);
      setEditingSection('');
    } catch (error) {
      console.error('Error saving settings:', error);
      // Fallback to localStorage only
      setSettings(tempSettings);
      localStorage.setItem('adminSettings', JSON.stringify(tempSettings));
      setIsEditing(false);
      setEditingSection('');
    }
  };

  const handleCancel = () => {
    setTempSettings({});
    setIsEditing(false);
    setEditingSection('');
  };

  const startEditing = (section) => {
    setEditingSection(section);
    setTempSettings({ ...settings });
    setIsEditing(true);
  };

  const updateTempSetting = (section, key, value) => {
    setTempSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const updateNestedSetting = (section, parentKey, key, value) => {
    setTempSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parentKey]: {
          ...prev[section][parentKey],
          [key]: value
        }
      }
    }));
  };

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'backup', name: 'Backup', icon: '💾' },
    { id: 'maintenance', name: 'Maintenance', icon: '🔧' }
  ];

  const renderGeneralSettings = () => {
    const isEditingThis = isEditing && editingSection === 'general';
    const currentSettings = isEditingThis ? tempSettings.general : settings.general;

    return (
      <div className="settings-section">
        <div className="section-header">
          <h3 className="text-xl font-bold text-gray-800 mb-4">General Settings</h3>
          {!isEditingThis ? (
            <button
              onClick={() => startEditing('general')}
              className="edit-btn"
            >
              ✏️ Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleSave} className="save-btn">
                💾 Save
              </button>
              <button onClick={handleCancel} className="cancel-btn">
                ❌ Cancel
              </button>
            </div>
          )}
        </div>

        <div className="settings-grid">
          <div className="setting-item">
            <label className="setting-label">Society Name</label>
            {isEditingThis ? (
              <input
                type="text"
                value={currentSettings.societyName}
                onChange={(e) => updateTempSetting('general', 'societyName', e.target.value)}
                className="setting-input"
              />
            ) : (
              <div className="setting-value">{currentSettings.societyName}</div>
            )}
          </div>

          <div className="setting-item">
            <label className="setting-label">Society Code</label>
            {isEditingThis ? (
              <input
                type="text"
                value={currentSettings.societyCode}
                onChange={(e) => updateTempSetting('general', 'societyCode', e.target.value)}
                className="setting-input"
              />
            ) : (
              <div className="setting-value">{currentSettings.societyCode}</div>
            )}
          </div>

          <div className="setting-item full-width">
            <label className="setting-label">Address</label>
            {isEditingThis ? (
              <textarea
                value={currentSettings.address}
                onChange={(e) => updateTempSetting('general', 'address', e.target.value)}
                className="setting-textarea"
                rows="3"
              />
            ) : (
              <div className="setting-value">{currentSettings.address}</div>
            )}
          </div>

          <div className="setting-item">
            <label className="setting-label">Phone</label>
            {isEditingThis ? (
              <input
                type="tel"
                value={currentSettings.phone}
                onChange={(e) => updateTempSetting('general', 'phone', e.target.value)}
                className="setting-input"
              />
            ) : (
              <div className="setting-value">{currentSettings.phone}</div>
            )}
          </div>

          <div className="setting-item">
            <label className="setting-label">Email</label>
            {isEditingThis ? (
              <input
                type="email"
                value={currentSettings.email}
                onChange={(e) => updateTempSetting('general', 'email', e.target.value)}
                className="setting-input"
              />
            ) : (
              <div className="setting-value">{currentSettings.email}</div>
            )}
          </div>

          <div className="setting-item">
            <label className="setting-label">Website</label>
            {isEditingThis ? (
              <input
                type="url"
                value={currentSettings.website}
                onChange={(e) => updateTempSetting('general', 'website', e.target.value)}
                className="setting-input"
              />
            ) : (
              <div className="setting-value">{currentSettings.website}</div>
            )}
          </div>

          <div className="setting-item">
            <label className="setting-label">Registration Number</label>
            {isEditingThis ? (
              <input
                type="text"
                value={currentSettings.registrationNumber}
                onChange={(e) => updateTempSetting('general', 'registrationNumber', e.target.value)}
                className="setting-input"
              />
            ) : (
              <div className="setting-value">{currentSettings.registrationNumber}</div>
            )}
          </div>

          <div className="setting-item">
            <label className="setting-label">Established Year</label>
            {isEditingThis ? (
              <input
                type="number"
                value={currentSettings.establishedYear}
                onChange={(e) => updateTempSetting('general', 'establishedYear', e.target.value)}
                className="setting-input"
              />
            ) : (
              <div className="setting-value">{currentSettings.establishedYear}</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSecuritySettings = () => {
    const isEditingThis = isEditing && editingSection === 'security';
    const currentSettings = isEditingThis ? tempSettings.security : settings.security;

    return (
      <div className="settings-section">
        <div className="section-header">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Security Settings</h3>
          {!isEditingThis ? (
            <button
              onClick={() => startEditing('security')}
              className="edit-btn"
            >
              ✏️ Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleSave} className="save-btn">
                💾 Save
              </button>
              <button onClick={handleCancel} className="cancel-btn">
                ❌ Cancel
              </button>
            </div>
          )}
        </div>

        <div className="security-subsection">
          <h4 className="subsection-title">Password Policy</h4>
          <div className="settings-grid">
            <div className="setting-item">
              <label className="setting-label">Minimum Length</label>
              {isEditingThis ? (
                <input
                  type="number"
                  value={currentSettings.passwordPolicy.minLength}
                  onChange={(e) => updateNestedSetting('security', 'passwordPolicy', 'minLength', parseInt(e.target.value))}
                  className="setting-input"
                  min="6"
                  max="20"
                />
              ) : (
                <div className="setting-value">{currentSettings.passwordPolicy.minLength} characters</div>
              )}
            </div>

            <div className="setting-item">
              <label className="setting-label">Password Expiry</label>
              {isEditingThis ? (
                <input
                  type="number"
                  value={currentSettings.passwordPolicy.expiryDays}
                  onChange={(e) => updateNestedSetting('security', 'passwordPolicy', 'expiryDays', parseInt(e.target.value))}
                  className="setting-input"
                  min="30"
                  max="365"
                />
              ) : (
                <div className="setting-value">{currentSettings.passwordPolicy.expiryDays} days</div>
              )}
            </div>

            <div className="setting-item">
              <label className="setting-label">Require Uppercase</label>
              {isEditingThis ? (
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={currentSettings.passwordPolicy.requireUppercase}
                    onChange={(e) => updateNestedSetting('security', 'passwordPolicy', 'requireUppercase', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              ) : (
                <div className={`setting-value ${currentSettings.passwordPolicy.requireUppercase ? 'text-green-600' : 'text-red-600'}`}>
                  {currentSettings.passwordPolicy.requireUppercase ? '✓ Enabled' : '✗ Disabled'}
                </div>
              )}
            </div>

            <div className="setting-item">
              <label className="setting-label">Require Numbers</label>
              {isEditingThis ? (
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={currentSettings.passwordPolicy.requireNumbers}
                    onChange={(e) => updateNestedSetting('security', 'passwordPolicy', 'requireNumbers', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              ) : (
                <div className={`setting-value ${currentSettings.passwordPolicy.requireNumbers ? 'text-green-600' : 'text-red-600'}`}>
                  {currentSettings.passwordPolicy.requireNumbers ? '✓ Enabled' : '✗ Disabled'}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="security-subsection">
          <h4 className="subsection-title">Session & Access</h4>
          <div className="settings-grid">
            <div className="setting-item">
              <label className="setting-label">Session Timeout</label>
              {isEditingThis ? (
                <input
                  type="number"
                  value={currentSettings.sessionTimeout}
                  onChange={(e) => updateTempSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                  className="setting-input"
                  min="5"
                  max="120"
                />
              ) : (
                <div className="setting-value">{currentSettings.sessionTimeout} minutes</div>
              )}
            </div>

            <div className="setting-item">
              <label className="setting-label">Max Login Attempts</label>
              {isEditingThis ? (
                <input
                  type="number"
                  value={currentSettings.maxLoginAttempts}
                  onChange={(e) => updateTempSetting('security', 'maxLoginAttempts', parseInt(e.target.value))}
                  className="setting-input"
                  min="3"
                  max="10"
                />
              ) : (
                <div className="setting-value">{currentSettings.maxLoginAttempts} attempts</div>
              )}
            </div>

            <div className="setting-item">
              <label className="setting-label">Two-Factor Authentication</label>
              {isEditingThis ? (
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={currentSettings.twoFactorAuth}
                    onChange={(e) => updateTempSetting('security', 'twoFactorAuth', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              ) : (
                <div className={`setting-value ${currentSettings.twoFactorAuth ? 'text-green-600' : 'text-orange-600'}`}>
                  {currentSettings.twoFactorAuth ? '✓ Enabled' : '⚠️ Disabled'}
                </div>
              )}
            </div>

            <div className="setting-item">
              <label className="setting-label">Login Notifications</label>
              {isEditingThis ? (
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={currentSettings.loginNotifications}
                    onChange={(e) => updateTempSetting('security', 'loginNotifications', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              ) : (
                <div className={`setting-value ${currentSettings.loginNotifications ? 'text-green-600' : 'text-red-600'}`}>
                  {currentSettings.loginNotifications ? '✓ Enabled' : '✗ Disabled'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderNotificationSettings = () => {
    const isEditingThis = isEditing && editingSection === 'notifications';
    const currentSettings = isEditingThis ? tempSettings.notifications : settings.notifications;

    return (
      <div className="settings-section">
        <div className="section-header">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Notification Settings</h3>
          {!isEditingThis ? (
            <button
              onClick={() => startEditing('notifications')}
              className="edit-btn"
            >
              ✏️ Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleSave} className="save-btn">
                💾 Save
              </button>
              <button onClick={handleCancel} className="cancel-btn">
                ❌ Cancel
              </button>
            </div>
          )}
        </div>

        <div className="notification-grid">
          {Object.entries(currentSettings).map(([key, value]) => (
            <div key={key} className="notification-item">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="notification-title">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </h4>
                  <p className="notification-description">
                    {getNotificationDescription(key)}
                  </p>
                </div>
                {isEditingThis ? (
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => updateTempSetting('notifications', key, e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                ) : (
                  <div className={`status-badge ${value ? 'status-enabled' : 'status-disabled'}`}>
                    {value ? '✓ Enabled' : '✗ Disabled'}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getNotificationDescription = (key) => {
    const descriptions = {
      emailNotifications: 'Send notifications via email',
      smsNotifications: 'Send notifications via SMS',
      pushNotifications: 'Send push notifications to mobile devices',
      maintenanceReminders: 'Remind about upcoming maintenance',
      paymentReminders: 'Remind about pending payments',
      eventNotifications: 'Notify about society events',
      emergencyAlerts: 'Send emergency alerts and announcements'
    };
    return descriptions[key] || '';
  };

  const renderBackupSettings = () => {
    const isEditingThis = isEditing && editingSection === 'backup';
    const currentSettings = isEditingThis ? tempSettings.backup : settings.backup;

    return (
      <div className="settings-section">
        <div className="section-header">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Backup Settings</h3>
          {!isEditingThis ? (
            <button
              onClick={() => startEditing('backup')}
              className="edit-btn"
            >
              ✏️ Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleSave} className="save-btn">
                💾 Save
              </button>
              <button onClick={handleCancel} className="cancel-btn">
                ❌ Cancel
              </button>
            </div>
          )}
        </div>

        <div className="backup-status">
          <div className="backup-info">
            <h4 className="text-lg font-semibold text-gray-700">Backup Status</h4>
            <div className="status-indicator">
              <span className="status-dot status-active"></span>
              <span>System backups are running normally</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Last backup: {currentSettings.lastBackup}
            </p>
          </div>
          <button className="backup-now-btn">
            🔄 Backup Now
          </button>
        </div>

        <div className="settings-grid">
          <div className="setting-item">
            <label className="setting-label">Auto Backup</label>
            {isEditingThis ? (
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={currentSettings.autoBackup}
                  onChange={(e) => updateTempSetting('backup', 'autoBackup', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            ) : (
              <div className={`setting-value ${currentSettings.autoBackup ? 'text-green-600' : 'text-red-600'}`}>
                {currentSettings.autoBackup ? '✓ Enabled' : '✗ Disabled'}
              </div>
            )}
          </div>

          <div className="setting-item">
            <label className="setting-label">Backup Frequency</label>
            {isEditingThis ? (
              <select
                value={currentSettings.backupFrequency}
                onChange={(e) => updateTempSetting('backup', 'backupFrequency', e.target.value)}
                className="setting-select"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            ) : (
              <div className="setting-value">{currentSettings.backupFrequency}</div>
            )}
          </div>

          <div className="setting-item">
            <label className="setting-label">Retention Period</label>
            {isEditingThis ? (
              <input
                type="number"
                value={currentSettings.retentionPeriod}
                onChange={(e) => updateTempSetting('backup', 'retentionPeriod', parseInt(e.target.value))}
                className="setting-input"
                min="7"
                max="365"
              />
            ) : (
              <div className="setting-value">{currentSettings.retentionPeriod} days</div>
            )}
          </div>

          <div className="setting-item">
            <label className="setting-label">Cloud Sync</label>
            {isEditingThis ? (
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={currentSettings.cloudSync}
                  onChange={(e) => updateTempSetting('backup', 'cloudSync', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            ) : (
              <div className={`setting-value ${currentSettings.cloudSync ? 'text-green-600' : 'text-orange-600'}`}>
                {currentSettings.cloudSync ? '☁️ Enabled' : '📱 Local Only'}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderMaintenanceSettings = () => {
    const currentSettings = settings.maintenance;

    return (
      <div className="settings-section">
        <div className="section-header">
          <h3 className="text-xl font-bold text-gray-800 mb-4">System Maintenance</h3>
        </div>

        <div className="maintenance-status">
          <div className="status-card">
            <h4 className="text-lg font-semibold text-gray-700">System Status</h4>
            <div className={`status-indicator ${currentSettings.systemStatus === 'operational' ? 'status-operational' : 'status-maintenance'}`}>
              <span className="status-dot"></span>
              <span className="capitalize">{currentSettings.systemStatus}</span>
            </div>
          </div>

          <div className="maintenance-schedule">
            <h4 className="text-lg font-semibold text-gray-700">Maintenance Schedule</h4>
            <div className="schedule-info">
              <p><strong>Last Maintenance:</strong> {currentSettings.lastMaintenance}</p>
              <p><strong>Next Maintenance:</strong> {currentSettings.nextMaintenance}</p>
              <p><strong>Window:</strong> {currentSettings.maintenanceWindow}</p>
            </div>
          </div>
        </div>

        <div className="maintenance-actions">
          <button className="maintenance-btn maintenance-btn-primary">
            🔧 Schedule Maintenance
          </button>
          <button className="maintenance-btn maintenance-btn-secondary">
            📊 View Maintenance Logs
          </button>
          <button className="maintenance-btn maintenance-btn-warning">
            ⚠️ Enable Maintenance Mode
          </button>
        </div>

        <div className="auto-updates">
          <div className="setting-item">
            <label className="setting-label">Automatic Updates</label>
            <div className={`setting-value ${currentSettings.autoUpdates ? 'text-green-600' : 'text-red-600'}`}>
              {currentSettings.autoUpdates ? '✓ Enabled' : '✗ Disabled'}
            </div>
          </div>
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
            Admin Settings
          </h1>
          <p className="text-gray-400 mt-2">Manage system configuration and preferences</p>
        </div>

        <div className="settings-container">
          {/* Tabs Navigation */}
          <div className="settings-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button ${activeTab === tab.id ? 'tab-active' : ''}`}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-name">{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Settings Content */}
          <div className="settings-content">
            {activeTab === 'general' && renderGeneralSettings()}
            {activeTab === 'security' && renderSecuritySettings()}
            {activeTab === 'notifications' && renderNotificationSettings()}
            {activeTab === 'backup' && renderBackupSettings()}
            {activeTab === 'maintenance' && renderMaintenanceSettings()}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AdminSettings;
