import { useEffect, useState } from "react";
import { PostService } from "../services/Post";
// import { Post } from "../types/post";
import { PostProps } from "../components/PostComponent";

export const usePosts = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await PostService.getPosts();
      setPosts(response.data);
      setLoading(false);
    };
    fetchPosts();
    },[]);
    return { posts, loading };
    };