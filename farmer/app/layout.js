import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './context/AuthContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Optional: If you're using Next.js 13+ metadata feature correctly, this is fine:
export const metadata = {
  title: 'Plantify',
  description: 'A Plant Care Companion',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans bg-white text-black">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
