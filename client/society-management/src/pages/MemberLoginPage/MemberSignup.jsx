import React, { useState } from 'react';

const MemberSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 

  const handleSignup = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signing up with:", name, email, phone, password);
    alert("Signup functionality to be implemented!");
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 py-8">
      <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 p-6 sm:p-12 rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full mx-4 flex flex-col items-center">
        {/* User Plus Icon */}
        <div className="mb-4">
          <svg className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V8c0-.55-.45-1-1-1s-1 .45-1 1v2H2c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-5 text-cyan-400 tracking-wide text-center">Member Sign Up</h2>
        
        {/* Divider */}
        <div className="w-12 sm:w-16 h-1 bg-cyan-400 rounded-full mb-4 sm:mb-6"></div>
        
        <form onSubmit={handleSignup} className="w-full">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full text-base sm:text-lg p-3 sm:p-4 mb-3 rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200"
          />
          
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full text-base sm:text-lg p-3 sm:p-4 mb-3 rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200"
          />
          
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full text-base sm:text-lg p-3 sm:p-4 mb-3 rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200"
          />
          
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full text-base sm:text-lg p-3 sm:p-4 mb-3 rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200"
          />
          
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full text-base sm:text-lg p-3 sm:p-4 mb-4 sm:mb-6 rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200"
          />
          
          <button 
            type="submit"
            className="w-full p-3 sm:p-4 text-base sm:text-lg font-semibold bg-gradient-to-r from-cyan-500 to-cyan-400 text-white border-none rounded-lg cursor-pointer hover:from-cyan-600 hover:to-cyan-500 transition-all duration-200 shadow-lg tracking-wide"
          >
            Sign Up
          </button>
        </form>
        
        <p className="mt-4 sm:mt-5 text-gray-400 text-center text-sm">
          Already have an account?{' '}
          <a href="/member/login" className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors duration-200">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default MemberSignup;
