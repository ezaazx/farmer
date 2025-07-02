'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Optionally show a loading indicator
  if (loading || !user) {
    return <div className="text-center py-10 text-emerald-700">Checking authentication...</div>;
  }

  return children;
}
