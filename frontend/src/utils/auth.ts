import type { LoginData, SignupData, ApiResponse, AuthResponse } from "../types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const storeAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

export async function performLogin(credentials: LoginData): Promise<ApiResponse<AuthResponse>> {
  return performAuthRequest('/auth/login', credentials);
}

export async function performSignUp(userData: SignupData): Promise<ApiResponse<AuthResponse>> {
  return performAuthRequest('/auth/signup', userData);
}

async function performAuthRequest(
  endpoint: string, 
  data: LoginData | SignupData
): Promise<ApiResponse<AuthResponse>> {
  try {
    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      return { data: responseData, error: null };
    } else {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      return { 
        data: null, 
        error: errorData.message || `Authentication failed (${response.status})` 
      };
    }
  } catch (error) {
    console.error(`Auth error (${endpoint}):`, error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Network error. Please try again.' 
    };
  }
}
