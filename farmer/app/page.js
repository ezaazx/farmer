'use client';

import Header from './components/Header';
import PostCard from './components/PostCard';
import { useAuth } from './context/AuthContext';
import Login from './login/page';

export default function Home() {
  const { user, logOut } = useAuth();

  if (!user) {
    return <Login />;
  }

  const posts = [
    {
      id: 1,
      imageUrl: '/plant1.jpg',
      diagnosis: 'This plant appears to have a fungal infection.',
    },
    {
      id: 2,
      imageUrl: '/plant2.jpg',
      diagnosis: 'This plant is healthy.',
    },
    {
      id: 3,
      imageUrl: '/plant2.jpg',
      diagnosis: 'This plant is healthy.',
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-28 px-4 space-y-8 min-h-screen bg-gradient-to-br from-green-50 via-green-20 to-green-100">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Welcome, {user.email}</h1>
        </div>

        <div className="mt-6 space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              imageUrl={post.imageUrl}
              diagnosis={post.diagnosis}
            />
          ))}
        </div>
      </main>
    </>
  );
}
