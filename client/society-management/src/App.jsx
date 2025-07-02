import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/footer';
import './index.css'

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<><Navbar/> <Footer/></>} />
    </Routes>
  );
};

console.log('App.js is running')
export default App