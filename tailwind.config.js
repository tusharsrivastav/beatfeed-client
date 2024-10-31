/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      'black': "#050505",
      'charcoal': "#353535",
      'gray-dark': "#1e1e1e",
      'blue': "#1385ef",
      'white': "#E7E6E6",
      'beige': "#bdbdbd",
      'beige-light': "#DBD6D6",
      'red': "#b02424",
      'red-light': "#ce00005b",
      'spotify-green': '#1DB954',
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      boxShadow: {
        'cover': 'rgb(20, 20, 20) 0px 6px 60px',
      }
    },
  },
  plugins: [],
};
