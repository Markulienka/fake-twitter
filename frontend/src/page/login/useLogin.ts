import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LoginData, SignupData } from '../../types';
import { performLogin, performSignUp, storeAuthToken } from '../../utils/auth';

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
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const result = await performLogin(loginData);
    
    if (result.data) {
      storeAuthToken(result.data.token);
      navigate('/');
    } else {
      setError(result.error || 'Login failed');
    }
    
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const result = await performSignUp(signupData);
    
    if (result.data) {
      storeAuthToken(result.data.token);
      navigate('/');
    } else {
      setError(result.error || 'Sign up failed');
    }
    
    setIsLoading(false);
  };

  return { 
    loginData, 
    signupData, 
    setLoginData, 
    setSignupData, 
    handleLogin, 
    handleSignUp, 
    isLoading, 
    error 
  };
}
