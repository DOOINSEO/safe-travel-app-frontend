// src/services/authApi.js

import { apiClient } from './apiClient';

const transformLoginData = (serverData) => ({
    accessToken: serverData.token,
    userName: serverData.user_name,
    userEmail: serverData.user_email,
});

const transformSignUpData = (serverData) => ({
    userId: serverData.user_id,
    message: serverData.message,
});

export const login = async (loginId, password) => {
    const serverData = await apiClient.post('/auth/login', { loginId, password });
    return transformLoginData(serverData);
};

export const signup = async (signupData) => {
    const serverData = await apiClient.post('/auth/signup', signupData);
    return transformSignUpData(serverData);
};