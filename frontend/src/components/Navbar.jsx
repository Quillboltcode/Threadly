import React, { useState } from 'react';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  
  const handleDarkModeToggle = () => {
    const htmlElement = document.documentElement;
    const isCurrentlyDarkMode = isDarkMode;

    if (isCurrentlyDarkMode) {
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }

    setIsDarkMode(!isCurrentlyDarkMode);
  };
  

  const toggleDarkMode = () => {
    const html = document.documentElement;

    if (isDarkMode) {
      html.classList.remove('dark');
    } else {
      html.classList.add('dark');
    }

    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="bg-blue-600 dark:bg-gray-900 text-white px-4 py-3 shadow fixed w-full z-10 top-0">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">SocialMedia</h1>
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 focus:outline-none"
        />
        <div className="flex items-center space-x-4">
          <button className="text-sm">Home</button>
          <button className="text-sm">Profile</button>
          <button className="text-sm">Logout</button>
          <div className="flex flex-col justify-center ml-3">
            <input
              type="checkbox"
              name="light-switch"
              id="light-switch"
              className="light-switch sr-only"
              onChange={toggleDarkMode}
              checked={isDarkMode}
            />
            <label
              htmlFor="light-switch"
              className="relative cursor-pointer p-2"
            >
              {/* Light Mode SVG */}
              <svg
                className={`${isDarkMode ? 'hidden' : 'block'} dark:hidden`}
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-slate-300"
                  d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
                />
                <path
                  className="fill-slate-400"
                  d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
                />
              </svg>

              {/* Dark Mode SVG */}
              <svg
                className={`${isDarkMode ? 'block' : 'hidden'} dark:block`}
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-slate-400"
                  d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
                />
                <path
                  className="fill-slate-500"
                  d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
                />
              </svg>
              <span className="sr-only">Switch to light / dark version</span>
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
