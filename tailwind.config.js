/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./index.html"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        poppins: "Poppins",
      },
    },
  },
  plugins: [],
};
