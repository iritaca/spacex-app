/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        // Color tokens backed by CSS variables.
        // Enables theming without changing Tailwind config
        background: "rgb(var(--background) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        green: "rgb(var(--green) / <alpha-value>)",
        yellow: "rgb(var(--yellow) / <alpha-value>)",
        red: "rgb(var(--red) / <alpha-value>)",
        accent: "rgb(var(--accent-primary) / <alpha-value>)",
      }
    },
  },
  plugins: [],
}
