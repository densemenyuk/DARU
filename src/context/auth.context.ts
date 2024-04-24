import React from 'react';
import { AuthResponse } from '../types/auth';

export interface AuthState {
  userId: number;
  username: string;
  email: string;
  // changeUsername: (username: string) => void;
  // changeEmail: (email: string) => void;
  login: (data: AuthResponse) => void;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthState | undefined>(
  undefined
);
