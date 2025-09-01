'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isNewsPage = pathname?.startsWith('/news');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full flex gap-6 p-4 text-sm backdrop-blur-md z-50 transition-all duration-300 ${
      isScrolled || isNewsPage
        ? 'bg-white/90 text-gray-800 shadow-md' 
        : 'bg-gray-900/60 text-gray-200'
    }`}>
      <Link href="/" className={`transition-colors ${
        isScrolled || isNewsPage ? 'hover:text-blue-600' : 'hover:text-blue-400'
      }`}>
        Home
      </Link>
      {!isNewsPage && (
        <Link href="#about" className={`transition-colors ${
          isScrolled ? 'hover:text-blue-600' : 'hover:text-blue-400'
        }`}>
          About
        </Link>
      )}
      <Link href="/news" className={`transition-colors ${
        isScrolled || isNewsPage ? 'hover:text-blue-600' : 'hover:text-blue-400'
      }`}>
        News
      </Link>
    </nav>
  );
} 