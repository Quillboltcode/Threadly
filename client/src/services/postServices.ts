import axios from 'axios';
import { Post } from '../types/post';


const url = import.meta.env.VITE_API_URL ? 'http://localhost:8500/api' : 'https://api.example.com';
// const url = 'http://localhost:8500/api';

export const PostService = {
  // api/posts?page=1&limit=10
  getPosts: async (page = 1, limit = 10) => {
    const response = await axios.get(`${url}/posts?page=${page}&limit=${limit}`);
    // respone are :
    /* {
      "totalPosts": 5,
      "page": 1,
      "totalPages": 1,
      "limit": 10,
      "posts": [
        {
          "content": "Just finished a 10K run! 🏃‍♂️",
          "tags": [
            "fitness",
            "running"
          ],
          "author": {},
          "image": [],
          "likeCount": 39,
          "commentCount": 0,
          "createdAt": {},
          "updatedAt": {}
        }, */
        const posts = response.data.posts.map((post: any) => ({
          id: post._id,
          content: post.content,
          tag: post.tags,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          image: post.image,
          like: post.likeCount,// assuming share count is not provided in the response
          comment: post.commentCount,
          author: {
            name: post.author.username,
            email: post.author.email,
            avatar: post.author.avatar,
          },
        })) as Post[];
      
        return posts;
      },

  getSinglePost: async (id: string) => {
    if (!id) {
      throw new Error('Post ID is required');
    }

    try {
      const response = await axios.get(`${url}/posts/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      } else {
        console.error(error);
      }

      throw error;
    }
  },

  //Create post api with auth-header
  createPost: async (post: any) => {
    const response = await axios.post(`${url}/posts`, post);
    return response.data;
  },

  //Update post api with auth-header
  updatePost: async (id: string, post: any) => {
    const response = await axios.put(`${url}/posts/${id}`, post);
    return response.data;
  },

  //Delete post api with auth-header
  deletePost: async (id: string) => {
    const response = await axios.delete(`${url}/posts/${id}`);
    return response.data;
  },

  getCommonTags: async () => {
    try {
      const response = await axios.get(`${url}/posts/tags`);
      if (Array.isArray(response.data)) {
        return response.data.map((tagData: any) => ({
          tag: tagData.tag,
          count: tagData.count,
        }));
      } else {
        console.error('Unexpected response format:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  }

}