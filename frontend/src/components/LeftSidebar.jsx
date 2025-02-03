import React from 'react';

const LeftSidebar = () => {
  return (
    <div className="w-1/4 hidden lg:block bg-gray-100 h-screen fixed top-0 pt-20">
      <div className="p-4">
        <h2 className="font-bold mb-4">Menu</h2>
        <ul className="space-y-4">
          <li>Home</li>
          <li>Explore</li>
          <li>Messages</li>
          <li>Notifications</li>
          <li>Settings</li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
