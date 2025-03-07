import axios from 'axios';

// Pull post from API in env.development or env.production

const url = import.meta.env.VITE_API_URL ? 'http://localhost:8500' : 'https://api.example.com';

export const PostService = {
  // api/posts?page=1&limit=10
  getPosts: async () => {
    const response = await axios.get(`${url}/posts`);
    return response.data;
  },

  getSinglePost: async (id: string) => {
    const response = await axios.post(`${url}/posts/${id}`);
    return response.data;
  },

  //Create post
  createPost: async (post: any) => {
    const response = await axios.post(`${url}/posts`, post);
    return response.data;
  },


}