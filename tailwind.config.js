/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        hearth: {
          50: '#f2f8f5',
          100: '#e5f3ec',
          200: '#cbe7d8',
          300: '#a3d4bd',
          400: '#5cba8f',
          500: '#00b875', // Primary brand green from images
          600: '#009d63',
          700: '#027a4f',
          800: '#066140',
          900: '#0f291e', // Dark forest text color
          950: '#071610',
        },
        sage: {
          50: '#f6f9f7',
          100: '#ebf2ee',
          200: '#d7e5dc',
          300: '#b9d1c3',
          400: '#94b7a3',
          500: '#739d84',
          600: '#5a8069',
          700: '#486654',
          800: '#3c5346',
          900: '#33443a',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.75rem',
      },
      boxShadow: {
        'soft': '0 2px 12px -2px rgba(15, 41, 30, 0.05)',
        'card': '0 4px 20px -2px rgba(15, 41, 30, 0.06)',
        'elevated': '0 10px 30px -4px rgba(0, 184, 117, 0.15)',
      },
    },
  },
  plugins: [],
}
