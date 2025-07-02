import React, { useState } from 'react';

const AdminSignup = () => {
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
    console.log("Admin signing up with:", name, email, phone, password);
    alert("Admin signup functionality to be implemented!");
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 py-8">
      <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 p-6 sm:p-12 rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full mx-4 flex flex-col items-center">
        {/* Admin Plus Icon */}
        <div className="mb-4">
          <svg className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
          </svg>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-5 text-blue-400 tracking-wide text-center">Admin Register</h2>
        
        {/* Divider */}
        <div className="w-12 sm:w-16 h-1 bg-blue-400 rounded-full mb-4 sm:mb-6"></div>
        
        <form onSubmit={handleSignup} className="w-full">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full text-base sm:text-lg p-3 sm:p-4 mb-3 rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-200"
          />
          
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full text-base sm:text-lg p-3 sm:p-4 mb-3 rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-200"
          />
          
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full text-base sm:text-lg p-3 sm:p-4 mb-3 rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-200"
          />
          
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full text-base sm:text-lg p-3 sm:p-4 mb-3 rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-200"
          />
          
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full text-base sm:text-lg p-3 sm:p-4 mb-4 sm:mb-6 rounded-lg border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-200"
          />
          
          <button 
            type="submit"
            className="w-full p-3 sm:p-4 text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white border-none rounded-lg cursor-pointer hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg tracking-wide"
          >
            Create Admin Account
          </button>
        </form>
        
        <p className="mt-4 sm:mt-5 text-gray-400 text-center text-sm">
          Already have admin account?{' '}
          <a href="/admin/login" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200">
            Login Here
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;
