// API service for frontend to connect with backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        let errorMessage = 'Something went wrong';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Failed to connect to server. Please check your connection.');
      }
      throw error;
    }
  }

  // Authentication
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: credentials,
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async forgotPassword(email) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: { email },
    });
  }

  async resetPassword(token, password) {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: { token, password },
    });
  }

  // Members
  async getMembers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/members${queryString ? `?${queryString}` : ''}`);
  }

  async getMemberById(id) {
    return this.request(`/members/${id}`);
  }

  async createMember(memberData) {
    return this.request('/members', {
      method: 'POST',
      body: memberData,
    });
  }

  async updateMember(id, memberData) {
    return this.request(`/members/${id}`, {
      method: 'PUT',
      body: memberData,
    });
  }

  async deleteMember(id) {
    return this.request(`/members/${id}`, {
      method: 'DELETE',
    });
  }

  // Maintenance & Rent
  async getMaintenanceRequests(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/maintenance/requests${queryString ? `?${queryString}` : ''}`);
  }

  async createMaintenanceRequest(requestData) {
    return this.request('/maintenance/requests', {
      method: 'POST',
      body: requestData,
    });
  }

  async updateMaintenanceRequest(id, requestData) {
    return this.request(`/maintenance/requests/${id}`, {
      method: 'PUT',
      body: requestData,
    });
  }

  async deleteMaintenanceRequest(id) {
    return this.request(`/maintenance/requests/${id}`, {
      method: 'DELETE',
    });
  }

  // Visitors
  async getVisitors(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/visitors${queryString ? `?${queryString}` : ''}`);
  }

  async createVisitor(visitorData) {
    return this.request('/visitors', {
      method: 'POST',
      body: visitorData,
    });
  }

  async updateVisitor(id, visitorData) {
    return this.request(`/visitors/${id}`, {
      method: 'PUT',
      body: visitorData,
    });
  }

  async checkInVisitor(id) {
    return this.request(`/visitors/${id}/checkin`, {
      method: 'POST',
    });
  }

  async checkOutVisitor(id) {
    return this.request(`/visitors/${id}/checkout`, {
      method: 'POST',
    });
  }

  // Accounts
  async getTransactions(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/accounts/transactions${queryString ? `?${queryString}` : ''}`);
  }

  async createTransaction(transactionData) {
    return this.request('/accounts/transactions', {
      method: 'POST',
      body: transactionData,
    });
  }

  async updateTransaction(id, transactionData) {
    return this.request(`/accounts/transactions/${id}`, {
      method: 'PUT',
      body: transactionData,
    });
  }

  async deleteTransaction(id) {
    return this.request(`/accounts/transactions/${id}`, {
      method: 'DELETE',
    });
  }

  async getFinancialSummary(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/accounts/summary${queryString ? `?${queryString}` : ''}`);
  }

  async getExpenseAnalytics(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/accounts/analytics/expenses${queryString ? `?${queryString}` : ''}`);
  }

  async getIncomeAnalytics(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/accounts/analytics/income${queryString ? `?${queryString}` : ''}`);
  }

  async getMonthlyReport(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/accounts/reports/monthly${queryString ? `?${queryString}` : ''}`);
  }

  // Buildings
  async getBuildings(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/buildings${queryString ? `?${queryString}` : ''}`);
  }

  async createBuilding(buildingData) {
    return this.request('/buildings', {
      method: 'POST',
      body: buildingData,
    });
  }

  async updateBuilding(id, buildingData) {
    return this.request(`/buildings/${id}`, {
      method: 'PUT',
      body: buildingData,
    });
  }

  async deleteBuilding(id) {
    return this.request(`/buildings/${id}`, {
      method: 'DELETE',
    });
  }

  async getBuildingStatistics() {
    return this.request('/buildings/statistics');
  }

  // Events
  async getEvents(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/events${queryString ? `?${queryString}` : ''}`);
  }

  async createEvent(eventData) {
    return this.request('/events', {
      method: 'POST',
      body: eventData,
    });
  }

  async updateEvent(id, eventData) {
    return this.request(`/events/${id}`, {
      method: 'PUT',
      body: eventData,
    });
  }

  async deleteEvent(id) {
    return this.request(`/events/${id}`, {
      method: 'DELETE',
    });
  }

  async registerForEvent(id, registrationData) {
    return this.request(`/events/${id}/register`, {
      method: 'POST',
      body: registrationData,
    });
  }

  async addEventFeedback(id, feedbackData) {
    return this.request(`/events/${id}/feedback`, {
      method: 'POST',
      body: feedbackData,
    });
  }

  // Complaints
  async getComplaints(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/complaints${queryString ? `?${queryString}` : ''}`);
  }

  async createComplaint(complaintData) {
    return this.request('/complaints', {
      method: 'POST',
      body: complaintData,
    });
  }

  async updateComplaint(id, updateData) {
    return this.request(`/complaints/${id}`, {
      method: 'PUT',
      body: updateData,
    });
  }

  async deleteComplaint(id) {
    return this.request(`/complaints/${id}`, {
      method: 'DELETE',
    });
  }

  async addComplaintFeedback(id, feedbackData) {
    return this.request(`/complaints/${id}/feedback`, {
      method: 'POST',
      body: feedbackData,
    });
  }

  // Notices
  async getNotices(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/notices${queryString ? `?${queryString}` : ''}`);
  }

  async createNotice(noticeData) {
    return this.request('/notices', {
      method: 'POST',
      body: noticeData,
    });
  }

  async updateNotice(id, noticeData) {
    return this.request(`/notices/${id}`, {
      method: 'PUT',
      body: noticeData,
    });
  }

  async deleteNotice(id) {
    return this.request(`/notices/${id}`, {
      method: 'DELETE',
    });
  }

  async markNoticeAsRead(id, memberId) {
    return this.request(`/notices/${id}/read`, {
      method: 'POST',
      body: { memberId },
    });
  }

  async acknowledgeNotice(id, acknowledgeData) {
    return this.request(`/notices/${id}/acknowledge`, {
      method: 'POST',
      body: acknowledgeData,
    });
  }

  // Health Records
  async getHealthRecords(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/health${queryString ? `?${queryString}` : ''}`);
  }

  async createHealthRecord(healthData) {
    return this.request('/health', {
      method: 'POST',
      body: healthData,
    });
  }

  async updateHealthRecord(id, healthData) {
    return this.request(`/health/${id}`, {
      method: 'PUT',
      body: healthData,
    });
  }

  async deleteHealthRecord(id) {
    return this.request(`/health/${id}`, {
      method: 'DELETE',
    });
  }

  async getHealthRecordsByMember(memberId, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/health/member/${memberId}${queryString ? `?${queryString}` : ''}`);
  }

  // Services
  async getServices(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/services${queryString ? `?${queryString}` : ''}`);
  }

  async createService(serviceData) {
    return this.request('/services', {
      method: 'POST',
      body: serviceData,
    });
  }

  async updateService(id, serviceData) {
    return this.request(`/services/${id}`, {
      method: 'PUT',
      body: serviceData,
    });
  }

  async deleteService(id) {
    return this.request(`/services/${id}`, {
      method: 'DELETE',
    });
  }

  async bookService(id, bookingData) {
    return this.request(`/services/${id}/book`, {
      method: 'POST',
      body: bookingData,
    });
  }

  async addServiceFeedback(serviceId, bookingId, feedbackData) {
    return this.request(`/services/${serviceId}/bookings/${bookingId}/feedback`, {
      method: 'POST',
      body: feedbackData,
    });
  }

  // Support Staff
  async getSupportStaff(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/support-staff${queryString ? `?${queryString}` : ''}`);
  }

  async createSupportStaff(staffData) {
    return this.request('/support-staff', {
      method: 'POST',
      body: staffData,
    });
  }

  async updateSupportStaff(id, staffData) {
    return this.request(`/support-staff/${id}`, {
      method: 'PUT',
      body: staffData,
    });
  }

  async deleteSupportStaff(id) {
    return this.request(`/support-staff/${id}`, {
      method: 'DELETE',
    });
  }

  // Support Contacts
  async getSupportContacts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/support-contacts${queryString ? `?${queryString}` : ''}`);
  }

  async createSupportContact(contactData) {
    return this.request('/support-contacts', {
      method: 'POST',
      body: contactData,
    });
  }

  async updateSupportContact(id, contactData) {
    return this.request(`/support-contacts/${id}`, {
      method: 'PUT',
      body: contactData,
    });
  }

  async deleteSupportContact(id) {
    return this.request(`/support-contacts/${id}`, {
      method: 'DELETE',
    });
  }

  // Emergency Contacts
  async getEmergencyContacts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/emergency-contacts${queryString ? `?${queryString}` : ''}`);
  }

  async createEmergencyContact(contactData) {
    return this.request('/emergency-contacts', {
      method: 'POST',
      body: contactData,
    });
  }

  async updateEmergencyContact(id, contactData) {
    return this.request(`/emergency-contacts/${id}`, {
      method: 'PUT',
      body: contactData,
    });
  }

  async deleteEmergencyContact(id) {
    return this.request(`/emergency-contacts/${id}`, {
      method: 'DELETE',
    });
  }

  // Staff Management
  async getStaff(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/staff${queryString ? `?${queryString}` : ''}`);
  }

  async createStaff(staffData) {
    return this.request('/staff', {
      method: 'POST',
      body: staffData,
    });
  }

  async updateStaff(id, staffData) {
    return this.request(`/staff/${id}`, {
      method: 'PUT',
      body: staffData,
    });
  }

  async deleteStaff(id) {
    return this.request(`/staff/${id}`, {
      method: 'DELETE',
    });
  }

  // Departments
  async getDepartments(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/departments${queryString ? `?${queryString}` : ''}`);
  }

  async createDepartment(departmentData) {
    return this.request('/departments', {
      method: 'POST',
      body: departmentData,
    });
  }

  async updateDepartment(id, departmentData) {
    return this.request(`/departments/${id}`, {
      method: 'PUT',
      body: departmentData,
    });
  }

  async deleteDepartment(id) {
    return this.request(`/departments/${id}`, {
      method: 'DELETE',
    });
  }

  // Staff Attendance
  async getAttendanceRecords(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/attendance${queryString ? `?${queryString}` : ''}`);
  }

  async markAttendance(attendanceData) {
    return this.request('/attendance', {
      method: 'POST',
      body: attendanceData,
    });
  }

  async updateAttendance(id, attendanceData) {
    return this.request(`/attendance/${id}`, {
      method: 'PUT',
      body: attendanceData,
    });
  }

  // Shopping - Orders
  async getOrders(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/orders${queryString ? `?${queryString}` : ''}`);
  }

  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: orderData,
    });
  }

  async updateOrder(id, orderData) {
    return this.request(`/orders/${id}`, {
      method: 'PUT',
      body: orderData,
    });
  }

  async deleteOrder(id) {
    return this.request(`/orders/${id}`, {
      method: 'DELETE',
    });
  }

  // Shopping - Vendors
  async getVendors(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/vendors${queryString ? `?${queryString}` : ''}`);
  }

  async createVendor(vendorData) {
    return this.request('/vendors', {
      method: 'POST',
      body: vendorData,
    });
  }

  async updateVendor(id, vendorData) {
    return this.request(`/vendors/${id}`, {
      method: 'PUT',
      body: vendorData,
    });
  }

  async deleteVendor(id) {
    return this.request(`/vendors/${id}`, {
      method: 'DELETE',
    });
  }

  // Shopping - Products
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/products${queryString ? `?${queryString}` : ''}`);
  }

  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: productData,
    });
  }

  async updateProduct(id, productData) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: productData,
    });
  }

  async deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Co-Curricular Activities
  async getCoCurricularActivities(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/co-curricular${queryString ? `?${queryString}` : ''}`);
  }

  async createCoCurricularActivity(activityData) {
    return this.request('/co-curricular', {
      method: 'POST',
      body: activityData,
    });
  }

  async updateCoCurricularActivity(id, activityData) {
    return this.request(`/co-curricular/${id}`, {
      method: 'PUT',
      body: activityData,
    });
  }

  async deleteCoCurricularActivity(id) {
    return this.request(`/co-curricular/${id}`, {
      method: 'DELETE',
    });
  }

  async enrollInActivity(id, enrollmentData) {
    return this.request(`/co-curricular/${id}/enroll`, {
      method: 'POST',
      body: enrollmentData,
    });
  }

  // System Security - Access Control
  async getAccessControl(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/security/access-control${queryString ? `?${queryString}` : ''}`);
  }

  async createAccessControl(accessData) {
    return this.request('/security/access-control', {
      method: 'POST',
      body: accessData,
    });
  }

  async updateAccessControl(id, accessData) {
    return this.request(`/security/access-control/${id}`, {
      method: 'PUT',
      body: accessData,
    });
  }

  async deleteAccessControl(id) {
    return this.request(`/security/access-control/${id}`, {
      method: 'DELETE',
    });
  }

  // System Security - Security Logs
  async getSecurityLogs(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/security/logs${queryString ? `?${queryString}` : ''}`);
  }

  async getSystemSettings() {
    return this.request('/security/settings');
  }

  async updateSystemSettings(settingsData) {
    return this.request('/security/settings', {
      method: 'PUT',
      body: settingsData,
    });
  }

  async getBackupSettings() {
    return this.request('/security/backup');
  }

  async updateBackupSettings(backupData) {
    return this.request('/security/backup', {
      method: 'PUT',
      body: backupData,
    });
  }

  async triggerBackup() {
    return this.request('/security/backup/trigger', {
      method: 'POST',
    });
  }

  // Reports & Analysis
  async getFinancialReport(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/reports/financial${queryString ? `?${queryString}` : ''}`);
  }

  async getMembershipReport(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/reports/membership${queryString ? `?${queryString}` : ''}`);
  }

  async getMaintenanceReport(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/reports/maintenance${queryString ? `?${queryString}` : ''}`);
  }

  async getComplaintsReport(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/reports/complaints${queryString ? `?${queryString}` : ''}`);
  }

  async getEventsReport(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/reports/events${queryString ? `?${queryString}` : ''}`);
  }

  async getVisitorsReport(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/reports/visitors${queryString ? `?${queryString}` : ''}`);
  }

  async getCustomReport(reportConfig) {
    return this.request('/reports/custom', {
      method: 'POST',
      body: reportConfig,
    });
  }

  async exportReport(reportType, format, params = {}) {
    const queryString = new URLSearchParams({ ...params, format }).toString();
    return this.request(`/reports/export/${reportType}${queryString ? `?${queryString}` : ''}`);
  }

  // Admin Settings
  async getAdminSettings() {
    return this.request('/admin/settings');
  }

  async updateAdminSettings(settingsData) {
    return this.request('/admin/settings', {
      method: 'PUT',
      body: settingsData,
    });
  }

  async getSystemInfo() {
    return this.request('/admin/system-info');
  }

  async updateSystemInfo(systemData) {
    return this.request('/admin/system-info', {
      method: 'PUT',
      body: systemData,
    });
  }

  async getNotificationSettings() {
    return this.request('/admin/notifications');
  }

  async updateNotificationSettings(notificationData) {
    return this.request('/admin/notifications', {
      method: 'PUT',
      body: notificationData,
    });
  }

  async getSecuritySettings() {
    return this.request('/admin/security');
  }

  async updateSecuritySettings(securityData) {
    return this.request('/admin/security', {
      method: 'PUT',
      body: securityData,
    });
  }

  // Generic GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`${endpoint}${queryString ? `?${queryString}` : ''}`);
  }

  // Generic POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: data,
    });
  }

  // Generic PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: data,
    });
  }

  // Generic DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
