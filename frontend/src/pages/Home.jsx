import React from "react";
import { Link } from "react-router-dom";
import AuthButtons from "../components/AuthButtons";
import Post from "../components/Post";

const Home = () => {
  const trendingPosts = [
    { id: 1, user: "Alice", content: "React 19 is coming soon! 🚀" },
    { id: 2, user: "Bob", content: "AI-generated art is getting crazy! 🤯" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <header className="w-full py-16 text-center bg-blue-600 dark:bg-gray-800 text-white">
        <h1 className="text-4xl font-bold">Welcome to SocialMedia</h1>
        <p className="text-lg mt-2">Connect, Share, and Explore Trending Topics!</p>
        <AuthButtons />
      </header>

      {/* Trending Posts */}
      <section className="max-w-4xl w-full p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">🔥 Trending Posts</h2>
        {trendingPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </section>

      {/* Quick Navigation */}
      <footer className="py-6 text-center">
        <Link to="/explore" className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600">
          Discover More
        </Link>
      </footer>
    </div>
  );
};

export default Home;
