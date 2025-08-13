import axios from 'axios';
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    if (response.config.method !== 'get') { // Don't show toast for GET requests
      const message = response.config.successMessage || `${response.config.method.toUpperCase()} request successful!`;
      toast.success(message);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      toast.error(`Error: ${error.response.status} - ${error.response.data.message || error.message}`);
    } else if (error.request) {
      toast.error("Error: No response received from server.");
    } else {
      toast.error(`Error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

const todoService = {
  getAllTodos: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  addTodo: async (todo, config) => {
    const response = await axios.post(API_URL, todo, config);
    return response.data;
  },

  updateTodo: async (id, todo, config) => {
    const response = await axios.put(`${API_URL}/${id}`, todo, config);
    return response.data;
  },

  deleteTodo: async (id, config) => {
    const response = await axios.delete(`${API_URL}/${id}`, config);
    return response.data;
  },
};

export default todoService;
