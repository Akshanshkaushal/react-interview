// Step 12: Create the main App component
// In an interview, after building forms, create the App to manage state and render components.
// Use useState for mode toggle and user auth state.
// Use useEffect to load user from localStorage on mount.

import { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm.jsx';
import SignupForm from './components/SignupForm.jsx';

export default function App() {
  // Step 13: Define app-level state
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [user, setUser] = useState(null);

  // Step 14: Load user from localStorage on app start
  useEffect(() => {
    const stored = localStorage.getItem('authUser');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // Step 15: Handle successful auth
  const handleAuthSuccess = (currentUser) => {
    localStorage.setItem('authUser', JSON.stringify(currentUser));
    setUser(currentUser);
  };

  // Step 16: Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem('authUser');
    setUser(null);
  };

  // Step 17: Render the app
  // Show toggle buttons, current form, and sign out if logged in
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-4">Auth App</h1>

        {!user ? (
          <>
            <div className="flex mb-4">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 p-2 ${mode === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Login
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`flex-1 p-2 ${mode === 'signup' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              >
                Signup
              </button>
            </div>

            {mode === 'login' ? (
              <LoginForm onSuccess={handleAuthSuccess} />
            ) : (
              <SignupForm onSuccess={handleAuthSuccess} />
            )}
          </>
        ) : (
          <div className="text-center">
            <p>Welcome, {user.name}!</p>
            <button
              onClick={handleSignOut}
              className="mt-4 bg-red-500 text-white p-2 rounded"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
