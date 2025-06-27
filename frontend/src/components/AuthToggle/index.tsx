interface AuthToggleProps {
  isSignUp: boolean;
  onToggle: () => void;
}

export default function AuthToggle({ isSignUp, onToggle }: AuthToggleProps) {
  return (
    <div className="mt-6 text-center">
      <button
        onClick={onToggle}
        className="text-blue-600 hover:text-blue-800 text-sm"
      >
        {isSignUp 
          ? 'Already have an account? Sign In' 
          : "Don't have an account? Sign Up"
        }
      </button>
    </div>
  );
}
