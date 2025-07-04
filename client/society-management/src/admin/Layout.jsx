import React, { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import './Layout.css'
import { motion } from 'framer-motion'
import {
  Home, Settings, Building2, Users, Bell, Activity, Heart, FileText, UserCircle2, ShieldCheck, ShoppingCart, Phone, BarChart, Wrench, AlertTriangle, BookOpenText, DoorOpen, Search, Menu, X, LogOut
} from 'lucide-react'

const navItems = [
  { name: 'Home', icon: Home, path: '/app/admin/' },
  { name: 'Accounts', icon: UserCircle2, path: '/app/admin/accounts' },
  { name: 'Building Mgmt', icon: Building2, path: '/app/admin/buildingmanagement' },
  { name: 'Admin Settings', icon: Settings, path: '/app/admin/adminsettings' },
  { name: 'Co-Curricular', icon: BookOpenText, path: '/app/admin/cocurricular' },
  { name: 'Complaints & Feedback', icon: AlertTriangle, path: '/app/admin/complaintsfeedback' },
  { name: 'Events & Activities', icon: Activity, path: '/app/admin/eventsactivities' },
  { name: 'Health', icon: Heart, path: '/app/admin/health' },
  { name: 'Maintenance & Rent', icon: Wrench, path: '/app/admin/maintenancerent' },
  { name: 'Notices & Communication', icon: Bell, path: '/app/admin/noticescommunication' },
  { name: 'Members', icon: Users, path: '/app/admin/members' },
  { name: 'Reports & Analysis', icon: BarChart, path: '/app/admin/reportsanalysis' },
  { name: 'Services', icon: FileText, path: '/app/admin/services' },
  { name: 'Shopping', icon: ShoppingCart, path: '/app/admin/shopping' },
  { name: 'Staff Management', icon: ShieldCheck, path: '/app/admin/staffmanagement' },
  { name: 'System Security', icon: ShieldCheck, path: '/app/admin/systemsecurity' },
  { name: 'Support Contacts', icon: Phone, path: '/app/admin/supportcontacts' },
  { name: 'Visitors', icon: DoorOpen, path: '/app/admin/visitors' },
]

export default function Layout() {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNavItems = navItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300"
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </motion.button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300, opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: 1,
          translateX: isSidebarOpen || window.innerWidth >= 768 ? 0 : -300
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        className={`w-72 bg-white/10 backdrop-blur-2xl border-r border-white/20 shadow-2xl p-6 space-y-6 overflow-y-auto z-40 ${
          isSidebarOpen ? 'fixed inset-y-0 left-0' : 'hidden'
        } md:block md:relative md:translate-x-0 scrollbar-none`}
      >
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-2xl mb-4 animate-bounceIn">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Smart Society</h2>
          <p className="text-blue-200/80 text-sm">Admin Dashboard</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative mb-6"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 hover:bg-white/10 text-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-blue-400" />
            </div>
          </div>
        </motion.div>

        {/* Navigation Items */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.03,
              },
            },
          }}
          className="space-y-2"
        >
          {filteredNavItems.map(({ name, icon: Icon, path }, index) => (
            <motion.div
              key={name}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            >
              <Link
                to={path}
                onClick={() => setIsSidebarOpen(false)}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  location.pathname === path 
                    ? 'bg-gradient-to-r from-blue-600/50 to-indigo-600/50 text-white shadow-lg border border-blue-400/30' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 transition-colors duration-300 ${
                  location.pathname === path ? 'text-blue-300' : 'text-white/70 group-hover:text-white'
                }`} />
                <span className="truncate">{name}</span>
                {location.pathname === path && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-2 w-2 h-2 bg-blue-400 rounded-full"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Admin Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 pt-6 border-t border-white/20"
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
            <img
              src="https://i.pravatar.cc/40"
              alt="Admin"
              className="h-10 w-10 rounded-full border-2 border-blue-400/50 shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex-1">
              <p className="text-white text-sm font-medium">Admin User</p>
              <p className="text-blue-200/60 text-xs">admin@society.com</p>
            </div>
            <LogOut className="h-4 w-4 text-white/60 group-hover:text-red-400 transition-colors duration-300" />
          </div>
        </motion.div>
      </motion.aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-2xl px-6 py-4 flex justify-between items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold text-white mb-1">
                Society Name
              </h1>
              <p className="text-blue-200/80 text-sm">
                Welcome back, manage your society efficiently
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Notifications */}
            <div className="relative">
              <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group">
                <Bell className="h-5 w-5 text-white group-hover:text-blue-300" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>
            </div>

            {/* Settings */}
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group">
              <Settings className="h-5 w-5 text-white group-hover:text-blue-300" />
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 bg-white/10 rounded-full pl-3 pr-1 py-1 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
              <span className="text-white text-sm font-medium hidden sm:block">Admin</span>
              <img
                src="https://i.pravatar.cc/32"
                alt="User"
                className="h-8 w-8 rounded-full border-2 border-white/30 shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </motion.div>
        </motion.header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-white transition-all duration-500 hover:shadow-blue-500/20 min-h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-bounceIn {
          animation: bounceIn 0.8s ease-out;
        }
        
        .scrollbar-none {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}