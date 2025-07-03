import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      ),
      title: "Building Maintenance",
      description: "Track maintenance requests, schedule repairs, manage vendors, and ensure your building stays in perfect condition.",
      color: "from-cyan-400 to-blue-500",
      bgColor: "from-cyan-500/10 to-blue-500/10",
      borderColor: "border-cyan-500/30"
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      ),
      title: "Event Organization",
      description: "Plan and manage community events, festivals, meetings, and social gatherings with RSVP tracking and notifications.",
      color: "from-purple-400 to-pink-500",
      bgColor: "from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-500/30"
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      ),
      title: "Financial Management",
      description: "Complete accounts management with automated rent collection, maintenance fee tracking, and expense reporting.",
      color: "from-green-400 to-emerald-500",
      bgColor: "from-green-500/10 to-emerald-500/10",
      borderColor: "border-green-500/30"
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
      ),
      title: "Meeting Management",
      description: "Schedule society meetings, send invitations, track attendance, and maintain meeting minutes digitally.",
      color: "from-blue-400 to-indigo-500",
      bgColor: "from-blue-500/10 to-indigo-500/10",
      borderColor: "border-blue-500/30"
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
        </svg>
      ),
      title: "Collection Management",
      description: "Automate rent collection, maintenance allowances, and special assessments with payment tracking and reminders.",
      color: "from-yellow-400 to-orange-500",
      bgColor: "from-yellow-500/10 to-orange-500/10",
      borderColor: "border-yellow-500/30"
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      ),
      title: "Community Activities",
      description: "Organize sports activities, cultural programs, educational workshops, and recreational events for all residents.",
      color: "from-red-400 to-pink-500",
      bgColor: "from-red-500/10 to-pink-500/10",
      borderColor: "border-red-500/30"
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Societies", delay: "0s" },
    { number: "10K+", label: "Managed Issues", delay: "0.2s" },
    { number: "99%", label: "Satisfaction Rate", delay: "0.4s" },
    { number: "24/7", label: "Support", delay: "0.6s" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Advanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"
          style={{
            transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.05}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute top-40 right-20 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" 
          style={{
            animationDelay: '2s',
            transform: `translateY(${scrollY * -0.15}px) rotate(${scrollY * -0.03}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
        <div 
          className="absolute bottom-20 left-1/2 w-56 h-56 sm:w-80 sm:h-80 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse" 
          style={{
            animationDelay: '4s',
            transform: `translateY(${scrollY * 0.08}px) rotate(${scrollY * 0.02}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        ></div>
      </div>

      {/* Enhanced Hero Section */}
      <header className="relative bg-gradient-to-r from-gray-900/95 via-blue-900/95 to-gray-900/95 backdrop-blur-sm border-b border-gray-800/50 py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl pb-3 font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 leading-tight animate-pulse">
              About Society Management
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto opacity-90 leading-relaxed px-4">
              Complete building management solution for maintenance, events, finances, and community activities
            </p>
          </div>
          
          {/* Enhanced Floating elements */}
          <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-4 h-4 sm:w-6 sm:h-6 bg-cyan-400/30 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-10 sm:top-20 right-5 sm:right-10 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500/30 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-5 sm:bottom-10 left-10 sm:left-20 w-5 h-5 sm:w-8 sm:h-8 bg-purple-400/30 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-5 sm:right-10 w-2 h-2 sm:w-3 sm:h-3 bg-green-400/30 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-1/3 left-5 sm:left-10 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400/30 rounded-full animate-ping" style={{animationDelay: '4s'}}></div>
        </div>
      </header>

      {/* Enhanced Stats Section */}
      <section className="relative py-12 sm:py-16 bg-gray-900/50 backdrop-blur-sm border-y border-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`transform transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} style={{animationDelay: stat.delay}}>
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300 animate-pulse">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-xs sm:text-sm md:text-base px-2">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        {/* Enhanced Our Story */}
        <section className="mb-16 sm:mb-20">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
            <div className={`w-full lg:w-1/2 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 relative">
                Our Story
                <div className="absolute -bottom-2 left-0 w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
              </h2>
              <div className="space-y-4 sm:space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
                <p className="hover:text-white transition-colors duration-300 transform hover:translate-x-2">
                  Society Management was born from the daily struggles of residential building administrators who juggled maintenance requests, event planning, financial tracking, and rent collections across multiple spreadsheets and manual processes.
                </p>
                <p className="hover:text-white transition-colors duration-300 transform hover:translate-x-2">
                  Today, we provide a unified platform that transforms how residential societies operate - from tracking building maintenance and organizing community events to managing accounts, collecting allowances, and coordinating society activities.
                </p>
                <p className="hover:text-white transition-colors duration-300 transform hover:translate-x-2">
                  Our comprehensive solution ensures every aspect of building management is streamlined, transparent, and efficient, creating harmonious communities where residents and management work together seamlessly.
                </p>
              </div>
            </div>
            <div className={`w-full lg:w-1/2 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 p-6 sm:p-8 lg:p-12 rounded-2xl backdrop-blur-sm border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group hover:scale-105 hover:shadow-2xl">
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg animate-pulse">
                    <span className="text-xl sm:text-2xl lg:text-3xl font-bold">SM</span>
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-white">Complete Building Solution</h3>
                  <p className="text-gray-300 text-sm sm:text-base lg:text-lg">Everything you need to manage your residential society in one platform</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Our Mission */}
        <section className="bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-12 mb-16 sm:mb-20 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
          <div className="text-center max-w-3xl sm:max-w-4xl lg:max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 relative inline-block">
              Our Mission
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse"></div>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 leading-relaxed px-4">
              "To digitally transform residential building management by providing comprehensive tools for maintenance, financial management, event coordination, and community engagement."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-6 sm:p-8 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group hover:scale-105 hover:shadow-xl">
                <div className="text-blue-400 mb-4 sm:mb-6 text-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-3 sm:mb-4 text-lg sm:text-xl">Building Management</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">Comprehensive maintenance tracking and facility management for your residential building.</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 sm:p-8 rounded-xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group hover:scale-105 hover:shadow-xl">
                <div className="text-purple-400 mb-4 sm:mb-6 text-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-3 sm:mb-4 text-lg sm:text-xl">Financial Control</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">Complete accounts management with rent collection, allowance tracking, and expense monitoring.</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 sm:p-8 rounded-xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 group hover:scale-105 hover:shadow-xl">
                <div className="text-green-400 mb-4 sm:mb-6 text-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-3 sm:mb-4 text-lg sm:text-xl">Events & Activities</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">Organize community events, meetings, and society activities with ease and full participation tracking.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Features */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-12 sm:mb-16 text-center relative">
            Complete Society Management Features
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`bg-gradient-to-br ${feature.bgColor} backdrop-blur-sm p-6 sm:p-8 rounded-2xl border ${feature.borderColor} hover:border-opacity-70 transition-all duration-500 group hover:scale-105 hover:shadow-2xl transform hover:rotate-1 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: `${index * 0.1}s`}}>
                <div className={`text-transparent bg-clip-text bg-gradient-to-r ${feature.color} mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 animate-pulse`}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg sm:text-xl lg:text-2xl text-white mb-3 sm:mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Call to Action */}
        <section className="bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 sm:p-8 lg:p-12 text-center hover:border-cyan-400/50 transition-all duration-300 group hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 group-hover:scale-105 transition-transform duration-300 animate-pulse">
            Ready to Revolutionize Your Society Management?
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-10 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-4">
            Join modern residential societies using our comprehensive platform for seamless building management, financial control, and community engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link
              to="/member/login"
              className="w-full sm:w-auto group inline-flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-xl hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 animate-pulse"
            >
              Start Managing Today
              <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto group inline-flex items-center justify-center border-2 border-gray-400 text-gray-300 font-bold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-xl hover:bg-gray-700 hover:text-white hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
            >
              Schedule Demo
              <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}