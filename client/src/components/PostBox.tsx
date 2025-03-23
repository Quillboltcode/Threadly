import React, { useState } from 'react';
import { FaImage, FaVideo, FaSmile, FaGift } from 'react-icons/fa';

const MAX_CHAR = 300;

const PostBox: React.FC = () => {
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
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg w-full max-w-lg text-white">
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
  );
};

export default PostBox;
