import apiClient from './apiClient';

export const login = async (loginId, password) => {
  return await apiClient.post('/user/login', {loginId, password});
};

export const signup = async (signupData) => {
  return await apiClient.post('/user', signupData);
};
