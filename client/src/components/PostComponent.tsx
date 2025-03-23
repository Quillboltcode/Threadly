import React from "react";
import { FaComment, FaHeart, FaRetweet } from "react-icons/fa";

export interface PostProps {
  username: string;
  handle: string;
  timestamp: string;
  content: string;
  imageUrl?: string;
  isReposted?: boolean;
  repostedBy?: string;
}

const PostComponent: React.FC<PostProps> = ({
  username,
  handle,
  timestamp,
  content,
  imageUrl,
  isReposted,
  repostedBy
}) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      {isReposted && (
        <div className="flex items-center mb-2">
          <FaRetweet className="text-gray-500 mr-2" />
          <span className="text-gray-400">Reposted by {repostedBy}</span>
        </div>
      )}
      <div className="mb-2">
        <span className="font-bold">{username}</span>
        <span className="text-gray-400">{handle} · {timestamp}</span>
      </div>
      <p className="mb-2">{content}</p>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Post image"
          className="rounded-lg"
        />
      )}
      {/* Button to share, like, and comment */}
      <FaRetweet className="text-gray-500 mr-2" />
      <FaHeart className="text-gray-500 mr-2" />
      <FaComment className="text-gray-500" />
    </div>

  );
};

export default PostComponent;
