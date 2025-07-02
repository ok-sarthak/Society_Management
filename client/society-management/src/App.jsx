import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/footer';
import './index.css'

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={<><Navbar/> <Footer/></>} />
=======
      <Route path="/" element={<><Navbar/><Hero/></>} />
>>>>>>> 138628e2b202b9d9b9cd29ff5a0fe87b89e332ec
    </Routes>
  );
};

console.log('App.js is running')
export default App