'use client';

const letters = 'Democracy-X'.split('');
// 深みのある色に変更 - 彩度を下げて落ち着いた色調に
const colors = [
  '#cc4444', // 深い赤
  '#228822', // 深い緑  
  '#3388cc', // 深い青
  '#ccaa44', // 深い黄色
  '#9933cc', // 深い紫
  '#339999', // 深いシアン
  '#cc4444', // 深い赤
  '#228822', // 深い緑
  '#3388cc', // 深い青
  '#ccaa44', // 深い黄色
  '#9933cc'  // 深い紫
];

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