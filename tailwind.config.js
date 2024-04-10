/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: () => {
        return {
          "custom-background": 'url("./src/assets/bg-Image.jpeg")',
        };
      },
    },
  },
  plugins: [],
};
