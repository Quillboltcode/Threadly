import React, { useState, useEffect } from 'react';
import { FaHome, FaSearch, FaBell, FaComment, FaStream, FaList, FaUser, FaCog, FaPen } from 'react-icons/fa';
import { CiMenuBurger } from 'react-icons/ci';
import  { Link } from '@tanstack/react-router';


const LeftSidebar: React.FC = () => {
  const [mode, setMode] = useState<"hidden" | "icon" | "full">("full");
  // Function to update sidebar mode based on screen size
  const updateMode = () => {
    if (window.innerWidth < 640) setMode("hidden");
    else if (window.innerWidth < 1024) setMode("icon");
    else setMode("full");
  };

  useEffect(() => {
    updateMode();
    window.addEventListener("resize", updateMode);
    return () => window.removeEventListener("resize", updateMode);
  }, []);

  return (
    <div className={`h-screen lg:ml-8 bg-gray-900 text-white flex flex-col transition-all duration-300
      ${mode === "hidden" ? "w-0 overflow-hidden" : ""}
      ${mode === "icon" ? "w-16" : ""}
      ${mode === "full" ? "w-64" : ""}`}
    >
      {/* Toggle button work in small screen */}
      {mode === "hidden" && (
        <button
          aria-label="Toggle Sidebar"
          className="p-3 text-white bg-gray-900 hover:bg-gray-700 fixed top-4 left-4 rounded-md"
          onClick={() => setMode("icon")}
        >
          <CiMenuBurger />
        </button>
      )}

      <div className="flex items-center justify-items-start mb-6">
        <div className="bg-blue-500 p-2 rounded-full">
          <FaHome />
        </div>
      </div>
      {/* Navigation */}
      <nav className="space-y-4">
        <SidebarItems icon={<FaHome />} text="Home" link="/" mode={mode} />
        <SidebarItems icon={<FaSearch />} text="Search" link="/search" mode={mode} />
        <SidebarItems icon={<FaBell />} text="Notifications" link="/notifications" mode={mode} />
        <SidebarItems icon={<FaComment />} text="Messages" link="/messages" mode={mode} />
        <SidebarItems icon={<FaStream />} text="Streams" link="/streams" mode={mode} />
        <SidebarItems icon={<FaList />} text="Lists" link="/lists" mode={mode} />
        <SidebarItems icon={<FaUser />} text="Profile" link="/profile" mode={mode} />
        <SidebarItems icon={<FaCog />} text="Settings" link="/settings" mode={mode} />
      </nav>

      {mode === "full" && (
        <div className="mt-8 justify-start flex items-center">
          <button
            aria-label="Create Post"
            className="bg-blue-500 text-white mt-2 px-4 py-2 rounded-full flex items-center space-x-2"
          >
            <FaPen />
            <span>New Post</span>
          </button>
        </div>
      )}
    </div>
  );
};

type SidebarItemProps = {
  icon: React.ReactNode;
  text: string;
  link: string;
  mode: "hidden" | "icon" | "full";
};

const SidebarItems: React.FC<SidebarItemProps> = ({ icon, text, link, mode }) => {
  return (
    <Link to={link} className="flex items-center space-x-2 p-3 hover:bg-gray-700 cursor-pointer">
      {icon}
      {mode === "full" && <span className="whitespace-nowrap">{text}</span>}
    </Link>
  );
};

export default LeftSidebar;