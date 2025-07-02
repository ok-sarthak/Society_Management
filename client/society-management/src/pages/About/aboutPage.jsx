import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            About Society Management
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Complete building management solution for maintenance, events, finances, and community activities
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        {/* Our Story */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-gray-300 mb-4">
                Society Management was born from the daily struggles of residential building administrators who juggled maintenance requests, event planning, financial tracking, and rent collections across multiple spreadsheets and manual processes.
              </p>
              <p className="text-gray-300 mb-4">
                Today, we provide a unified platform that transforms how residential societies operate - from tracking building maintenance and organizing community events to managing accounts, collecting allowances, and coordinating society activities.
              </p>
              <p className="text-gray-300">
                Our comprehensive solution ensures every aspect of building management is streamlined, transparent, and efficient, creating harmonious communities where residents and management work together seamlessly.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-8 rounded-lg">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">SM</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Complete Building Solution</h3>
                  <p className="text-gray-300">Everything you need to manage your residential society in one platform</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="bg-gray-800/50 rounded-xl p-12 mb-20">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-gray-300 mb-8">
              "To digitally transform residential building management by providing comprehensive tools for maintenance, financial management, event coordination, and community engagement."
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="bg-blue-500/10 p-6 rounded-lg border border-blue-500/20 w-full sm:w-64">
                <div className="text-blue-400 mb-4 text-center">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-2 text-center">Building Management</h3>
                <p className="text-gray-300 text-center">Comprehensive maintenance tracking and facility management for your residential building.</p>
              </div>
              
              <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20 w-full sm:w-64">
                <div className="text-purple-400 mb-4 text-center">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-2 text-center">Financial Control</h3>
                <p className="text-gray-300 text-center">Complete accounts management with rent collection, allowance tracking, and expense monitoring.</p>
              </div>
              
              <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/20 w-full sm:w-64">
                <div className="text-green-400 mb-4 text-center">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-2 text-center">Events & Activities</h3>
                <p className="text-gray-300 text-center">Organize community events, meetings, and society activities with ease and full participation tracking.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Complete Society Management Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 text-cyan-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <h3 className="font-bold text-xl text-white">Building Maintenance</h3>
              </div>
              <p className="text-gray-300">
                Track maintenance requests, schedule repairs, manage vendors, and ensure your building stays in perfect condition.
              </p>
            </div>
            
            <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <h3 className="font-bold text-xl text-white">Event Organization</h3>
              </div>
              <p className="text-gray-300">
                Plan and manage community events, festivals, meetings, and social gatherings with RSVP tracking and notifications.
              </p>
            </div>
            
            <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <h3 className="font-bold text-xl text-white">Financial Management</h3>
              </div>
              <p className="text-gray-300">
                Complete accounts management with automated rent collection, maintenance fee tracking, and expense reporting.
              </p>
            </div>
            
            <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                <h3 className="font-bold text-xl text-white">Meeting Management</h3>
              </div>
              <p className="text-gray-300">
                Schedule society meetings, send invitations, track attendance, and maintain meeting minutes digitally.
              </p>
            </div>
            
            <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
                <h3 className="font-bold text-xl text-white">Collection Management</h3>
              </div>
              <p className="text-gray-300">
                Automate rent collection, maintenance allowances, and special assessments with payment tracking and reminders.
              </p>
            </div>
            
            <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <h3 className="font-bold text-xl text-white">Community Activities</h3>
              </div>
              <p className="text-gray-300">
                Organize sports activities, cultural programs, educational workshops, and recreational events for all residents.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Revolutionize Your Society Management?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join modern residential societies using our comprehensive platform for seamless building management, financial control, and community engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold px-8 py-3 rounded-lg hover:from-cyan-500 hover:to-blue-600 transition duration-300 shadow-lg">
              Start Managing Today
            </button>
            <button className="border border-gray-400 text-gray-300 font-bold px-8 py-3 rounded-lg hover:bg-gray-700 hover:text-white transition duration-300">
              Schedule Demo
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
