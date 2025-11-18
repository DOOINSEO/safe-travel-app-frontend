import apiClient from './apiClient';

export const getUserProfile = async (userId) => {
  return await apiClient.get(`/user`);
};

export const updateUserProfile = async (userId, dataToUpdate) => {
  return await apiClient.put(`/user`, dataToUpdate);
};

export const deleteUser = async (userId) => {
  return await apiClient.delete(`/user`);
};

export const getEmergency = async () => {
  return await apiClient.get('/emergency');
};

export const createEmergency = async (data) => {
  return await apiClient.post('/emergency', data);
};

export const updateEmergency = async (data) => {
  return await apiClient.put('/emergency', data);
};

export const deleteEmergency = async () => {
  return await apiClient.delete('/emergency');
};
