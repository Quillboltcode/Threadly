import React from 'react';
import { FaPen } from 'react-icons/fa';
import { ScreenMode } from '../App';

type NewPostButtonProps = {
  mode: ScreenMode;
  isSidebar?: boolean; // Flag to determine if it's in the sidebar
};

const NewPostButton: React.FC<NewPostButtonProps> = ({ mode }) => {
  if (mode === 'full') {
    return (
      <div className="w-full p-4">
        <button
          aria-label="Create Post"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2"
        >
          <FaPen />
          <span>New Post</span>
        </button>
      </div>
    );
  }

  return (
    <div className="absolute bottom-4 left-4 z-[999]">
      <button
        aria-label="Create Post"
        className="bg-blue-500 text-white px-3 py-2 rounded-full flex items-center space-x-1"
      >
        <FaPen />
        {mode === 'icon' && <span>New Post</span>}
      </button>
    </div>
  );
};

export default NewPostButton;
