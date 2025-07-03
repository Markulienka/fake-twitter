export type Tweet = {
  id: string;
  text: string;
  authorName: string;
  userId: string;
  likesCount: number;
};

export interface LoginData {
  username: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
}

export interface UserData {
  userId: string | null;
  username: string | null;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email?: string; 
  };
}