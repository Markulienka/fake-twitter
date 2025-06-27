import type { LoginData } from '../../types';

interface LoginFormProps {
  loginData: LoginData;
  setLoginData: (data: LoginData) => void;
  handleLogin: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export default function LoginForm({ loginData, setLoginData, handleLogin, isLoading }: LoginFormProps) {
  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          required
          autoComplete="username"
          value={loginData.username}
          onChange={(e) => setLoginData({...loginData, username: e.target.value})}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter username"
          disabled={isLoading}
          spellCheck={false}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={loginData.password}
          onChange={(e) => setLoginData({...loginData, password: e.target.value})}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter password"
          disabled={isLoading}
          spellCheck={false}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
}
