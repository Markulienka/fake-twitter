import { useState } from 'react';
import { useLogin } from './useLogin';
import { useSignup } from './useSignup';
import AuthHeader from '../../components/AuthHeader';
import LoginForm from '../../components/LoginForm';
import SignupForm from '../../components/SignUpForm';
import AuthToggle from '../../components/AuthToggle';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const { login, isLoading: isLoginLoading, error: loginError } = useLogin();
  const { signup, isLoading: isSignupLoading, error: signupError } = useSignup();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <AuthHeader isSignUp={isSignUp} />

        <div className="bg-white p-6 rounded-lg shadow-md">
          {(isSignUp ? signupError : loginError) && (
            <div className="text-red-600 text-sm mb-4">
              {isSignUp ? signupError : loginError}
            </div>
          )}

          {isSignUp ? (
            <SignupForm 
              signupData={signupData}
              setSignupData={setSignupData}
              handleSignUp={e => { e.preventDefault(); signup(signupData); }}
              isLoading={isSignupLoading}
            />
          ) : (
            <LoginForm 
              loginData={loginData}
              setLoginData={setLoginData}
              handleLogin={e => { e.preventDefault(); login(loginData); }}
              isLoading={isLoginLoading}
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
