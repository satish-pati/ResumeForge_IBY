/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      ringColor: {
        DEFAULT: 'transparent', // Set the default ring color to transparent
      },
    },
  },
  corePlugins: {
    ringWidth: false, // Disables the ring utility
    ringColor: false, // Disables ring colors
    ringOffsetWidth: false, // Disables ring offset width
    ringOffsetColor: false, // Disables ring offset colors
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        "button:focus": {
          outline: "none", // Removes the focus outline
          boxShadow: "none", // Ensures no ring or shadow appears
        },
      });
    },
  ],
};
