// NoiseCanvas.tsx
'use client';
import { useRef, useEffect } from 'react';

export default function NoiseCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let raf: number;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const { width: w, height: h } = canvas;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        // 0.3% だけ打つ
        if (Math.random() < 0.003) {
          const brightness = 80 + Math.random() * 100;
          const cv = Math.random();

          let r = 0, g = 0, b = 0;
          if (cv < 0.6) {       // 青系
            r = brightness * 0.3;
            g = brightness * 0.5;
            b = brightness;
          } else if (cv < 0.85) { // シアン系
          r = brightness * 0.2;
          g = brightness * 0.8;
          b = brightness * 0.9;
          } else {              // 白系
            r = g = brightness * 0.9;
            b = brightness;
          }
          data[i]   = r;
          data[i+1] = g;
          data[i+2] = b;
          data[i+3] = 15 + Math.random() * 20; // 透明度は 15-35/255
        } else {
          data[i+3] = 0;
        }
      }

      // 背景は黒にしておく（ここで塗る or body/cssで黒）
      // ctx.fillStyle = '#000';
      // ctx.fillRect(0, 0, w, h);

      ctx.putImageData(imageData, 0, 0);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        // ← blend を外す
        // mixBlendMode: 'screen',
        opacity: 0.35,     // ここで全体の強さを調整
        zIndex: 1
      }}
    />
  );
}
