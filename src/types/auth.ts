export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthRequest {
  identifier: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}
