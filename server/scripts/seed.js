import mongoose from 'mongoose';
import User from '../models/User.js';
import MemberList from '../models/member/MemberList.js';
import SupportStaff from '../models/supportStaff/SupportStaff.js';
import SupportContact from '../models/SupportContact.js';
import EmergencyContact from '../models/EmergencyContact.js';
import Staff from '../models/Staff.js';
import Department from '../models/Department.js';
import Vendor from '../models/Vendor.js';
import Product from '../models/Product.js';
import CoCurricularActivity from '../models/CoCurricularActivity.js';
import { SystemConfig, ThemeConfig, EmailTemplate } from '../models/AdminSettings.js';
import Transaction from '../models/Accounts.js';
import dotenv from 'dotenv';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Create admin user
    const adminUser = await User.findOne({ email: 'admin@society.com' });
    if (!adminUser) {
      const admin = new User({
        name: 'Society Admin',
        email: 'admin@society.com',
        password: 'admin123',
        role: 'admin',
        phoneNumber: '9999999999'
      });
      await admin.save();
      console.log('✅ Admin user created - Email: admin@society.com, Password: admin123');
    } else {
      console.log('ℹ️ Admin user already exists');
    }

    // Create watchman user
    const watchmanUser = await User.findOne({ email: 'watchman@society.com' });
    if (!watchmanUser) {
      const watchman = new User({
        name: 'Security Guard',
        email: 'watchman@society.com',
        password: 'watchman123',
        role: 'watchman',
        phoneNumber: '9999999998'
      });
      await watchman.save();
      console.log('✅ Watchman user created - Email: watchman@society.com, Password: watchman123');
    } else {
      console.log('ℹ️ Watchman user already exists');
    }

    // Create sample members
    const memberCount = await MemberList.countDocuments();
    if (memberCount === 0) {
      const sampleMembers = [
        {
          name: 'John Doe',
          age: 35,
          sex: 'Male',
          bloodGroup: 'A+',
          relationWithPrimaryOwner: 'Self',
          aadharNumber: '123456789012',
          panNumber: 'ABCDE1234F',
          buildingNumber: 1,
          blockNumber: 1,
          floorNumber: 1,
          address: 'Apt 101, Building 1, Block 1',
          phoneNumber: '9876543210',
          email: 'john.doe@email.com',
          memberType: 'owner',
          isPrimaryOwner: true,
          emergencyContact: {
            name: 'Jane Doe',
            relationship: 'Wife',
            phoneNumber: '9876543211'
          }
        },
        {
          name: 'Alice Smith',
          age: 28,
          sex: 'Female',
          bloodGroup: 'B+',
          relationWithPrimaryOwner: 'Self',
          aadharNumber: '123456789013',
          panNumber: 'ABCDE1234G',
          buildingNumber: 1,
          blockNumber: 2,
          floorNumber: 2,
          address: 'Apt 202, Building 1, Block 2',
          phoneNumber: '9876543212',
          email: 'alice.smith@email.com',
          memberType: 'owner',
          isPrimaryOwner: true,
          emergencyContact: {
            name: 'Bob Smith',
            relationship: 'Husband',
            phoneNumber: '9876543213'
          }
        }
      ];

      await MemberList.insertMany(sampleMembers);
      console.log('✅ Sample members created');
    } else {
      console.log('ℹ️ Members already exist');
    }

    // Create sample support staff
    const staffCount = await SupportStaff.countDocuments();
    if (staffCount === 0) {
      const sampleStaff = [
        {
          name: 'Security Guard 1',
          role: 'watchman',
          phoneNumber: '9876543220',
          email: 'guard1@society.com',
          address: 'Guard Quarter 1',
          age: 32,
          gender: 'Male',
          aadharNumber: '123456789020',
          salary: 15000,
          workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
          workingHours: {
            start: '09:00',
            end: '18:00'
          },
          emergencyContact: {
            name: 'Emergency Contact 1',
            relationship: 'Father',
            phoneNumber: '9876543221'
          }
        },
        {
          name: 'Cleaner 1',
          role: 'cleaner',
          phoneNumber: '9876543222',
          address: 'Staff Quarter 1',
          age: 28,
          gender: 'Female',
          aadharNumber: '123456789021',
          salary: 12000,
          workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
          workingHours: {
            start: '08:00',
            end: '17:00'
          },
          emergencyContact: {
            name: 'Emergency Contact 2',
            relationship: 'Husband',
            phoneNumber: '9876543223'
          }
        }
      ];

      await SupportStaff.insertMany(sampleStaff);
      console.log('✅ Sample support staff created');
    } else {
      console.log('ℹ️ Support staff already exist');
    }

    // Create departments
    const departmentCount = await Department.countDocuments();
    if (departmentCount === 0) {
      const admin = await User.findOne({ email: 'admin@society.com' });
      
      const departments = [
        {
          name: 'Administration',
          code: 'ADMIN',
          description: 'Administrative and management tasks',
          budget: { annual: 500000, spent: 0, currency: 'INR' },
          workingHours: { start: '09:00', end: '18:00', workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
          responsibilities: ['Administration', 'Management', 'Coordination'],
          isActive: true,
          createdBy: admin._id
        },
        {
          name: 'Security',
          code: 'SEC',
          description: 'Security and safety management',
          budget: { annual: 360000, spent: 0, currency: 'INR' },
          workingHours: { start: '00:00', end: '23:59', workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
          responsibilities: ['Security', 'Safety', 'Surveillance'],
          isActive: true,
          createdBy: admin._id
        },
        {
          name: 'Maintenance',
          code: 'MAINT',
          description: 'Facility maintenance and repairs',
          budget: { annual: 480000, spent: 0, currency: 'INR' },
          workingHours: { start: '08:00', end: '17:00', workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
          responsibilities: ['Maintenance', 'Repairs', 'Facility Management'],
          isActive: true,
          createdBy: admin._id
        }
      ];

      const createdDepartments = await Department.insertMany(departments);
      console.log('✅ Sample departments created');

      // Create staff members
      const staffCount = await Staff.countDocuments();
      if (staffCount === 0) {
        const sampleStaff = [
          {
            employeeId: 'EMP001',
            personalInfo: {
              firstName: 'John',
              lastName: 'Manager',
              email: 'john.manager@society.com',
              phone: '9876543210',
              address: {
                street: '123 Admin Block',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400001'
              },
              dateOfBirth: new Date('1985-05-15'),
              gender: 'Male'
            },
            department: createdDepartments[0]._id,
            employment: {
              position: 'General Manager',
              dateOfJoining: new Date('2020-01-15'),
              employmentType: 'full-time',
              status: 'active',
              workingHours: { start: '09:00', end: '18:00' }
            },
            salary: {
              basic: 50000,
              allowances: { hra: 15000, transport: 5000 },
              deductions: { pf: 5000, tax: 8000 }
            },
            documents: {
              aadhar: '123456789012',
              pan: 'ABCDE1234F'
            }
          },
          {
            employeeId: 'EMP002',
            personalInfo: {
              firstName: 'Security',
              lastName: 'Chief',
              email: 'security.chief@society.com',
              phone: '9876543211',
              address: {
                street: '456 Security Block',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400001'
              },
              dateOfBirth: new Date('1980-03-20'),
              gender: 'Male'
            },
            department: createdDepartments[1]._id,
            employment: {
              position: 'Security Chief',
              dateOfJoining: new Date('2019-06-01'),
              employmentType: 'full-time',
              status: 'active',
              workingHours: { start: '09:00', end: '21:00' }
            },
            salary: {
              basic: 35000,
              allowances: { hra: 10000, transport: 3000 },
              deductions: { pf: 3500, tax: 5000 }
            },
            documents: {
              aadhar: '123456789013',
              pan: 'BCDEF1234G'
            }
          }
        ];

        await Staff.insertMany(sampleStaff);
        console.log('✅ Sample staff created');
      }
    }

    // Create support contacts
    const supportContactCount = await SupportContact.countDocuments();
    if (supportContactCount === 0) {
      const admin = await User.findOne({ email: 'admin@society.com' });
      const supportContacts = [
        {
          name: 'IT Support Manager',
          designation: 'Senior IT Manager',
          department: 'Administration',
          category: 'services',
          email: 'it.support@society.com',
          phone: '9876543220',
          availability: 'Monday-Friday 9:00 AM - 6:00 PM',
          floor: 'Ground Floor, Admin Office',
          isActive: true,
          createdBy: admin._id
        },
        {
          name: 'Maintenance Supervisor',
          designation: 'Maintenance Head',
          department: 'Maintenance',
          category: 'maintenance',
          email: 'maintenance.head@society.com',
          phone: '9876543221',
          availability: 'Monday-Saturday 8:00 AM - 5:00 PM',
          floor: 'Basement, Maintenance Office',
          isActive: true,
          createdBy: admin._id
        },
        {
          name: 'Security Head',
          designation: 'Chief Security Officer',
          department: 'Security',
          category: 'security',
          email: 'security@society.com',
          phone: '9876543222',
          availability: '24/7 Emergency Contact',
          floor: 'Ground Floor, Security Cabin',
          emergencyOnly: true,
          isActive: true,
          createdBy: admin._id
        },
        {
          name: 'Finance Manager',
          designation: 'Accounts Manager',
          department: 'Finance',
          category: 'finance',
          email: 'finance@society.com',
          phone: '9876543223',
          availability: 'Monday-Friday 10:00 AM - 5:00 PM',
          floor: 'First Floor, Accounts Office',
          isActive: true,
          createdBy: admin._id
        }
      ];

      await SupportContact.insertMany(supportContacts);
      console.log('✅ Sample support contacts created');
    }

    // Create emergency contacts
    const emergencyContactCount = await EmergencyContact.countDocuments();
    if (emergencyContactCount === 0) {
      const admin = await User.findOne({ email: 'admin@society.com' });
      const emergencyContacts = [
        {
          service: 'Police',
          number: '100',
          alternateNumber: '112',
          description: 'Local police station for emergency assistance',
          responseTime: '10-15 minutes',
          availability: '24/7',
          priority: 'critical',
          isActive: true,
          createdBy: admin._id
        },
        {
          service: 'Fire Department',
          number: '101',
          alternateNumber: '112',
          description: 'Fire emergency and rescue services',
          responseTime: '8-12 minutes',
          availability: '24/7',
          priority: 'critical',
          isActive: true,
          createdBy: admin._id
        },
        {
          service: 'Medical Emergency',
          number: '108',
          alternateNumber: '102',
          description: 'Ambulance and medical emergency services',
          responseTime: '12-20 minutes',
          availability: '24/7',
          priority: 'critical',
          isActive: true,
          createdBy: admin._id
        },
        {
          service: 'Gas Emergency',
          number: '1906',
          alternateNumber: '18002333555',
          description: 'Gas leak and emergency response',
          responseTime: '15-30 minutes',
          availability: '24/7',
          priority: 'high',
          isActive: true,
          createdBy: admin._id
        },
        {
          service: 'Society Security',
          number: '9876543222',
          alternateNumber: '9876543333',
          description: 'Internal society security team',
          responseTime: '2-5 minutes',
          availability: '24/7',
          priority: 'high',
          isActive: true,
          createdBy: admin._id
        }
      ];

      await EmergencyContact.insertMany(emergencyContacts);
      console.log('✅ Sample emergency contacts created');
    }

    // Create vendors
    const vendorCount = await Vendor.countDocuments();
    if (vendorCount === 0) {
      const admin = await User.findOne({ email: 'admin@society.com' });
      const vendors = [
        {
          name: 'Grocery Vendor',
          businessName: 'Fresh Mart Supplies',
          description: 'Fresh groceries and daily essentials',
          category: 'Groceries',
          contact: {
            phone: '9876543230',
            email: 'freshmart@supplies.com'
          },
          address: {
            street: '123 Market Street',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400001'
          },
          operatingHours: {
            monday: { open: '08:00', close: '20:00', isOpen: true },
            tuesday: { open: '08:00', close: '20:00', isOpen: true },
            wednesday: { open: '08:00', close: '20:00', isOpen: true },
            thursday: { open: '08:00', close: '20:00', isOpen: true },
            friday: { open: '08:00', close: '20:00', isOpen: true },
            saturday: { open: '08:00', close: '20:00', isOpen: true },
            sunday: { open: '10:00', close: '18:00', isOpen: true }
          },
          verification: { isVerified: true },
          status: 'active',
          createdBy: admin._id
        }
      ];

      const createdVendors = await Vendor.insertMany(vendors);
      console.log('✅ Sample vendors created');

      // Create products
      const productCount = await Product.countDocuments();
      if (productCount === 0) {
        const admin = await User.findOne({ email: 'admin@society.com' });
        const products = [
          {
            name: 'Organic Rice',
            description: 'Premium quality organic basmati rice',
            category: 'Groceries',
            vendor: createdVendors[0]._id,
            price: 150,
            currency: 'INR',
            inventory: { 
              stock: 100, 
              unit: 'kg',
              minimumStock: 10
            },
            images: [{ 
              url: 'rice1.jpg', 
              alt: 'Organic Basmati Rice',
              isPrimary: true 
            }],
            tags: ['organic', 'basmati', 'premium'],
            isActive: true,
            createdBy: admin._id
          },
          {
            name: 'Fresh Vegetables Bundle',
            description: 'Daily fresh vegetables package',
            category: 'Groceries',
            vendor: createdVendors[0]._id,
            price: 200,
            currency: 'INR',
            inventory: { 
              stock: 50, 
              unit: 'pack',
              minimumStock: 5
            },
            images: [{ 
              url: 'vegetables1.jpg', 
              alt: 'Fresh Vegetables Bundle',
              isPrimary: true 
            }],
            tags: ['fresh', 'vegetables', 'daily'],
            isActive: true,
            createdBy: admin._id
          }
        ];

        await Product.insertMany(products);
        console.log('✅ Sample products created');
      }
    }

    // Create co-curricular activities
    const activityCount = await CoCurricularActivity.countDocuments();
    if (activityCount === 0) {
      const admin = await User.findOne({ email: 'admin@society.com' });
      const activities = [
        {
          title: 'Yoga Classes',
          description: 'Daily yoga sessions for all age groups',
          category: 'Fitness',
          type: 'class',
          ageGroups: ['Adults (18-59)', 'Seniors (60+)'],
          instructor: {
            name: 'Yoga Master',
            qualification: 'Certified Yoga Instructor',
            experience: '10 years',
            specialization: ['Hatha Yoga', 'Pranayama'],
            contact: {
              phone: '9876543240',
              email: 'yoga@society.com'
            }
          },
          schedule: {
            startDate: new Date(),
            frequency: 'daily',
            timings: [
              { day: 'Monday', startTime: '06:00', endTime: '07:00' },
              { day: 'Tuesday', startTime: '06:00', endTime: '07:00' },
              { day: 'Wednesday', startTime: '06:00', endTime: '07:00' },
              { day: 'Thursday', startTime: '06:00', endTime: '07:00' },
              { day: 'Friday', startTime: '06:00', endTime: '07:00' }
            ]
          },
          venue: {
            location: 'Community Hall',
            capacity: 30,
            facilities: ['Yoga mats', 'Sound system']
          },
          fees: {
            amount: 1000,
            type: 'monthly'
          },
          enrollment: {
            maxParticipants: 30,
            currentEnrollment: 0
          },
          status: 'registration-open',
          createdBy: admin._id
        }
      ];

      await CoCurricularActivity.insertMany(activities);
      console.log('✅ Sample co-curricular activities created');
    }

    // Create system configurations
    const configCount = await SystemConfig.countDocuments();
    if (configCount === 0) {
      const systemConfigs = [
        {
          category: 'general',
          key: 'society_name',
          value: 'Green Valley Society',
          description: 'Name of the society',
          dataType: 'string',
          isEditable: true,
          isVisible: true
        },
        {
          category: 'general',
          key: 'max_visitors_per_day',
          value: 100,
          description: 'Maximum number of visitors allowed per day',
          dataType: 'number',
          isEditable: true,
          isVisible: true,
          validation: { minValue: 50, maxValue: 500 }
        },
        {
          category: 'security',
          key: 'session_timeout',
          value: 30,
          description: 'Session timeout in minutes',
          dataType: 'number',
          isEditable: true,
          isVisible: true,
          validation: { minValue: 15, maxValue: 120 }
        }
      ];

      await SystemConfig.insertMany(systemConfigs);
      console.log('✅ Sample system configurations created');
    }

    // Create theme configuration
    const themeCount = await ThemeConfig.countDocuments();
    if (themeCount === 0) {
      const admin = await User.findOne({ email: 'admin@society.com' });
      const themeConfig = {
        name: 'Default Theme',
        description: 'Default application theme',
        isDefault: true,
        isActive: true,
        colors: {
          primary: '#3B82F6',
          secondary: '#6B7280',
          accent: '#10B981',
          background: '#F9FAFB',
          surface: '#FFFFFF',
          text: { primary: '#111827', secondary: '#6B7280' },
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6'
        },
        typography: {
          fontFamily: 'Inter, sans-serif',
          fontSize: { small: '14px', medium: '16px', large: '18px', xlarge: '24px' },
          fontWeight: { light: 300, normal: 400, bold: 600 }
        },
        layout: {
          borderRadius: '8px',
          spacing: '16px',
          shadows: true,
          animations: true
        },
        createdBy: admin._id
      };

      await ThemeConfig.create(themeConfig);
      console.log('✅ Default theme configuration created');
    }

    // Create email templates
    const emailTemplateCount = await EmailTemplate.countDocuments();
    if (emailTemplateCount === 0) {
      const admin = await User.findOne({ email: 'admin@society.com' });
      const emailTemplates = [
        {
          name: 'Welcome Email',
          description: 'Welcome email for new members',
          category: 'welcome',
          subject: 'Welcome to {{society_name}}!',
          htmlContent: `
            <h1>Welcome to {{society_name}}!</h1>
            <p>Dear {{member_name}},</p>
            <p>We are pleased to welcome you to our society. Your registration has been completed successfully.</p>
            <p>Best regards,<br>Management Team</p>
          `,
          textContent: 'Welcome to {{society_name}}! Dear {{member_name}}, We are pleased to welcome you to our society.',
          variables: [
            { name: 'society_name', description: 'Name of the society', required: true },
            { name: 'member_name', description: 'Name of the member', required: true }
          ],
          isActive: true,
          isDefault: true,
          createdBy: admin._id
        },
        {
          name: 'Maintenance Reminder',
          description: 'Monthly maintenance fee reminder',
          category: 'reminder',
          subject: 'Maintenance Fee Reminder - {{month}}',
          htmlContent: `
            <h1>Maintenance Fee Reminder</h1>
            <p>Dear {{member_name}},</p>
            <p>This is a reminder that your maintenance fee of ₹{{amount}} for {{month}} is due.</p>
            <p>Please make the payment at your earliest convenience.</p>
            <p>Thank you!</p>
          `,
          variables: [
            { name: 'member_name', description: 'Name of the member', required: true },
            { name: 'amount', description: 'Maintenance amount', required: true },
            { name: 'month', description: 'Month and year', required: true }
          ],
          isActive: true,
          isDefault: true,
          createdBy: admin._id
        }
      ];

      await EmailTemplate.insertMany(emailTemplates);
      console.log('✅ Sample email templates created');
    }

    // Seed transaction data
    const transactionCount = await Transaction.countDocuments();
    if (transactionCount === 0) {
      const admin = await User.findOne({ email: 'admin@society.com' });
      
      if (admin) {
        // Sample transactions for realistic financial data
        const sampleTransactions = [
          // Income transactions - Maintenance fees
          {
            type: 'income',
            category: 'maintenance',
            amount: 15000,
            description: 'Monthly maintenance fee - Building 1, Block A',
            date: new Date('2024-12-01'),
            paymentMethod: 'bank_transfer',
            buildingNumber: 1,
            blockNumber: 1,
            flatNumber: 'A101',
            receiptNumber: 'RCP001001',
            status: 'completed',
            createdBy: admin._id
          },
          {
            type: 'income',
            category: 'maintenance',
            amount: 15000,
            description: 'Monthly maintenance fee - Building 1, Block A',
            date: new Date('2024-12-02'),
            paymentMethod: 'online',
            buildingNumber: 1,
            blockNumber: 1,
            flatNumber: 'A102',
            receiptNumber: 'RCP001002',
            status: 'completed',
            createdBy: admin._id
          },
          {
            type: 'income',
            category: 'maintenance',
            amount: 18000,
            description: 'Monthly maintenance fee - Building 1, Block B',
            date: new Date('2024-12-03'),
            paymentMethod: 'upi',
            buildingNumber: 1,
            blockNumber: 2,
            flatNumber: 'B201',
            receiptNumber: 'RCP001003',
            status: 'completed',
            createdBy: admin._id
          },
          {
            type: 'income',
            category: 'maintenance',
            amount: 16500,
            description: 'Monthly maintenance fee - Building 2, Block A',
            date: new Date('2024-12-04'),
            paymentMethod: 'cash',
            buildingNumber: 2,
            blockNumber: 1,
            flatNumber: 'A301',
            receiptNumber: 'RCP001004',
            status: 'completed',
            createdBy: admin._id
          },
          {
            type: 'income',
            category: 'maintenance',
            amount: 17000,
            description: 'Monthly maintenance fee - Building 2, Block B',
            date: new Date('2024-12-05'),
            paymentMethod: 'bank_transfer',
            buildingNumber: 2,
            blockNumber: 2,
            flatNumber: 'B302',
            receiptNumber: 'RCP001005',
            status: 'completed',
            createdBy: admin._id
          },
          // Penalty income
          {
            type: 'income',
            category: 'penalty',
            amount: 500,
            description: 'Late payment penalty - Maintenance fee',
            date: new Date('2024-12-06'),
            paymentMethod: 'online',
            buildingNumber: 1,
            blockNumber: 1,
            flatNumber: 'A103',
            receiptNumber: 'RCP001006',
            status: 'completed',
            createdBy: admin._id
          },
          // Festive contribution
          {
            type: 'income',
            category: 'festive',
            amount: 2000,
            description: 'New Year celebration fund contribution',
            date: new Date('2024-12-10'),
            paymentMethod: 'upi',
            buildingNumber: 1,
            blockNumber: 2,
            flatNumber: 'B202',
            receiptNumber: 'RCP001007',
            status: 'completed',
            createdBy: admin._id
          },
          {
            type: 'income',
            category: 'festive',
            amount: 1500,
            description: 'New Year celebration fund contribution',
            date: new Date('2024-12-12'),
            paymentMethod: 'cash',
            buildingNumber: 2,
            blockNumber: 1,
            flatNumber: 'A302',
            receiptNumber: 'RCP001008',
            status: 'completed',
            createdBy: admin._id
          },

          // Expense transactions - Utilities
          {
            type: 'expense',
            category: 'utility',
            amount: 8500,
            description: 'Electricity bill - Common areas and street lights',
            date: new Date('2024-12-07'),
            paymentMethod: 'online',
            vendorName: 'State Electricity Board',
            vendorContact: '+91-1800-123-4567',
            invoiceNumber: 'INV-ELE-001',
            status: 'completed',
            createdBy: admin._id
          },
          {
            type: 'expense',
            category: 'utility',
            amount: 3200,
            description: 'Water supply bill - Society water connection',
            date: new Date('2024-12-08'),
            paymentMethod: 'bank_transfer',
            vendorName: 'Municipal Water Department',
            vendorContact: '+91-1800-234-5678',
            invoiceNumber: 'INV-WAT-001',
            status: 'completed',
            createdBy: admin._id
          },
          {
            type: 'expense',
            category: 'utility',
            amount: 1800,
            description: 'Internet and cable connection for common areas',
            date: new Date('2024-12-09'),
            paymentMethod: 'online',
            vendorName: 'Fiber Net Services',
            vendorContact: '+91-9876543210',
            invoiceNumber: 'INV-NET-001',
            status: 'completed',
            createdBy: admin._id
          },

          // Maintenance and repair expenses
          {
            type: 'expense',
            category: 'repair',
            amount: 12000,
            description: 'Elevator maintenance and repair - Building 1',
            date: new Date('2024-12-11'),
            paymentMethod: 'cheque',
            vendorName: 'Otis Elevator Services',
            vendorContact: '+91-9123456789',
            invoiceNumber: 'INV-ELV-001',
            status: 'completed',
            createdBy: admin._id
          },
          {
            type: 'expense',
            category: 'repair',
            amount: 5500,
            description: 'Plumbing repair - Common area washrooms',
            date: new Date('2024-12-13'),
            paymentMethod: 'cash',
            vendorName: 'Quick Fix Plumbers',
            vendorContact: '+91-9234567890',
            invoiceNumber: 'INV-PLB-001',
            status: 'completed',
            createdBy: admin._id
          },
          {
            type: 'expense',
            category: 'repair',
            amount: 3800,
            description: 'Painting work - Society entrance gate',
            date: new Date('2024-12-14'),
            paymentMethod: 'bank_transfer',
            vendorName: 'Color Perfect Painters',
            vendorContact: '+91-9345678901',
            invoiceNumber: 'INV-PNT-001',
            status: 'completed',
            createdBy: admin._id
          },

          // Security and cleaning expenses
          {
            type: 'expense',
            category: 'security',
            amount: 25000,
            description: 'Security guard salary - December 2024',
            date: new Date('2024-12-15'),
            paymentMethod: 'bank_transfer',
            vendorName: 'SecureGuard Services',
            vendorContact: '+91-9456789012',
            invoiceNumber: 'INV-SEC-001',
            status: 'completed',
            createdBy: admin._id
          },
          {
            type: 'expense',
            category: 'cleaning',
            amount: 8000,
            description: 'Housekeeping and cleaning staff salary',
            date: new Date('2024-12-16'),
            paymentMethod: 'cash',
            vendorName: 'CleanPro Services',
            vendorContact: '+91-9567890123',
            invoiceNumber: 'INV-CLN-001',
            status: 'completed',
            createdBy: admin._id
          },

          // Gardening and landscaping
          {
            type: 'expense',
            category: 'gardening',
            amount: 6500,
            description: 'Garden maintenance and new plant installation',
            date: new Date('2024-12-17'),
            paymentMethod: 'online',
            vendorName: 'Green Thumb Landscaping',
            vendorContact: '+91-9678901234',
            invoiceNumber: 'INV-GRD-001',
            status: 'completed',
            createdBy: admin._id
          },

          // Office supplies and miscellaneous
          {
            type: 'expense',
            category: 'purchase',
            amount: 2200,
            description: 'Office stationery and supplies',
            date: new Date('2024-12-18'),
            paymentMethod: 'card',
            vendorName: 'Office Mart',
            vendorContact: '+91-9789012345',
            invoiceNumber: 'INV-OFF-001',
            status: 'completed',
            createdBy: admin._id
          },
          {
            type: 'expense',
            category: 'purchase',
            amount: 4800,
            description: 'Cleaning supplies and equipment',
            date: new Date('2024-12-19'),
            paymentMethod: 'upi',
            vendorName: 'Hygiene Solutions',
            vendorContact: '+91-9890123456',
            invoiceNumber: 'INV-HYG-001',
            status: 'completed',
            createdBy: admin._id
          },

          // Festive expenses
          {
            type: 'expense',
            category: 'festive',
            amount: 8500,
            description: 'New Year celebration decorations and arrangements',
            date: new Date('2024-12-20'),
            paymentMethod: 'bank_transfer',
            vendorName: 'Festive Events Co.',
            vendorContact: '+91-9901234567',
            invoiceNumber: 'INV-FES-001',
            status: 'completed',
            createdBy: admin._id
          },

          // January 2025 transactions
          {
            type: 'income',
            category: 'maintenance',
            amount: 15000,
            description: 'Monthly maintenance fee - Building 1, Block A',
            date: new Date('2025-01-02'),
            paymentMethod: 'bank_transfer',
            buildingNumber: 1,
            blockNumber: 1,
            flatNumber: 'A101',
            receiptNumber: 'RCP002001',
            status: 'completed',
            createdBy: admin._id
          },
          {
            type: 'income',
            category: 'maintenance',
            amount: 15000,
            description: 'Monthly maintenance fee - Building 1, Block A',
            date: new Date('2025-01-03'),
            paymentMethod: 'upi',
            buildingNumber: 1,
            blockNumber: 1,
            flatNumber: 'A102',
            receiptNumber: 'RCP002002',
            status: 'completed',
            createdBy: admin._id
          },
          {
            type: 'income',
            category: 'maintenance',
            amount: 18000,
            description: 'Monthly maintenance fee - Building 1, Block B',
            date: new Date('2025-01-04'),
            paymentMethod: 'online',
            buildingNumber: 1,
            blockNumber: 2,
            flatNumber: 'B201',
            receiptNumber: 'RCP002003',
            status: 'completed',
            createdBy: admin._id
          },

          // Some pending transactions for current month
          {
            type: 'income',
            category: 'maintenance',
            amount: 16500,
            description: 'Monthly maintenance fee - Building 2, Block A (Pending)',
            date: new Date('2025-01-05'),
            paymentMethod: 'bank_transfer',
            buildingNumber: 2,
            blockNumber: 1,
            flatNumber: 'A301',
            receiptNumber: 'RCP002004',
            status: 'pending',
            remarks: 'Payment confirmation pending from bank',
            createdBy: admin._id
          },

          // Current month expenses
          {
            type: 'expense',
            category: 'utility',
            amount: 9200,
            description: 'Electricity bill - January 2025',
            date: new Date('2025-01-06'),
            paymentMethod: 'online',
            vendorName: 'State Electricity Board',
            vendorContact: '+91-1800-123-4567',
            invoiceNumber: 'INV-ELE-002',
            status: 'completed',
            createdBy: admin._id
          },
          {
            type: 'expense',
            category: 'cleaning',
            amount: 8500,
            description: 'Cleaning service contract - January 2025',
            date: new Date('2025-01-08'),
            paymentMethod: 'bank_transfer',
            vendorName: 'CleanPro Services',
            vendorContact: '+91-9567890123',
            invoiceNumber: 'INV-CLN-002',
            status: 'completed',
            createdBy: admin._id
          }
        ];

        await Transaction.insertMany(sampleTransactions);
        console.log('✅ Sample financial transactions created');
      }
    } else {
      console.log('ℹ️ Transactions already exist');
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('👤 Admin: admin@society.com / admin123');
    console.log('🔐 Watchman: watchman@society.com / watchman123');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
