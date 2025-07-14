import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MemberLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Member logging in with:", email, password);
      alert("Member login functionality to be implemented!");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-cyan-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse group-hover:opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-fadeInUp mb-12">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8 animate-slideInDown">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-full shadow-2xl mb-4 animate-bounceIn">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Member Portal</h1>
          <p className="text-cyan-200/80 text-sm">Access Your Account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 animate-fadeIn">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="relative group">
              <label className="block text-sm font-medium text-cyan-200 mb-2 transition-colors duration-200">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 pl-12 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 hover:bg-white/10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <label className="block text-sm font-medium text-cyan-200 mb-2 transition-colors duration-200">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pl-12 pr-12 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 hover:bg-white/10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link 
                to="/member/forgot-password" 
                className="text-sm text-cyan-300 hover:text-cyan-200 hover:underline transition-colors duration-200"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden py-3 px-6 text-lg font-semibold bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg shadow-lg hover:from-cyan-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                <span className="flex items-center justify-center">
                  Sign In
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </button>
          </form>


          {/* Support Link */}
          <div className="mt-4 text-center border-t border-white/10 pt-4">
            <p className="text-sm text-cyan-200/60">
              Need help? {' '}
              <Link to="/support" className="text-cyan-300 hover:text-cyan-200 hover:underline transition-colors duration-200">
                Contact Support
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-cyan-200/50 text-sm animate-fadeInUp delay-300">
          <p>© 2025 Society Management System. All rights reserved.</p>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
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
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .animate-slideInDown {
          animation: slideInDown 0.6s ease-out;
        }
        
        .animate-bounceIn {
          animation: bounceIn 0.8s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out 0.2s both;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
};

export default MemberLogin;