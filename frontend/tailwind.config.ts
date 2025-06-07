import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...(defaultTheme.fontFamily.sans as string[])],
        display: ['var(--font-poppins)', ...(defaultTheme.fontFamily.sans as string[])],
      },
    },
  },
  plugins: [],
};
export default config;