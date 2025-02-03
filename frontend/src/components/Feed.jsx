import React from 'react';
import Post from './Post';

const Feed = () => {
  const posts = [
    { id: 1, author: 'John Doe', content: 'Hello World!', image: 'https://via.placeholder.com/150' },
    { id: 2, author: 'Jane Smith', content: 'Loving ReactJS!', image: null },
    { id: 3, author: 'Alice', content: 'Check out this awesome view!', image: 'https://via.placeholder.com/300' },
  ];

  return (
    <div className="w-full mt-4 p-4 mx-auto pt-20">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
