import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api/client';
import authApi from '../services/api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('slms_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('slms_token') || null;
  });

  const [loading, setLoading] = useState(!token || !user);

  const login = (authToken, authUser) => {
    setToken(authToken);
    setUser(authUser);
    api.setToken(authToken);
    localStorage.setItem('slms_user', JSON.stringify(authUser));
    localStorage.setItem('slms_token', authToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    api.setToken(null);
    localStorage.removeItem('slms_user');
    localStorage.removeItem('slms_token');
  };

  const switchRole = async (targetRole) => {
    setLoading(true);
    try {
      const credentials =
        targetRole === 'librarian'
          ? { email: 'librarian@library.com', password: 'Librarian@123' }
          : { email: 'student@university.edu', password: 'Student@123' };

      const res = await authApi.login(credentials);
      if (res.success && res.data) {
        login(res.data.token, res.data.user);
        return res.data.user;
      }
    } catch (err) {
      console.error('Failed to switch role:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If no existing session, automatically log in as Student on launch
    if (!token || !user) {
      switchRole('student');
    } else {
      api.setToken(token);
    }

    const handleAuthExpired = () => {
      // Auto-recover session as student on token expiration
      switchRole('student');
    };

    window.addEventListener('auth:expired', handleAuthExpired);
    return () => window.removeEventListener('auth:expired', handleAuthExpired);
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    isStudent: user?.role === 'student',
    isLibrarian: user?.role === 'librarian',
    login,
    logout,
    switchRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
