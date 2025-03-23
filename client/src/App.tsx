
import './App.css'
import React, { useEffect, useState } from 'react';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import { Outlet } from 'react-router';
import NewPostButton from './components/NewPostButton';
import { debounce } from 'es-toolkit';
import { Toaster } from 'react-hot-toast';

export enum ScreenMode {
  Hidden = 'hidden',
  Icon = 'icon',
  Full = 'full',
}

const App: React.FC = () => {
  const [leftSidebarMode, setLeftSidebarMode] = useState<ScreenMode>(() => {
    if (typeof window === "undefined") return ScreenMode.Full;
    if (window.innerWidth < 640) return ScreenMode.Hidden;
    if (window.innerWidth < 1024) return ScreenMode.Icon;
    return ScreenMode.Full;
  });

  const [rightSidebarMode, setRightSidebarMode] = useState<ScreenMode>(() => {
    if (typeof window === "undefined") return ScreenMode.Full;
    if (window.innerWidth < 768) return ScreenMode.Hidden;
    return ScreenMode.Full;
  }); 
  
  const updateMode = () => {
    if (window.innerWidth < 640) setLeftSidebarMode(ScreenMode.Hidden);
    else if (window.innerWidth < 1024) setLeftSidebarMode(ScreenMode.Icon);
    else setLeftSidebarMode(ScreenMode.Full);

    if (window.innerWidth < 768) setRightSidebarMode(ScreenMode.Hidden);
    else setRightSidebarMode(ScreenMode.Full);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = debounce(updateMode, 100);
      updateMode(); // Initial call
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <>
    <div className="h-screen flex flex-row dark:bg-gray-900 dark:text-white bg-white text-black relative">
      <LeftSidebar mode={leftSidebarMode} setMode={setLeftSidebarMode}/>

      <div className='main md:w-1/2 w-full flex flex-col border border-gray-700'>
          <Outlet />
      </div>
      {/* < NewPostButton mode={leftSidebarMode} /> */}
      <RightSidebar  mode={rightSidebarMode} setMode={setRightSidebarMode}/>
      <Toaster position='top-right' />
    </div>
    </>
  );
};


export default App;

