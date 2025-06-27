interface AuthHeaderProps {
  isSignUp: boolean;
}

export default function AuthHeader({ isSignUp }: AuthHeaderProps) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900">
        {isSignUp ? 'Create Account' : 'Sign In'}
      </h2>
      <p className="mt-2 text-gray-600">
        {isSignUp ? 'Join Fake Twitter today' : 'Welcome back to Fake Twitter'}
      </p>
    </div>
  );
}
