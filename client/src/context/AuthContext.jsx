import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL || '';
axios.defaults.baseURL = apiBaseUrl;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Configure global Axios token on boot
  useEffect(() => {
    const initializeAuth = async () => {
      const savedUser = localStorage.getItem('nutriscan_user');
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setUser(parsed);
          axios.defaults.headers.common['Authorization'] = `Bearer ${parsed.token}`;
          
          // Re-validate profile with backend
          const res = await axios.get('/api/auth/profile');
          if (res.data.success) {
            const updatedUser = { ...parsed, ...res.data.data };
            setUser(updatedUser);
            localStorage.setItem('nutriscan_user', JSON.stringify(updatedUser));
          }
        } catch (error) {
          console.warn('Session expired or server unavailable. Logging out...');
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      if (res.data.success) {
        const userData = res.data.data;
        setUser(userData);
        localStorage.setItem('nutriscan_user', JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please try again.'
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post('/api/auth/register', { name, email, password });
      if (res.data.success) {
        const userData = res.data.data;
        setUser(userData);
        localStorage.setItem('nutriscan_user', JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed.'
      };
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const res = await axios.put('/api/user/update', profileData);
      if (res.data.success) {
        const updatedUser = { ...user, ...res.data.data };
        setUser(updatedUser);
        localStorage.setItem('nutriscan_user', JSON.stringify(updatedUser));
        return { success: true, message: res.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update profile.'
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nutriscan_user');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
