export const isDev = process.env.NODE_ENV === "development";
export const apiOrigin = isDev
  ? "http://localhost:3000"
  : "https://sosohan.vercel.app";
