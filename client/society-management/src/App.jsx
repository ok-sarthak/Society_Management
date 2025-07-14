import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import About from './pages/About/AboutPage';
import MemberLogin from './pages/MemberLoginPage/MemberLogin';
import ForgotPassword from './pages/MemberLoginPage/ForgotPassword';
import AdminLogin from './pages/AdminLoginPage/AdminLogin';
import AdminForgotPassword from './pages/AdminLoginPage/AdminForgotPassword';
import AdminApp from './admin/App';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import './index.css'


import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <AuthProvider>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<><Navbar/><Hero/><Footer/></>} />
      <Route path="/about" element={<><Navbar/><About/><Footer/></>} />
      <Route path="/member/login" element={<><Navbar/><MemberLogin/><Footer/></>} />
      <Route path="/member/forgot-password" element={<><Navbar/><ForgotPassword/> <Footer/></>} />
      <Route path="/admin/login" element={<><Navbar/><AdminLogin/> <Footer/></>} />
      <Route path="/admin/forgot-password" element={<><Navbar/><AdminForgotPassword/> <Footer/></>} />
      {/*Protected Routes*/}
      <Route path="/app/admin/*" element={
        <ProtectedRoute roles={['admin']}>
          <AdminApp/>
        </ProtectedRoute>
      }/>
    </Routes>
    </AuthProvider>
  );
};

console.log('App.js is running')
export default App