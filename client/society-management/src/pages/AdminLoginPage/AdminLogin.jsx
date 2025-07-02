import React, { useState } from 'react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Admin logging in with:", email, password);
    alert("Admin login functionality to be implemented!");
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 p-8 sm:p-12 rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full mx-4 flex flex-col items-center">
        {/* Admin Icon */}
        <div className="mb-6">
          <svg className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            <path d="M12 6c1.1 0 2 .9 2 2 0 .74-.4 1.38-1 1.72v.78h-2v-.78c-.6-.34-1-.98-1-1.72 0-1.1.9-2 2-2z"/>
          </svg>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white text-center">Society Admin</h2>
        
        <form onSubmit={handleLogin} className="w-full">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full text-base sm:text-lg p-3 sm:p-4 mb-4 rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-200"
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full text-base sm:text-lg p-3 sm:p-4 mb-4 rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-200"
          />
          
          <p className="mb-6 text-sm text-gray-400 text-center">
            Forgot Password?{' '}
            <a href="/admin/forgot-password" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200">
              Reset Password
            </a>
          </p>
          
          <button 
            type="submit"
            className="w-full p-3 sm:p-4 text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white border-none rounded-lg cursor-pointer hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg"
          >
            Admin Login
          </button>
        </form>
        
        <p className="mt-6 text-gray-400 text-center text-sm">
          Need admin account?{' '}
          <a href="/admin/signup" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200">
            Register Here
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
