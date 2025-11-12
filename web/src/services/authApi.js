import apiClient from './apiClient';

export const signup = async ({loginId, password, name, phone, nickname, alarmEnabled}) => {
  return apiClient.post('/user', {loginId, password, name, phone, nickname, alarmEnabled});
};

export const login = async (loginId, password) => {
  return apiClient.post('/user/login', {loginId, password});
};

export const authAPI = {
  login: ({loginId, password}) => apiClient.post('/user/login', {loginId, password}),
  register: (payload) => apiClient.post('/user', payload),
};
