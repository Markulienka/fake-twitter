import type { SignupData } from '../../types';

interface SignupFormProps {
  signupData: SignupData;
  setSignupData: (data: SignupData) => void;
  handleSignUp: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export default function SignupForm({ signupData, setSignupData, handleSignUp, isLoading }: SignupFormProps) {
  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          required
          autoComplete="username"
          value={signupData.username}
          onChange={(e) => setSignupData({...signupData, username: e.target.value})}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter username"
          disabled={isLoading}
          spellCheck={false}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          required
          autoComplete="email"
          value={signupData.email}
          onChange={(e) => setSignupData({...signupData, email: e.target.value})}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter email"
          disabled={isLoading}
          spellCheck={false}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          required
          autoComplete="new-password"
          value={signupData.password}
          onChange={(e) => setSignupData({...signupData, password: e.target.value})}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter password (min 6 characters)"
          minLength={6}
          disabled={isLoading}
          spellCheck={false}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isLoading ? 'Creating Account...' : 'Sign Up'}
      </button>
    </form>
  );
}
