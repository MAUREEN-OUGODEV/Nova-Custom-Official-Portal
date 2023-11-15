import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
   colors:{
    nova:{
      amber:{
         600:'#D36D23'
        },
        grey:{
        100:'#A0AEC0'
        },

        white:{
          500:'#FFFFFF'
        },
        red:{
          500:'#F01212'
        },
   }

   }


    },
  },
  plugins: [],
}
export default config


