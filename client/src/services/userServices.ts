import axios from "axios";
import { User } from "../types/user";

const url = import.meta.env['VITE_API_URL'] ? 'http://localhost:8500' : 'https://api.example.com';

export const UserService = {
    // api/users/profile
    getProfile: async () => {
        const response = await axios.get(`${url}/users/profile`);
        return response.data;
    },
    // api/users/profile
    updateProfile: async (user: User) => {
        const response = await axios.put(`${url}/users/profile`, user);
        return response.data;
    },
    //api/users/{id}
    getUser: async (id: string) => {
        const response = await axios.get(`${url}/users/${id}`);
        return response.data;
    },
    //api/users/follow/{id}
    followUser: async (id: string) => {
        const response = await axios.post(`${url}/users/follow/${id}`);
        return response.data;
    },
    //api/users/suggestions
    getSuggestions: async () => {
        const response = await axios.get(`${url}/users/suggestions`);
        return response.data;
    }

}




