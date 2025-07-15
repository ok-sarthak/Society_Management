# Society Management System

A comprehensive web application for managing society/apartment complex operations including member management, maintenance requests, visitor tracking, events, financial management, and more.

## 🏗️ Project Structure

```
Society_Management-1/
├── client/society-management/          # React frontend application
│   ├── src/
│   │   ├── admin/                     # Admin dashboard components
│   │   ├── components/                # Reusable components
│   │   ├── contexts/                  # React contexts (Auth, etc.)
│   │   ├── hooks/                     # Custom React hooks
│   │   ├── pages/                     # Page components
│   │   ├── services/                  # API service layer
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── server/                            # Node.js/Express backend
│   ├── controllers/                   # Route controllers
│   ├── models/                        # MongoDB models
│   ├── routes/                        # API routes
│   ├── middlewares/                   # Custom middlewares
│   ├── utils/                         # Utility functions
│   ├── logs/                          # Application logs
│   └── scripts/                       # Database scripts
└── README.md
```

## 🚀 Features

### Admin Dashboard
- **Member Management**: Add, edit, view member details with comprehensive information
- **Building Management**: Manage buildings, maintenance schedules, and amenities
- **Financial Management**: Track income, expenses, and generate financial reports
- **Maintenance & Rent**: Handle maintenance requests and rent collections
- **Visitor Management**: Track visitor entries and exits with security features
- **Event Management**: Organize events, manage registrations and feedback
- **Complaints & Feedback**: Handle resident complaints with ticketing system
- **Notices & Communication**: Broadcast notices and important communications
- **Health Records**: Maintain health records for emergency situations
- **Services**: Manage various services offered to residents
- **Staff Management**: Handle support staff information and schedules
- **Reports & Analytics**: Generate comprehensive reports and insights

### Authentication & Security
- JWT-based authentication
- Role-based access control (Admin, Watchman, Member)
- Password encryption using bcrypt
- Protected routes and API endpoints

### Database Models
- **Members**: Complete member information with emergency contacts
- **Buildings**: Building details with maintenance schedules
- **Transactions**: Financial transaction tracking
- **Events**: Event management with registration and feedback
- **Complaints**: Ticketing system for complaints with timeline
- **Notices**: Notice board with read/acknowledgment tracking
- **Health Records**: Medical information and emergency contacts
- **Services**: Service booking and management
- **Visitors**: Visitor tracking with check-in/out
- **Support Staff**: Staff management and attendance

## 🛠️ Technology Stack

### Frontend
- **React 19.1.0** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Winston** - Logging
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Copy the .env file and update with your values
cp .env.example .env
```

4. Update `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/society-management
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

5. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client/society-management
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Create .env file
touch .env
```

4. Add environment variables to `.env`:
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Society Management System
```

5. Start the development server:
```bash
npm run dev
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password

### Members
- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get member by ID
- `POST /api/members` - Create new member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Buildings
- `GET /api/buildings` - Get all buildings
- `POST /api/buildings` - Create new building
- `PUT /api/buildings/:id` - Update building
- `GET /api/buildings/statistics` - Get building statistics

### Financial Management
- `GET /api/accounts/transactions` - Get all transactions
- `POST /api/accounts/transactions` - Create new transaction
- `PUT /api/accounts/transactions/:id` - Update transaction
- `GET /api/accounts/summary` - Get financial summary

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `POST /api/events/:id/register` - Register for event
- `POST /api/events/:id/feedback` - Add event feedback

### Complaints
- `GET /api/complaints` - Get all complaints
- `POST /api/complaints` - Create new complaint
- `PUT /api/complaints/:id` - Update complaint status
- `POST /api/complaints/:id/feedback` - Add complaint feedback

### Notices
- `GET /api/notices` - Get all notices
- `POST /api/notices` - Create new notice
- `POST /api/notices/:id/read` - Mark notice as read
- `POST /api/notices/:id/acknowledge` - Acknowledge notice

### Health Records
- `GET /api/health` - Get health records
- `POST /api/health` - Create health record
- `GET /api/health/member/:memberId` - Get member's health records

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create new service
- `POST /api/services/:id/book` - Book service
- `POST /api/services/:id/bookings/:bookingId/feedback` - Add service feedback

### Maintenance
- `GET /api/maintenance/requests` - Get maintenance requests
- `POST /api/maintenance/requests` - Create maintenance request
- `PUT /api/maintenance/requests/:id` - Update maintenance request

### Visitors
- `GET /api/visitors` - Get all visitors
- `POST /api/visitors` - Register new visitor
- `POST /api/visitors/:id/checkin` - Check in visitor
- `POST /api/visitors/:id/checkout` - Check out visitor

## 📊 Database Schema

### Key Collections
- **users** - User authentication and basic info
- **memberlist** - Detailed member information
- **buildings** - Building and property information
- **transactions** - Financial transactions
- **events** - Event management
- **complaints** - Complaint tracking
- **notices** - Notice board
- **healthrecords** - Health and medical records
- **services** - Service management
- **visitors** - Visitor tracking

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Different permissions for Admin, Watchman, and Member roles
- **Password Encryption**: bcrypt hashing for secure password storage
- **Input Validation**: Mongoose schema validation and custom validation
- **CORS Configuration**: Controlled cross-origin requests
- **Helmet Integration**: Security headers for Express
- **Rate Limiting**: API rate limiting to prevent abuse

## 📝 Logging

The application uses Winston for comprehensive logging:
- **Error Logs**: `logs/error.log`
- **Combined Logs**: `logs/combined.log`
- **Console Output**: Development mode console logging

## 🧪 Testing

```bash
# Run backend tests
cd server
npm test

# Run frontend tests
cd client/society-management
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Set environment variables for production
2. Build and deploy to your preferred platform (Heroku, DigitalOcean, AWS, etc.)
3. Ensure MongoDB is accessible from production environment

### Frontend Deployment
1. Build the production bundle:
```bash
npm run build
```
2. Deploy the `dist` folder to your static hosting service (Netlify, Vercel, etc.)
3. Update API URLs for production environment

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions, please create an issue in the GitHub repository or contact the development team.

## 🔄 Version History

- **v1.0.0** - Initial release with core features
  - Member management
  - Building management
  - Financial tracking
  - Event management
  - Complaint system
  - Notice board
  - Visitor management
  - Health records
  - Service management

## 🎯 Future Enhancements

- Mobile application (React Native)
- Email notification system
- SMS integration
- Payment gateway integration
- Advanced reporting dashboard
- Mobile-responsive design improvements
- Real-time notifications
- Document management system
- Integration with accounting software
