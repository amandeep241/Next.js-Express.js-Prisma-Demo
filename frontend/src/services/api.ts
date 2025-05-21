import axios from 'axios';
import { AuthResponse } from '@/types/auth';
import { Message } from '@/types/message';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
});

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  },
  register: async (email: string, password: string, name: string) => {
    const response = await api.post<AuthResponse>('/auth/register', { email, password, name });
    return response.data;
  }
};

export const webhook = {
  sendMessage: async (data: { name: string; message: string; userId: string }) => {
    const response = await api.post<Message>('/webhook', data);
    return response.data;
  },
  
  getMessages: async () => {
    const response = await api.get<Message[]>('/webhook');
    return response.data;
  }
};