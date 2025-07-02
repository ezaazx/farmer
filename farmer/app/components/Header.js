'use client';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-green-600 w-full fixed top-0 z-50 flex items-center justify-between px-4 py-2 shadow">
      <div className="flex items-center space-x-0">
        <span className="text-xl font-bold text-dark green-700">PLANTIFY</span>
      </div>

      <nav className="flex space-x-6 font-bold text-white">
        <a href="/timeline" className="hover:text-green-900 transition-colors duration-300">HOME</a>
        <a href="/profile" className="hover:text-green-900 transition-colors duration-300">PROFILE</a>
        <a href="/diagnose" className="hover:text-green-900 transition-colors duration-300">DIAGNOSE</a>
      </nav>

      <Image 
        src="/user-icon.png" 
        alt="Profile" 
        width={40} 
        height={40} 
        className="rounded-full bg-green-500 p-1" 
      />
    </header>
  );
}
