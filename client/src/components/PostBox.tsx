import React, { useState } from 'react';
import { FaImage, FaVideo, FaSmile, FaGift, FaPen } from 'react-icons/fa';
import { ScreenMode } from '../App';
type NewPostButtonProps = {
  mode: ScreenMode;
  isSidebar?: boolean; // Flag to determine if it's in the sidebar
  onClick?: () => void; // Optional click handler
};



const MAX_CHAR = 300;

// Main PostBox component that can be used as a modal
const PostBox: React.FC<{onClose: () => void}> = ({onClose}) => {
  const [text, setText] = useState('');
  const [attachments, setAttachments] = useState<{ type: string; file: File | null }[]>([]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_CHAR) {
      setText(e.target.value);
    }
  };

  const handleAttach = (type: string, file: File | null = null) => {
    setAttachments([...attachments, { type, file }]);
  };

  const handlePost = () => {
    if (text.trim() || attachments.length) {
      console.log('Posting:', { text, attachments });
      setText('');
      setAttachments([]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="PostBox bg-gray-900 p-4 rounded-lg w-full max-w-lg text-white">
        <div className="flex justify-end mb-2">
          <button onClick={onClose} className="text-white font-medium">
            Cancel
          </button>
        </div>
        
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="What's up?"
          className="w-full bg-gray-800 text-white p-2 rounded-md resize-none focus:outline-none"
          rows={3}
        ></textarea>
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex space-x-4 text-blue-400">
            <button onClick={() => handleAttach('image')}> <FaImage size={20} /> </button>
            <button onClick={() => handleAttach('video')}> <FaVideo size={20} /> </button>
            <button onClick={() => handleAttach('gif')}> <FaGift size={20} /> </button>
            <button onClick={() => handleAttach('emoji')}> <FaSmile size={20} /> </button>
          </div>
          <div className="text-gray-400 text-sm">{text.length} / {MAX_CHAR}</div>
        </div>
        
        <button
          onClick={handlePost}
          disabled={!text.trim() && attachments.length === 0}
          className={`mt-3 w-full p-2 rounded-md text-white font-bold ${text.trim() || attachments.length ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-600 cursor-not-allowed'}`}
        >
          Post
        </button>
      </div>
    </div>
  );
};


const NewPostButton: React.FC<NewPostButtonProps> = ({ mode, onClick }) => {
  if (mode === 'full') {
    return (
      <div className="w-full p-4">
        <button
          aria-label="Create Post"
          onClick={onClick}
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
        onClick={onClick}
        className="bg-blue-500 text-white px-3 py-2 rounded-full flex items-center space-x-1"
      >
        <FaPen />
        {mode === 'icon' && <span>New Post</span>}
      </button>
    </div>
  );
};



// Component that includes both the trigger button and the modal
// Integrated PostBoxModal that uses NewPostButton for display
const PostBoxModal: React.FC<{mode: ScreenMode; isSidebar?: boolean}> = ({ mode, isSidebar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <NewPostButton mode={mode} isSidebar={isSidebar} onClick={openModal} />
      {isModalOpen && <PostBox onClose={closeModal} />}
    </>
  );
};

export { PostBox, NewPostButton, PostBoxModal };
export default PostBoxModal;
