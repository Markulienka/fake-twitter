import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SignupData, AuthResponse } from '../../types';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export function useSignup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (signupData: SignupData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });
      if (response.ok) {
        const data: AuthResponse = await response.json();
        localStorage.setItem('authToken', data.token);
        navigate('/');
      } else {
        setError("Sign up failed " + response.statusText);
      }
    } catch (error) {
        setError((error as Error).message);
    } finally {
        setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
}
