import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
    )},
    { path: '/guide', label: 'Solutions', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    )},
    { path: '/contact', label: 'Contact', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    )},
    { path: '/about', label: 'About', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    )}
  ];

  return (
    <>
      <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-gray-900/95 border-b border-gray-800">
        <nav className="py-3 sm:py-4">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                <span className="text-white font-bold text-sm sm:text-base">SM</span>
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent whitespace-nowrap">
                Society Management
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center p-2 text-gray-400 rounded-lg lg:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              aria-controls="navbar-default"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
              </svg>
            </button>

            {/* Navigation menu */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} w-full lg:block lg:w-auto lg:order-1`} id="navbar-default">
              <ul className="flex flex-col mt-4 border border-gray-700 rounded-lg bg-gray-800/95 backdrop-blur-md lg:flex-row lg:space-x-1 lg:mt-0 lg:border-0 lg:bg-transparent">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      className={`
                        block py-3 px-4 lg:py-2 lg:px-4 rounded-lg font-medium transition-all duration-200 relative
                        ${isActive(link.path) 
                          ? 'text-blue-400 bg-blue-500/10 lg:bg-blue-500/20 font-bold' 
                          : 'text-gray-300 hover:text-white hover:bg-gray-700 lg:hover:bg-gray-800/50'
                        }
                        lg:text-sm xl:text-base
                      `}
                      to={link.path}
                    >
                      <span className="flex items-center space-x-2">
                        {link.icon}
                        <span>{link.label}</span>
                      </span>
                      {isActive(link.path) && (
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full lg:block hidden"></span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
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
    </>
  )
}