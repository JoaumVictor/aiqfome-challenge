// postcss.config.js
const isTurbopack =
  process.env.NEXT_RUNTIME === "edge" || process.env.TURBOPACK === "1";

module.exports = {
  plugins: isTurbopack
    ? {
        "@tailwindcss/postcss": {},
      }
    : {
        tailwindcss: {},
        autoprefixer: {},
      },
};
