import React from "react";
import { FaUserPlus, FaUser, FaLock, FaHandPaper, FaImages, FaPaintBrush, FaUniversalAccess, FaLanguage, FaQuestionCircle, FaInfoCircle } from "react-icons/fa";
import { useAuth } from '../contexts/AuthContext';

const settingsOptions = [
  { icon: <FaUserPlus />, label: "Add another account" },
  { icon: <FaUser />, label: "Account" },
  { icon: <FaLock />, label: "Privacy and security" },
  { icon: <FaHandPaper />, label: "Moderation" },
  { icon: <FaImages />, label: "Content and media" },
  { icon: <FaPaintBrush />, label: "Appearance" },
  { icon: <FaUniversalAccess />, label: "Accessibility" },
  { icon: <FaLanguage />, label: "Languages" },
  { icon: <FaQuestionCircle />, label: "Help" },
  { icon: <FaInfoCircle />, label: "About" },
];

const SettingsPage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await logout();
  };
  return (
    <div className="bg-gray-900 text-white flex w-full items-center justify-center">
      <div className="w-full max-w-md p-4">
        <div className="flex items-center space-x-3">
          <button className="text-white text-xl">&larr;</button>
          <h2 className="text-xl font-semibold">Settings</h2>
        </div>

        <div className="flex flex-col items-center py-6">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-3xl font-bold">
            ☕
          </div>
          <h3 className="text-lg font-semibold mt-2">quillbolt.bsky.social</h3>
          <p className="text-gray-400">@quillbolt.bsky.social</p>
        </div>

        <div className="mt-4 bg-gray-800 rounded-lg">
          {settingsOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-none"
            >
              <span className="text-xl">{option.icon}</span>
              <span className="text-white">{option.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 text-red-500 text-center py-2 cursor-pointer hover:text-red-600">
          Log out
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
