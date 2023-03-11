/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "3/1": "3fr, 1fr",
      },
    },
  },
  plugins: [],
};
