'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import Header from '@/components/Header';

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, []);

  const logOut = async () => {
  const confirmed = window.confirm('Are you sure you want to sign out?');
  if (confirmed) {
    await signOut(auth);
    router.push('/');
  }
};


  if (!user) return null;

  return (
    <div className="min-h-screen bg-white relative">
      <Header />

      {/* Profile section */}
      <div className="relative">
        <div className="h-40 bg-gradient-to-r from-green-500 to-green-700 rounded-b-lg"></div>
        <div className="absolute top-20 left-6">
          <div className="w-24 h-24 rounded-full bg-gray-300 border-4 border-white" />
        </div>
      </div>

      <div className="mt-16 px-6 pb-24"> {/* Extra padding bottom for logout button */}
        <h2 className="text-xl font-semibold">{user.displayName || "User"}</h2>
        <p className="text-gray-600">{user.email}</p>
        <div className="flex gap-4 mt-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Follow</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Message</button>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded shadow-sm">
            <h3 className="font-semibold mb-2">Recent Diagnosis</h3>
            <p className="text-gray-700 text-sm">This plant appears to have a fungal infection.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow-sm">
            <h3 className="font-semibold mb-2">Contact Info</h3>
            <p className="text-gray-700 text-sm">Professionals coming soon...</p>
          </div>
        </div>

        <div className="mt-10 bg-gray-50 p-6 rounded shadow-sm">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-gray-600 text-sm">
            Welcome to your profile page. Here you can view your diagnosis history, manage posts, and connect to experts.
          </p>
        </div>
      </div>

      {/* Logout Button: Bottom-right corner */}
      <div className="absolute bottom-6 right-6">
        <button
          onClick={logOut}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
