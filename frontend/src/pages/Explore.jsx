import React, { useState } from "react";
import Feed from "../components/Feed";
import Discover from "../components/Discover";

const Explore = () => {
  const [activeTab, setActiveTab] = useState("feed"); // Default to Feed

  return (
    <div className="max-w-2xl mx-auto mt-16 p-4">
      {/* Tabs */}
      <div className="flex space-x-4 border-b pb-2">
        <button
          className={`px-4 py-2 text-lg font-semibold ${
            activeTab === "feed" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("feed")}
        >
          Feed
        </button>
        <button
          className={`px-4 py-2 text-lg font-semibold ${
            activeTab === "discover" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("discover")}
        >
          Discover
        </button>
      </div>

      {/* Content */}
      <div className="mt-4">
        {activeTab === "feed" ? <Feed /> : <Discover />}
      </div>
    </div>
  );
};

export default Explore;
