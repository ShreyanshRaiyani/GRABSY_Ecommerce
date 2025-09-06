import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('grabsy_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = JSON.parse(localStorage.getItem('grabsy_users') || '[]');
      const existingUser = users.find(u => u.email === email && u.password === password);
      
      if (existingUser || (email === 'demo@gamil.com' && password === 'password')) {
        const userData = existingUser || {
          id: '1',
          name: 'Demo User',
          email: 'demo@gmail.com',
          phone: '+91 9876543210',
          avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg'
        };
        
        setUser(userData);
        localStorage.setItem('grabsy_user', JSON.stringify(userData));
        return { success: true };
      }
      
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, phone, password) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = JSON.parse(localStorage.getItem('grabsy_users') || '[]');
      const existingUser = users.find(u => u.email === email);
      
      if (existingUser) {
        return { success: false, error: 'User already exists' };
      }
      
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        password,
        avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg'
      };
      
      users.push(newUser);
      localStorage.setItem('grabsy_users', JSON.stringify(users));
      
      const userData = { ...newUser };
      delete userData.password;
      
      setUser(userData);
      localStorage.setItem('grabsy_user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('grabsy_user');
  };

  const updateProfile = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('grabsy_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};