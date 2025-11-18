import apiClient from './apiClient';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (loginId, password) => {
  const response = await axios.post(
    `${API_BASE_URL}/user/login`,
    {loginId, password},
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return {
    data: response.data,
    headers: response.headers,
  };
};

export const signup = async (signupData) => {
  return await apiClient.post('/user', signupData);
};
