'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/Header';
import PostCard from '@/components/PostCard';

export default function Timeline() {
  const dummyPosts = [
    {
      userId: '15623',
      imageUrl: '/placeholder.jpg',
      diagnosis: 'Lorem ipsum kihed ohdiouhcnidh iuhviefheiidh udh huuhouyy...',
    },
    {
      userId: '14553',
      imageUrl: '/placeholder.jpg',
      diagnosis: 'Lorem ipsum kihed ohdiouhcnidh iuhviefheiidh udh huuhouyy...',
    },
    {
      userId: '14557',
      imageUrl: '/placeholder.jpg',
      diagnosis: 'Lorem ipsum kihed ohdiouhcnidh iuhviefheiidh udh huuhouyy...',
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300">
      
        <Header />
        <main className="p-4 space-y-8 pt-20">
         
          {dummyPosts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </main>
      </div>
    </ProtectedRoute>
  );
}

