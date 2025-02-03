import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';


const Post = ({ post }) => {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow">
      <h3 className="font-bold text-lg">{post.author}</h3>
      <p className="text-gray-700">{post.content}</p>
      {post.image && <img src={post.image} alt="Post" className="mt-4 rounded-lg" />}
      <div className="flex space-x-4 mt-4 text-blue-600">
        <button><FavoriteIcon className='mr-2 hover:text-red-500' />Like</button>
        <button><CommentIcon className='mr-2 hover:text-blue-500'/>Comment</button>
        <button><ShareIcon className='mr-2 hover:text-green-500' />Share</button>
      </div>
    </div>
  );
};

export default Post;
