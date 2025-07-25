'use client';

const letters = 'Democracy-X'.split('');
const colors = ['#ff5555','#22cc22','#33aaff','#f6f645','#ce33ff','#33cccc','#ff5555','#22cc22','#33aaff','#f6f645','#ce33ff'];

export default function Title() {
  return (
    <h1 className="pixel-title text-6xl md:text-8xl font-bold select-none">
      {letters.map((char, index) => (
        <span 
          key={index} 
          className="pixel-char" 
          style={{ color: colors[index] }}
        >
          {char}
        </span>
      ))}
    </h1>
  );
} 