# Society Management System - Backend API

## Overview
A comprehensive backend API for managing society operations including member management, maintenance, events, complaints, staff management, security, and more.

## Features Completed

### 🏠 Core Management
- **Member Management**: Complete CRUD operations for society members
- **Building Management**: Floor, flat, and building structure management
- **Maintenance Management**: Requests, rates, and maintenance tracking
- **Visitor Management**: Entry/exit logging and pre-approved visitors

### 💰 Financial Management
- **Accounts Management**: Income, expenses, and financial tracking
- **Payment Processing**: Maintenance fees and billing

### 📅 Community Features
- **Events Management**: Society events and activities
- **Notices**: Announcements and communication
- **Complaints**: Issue tracking and resolution
- **Health Records**: Member health information management

### 🛠️ Support & Services
- **Support Contacts**: IT support, maintenance contacts with ratings
- **Emergency Contacts**: Police, fire, medical emergency services
- **Helpdesk System**: Ticket management with comments and assignments
- **Services Management**: Various society services

### 🔒 Security & System
- **Security Logs**: Comprehensive security event logging
- **System Settings**: Configurable system parameters
- **User Authentication**: JWT-based authentication with roles
- **System Monitoring**: Health checks and status monitoring

### 👥 Staff Management
- **Staff Records**: Employee management with personal and employment details
- **Department Management**: Organizational structure
- **Attendance Tracking**: Check-in/out, breaks, and attendance reports
- **Performance Management**: Performance reviews and feedback

### 🛒 Shopping & Marketplace
- **Vendor Management**: Vendor profiles, verification, and ratings
- **Product Catalog**: Product management with inventory tracking
- **Order Management**: Order processing, status tracking, and fulfillment
- **Shopping Dashboard**: Sales analytics and reporting

### 🎓 Co-Curricular Activities
- **Activity Management**: Classes, workshops, competitions
- **Enrollment System**: Participant registration and management
- **Attendance Tracking**: Session-wise attendance
- **Instructor Management**: Instructor profiles and qualifications
- **Feedback System**: Activity ratings and reviews

### 📊 Reports & Analytics
- **Report Templates**: Configurable report generation
- **Data Analytics**: Summary statistics and trends
- **Custom Reports**: Flexible reporting system
- **Report Sharing**: Multi-user report access

### ⚙️ Admin Settings
- **System Configuration**: Editable system parameters
- **Theme Management**: UI theme customization
- **Email Templates**: Configurable email notifications
- **Backup Configuration**: Automated backup management

## API Endpoints

### Authentication
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
POST /api/auth/logout
```

### Support Contacts
```
GET    /api/support-contacts/contacts
POST   /api/support-contacts/contacts
PUT    /api/support-contacts/contacts/:id
DELETE /api/support-contacts/contacts/:id
POST   /api/support-contacts/contacts/:id/rate

GET    /api/support-contacts/emergency
POST   /api/support-contacts/emergency
PUT    /api/support-contacts/emergency/:id
DELETE /api/support-contacts/emergency/:id

GET    /api/support-contacts/tickets
POST   /api/support-contacts/tickets
PUT    /api/support-contacts/tickets/:id
POST   /api/support-contacts/tickets/:id/comments
PUT    /api/support-contacts/tickets/:id/assign
PUT    /api/support-contacts/tickets/:id/close
```

### System Security
```
GET    /api/system-security/logs
POST   /api/system-security/logs
GET    /api/system-security/logs/:id
GET    /api/system-security/dashboard/security
DELETE /api/system-security/logs/cleanup

GET    /api/system-security/settings
POST   /api/system-security/settings
PUT    /api/system-security/settings/:id
DELETE /api/system-security/settings/:id
GET    /api/system-security/settings/:id/history
PUT    /api/system-security/settings/:id/reset

GET    /api/system-security/status
```

### Staff Management
```
GET    /api/staff-management/staff
GET    /api/staff-management/staff/:id
POST   /api/staff-management/staff
PUT    /api/staff-management/staff/:id
DELETE /api/staff-management/staff/:id
POST   /api/staff-management/staff/:id/performance

GET    /api/staff-management/departments
POST   /api/staff-management/departments
PUT    /api/staff-management/departments/:id
DELETE /api/staff-management/departments/:id

GET    /api/staff-management/attendance
POST   /api/staff-management/attendance/mark
GET    /api/staff-management/attendance/summary
PUT    /api/staff-management/attendance/:id

GET    /api/staff-management/dashboard
```

### Shopping
```
GET    /api/shopping/products
GET    /api/shopping/products/:id
POST   /api/shopping/products
PUT    /api/shopping/products/:id
DELETE /api/shopping/products/:id
POST   /api/shopping/products/:id/reviews
PUT    /api/shopping/products/:id/stock

GET    /api/shopping/vendors
POST   /api/shopping/vendors
PUT    /api/shopping/vendors/:id
PUT    /api/shopping/vendors/:id/verify

GET    /api/shopping/orders
POST   /api/shopping/orders
PUT    /api/shopping/orders/:id/status
PUT    /api/shopping/orders/:id/cancel

GET    /api/shopping/dashboard
```

### Co-Curricular Activities
```
GET    /api/co-curricular/activities
GET    /api/co-curricular/activities/:id
POST   /api/co-curricular/activities
PUT    /api/co-curricular/activities/:id
DELETE /api/co-curricular/activities/:id

POST   /api/co-curricular/activities/:id/enroll
PUT    /api/co-curricular/activities/:id/participants/:participantId

POST   /api/co-curricular/activities/:id/attendance
POST   /api/co-curricular/activities/:id/feedback
GET    /api/co-curricular/activities/:id/stats

GET    /api/co-curricular/dashboard
```

### Reports & Analytics
```
GET    /api/reports/templates
POST   /api/reports/templates
PUT    /api/reports/templates/:id
DELETE /api/reports/templates/:id

GET    /api/reports/reports
POST   /api/reports/templates/:templateId/generate
GET    /api/reports/reports/:id
POST   /api/reports/reports/:id/share
GET    /api/reports/reports/:id/download
DELETE /api/reports/reports/:id

GET    /api/reports/dashboard
```

### Admin Settings
```
GET    /api/admin-settings/configs
POST   /api/admin-settings/configs
PUT    /api/admin-settings/configs/:id

GET    /api/admin-settings/themes
POST   /api/admin-settings/themes
PUT    /api/admin-settings/themes/:id
PUT    /api/admin-settings/themes/:id/default

GET    /api/admin-settings/email-templates
POST   /api/admin-settings/email-templates
PUT    /api/admin-settings/email-templates/:id
DELETE /api/admin-settings/email-templates/:id

GET    /api/admin-settings/backups
POST   /api/admin-settings/backups
PUT    /api/admin-settings/backups/:id
POST   /api/admin-settings/backups/:id/run

GET    /api/admin-settings/dashboard
```

## Data Models

### Support Contacts
- **SupportContact**: IT support, maintenance contacts with availability
- **EmergencyContact**: Police, fire, medical emergency services
- **HelpdeskTicket**: Support ticket system with comments

### Security
- **SecurityLog**: Security events with severity levels
- **SystemSettings**: Configurable system parameters

### Staff Management
- **Staff**: Employee records with personal/employment details
- **Department**: Organizational departments with budgets
- **Attendance**: Employee attendance tracking

### Shopping
- **Vendor**: Vendor profiles with verification status
- **Product**: Product catalog with inventory
- **Order**: Order management with status tracking

### Activities
- **CoCurricularActivity**: Classes, workshops, competitions
- **Enrollment**: Participant management
- **Attendance**: Activity attendance tracking

### Reports
- **ReportTemplate**: Configurable report definitions
- **ReportInstance**: Generated reports with data

### Admin
- **SystemConfig**: System configuration parameters
- **ThemeConfig**: UI theme settings
- **EmailTemplate**: Email notification templates
- **BackupConfig**: Backup automation settings

## Security Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (admin, manager, staff, member, etc.)
- Protected routes with middleware

### Security Logging
- Comprehensive security event logging
- Failed login attempt tracking
- User activity monitoring
- IP address and user agent tracking

### Data Protection
- Input validation and sanitization
- Error handling middleware
- Rate limiting (configurable)
- CORS protection

## Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (v5+)
- npm or yarn

### Environment Variables
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/society-management
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### Installation
```bash
cd server
npm install
npm run seed    # Populate with sample data
npm run dev     # Development mode
npm start       # Production mode
```

### Default Login Credentials
- **Admin**: admin@society.com / admin123
- **Watchman**: watchman@society.com / watchman123

## Development Features

### Code Structure
- Clean MVC architecture
- Modular route organization
- Reusable middleware
- Error handling
- Logging with Winston

### Database
- Mongoose ODM with schema validation
- Proper indexing for performance
- Virtual fields and middleware
- Relationship management

### API Features
- RESTful API design
- Pagination support
- Filtering and search
- Sorting capabilities
- Comprehensive error responses

## Testing & Monitoring

### Health Checks
```
GET /health
```

### Logging
- Request/response logging with Morgan
- Application logging with Winston
- Error tracking and reporting

### Performance
- Database indexing
- Query optimization
- Efficient pagination
- Memory management

## Deployment

### Production Setup
1. Set environment variables
2. Configure MongoDB connection
3. Set up reverse proxy (nginx)
4. Configure SSL/TLS
5. Set up monitoring

### Docker Support
```dockerfile
# Dockerfile included for containerization
```

## Contributing

### Code Standards
- ESLint configuration
- Consistent naming conventions
- Comprehensive error handling
- Documentation standards

### API Documentation
- Comprehensive endpoint documentation
- Request/response examples
- Error code documentation
- Authentication requirements

## Support

For technical support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Note**: This is a comprehensive backend system supporting all frontend admin panel features. All endpoints are secured with appropriate authentication and authorization.
