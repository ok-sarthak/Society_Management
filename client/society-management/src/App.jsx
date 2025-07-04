import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import About from './pages/About/aboutPage';
import MemberLogin from './pages/MemberLoginPage/MemberLogin';
import ForgotPassword from './pages/MemberLoginPage/ForgotPassword';
import AdminLogin from './pages/AdminLoginPage/AdminLogin';
import AdminForgotPassword from './pages/AdminLoginPage/AdminForgotPassword';
import './index.css'


import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Routes>
      <Route path="/" element={<><Navbar/><Hero/><Footer/></>} />
      <Route path="/about" element={<><Navbar/><About/><Footer/></>} />
      <Route path="/member/login" element={<><Navbar/><MemberLogin/><Footer/></>} />
      <Route path="/member/forgot-password" element={<><Navbar/><ForgotPassword/> <Footer/></>} />
      <Route path="/admin/login" element={<><Navbar/><AdminLogin/> <Footer/></>} />
      <Route path="/admin/forgot-password" element={<><Navbar/><AdminForgotPassword/> <Footer/></>} />
    </Routes>
  );
};

console.log('App.js is running')
export default App