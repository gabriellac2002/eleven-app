/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Adição do diretório `app`.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          green: '#1DB954',
          darkGreen: '#1ED760',
          lightGreen: '#1DB954',
          black: '#191414',
          gray: '#B3B3B3',
        },
      },
    },
  },
  plugins: [],
}
