import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PostService } from "../services/postServices";


export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const data = await PostService.getPosts();
      return data;
    },
    placeholderData : keepPreviousData,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
