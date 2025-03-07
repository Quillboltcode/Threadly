import React, { useEffect, useState } from 'react';
import { FaCircleNotch} from 'react-icons/fa'
const RightSidebar: React.FC = () => {
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);

  useEffect(() => {
    // Fetch sample data (Replace with actual API calls)
    const fetchData = async () => {
      setTrendingTopics(["#ReactJS", "#TailwindCSS", "#GraphQL", "#Frontend"]);
    };
    fetchData();
  }, []);


  return (
    <div className="w-1/4 hidden lg:block fixed right-0 p-4 bg-gray-800">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 bg-gray-700 text-white rounded-lg"
        />
      </div>
      <div className="mb-4">
        <h2 className="text-gray-400 mb-2">GETTING STARTED</h2>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <FaCircleNotch></FaCircleNotch>
            <i className="fas fa-circle-notch text-blue-500"></i>
            <span>Like 10 posts</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaCircleNotch></FaCircleNotch>
            <i className="fas fa-circle-notch text-blue-500"></i>
            <span>Follow 7 accounts</span>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-gray-400 mb-2">Discover</h2>
        <a className="text-blue-500" href="#">
          Following
        </a>
      </div>
      <div className="mb-4">
        <h2 className="text-gray-400 mb-2">Trending</h2>
        <div className="flex flex-wrap gap-2">
          <span className="bg-gray-700 text-white px-2 py-1 rounded-full">Diana Taurasi</span>
          <span className="bg-gray-700 text-white px-2 py-1 rounded-full">Wonder Woman</span>
          <span className="bg-gray-700 text-white px-2 py-1 rounded-full">FAA Controversy</span>
          <span className="bg-gray-700 text-white px-2 py-1 rounded-full">Apple Shareholders</span>
          <span className="bg-gray-700 text-white px-2 py-1 rounded-full">Fable</span>
          <span className="bg-gray-700 text-white px-2 py-1 rounded-full">MSNBC Firing</span>
        </div>
      </div>
      <div className="text-gray-400 space-x-4">
        <a className="hover:underline" href="#">
          Feedback
        </a>
        <a className="hover:underline" href="#">
          Privacy
        </a>
        <a className="hover:underline" href="#">
          Terms
        </a>
        <a className="hover:underline" href="#">
          Help
        </a>
      </div>
    </div>
  );
};

export default RightSidebar;