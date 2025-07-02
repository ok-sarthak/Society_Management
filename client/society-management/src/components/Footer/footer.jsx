
import { useEffect } from 'react';

const styles = `
@keyframes float1 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, 20px); }
}
@keyframes float2 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-15px, 15px); }
}
@keyframes float3 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(0, -20px); }
}
.animate-float1 { animation: float1 8s ease-in-out infinite; }
.animate-float2 { animation: float2 10s ease-in-out infinite; }
.animate-float3 { animation: float3 12s ease-in-out infinite; }
.orb {
  transform: translate(-50%, -50%);
  opacity: 0.3;
  transition: transform 0.1s ease-out;
  pointer-events: none;
}
`;

export default function Footer() {
  useEffect(() => {
    // Set copyright year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
    // Mouse follow orb effect
    const orb = document.querySelector('.orb');
    const handleMouseMove = (e) => {
      if (orb) {
        orb.style.left = `${e.clientX}px`;
        orb.style.top = `${e.clientY}px`;
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <style>{styles}</style>
      <footer className="relative bg-gradient-to-br items-center justify-center from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl animate-float1"></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl animate-float2"></div>
          <div className="absolute bottom-10 left-1/2 w-48 h-48 bg-cyan-500 rounded-full filter blur-3xl animate-float3"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12">
            <div className="group">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition duration-500">
                  <span className="text-xl font-bold">SM</span>
                </div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                  Society Management
                </h2>
              </div>
              <p className="text-gray-300 mb-6">Simplify your society's issue management with our intuitive platform. Track, manage, and resolve issues seamlessly, ensuring a harmonious community experience.</p>
            
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6 relative inline-block">
                <span className="relative z-10">Quick Links</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center">
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition duration-300"></span>
                  Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center">
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition duration-300"></span>
                  How it Works?</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center">
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition duration-300"></span>
                  Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center">
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition duration-300"></span>
                  About</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-300">Email</p>
                    <a href="mailto:manueljosedala@hotmail.com" className="text-white hover:text-blue-400 transition">example@example.com</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse" style={{ animationDelay: '0.2s' }}>
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-300">Phone</p>
                    <a href="tel:+244941540352" className="text-white hover:text-blue-400 transition">+91 000 000 0000</a>
                  </div>
                </li>
              </ul>
            </div>
            
          </div>
          <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; <span id="year" className="text-blue-400"></span> Society Management. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Cookies</a>
            </div>
          </div>
        </div>
        <div className="orb absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 filter blur-3xl pointer-events-none"></div>
      </footer>
    </>
  );
}
