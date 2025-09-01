import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        dot: ['"DotGothic16"', 'monospace'],
        sans: ['"Noto Sans JP"', 'sans-serif'],
      },
      colors: {
        'p-red': '#ff5555',
        'p-green': '#22cc22',
        'p-blue': '#33aaff',
        'p-yellow': '#f6f645',
        'p-purple': '#ce33ff',
        'p-cyan': '#33cccc',
      },
      boxShadow: {
        'neu': '4px 4px 8px rgba(0, 0, 0, 0.25), -4px -4px 8px rgba(255, 255, 255, 0.04)',
      },
    },
  },
  plugins: [],
};

export default config; 