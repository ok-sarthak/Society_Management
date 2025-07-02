import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="w-full">
        <nav className="border-gray-200 bg-gray-900 py-2.5">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <a href="#" className="flex items-center">
              <span className="self-center text-lg sm:text-xl font-semibold whitespace-nowrap text-white">
                Society Management
              </span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
              <ul className="flex flex-col mt-4 border border-gray-700 rounded-lg bg-gray-800 lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-transparent lg:text-sm lg:font-medium">
                <li>
                  <a 
                    className="block py-2 px-3 text-white bg-blue-700 rounded lg:bg-transparent lg:text-blue-700 lg:p-0 lg:hover:text-white hover:bg-gray-700 lg:hover:bg-transparent transition-colors duration-200" 
                    href="/" 
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    className="block py-2 px-3 text-gray-300 hover:bg-gray-700 hover:text-white lg:hover:bg-transparent lg:border-0 lg:hover:text-white lg:p-0 transition-colors duration-200" 
                    href="/guide"
                  >
                    How it Works?
                  </a>
                </li>
                <li>
                  <a 
                    className="block py-2 px-3 text-gray-300 hover:bg-gray-700 hover:text-white lg:hover:bg-transparent lg:border-0 lg:hover:text-white lg:p-0 transition-colors duration-200" 
                    href="/contact"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a 
                    className="block py-2 px-3 text-gray-300 hover:bg-gray-700 hover:text-white lg:hover:bg-transparent lg:border-0 lg:hover:text-white lg:p-0 transition-colors duration-200" 
                    href="/about"
                  >
                    About
                  </a>
                </li>
              </ul>

              
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-x-0 bottom-0">
          <svg viewBox="0 0 224 12" fill="currentColor" className="-mb-1 w-full text-white" preserveAspectRatio="none">
            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z"></path>
          </svg>
        </div>
        <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-8 lg:py-20 xl:py-24">
          <div className="relative max-w-4xl mx-auto text-center">
            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Society Management System
            </h2>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg lg:text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed">
              Simplify your society's issue management with our intuitive platform. Track, manage, and resolve issues seamlessly, ensuring a harmonious community experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 text-sm sm:text-base font-medium text-white hover:bg-white hover:text-gray-900 focus:ring-4 focus:ring-gray-300 focus:outline-none transition-colors duration-200" 
                href="/member/login"
              >
                Society Members
                <svg className="ml-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"></path>
                </svg>
              </a>
              <a 
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-transparent border-2 border-indigo-400 px-6 py-3 text-sm sm:text-base font-medium text-indigo-400 hover:bg-indigo-400 hover:text-white focus:ring-4 focus:ring-indigo-300 focus:outline-none transition-colors duration-200" 
                href="/admin/login"
              >
                Society Administration
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}