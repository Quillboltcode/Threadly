import React, { useEffect , useState} from 'react';

const RightSidebar = () => {
  const [trendingTopics, setTrendingTopics] = useState([]);

  useEffect(() => {
    // Fetch sample data (Replace with actual API calls)
    const fetchData = async () => {
      setTrendingTopics(["#ReactJS", "#TailwindCSS", "#GraphQL", "#Frontend"]);
    };
    fetchData();
  }, []);

  return (
    <div className="w-1/4 hidden lg:block bg-gray-100 h-screen fixed right-0 top-0 pt-20">
      <div className="p-4">
        <h2 className="font-bold mb-4">Trending</h2>
        <ul className="space-y-2">
          {trendingTopics.map(topic => (
            <li key={topic} className="hover:bg-gray-200 rounded-lg p-2">{topic}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RightSidebar;
