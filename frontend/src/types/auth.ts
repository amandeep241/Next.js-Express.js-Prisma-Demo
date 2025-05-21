export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Webhook {
  id: number;
  url: string;
  event: string;
  isActive: boolean;
  createdAt: string;
}