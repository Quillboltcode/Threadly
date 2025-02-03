import React, { useState, useEffect } from "react";

const Discover = () => {
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch sample data (Replace with actual API calls)
    const fetchData = async () => {
      setTrendingTopics(["#ReactJS", "#TailwindCSS", "#GraphQL", "#Frontend"]);
      setSuggestedUsers([
        { id: 1, name: "John Doe", username: "@johndoe" },
        { id: 2, name: "Jane Smith", username: "@janesmith" },
        { id: 3, name: "Alice Johnson", username: "@alicej" },
      ]);
      setPosts([
        {
          id: 1,
          author: "John Doe",
          content: "Exploring React with TailwindCSS!",
          image: "https://via.placeholder.com/300x200",
        },
        {
          id: 2,
          author: "Jane Smith",
          content: "GraphQL is the future of APIs. 🧑‍💻",
          image: "https://via.placeholder.com/300x200",
        },
        {
          id: 3,
          author: "Alice Johnson",
          content: "Designing a new frontend with SWC & Vite.",
          image: "https://via.placeholder.com/300x200",
        },
      ]);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      {/* Trending Topics */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Trending Topics</h2>
        <ul className="flex flex-wrap gap-2">
          {trendingTopics.map((topic, index) => (
            <li
              key={index}
              className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {topic}
            </li>
          ))}
        </ul>
      </section>

      {/* Suggested Users */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">Suggested Users</h2>
        <ul className="space-y-3">
          {suggestedUsers.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
            >
              <div>
                <p className="font-bold">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.username}
                </p>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                Follow
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Post Discovery */}
      <section>
        <h2 className="text-xl font-bold mb-4">Discover Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={post.image}
                alt="Post"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold">{post.author}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {post.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Discover;
