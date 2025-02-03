import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './Routes'

import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import RightSidebar from './components/RightSidebar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-gray-50 min-h-screen">
      <Router>
      <Navbar />
      
      <div className="flex">
        {/* Left Sidebar */}
        <LeftSidebar />
        
        <AppRoutes />

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
      </Router>
    </div>
  );
}

export default App
