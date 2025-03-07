import { useEffect, useState } from "react";
import { PostService } from "../services/Post";
import { Post } from "../types/post";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
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