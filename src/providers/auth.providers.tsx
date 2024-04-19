import React, { PropsWithChildren, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { AuthResponse } from '../types/auth';

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    userId: number;
  }>();

  const login = (data: AuthResponse) => {
    setUserData({
      username: data.user.username,
      email: data.user.email,
      userId: data.user.id,
    });
    localStorage.setItem('events-auth', data.jwt);
    localStorage.setItem('events-profile', JSON.stringify(data.user));
  };

  const logout = () => {
    setUserData(undefined);
    localStorage.removeItem('events-auth');
    localStorage.removeItem('events-profile');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('events-profile');
    if (!savedUser) {
      return;
    }
    const parsed = JSON.parse(savedUser) as AuthResponse['user'];
    setUserData({
      username: parsed.username,
      email: parsed.email,
      userId: parsed.id,
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userId: userData?.userId || 0,
        username: userData?.username || '',
        email: userData?.email || '',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
