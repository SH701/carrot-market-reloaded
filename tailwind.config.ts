import type { Config } from 'tailwindcss'

const config:Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend:{
      color:{
        primary:"#ff6600",
      }
    }
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("@tailwindcss/forms"),
    // // eslint-disable-next-line @typescript-eslint/no-require-imports
    // require("daisyui"),
  ],
};
export default config;

