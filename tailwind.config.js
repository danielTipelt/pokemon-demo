/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/sections/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%": {
            transform: "translateX(-100%)",
            "transition-property": "all",
            opacity: 0,
            width: "0",
          },
          "100%": {
            transform: "translateX(0%)",
            "transition-property": "all",
            opacity: 1,
            width: "fit-content",
          },
        },
        animation: {
          "slide-in": "slideIn 0.5s ease-in-out",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  themes: ["bumblebee", "dark"],
};
