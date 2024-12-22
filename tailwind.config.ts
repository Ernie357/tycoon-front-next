/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'main': 'Helvetica'
      },
      backgroundImage: {
        'ryuji': "url('/ryuji.png')",
        'landing-stars': "url('/landing-bg-stars.png')",
        'landing-stripe': "url('/landing-bg-stripe.png')",
        'landing-swirl': "url('/landing-bg-swirl.gif')",
        'landing-city': "url('/landing-bg-city.jpg')",
        'landing-gang': "url('/landing-bg-gang.jpeg')",
        'landing-joker': "url('/landing-bg-joker.jpg')",
        'persona-dialogue-box': "url('/persona-dialogue-box.png')"
      },
      width: {
        '110-p': '110%', 
        '150-p': '150%',
        '200-p': '200%',
        '27-p': '27%',
        '30-p': '30%',
        '32-p': '32%'
      },
      height: {
        '600': '600px',
        '550': '550px',
        '500': '500px'
      },
      colors: {
        'persona-red': '#ee1c25',
        'persona-gold': '#8c6723',
        'persona-yellow': '#f2e852',
        'persona-black': '#0d0d0d'
      },
      rotate: {
        'dialogue-name': '-15deg'
      }
    },
  },
  plugins: [],
}


