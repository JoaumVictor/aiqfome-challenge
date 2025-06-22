/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#9C27B0",
          dark: "#6A1B9A",
          light: "#CE93D8",
        },
        secondary: {
          DEFAULT: "#FFC107",
          dark: "#FFA000",
          light: "#FFECB3",
        },
        gray: {
          "50": "#FAFAFA",
          "100": "#F5F5F5",
          "200": "#EEEEEE",
          "300": "#E0E0E0",
          "400": "#BDBDBD",
          "500": "#9E9E9E",
          "600": "#757575",
          "700": "#616161",
          "800": "#424242",
          "900": "#212121",
        },
        white: "#FFFFFF",
        black: "#000000",
        success: "#4CAF50",
        error: "#F44336",
        warning: "#FFEB3B",
        info: "#2196F3",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        "custom-sm": "0 1px 2px rgba(0, 0, 0, 0.05)",
        "custom-md":
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
        "custom-lg":
          "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        "md-lg": "0.375rem",
        "lg-xl": "0.625rem",
      },
    },
  },
  plugins: [],
};
