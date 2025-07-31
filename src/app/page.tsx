'use client';

import Nav from './components/Nav';
import Title from './components/Title';
import About from './components/About';
import News from './components/News';
import NoiseCanvas from './components/NoiseCanvas';

export default function Home() {
  return (
    <>
      {/* ページ全体のノイズエフェクト */}
      <NoiseCanvas />
      
      <Nav />
      
      {/* Hero Section */}
      <section 
        className="h-screen flex flex-col items-center justify-center text-center space-y-6 px-4 relative"
        style={{ background: 'var(--bg-dark)', color: 'var(--text-light)' }}
      >
        {/* Content */}
        <div className="relative z-10">
          <Title />
          <p className="text-gray-300 max-w-2xl text-lg leading-relaxed mt-6">
            デジタル技術で民主主義の新しい形を探求するプラットフォーム
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-green-400 to-red-400 rounded-full opacity-70 mt-6 mx-auto"></div>
        </div>
      </section>

      {/* Content Sections */}
      <div style={{ background: 'var(--bg-light)', color: 'var(--text-dark)' }}>
        <About />
        <News />
        
        {/* Footer */}
        <footer className="text-center py-8 text-gray-500 text-sm border-t border-gray-300">
          © {new Date().getFullYear()} Democracy-X Team. All rights reserved.
        </footer>
      </div>
    </>
  );
}
