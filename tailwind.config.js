/**** Deployment guidance: Deploy this frontend on Vercel or Netlify. Set VITE_BACKEND_URL to your API base (Render/Railway). ****/
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
