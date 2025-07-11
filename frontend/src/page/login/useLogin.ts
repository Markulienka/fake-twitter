import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LoginData, AuthResponse } from '../../types';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export function useLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (loginData: LoginData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      if (response.ok) {
        const data: AuthResponse = await response.json();
        localStorage.setItem('authToken', data.token);
        navigate('/');
      } else {
        setError("Login failed " + response.statusText);
      }
    } catch (error) {
        setError((error as Error).message);
    } finally {
        setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
