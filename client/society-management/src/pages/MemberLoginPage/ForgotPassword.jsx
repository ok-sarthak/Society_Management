import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    setMessage('If this email is registered, a password reset link has been sent.');
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 p-8 sm:p-12 rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full mx-4 flex flex-col items-center">
        {/* Lock Icon */}
        <div className="mb-6">
          <svg className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18,8h-1V6c0-2.76-2.24-5-5-5S7,3.24,7,6v2H6c-1.1,0-2,0.9-2,2v10c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V10C20,8.9,19.1,8,18,8z M12,17c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,17,12,17z M15.1,8H8.9V6c0-1.71,1.39-3.1,3.1-3.1s3.1,1.39,3.1,3.1V8z"/>
          </svg>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white text-center">Reset Password</h2>
        
        <form onSubmit={handleReset} className="w-full">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full text-base sm:text-lg p-3 sm:p-4 mb-6 rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200"
          />
          
          <button 
            type="submit"
            className="w-full p-3 sm:p-4 text-base sm:text-lg font-semibold bg-gradient-to-r from-cyan-500 to-cyan-400 text-white border-none rounded-lg cursor-pointer hover:from-cyan-600 hover:to-cyan-500 transition-all duration-200 shadow-lg"
          >
            Send Reset Link
          </button>
        </form>
        
        {message && (
          <p className="mt-4 text-green-400 text-center font-medium text-sm">
            {message}
          </p>
        )}
        
        <p className="mt-6 text-gray-400 text-center text-sm">
          <a href="/member/login" className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors duration-200">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
