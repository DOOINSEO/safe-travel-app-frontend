import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: null,
  userId: null,
  isAuthenticated: false,
  
  setToken: (token) => {
    set({ token, isAuthenticated: !!token });
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  },
  
  setUserId: (userId) => {
    set({ userId });
    if (userId) {
      localStorage.setItem('userId', userId);
    } else {
      localStorage.removeItem('userId');
    }
  },
  
  logout: () => {
    set({ token: null, userId: null, isAuthenticated: false });
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userInfo');
  },
  
  initAuth: () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token) {
      set({ token, isAuthenticated: true });
    }
    if (userId) {
      set({ userId });
    }
  },
}));

export default useAuthStore;

