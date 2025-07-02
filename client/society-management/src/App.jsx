import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar/Navbar';
import './index.css'

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<><Navbar/><Hero/></>} />
    </Routes>
  );
};

console.log('App.js is running')
export default App