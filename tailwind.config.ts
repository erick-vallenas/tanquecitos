import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'from-brand-600', 'to-brand-800',
    'from-brand-500', 'to-brand-700',
    'from-accent-500', 'to-accent-700',
    'from-rose-500', 'to-rose-700',
    'from-amber-500', 'to-amber-700',
    'from-indigo-500', 'to-indigo-700',
    'from-emerald-500', 'to-emerald-700',
    'from-cyan-500', 'to-cyan-700',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9f9',
          100: '#d1eeee',
          200: '#a3dddd',
          300: '#6ec5c5',
          400: '#45abab',
          500: '#2b8b8b',
          600: '#236e6e',
          700: '#1e5a5a',
          800: '#1a4a4a',
          900: '#163d3d',
          950: '#0d2626',
        },
        accent: {
          50: '#fdf8f0',
          100: '#f9edda',
          200: '#f2d8b4',
          300: '#e9bc85',
          400: '#e09a54',
          500: '#d88032',
          600: '#c96828',
          700: '#a75023',
          800: '#864122',
          900: '#6d361e',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
