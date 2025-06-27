import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LoginData, SignupData } from '../../types';

export function useLogin() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: ''
  });
  
  const [signupData, setSignupData] = useState<SignupData>({
    username: '',
    email: '',
    password: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${backendURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data: { token: string } = await response.json();
        localStorage.setItem('authToken', data.token);
        navigate('/');
        
      } else {
        setError('Login failed');
      }
    } catch (error) {
        setError('Network error. Please try again.');
        console.error('Login error:', error);
    } finally {
        setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${backendURL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        const data: { token: string } = await response.json();
        localStorage.setItem('authToken', data.token);
        navigate('/');
        
      } else {
          setError('Sign up failed');
      }
    } catch (error) {
        setError('Network error. Please try again.');
        console.error('Signup error:', error);
    } finally {
        setIsLoading(false);
    }
  };

  return { loginData, signupData, setLoginData, setSignupData, handleLogin, handleSignUp, isLoading, error };
}
