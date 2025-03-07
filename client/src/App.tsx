import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import React from 'react';
import LeftSidebar from './components/LeftSidebar';
import MainContent from './components/MainContent';
import RightSidebar from './components/RightSidebar';



const App: React.FC = () => {
  return (
    <>
    <div className="h-screen flex flex-row bg-gray-900 text-white relative">
      <LeftSidebar  />
      <MainContent />
      <RightSidebar />
    </div>
    {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  );
};


export default App;

