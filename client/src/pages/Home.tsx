import { usePosts } from "../hooks/usePost";
import TabNavigation from "../components/TabNavigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import PostComponent, { PostProps } from "../components/PostComponent";
const Home = () => {
  const { posts, loading } = usePosts();
  
  return (
    <div className="mt-4">
      <Suspense fallback={
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-8 h-8 rounded-full border-4 border-gray-500 border-t-transparent"
        />
      }>
        {posts.length > 0 ? (
          posts.map((post: PostProps) => (
            <PostComponent
              key={post.username} // or any other unique identifier
              username={post.username}
              handle={post.handle}
              timestamp={post.timestamp}
              content={post.content}
              imageUrl={post.imageUrl}
              isReposted={post.isReposted}
              repostedBy={post.repostedBy}
            />
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </Suspense>
    </div>
  );
};

export default Home;