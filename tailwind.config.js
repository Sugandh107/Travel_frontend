/** @type {import('tailwindcss').Config} */
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import daisyui from 'daisyui';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  content: [join(__dirname, 'src/**/*.{js,ts,jsx,tsx}')],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    darkTheme: "light",
  },
};
