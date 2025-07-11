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

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email?: string; 
  };
}