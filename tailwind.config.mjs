/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        brand: {
          50: '#ecfdf3',
          100: '#d1fae3',
          200: '#a7f3cb',
          300: '#6ee7a8',
          400: '#34d37f',
          500: '#138d57',
          600: '#0f7348',
          700: '#0d5c3b',
          800: '#0b4930',
          900: '#093d28',
        },
      },
      fontFamily: {
        display: ['Fredoka', 'Comic Sans MS', 'cursive'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
