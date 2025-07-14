import React, { useState } from 'react'
import SlideNavbar from '../Navbar.jsx'
import '../AdminTheme.css'
import { 
  BarChart, 
  Users, 
  IndianRupee, 
  Building2, 
  AlertCircle, 
  Calendar,
  FileText,
  Settings,
  MessageSquare,
  Shield
} from 'lucide-react'

const Home = () => {
  const [activeTab, setActiveTab] = useState('overview')

  // Define navigation items for society management dashboard
  const navItems = [
    { id: 'overview', name: 'Dashboard Overview', icon: BarChart },
    { id: 'residents', name: 'Residents', icon: Users },
    { id: 'finances', name: 'Finances', icon: IndianRupee },
    { id: 'facilities', name: 'Facilities', icon: Building2 },
    { id: 'complaints', name: 'Complaints', icon: AlertCircle, badge: '5' },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'notices', name: 'Notices', icon: MessageSquare },
    { id: 'reports', name: 'Reports', icon: FileText },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'settings', name: 'Settings', icon: Settings },
  ]

  const handleNavClick = (item) => {
    setActiveTab(item.id)
    console.log('Clicked on:', item.name)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="p-6 space-y-6">
            {/* Welcome Header */}
            <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
              <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Society Management Dashboard
              </h1>
              <p className="text-gray-400 mt-2">Welcome to your comprehensive society management system</p>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Residents</p>
                    <p className="text-2xl font-bold text-white">342</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-white">₹2,85,000</p>
                  </div>
                  <IndianRupee className="h-8 w-8 text-green-400" />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Complaints</p>
                    <p className="text-2xl font-bold text-white">5</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-400" />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Upcoming Events</p>
                    <p className="text-2xl font-bold text-white">3</p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-400" />
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Recent Activities</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">New resident registered - Apartment 3B</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">Maintenance payment received - Block A</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300">Security system updated</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-blue-500/20 border border-blue-500/30 text-blue-300 p-3 rounded-lg hover:bg-blue-500/30 transition-all duration-300">
                    Add Notice
                  </button>
                  <button className="bg-green-500/20 border border-green-500/30 text-green-300 p-3 rounded-lg hover:bg-green-500/30 transition-all duration-300">
                    Collect Payment
                  </button>
                  <button className="bg-purple-500/20 border border-purple-500/30 text-purple-300 p-3 rounded-lg hover:bg-purple-500/30 transition-all duration-300">
                    Schedule Event
                  </button>
                  <button className="bg-orange-500/20 border border-orange-500/30 text-orange-300 p-3 rounded-lg hover:bg-orange-500/30 transition-all duration-300">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'residents':
        return (
          <div className="p-6 space-y-6">
            <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
              <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Resident Management
              </h1>
              <p className="text-gray-400 mt-2">Manage all society residents and their information</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Resident Directory</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Rajesh Kumar', apartment: '2A', status: 'Active', contact: '+91 98765 43210' },
                    { name: 'Priya Sharma', apartment: '3B', status: 'Active', contact: '+91 98765 43211' },
                    { name: 'Amit Patel', apartment: '1C', status: 'Pending', contact: '+91 98765 43212' },
                    { name: 'Sneha Gupta', apartment: '4A', status: 'Active', contact: '+91 98765 43213' },
                  ].map((resident, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{resident.name}</p>
                        <p className="text-gray-400 text-sm">Apartment {resident.apartment}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          resident.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {resident.status}
                        </span>
                        <p className="text-gray-400 text-sm mt-1">{resident.contact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Building Occupancy</h3>
                <div className="space-y-4">
                  {[
                    { building: 'Block A', occupied: 85, total: 100 },
                    { building: 'Block B', occupied: 92, total: 100 },
                    { building: 'Block C', occupied: 78, total: 90 },
                  ].map((block, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white">{block.building}</span>
                        <span className="text-gray-400">{block.occupied}/{block.total}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${(block.occupied / block.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'finances':
        return (
          <div className="p-6 space-y-6">
            <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
              <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Financial Overview
              </h1>
              <p className="text-gray-400 mt-2">Track society finances, maintenance collections, and expenses</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Monthly Collection</h3>
                <p className="text-3xl font-bold text-green-400">₹2,85,000</p>
                <p className="text-gray-400 text-sm mt-2">95% collection rate</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Monthly Expenses</h3>
                <p className="text-3xl font-bold text-red-400">₹1,95,000</p>
                <p className="text-gray-400 text-sm mt-2">Utilities, security, maintenance</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Net Balance</h3>
                <p className="text-3xl font-bold text-blue-400">₹90,000</p>
                <p className="text-gray-400 text-sm mt-2">Available for investments</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                {[
                  { type: 'income', desc: 'Maintenance Collection - Block A', amount: '+₹45,000', date: '2025-01-12' },
                  { type: 'expense', desc: 'Security Services Payment', amount: '-₹25,000', date: '2025-01-11' },
                  { type: 'income', desc: 'Parking Fee Collection', amount: '+₹8,500', date: '2025-01-10' },
                  { type: 'expense', desc: 'Electricity Bill Payment', amount: '-₹35,000', date: '2025-01-09' },
                ].map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{transaction.desc}</p>
                      <p className="text-gray-400 text-sm">{transaction.date}</p>
                    </div>
                    <span className={`font-bold ${
                      transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'facilities':
        return (
          <div className="p-6 space-y-6">
            <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
              <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Facility Management
              </h1>
              <p className="text-gray-400 mt-2">Monitor and manage society amenities and infrastructure</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Swimming Pool', status: 'Operational', maintenance: 'Weekly', nextService: '2025-01-20' },
                { name: 'Gymnasium', status: 'Operational', maintenance: 'Daily', nextService: '2025-01-15' },
                { name: 'Community Hall', status: 'Booked', maintenance: 'Monthly', nextService: '2025-01-25' },
                { name: 'Children\'s Park', status: 'Under Repair', maintenance: 'Weekly', nextService: '2025-01-18' },
                { name: 'Security Office', status: 'Operational', maintenance: 'Daily', nextService: '2025-01-14' },
                { name: 'Parking Area', status: 'Operational', maintenance: 'Weekly', nextService: '2025-01-22' },
              ].map((facility, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">{facility.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      facility.status === 'Operational' ? 'bg-green-500/20 text-green-300' :
                      facility.status === 'Booked' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {facility.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm">Maintenance: {facility.maintenance}</p>
                    <p className="text-gray-400 text-sm">Next Service: {facility.nextService}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'complaints':
        return (
          <div className="p-6 space-y-6">
            <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
              <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Complaint Management
              </h1>
              <p className="text-gray-400 mt-2">Track and resolve resident complaints efficiently</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <p className="text-gray-400 text-sm">Total Complaints</p>
                <p className="text-2xl font-bold text-white">23</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-2xl font-bold text-red-400">5</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <p className="text-gray-400 text-sm">In Progress</p>
                <p className="text-2xl font-bold text-yellow-400">8</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <p className="text-gray-400 text-sm">Resolved</p>
                <p className="text-2xl font-bold text-green-400">10</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recent Complaints</h3>
              <div className="space-y-3">
                {[
                  { id: '#C001', issue: 'Water leakage in common area', resident: 'Apt 2A', status: 'Pending', priority: 'High' },
                  { id: '#C002', issue: 'Elevator not working - Block B', resident: 'Apt 3C', status: 'In Progress', priority: 'High' },
                  { id: '#C003', issue: 'Noise complaint from neighbor', resident: 'Apt 1B', status: 'Resolved', priority: 'Medium' },
                  { id: '#C004', issue: 'Parking space issue', resident: 'Apt 4A', status: 'In Progress', priority: 'Low' },
                  { id: '#C005', issue: 'Garbage collection delay', resident: 'Apt 2C', status: 'Pending', priority: 'Medium' },
                ].map((complaint, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm">{complaint.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          complaint.priority === 'High' ? 'bg-red-500/20 text-red-300' :
                          complaint.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-blue-500/20 text-blue-300'
                        }`}>
                          {complaint.priority}
                        </span>
                      </div>
                      <p className="text-white font-medium mt-1">{complaint.issue}</p>
                      <p className="text-gray-400 text-sm">From: {complaint.resident}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      complaint.status === 'Resolved' ? 'bg-green-500/20 text-green-300' :
                      complaint.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {complaint.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'events':
        return (
          <div className="p-6 space-y-6">
            <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
              <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Event Management
              </h1>
              <p className="text-gray-400 mt-2">Organize and manage society events and activities</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Annual Sports Day', date: '2025-01-25', venue: 'Community Ground', participants: 45 },
                    { name: 'Cultural Night', date: '2025-02-14', venue: 'Community Hall', participants: 78 },
                    { name: 'Society AGM', date: '2025-02-28', venue: 'Conference Room', participants: 120 },
                  ].map((event, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium">{event.name}</h4>
                        <span className="text-blue-400 text-sm">{event.date}</span>
                      </div>
                      <p className="text-gray-400 text-sm">Venue: {event.venue}</p>
                      <p className="text-gray-400 text-sm">Participants: {event.participants}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Event Calendar</h3>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-gray-400 text-sm p-2">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 31 }, (_, i) => (
                    <div key={i + 1} className={`text-center p-2 text-sm rounded ${
                      [25, 14, 28].includes(i + 1) 
                        ? 'bg-blue-500/20 text-blue-300' 
                        : 'text-gray-400 hover:bg-white/5'
                    }`}>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'notices':
        return (
          <div className="p-6 space-y-6">
            <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
              <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Notice Board
              </h1>
              <p className="text-gray-400 mt-2">Manage society announcements and communications</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Active Notices</h3>
                <button className="bg-blue-500/20 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-all duration-300">
                  Create Notice
                </button>
              </div>
              
              <div className="space-y-4">
                {[
                  { 
                    title: 'Water Supply Maintenance', 
                    content: 'Water supply will be interrupted on 15th Jan from 10 AM to 4 PM for maintenance work.',
                    date: '2025-01-12',
                    priority: 'High',
                    category: 'Maintenance'
                  },
                  { 
                    title: 'Security Guidelines Update', 
                    content: 'New visitor registration process effective from 20th Jan. Please ensure all visitors are properly registered.',
                    date: '2025-01-10',
                    priority: 'Medium',
                    category: 'Security'
                  },
                  { 
                    title: 'Monthly Maintenance Due', 
                    content: 'Monthly maintenance fees for January are due by 25th Jan. Please make payments on time.',
                    date: '2025-01-08',
                    priority: 'Medium',
                    category: 'Finance'
                  },
                ].map((notice, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-500">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-medium">{notice.title}</h4>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          notice.priority === 'High' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {notice.priority}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-300">
                          {notice.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{notice.content}</p>
                    <p className="text-gray-400 text-xs">Posted on: {notice.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'reports':
        return (
          <div className="p-6 space-y-6">
            <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
              <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Reports & Analytics
              </h1>
              <p className="text-gray-400 mt-2">Generate comprehensive reports for society management</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Financial Report', desc: 'Monthly income and expense analysis', icon: '💰', action: 'Generate' },
                { title: 'Maintenance Report', desc: 'Collection status and pending payments', icon: '🔧', action: 'Generate' },
                { title: 'Occupancy Report', desc: 'Current occupancy and vacancy analysis', icon: '🏠', action: 'Generate' },
                { title: 'Complaint Report', desc: 'Summary of complaints and resolutions', icon: '📋', action: 'Generate' },
                { title: 'Event Report', desc: 'Participation and feedback analysis', icon: '🎉', action: 'Generate' },
                { title: 'Security Report', desc: 'Visitor logs and security incidents', icon: '🛡️', action: 'Generate' },
              ].map((report, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                  <div className="text-center mb-4">
                    <div className="text-3xl mb-2">{report.icon}</div>
                    <h3 className="text-lg font-bold text-white">{report.title}</h3>
                    <p className="text-gray-400 text-sm mt-2">{report.desc}</p>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 py-2 rounded-lg hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300">
                    {report.action} Report
                  </button>
                </div>
              ))}
            </div>
          </div>
        )

      case 'security':
        return (
          <div className="p-6 space-y-6">
            <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
              <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Security Management
              </h1>
              <p className="text-gray-400 mt-2">Monitor society security and access control</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Today's Visitor Log</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Deepak Singh', purpose: 'Delivery', apartment: '2A', time: '10:30 AM', status: 'Checked In' },
                    { name: 'Ravi Kumar', purpose: 'Guest Visit', apartment: '3B', time: '02:15 PM', status: 'Checked Out' },
                    { name: 'Service Technician', purpose: 'AC Repair', apartment: '1C', time: '03:45 PM', status: 'In Progress' },
                  ].map((visitor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{visitor.name}</p>
                        <p className="text-gray-400 text-sm">{visitor.purpose} - {visitor.apartment}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">{visitor.time}</p>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          visitor.status === 'Checked In' ? 'bg-blue-500/20 text-blue-300' :
                          visitor.status === 'Checked Out' ? 'bg-green-500/20 text-green-300' :
                          'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {visitor.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Security Status</h3>
                <div className="space-y-4">
                  {[
                    { system: 'Main Gate Camera', status: 'Online', lastCheck: '2 mins ago' },
                    { system: 'Parking Area Camera', status: 'Online', lastCheck: '5 mins ago' },
                    { system: 'Emergency Alarm', status: 'Active', lastCheck: '1 hour ago' },
                    { system: 'Security Guard', status: 'On Duty', lastCheck: 'Active' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{item.system}</p>
                        <p className="text-gray-400 text-sm">Last check: {item.lastCheck}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        item.status === 'Online' || item.status === 'Active' || item.status === 'On Duty'
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-red-500/20 text-red-300'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'settings':
        return (
          <div className="p-6 space-y-6">
            <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
              <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                System Settings
              </h1>
              <p className="text-gray-400 mt-2">Configure society management system preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Email Notifications</p>
                      <p className="text-gray-400 text-sm">Receive updates via email</p>
                    </div>
                    <button className="w-12 h-6 bg-blue-500 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">SMS Alerts</p>
                      <p className="text-gray-400 text-sm">Emergency notifications via SMS</p>
                    </div>
                    <button className="w-12 h-6 bg-blue-500 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Auto Backup</p>
                      <p className="text-gray-400 text-sm">Daily data backup</p>
                    </div>
                    <button className="w-12 h-6 bg-gray-600 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Society Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Society Name</label>
                    <input 
                      type="text" 
                      value="Green Valley Apartments" 
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Registration Number</label>
                    <input 
                      type="text" 
                      value="SOC/2020/001234" 
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Contact Email</label>
                    <input 
                      type="email" 
                      value="admin@greenvalley.com" 
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-white mb-2">Content Coming Soon</h3>
              <p className="text-gray-400">This section is under development</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="admin-container">
      <div className="admin-bg-elements"></div>
      <div className="admin-content">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Sliding Navbar */}
          <SlideNavbar
            navItems={navItems}
            activeItem={activeTab}
            onItemClick={handleNavClick}
            variant="glass"
            className="mb-8"
          />

          {/* Content Area */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home