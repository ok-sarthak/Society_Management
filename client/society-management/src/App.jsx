import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/footer';
import About from './pages/About/aboutPage';
import MemberLogin from './pages/MemberLoginPage/MemberLogin';
import MemberSignup from './pages/MemberLoginPage/MemberSignup';
import ForgotPassword from './pages/MemberLoginPage/ForgotPassword';
import AdminLogin from './pages/AdminLoginPage/AdminLogin';
import AdminSignup from './pages/AdminLoginPage/AdminSignup';
import AdminForgotPassword from './pages/AdminLoginPage/AdminForgotPassword';
import './index.css'

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<><Navbar/><Hero/> <Footer/></>} />
      <Route path="/about" element={<><Navbar/><About/><Footer/></>} />
      <Route path="/member/login" element={<MemberLogin/>} />
      <Route path="/member/signup" element={<MemberSignup/>} />
      <Route path="/member/forgot-password" element={<ForgotPassword/>} />
      <Route path="/admin/login" element={<AdminLogin/>} />
      <Route path="/admin/signup" element={<AdminSignup/>} />
      <Route path="/admin/forgot-password" element={<AdminForgotPassword/>} />
    </Routes>
  );
};

console.log('App.js is running')
export default App