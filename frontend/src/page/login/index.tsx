import { useState } from 'react';
import { useLogin } from './useLogin';
import AuthHeader from '../../components/AuthHeader';
import LoginForm from '../../components/LoginForm';
import SignupForm from '../../components/SignUpForm';
import AuthToggle from '../../components/AuthToggle';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { 
    loginData, 
    signupData,
    setLoginData, 
    setSignupData,
    handleLogin, 
    handleSignUp,
    isLoading, 
    error 
  } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <AuthHeader isSignUp={isSignUp} />

        <div className="bg-white p-6 rounded-lg shadow-md">
          {error && (
            <div className="text-red-600 text-sm mb-4">
              {error}
            </div>
          )}

          {isSignUp ? (
            <SignupForm 
              signupData={signupData}
              setSignupData={setSignupData}
              handleSignUp={handleSignUp}
              isLoading={isLoading}
            />
          ) : (
            <LoginForm 
              loginData={loginData}
              setLoginData={setLoginData}
              handleLogin={handleLogin}
              isLoading={isLoading}
            />
          )}

          <AuthToggle 
            isSignUp={isSignUp} 
            onToggle={() => setIsSignUp(!isSignUp)} 
          />
        </div>
      </div>
    </div>
  );
}
