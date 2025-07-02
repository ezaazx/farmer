'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const { signUpWithEmail, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await signUpWithEmail(email, password);
      router.push('/timeline');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle(); // same Google function works
      router.push('/timeline');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-green-100 to-emerald-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-green-200">
        <h2 className="text-3xl font-semibold text-center text-emerald-700 mb-6">Create Your Account</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border border-emerald-200 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-emerald-200 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition mb-3"
        >
          Sign Up with Email
        </button>

        <button
          onClick={handleGoogleSignup}
          className="w-full border border-emerald-300 text-emerald-700 py-2 rounded-md hover:bg-emerald-100 transition"
        >
          Continue with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-emerald-600 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
