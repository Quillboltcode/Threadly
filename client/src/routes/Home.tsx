
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/Post';
import { createFileRoute } from '@tanstack/react-router';



interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.content}</p>
            <p className="text-sm text-gray-400 mt-4">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Route = createFileRoute('/Home')({
  component: Home,
})
