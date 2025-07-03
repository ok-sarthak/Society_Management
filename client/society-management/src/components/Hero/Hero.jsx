import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      icon: "🏢",
      title: "Building Management",
      description: "Complete maintenance tracking and facility management"
    },
    {
      icon: "💰",
      title: "Financial Control",
      description: "Automated rent collection and expense tracking"
    },
    {
      icon: "📅",
      title: "Event Planning",
      description: "Organize community events and activities"
    },
    {
      icon: "👥",
      title: "Member Management",
      description: "Easy member registration and communication"
    }
  ];

  return (
    <>
      <div>
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-indigo-500 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/2 w-48 h-48 bg-purple-500 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Wave Separator */}
        <div className="absolute inset-x-0 bottom-0">
          <svg viewBox="0 0 224 12" fill="currentColor" className="-mb-1 w-full text-white" preserveAspectRatio="none">
            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z"></path>
          </svg>
        </div>
        
        <div className="relative mx-auto px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-8 lg:py-24 xl:py-32">
          <div className="relative max-w-5xl mx-auto text-center">
            <h1 className="mb-6 sm:mb-8 text-3xl sm:text-4xl pb-3 md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight">
              Society Management 
              <span className="block pb-3 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                System
              </span>
            </h1>
            <p className="mb-8 sm:mb-10 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Simplify your society's issue management with our intuitive platform. Track, manage, and resolve issues seamlessly, ensuring a harmonious community experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link
                className="w-full sm:w-auto group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-4 text-base sm:text-lg font-semibold text-white hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                to="/member/login"
              >
                Society Members
                <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"></path>
                </svg>
              </Link>
              <Link
                className="w-full sm:w-auto group inline-flex items-center justify-center rounded-xl bg-transparent border-2 border-indigo-400 px-8 py-4 text-base sm:text-lg font-semibold text-indigo-400 hover:bg-indigo-400 hover:text-white focus:ring-4 focus:ring-indigo-300 focus:outline-none transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                to="/admin/login"
              >
                Society Administration
                <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs with Parallax */}
        <div 
          className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl animate-pulse"
          style={{
            transform: `translateY(${scrollY * 0.1}px) translateX(${scrollY * 0.05}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute top-40 right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-xl animate-pulse" 
          style={{
            animationDelay: '2s',
            transform: `translateY(${scrollY * -0.15}px) translateX(${scrollY * -0.08}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute bottom-32 left-1/4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse" 
          style={{
            animationDelay: '4s',
            transform: `translateY(${scrollY * 0.12}px) translateX(${scrollY * -0.03}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-gray-900/70"></div>
      </div>

      {/* Enhanced Dynamic Mouse Follower */}
      <div 
        className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-300"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {/* Enhanced Badge */}
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30 mb-6 animate-pulse shadow-lg backdrop-blur-sm">
                <span className="text-cyan-300 text-sm font-medium">🏆 #1 Society Management Platform</span>
              </div>

              {/* Enhanced Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                  Transform Your
                </span>
                <br />
                <span className="text-white animate-pulse" style={{animationDelay: '0.5s'}}>
                  Society Management
                </span>
              </h1>

              {/* Enhanced Subtitle */}
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Complete digital solution for residential societies - from maintenance tracking to event planning, financial management to member communication.
              </p>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start mb-12">
                <Link
                  to="/member/login"
                  className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Managing Today
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                
                <Link
                  to="/about"
                  className="group border-2 border-gray-400 text-gray-300 font-bold px-8 py-4 rounded-xl hover:bg-gray-700 hover:text-white hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
                >
                  <span className="flex items-center justify-center">
                    Watch Demo
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-10 6a9 9 0 1118 0 9 9 0 01-18 0z"></path>
                    </svg>
                  </span>
                </Link>
              </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12">
                <div className="text-center p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
                    <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1 group-hover:scale-110 transition-transform">500+</div>
                    <div className="text-xs sm:text-sm text-gray-400">Societies</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1 group-hover:scale-110 transition-transform">10K+</div>
                    <div className="text-xs sm:text-sm text-gray-400">Members</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1 group-hover:scale-110 transition-transform">99%</div>
                    <div className="text-xs sm:text-sm text-gray-400">Satisfaction</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 group">
                    <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1 group-hover:scale-110 transition-transform">24/7</div>
                    <div className="text-xs sm:text-sm text-gray-400">Support</div>
                </div>
            </div>
            </div>
            </div>

            {/* Right Content - Professional Dashboard Preview */}
            <div className="w-full lg:w-1/2 flex justify-center items-center mt-12 lg:mt-0">
                <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                    
                    {/* Dashboard Preview Container */}
                    <div className="relative w-full max-w-lg mx-auto">
                        
                        {/* Main Dashboard Interface */}
                        <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700/50">
                            
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-sm">Society Dashboard</h3>
                                        <p className="text-gray-400 text-xs">Live Management</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-green-400 text-xs font-medium">Online</span>
                                </div>
                            </div>

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg p-4 border border-cyan-500/30">
                                    <div className="text-cyan-400 text-lg font-bold">₹2.4L</div>
                                    <div className="text-gray-300 text-xs">Monthly Collection</div>
                                </div>
                                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/30">
                                    <div className="text-purple-400 text-lg font-bold">95%</div>
                                    <div className="text-gray-300 text-xs">Payment Rate</div>
                                </div>
                                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-500/30">
                                    <div className="text-green-400 text-lg font-bold">12</div>
                                    <div className="text-gray-300 text-xs">Active Requests</div>
                                </div>
                                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg p-4 border border-orange-500/30">
                                    <div className="text-orange-400 text-lg font-bold">3</div>
                                    <div className="text-gray-300 text-xs">Pending Tasks</div>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="space-y-3">
                                <h4 className="text-white font-medium text-sm mb-3">Recent Activity</h4>
                                <div className="flex items-center space-x-3 p-2 bg-gray-700/50 rounded-lg">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-gray-300 text-xs">Maintenance fee collected</p>
                                        <p className="text-gray-500 text-xs">2 minutes ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 p-2 bg-gray-700/50 rounded-lg">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-gray-300 text-xs">New member registered</p>
                                        <p className="text-gray-500 text-xs">5 minutes ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 p-2 bg-gray-700/50 rounded-lg">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-gray-300 text-xs">Event scheduled</p>
                                        <p className="text-gray-500 text-xs">10 minutes ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Feature Cards */}
                        <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-xl animate-bounce"
                                 style={{
                                     animationDelay: '0s',
                                     animationDuration: '3s'
                                 }}>
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                            </svg>
                        </div>

                        <div className="absolute -top-12 -right-16 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-xl animate-bounce"
                                 style={{
                                     animationDelay: '0s',
                                     animationDuration: '3s'
                                 }}>
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                            </svg>
                        </div>

                        <div className="absolute -bottom-4 -left-6 w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-xl animate-bounce"
                                 style={{
                                     animationDelay: '1s',
                                     animationDuration: '3s'
                                 }}>
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                        </div>

                        <div className="absolute top-1/2 -left-8 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-xl animate-bounce"
                                 style={{
                                     animationDelay: '2s',
                                     animationDuration: '3s'
                                 }}>
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                        </div>

                        {/* Status Indicators */}
                        <div className="absolute top-4 -right-12 bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-white text-xs font-medium">All Systems</span>
                            </div>
                        </div>

                        <div className="absolute bottom-4 -right-12 bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                <span className="text-white text-xs font-medium">Real-time</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>

            {/* Features Section */}
      <div className="relative z-10 bg-gray-900/80 backdrop-blur-sm border-t border-gray-800/50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need to Manage Your Society
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Streamline operations, enhance communication, and create a thriving community with our comprehensive management platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`group bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 sm:p-8 rounded-2xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl backdrop-blur-sm transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{transitionDelay: `${index * 0.2}s`}}
              >
                <div className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="relative z-10 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your society management experience with our intuitive platform designed for modern communities.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-blue-500"></div>
              
              {/* Steps */}
              <div className="space-y-12 sm:space-y-16">
                <div className="flex items-start group">
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      1
                    </div>
                    <div className="absolute -inset-2 bg-cyan-500/20 rounded-full animate-pulse"></div>
                  </div>
                  <div className="ml-6 sm:ml-8 flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                      Register Your Society
                    </h3>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      Contact us to register your society and create a customized management profile. Our team will guide you through the setup process.
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      2
                    </div>
                    <div className="absolute -inset-2 bg-purple-500/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>
                  <div className="ml-6 sm:ml-8 flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                      Add Members & Setup
                    </h3>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      Invite residents, configure building details, and set up your society's organizational structure with our easy-to-use tools.
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      3
                    </div>
                    <div className="absolute -inset-2 bg-green-500/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                  </div>
                  <div className="ml-6 sm:ml-8 flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors duration-300">
                      Manage Everything
                    </h3>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      Start managing maintenance, events, finances, rent collection, and all society activities from one comprehensive dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm border-t border-gray-800/50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Society?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of societies already using our platform to streamline operations and enhance community living.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
          >
            Get Started Today
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}