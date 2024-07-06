import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';

interface User {
  id: number;
  username: string;
  email: string;
  token: string;
}

interface AuthContextData {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post('/auth/token', { username, password });
      const loggedInUser: User = { ...response.data, username };
      setUser(loggedInUser);
      await AsyncStorage.setItem('user', JSON.stringify(loggedInUser));
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      await api.post('/auth/register', { username, email, password });
      await login(username, password);
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
