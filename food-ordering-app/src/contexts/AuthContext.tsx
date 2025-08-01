import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration - in production, this would be from a backend
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'مدیر سیستم',
    email: 'admin@company.com',
    createdAt: new Date(),
  },
  {
    id: '2',
    username: 'chef',
    password: 'chef123',
    role: 'chef',
    name: 'آشپز',
    email: 'chef@company.com',
    createdAt: new Date(),
  },
  {
    id: '3',
    username: 'user1',
    password: 'user123',
    role: 'regular',
    name: 'کاربر عادی',
    email: 'user@company.com',
    createdAt: new Date(),
  },
  {
    id: '4',
    username: 'vip1',
    password: 'vip123',
    role: 'vip',
    name: 'کاربر ویژه',
    email: 'vip@company.com',
    createdAt: new Date(),
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(
      u => u.username === username && u.password === password
    );
    
    if (foundUser) {
      const userWithoutPassword = { ...foundUser };
      delete (userWithoutPassword as any).password;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { mockUsers };