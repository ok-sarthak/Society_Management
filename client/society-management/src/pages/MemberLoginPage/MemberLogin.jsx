import React, { useState } from 'react';

const MemberLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    alert("Login functionality to be implemented!");
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 p-8 sm:p-12 rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full mx-4 flex flex-col items-center">
        {/* User Icon */}
        <div className="mb-6">
          <svg className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white text-center">Member Login</h2>
        
        <form onSubmit={handleLogin} className="w-full">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full text-base sm:text-lg p-3 sm:p-4 mb-4 rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200"
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full text-base sm:text-lg p-3 sm:p-4 mb-4 rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200"
          />
          
          <p className="mb-6 text-sm text-gray-400 text-center">
            Forgot Password?{' '}
            <a href="/member/forgot-password" className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors duration-200">
              Reset Password
            </a>
          </p>
          
          <button 
            type="submit"
            className="w-full p-3 sm:p-4 text-base sm:text-lg font-semibold bg-gradient-to-r from-cyan-500 to-cyan-400 text-white border-none rounded-lg cursor-pointer hover:from-cyan-600 hover:to-cyan-500 transition-all duration-200 shadow-lg"
          >
            Login
          </button>
        </form>
        
        <p className="mt-6 text-gray-400 text-center text-sm">
          Don't have an account?{' '}
          <a href="/member/signup" className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors duration-200">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default MemberLogin;
