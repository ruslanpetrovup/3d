import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...(fontFamily.sans as string[])],
        display: ['var(--font-poppins)', ...(fontFamily.sans as string[])],
      },
    },
  },
  plugins: [],
};
export default config;