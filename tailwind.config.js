/** @type {import('tailwindcss').Config} */
module.exports = {
  // Indique à Tailwind où chercher tes classes pour savoir quoi garder
  content: ["./**/*.{html,js}"], 
  darkMode: 'class', // Active le mode sombre manuel
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Exo 2', 'sans-serif'],
      },
      colors: {
        primary: '#A855F7', 
        secondary: '#EC4899',
        dark: '#0F172A',
      },
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
    },
  },
  plugins: [],
}