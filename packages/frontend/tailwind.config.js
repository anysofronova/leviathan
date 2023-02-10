// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './entities/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
    './widgets/**/*.{js,ts,jsx,tsx}',
    './processes/**/*.{js,ts,jsx,tsx}',
    './shared/**/*.{js,ts,jsx,tsx}'
  ],
  future: {
    hoverOnlyWhenSupported: true
  },
  theme: {
    extend: {
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem'
      },
      extend: {
        colors: {
          gray: {
            100: '#f7fafc',
            200: '#edf2f7',
            300: '#e2e8f0',
            400: '#cbd5e0',
            500: '#a0aec0',
            600: '#718096',
            700: '#4a5568',
            800: '#2d3748',
            900: '#1a202c'
          },
          blue: {
            100: '#ebf8ff',
            200: '#bee3f8',
            300: '#90cdf4',
            400: '#63b3ed',
            500: '#4299e1',
            600: '#3182ce',
            700: '#2b6cb0',
            800: '#2c5282',
            900: '#2a4365'
          }
        }
      },
      colors: {
        gray: colors.zinc,
        'gray-1000': 'rgb(17,17,19)',
        'gray-1100': 'rgb(10,10,11)',
        vercel: {
          pink: '#FF0080',
          blue: '#0070F3',
          cyan: '#50E3C2',
          orange: '#F5A623',
          violet: '#7928CA'
        }
      },
      backgroundImage: ({ theme }) => ({
        'vc-border-gradient': `radial-gradient(at left top, ${theme('colors.gray.500')}, 50px, ${theme(
          'colors.gray.800'
        )} 50%)`
      }),
      animation: {
        bannerAnim: 'banner 20s linear infinite',
        bannerAnim2: 'banner2 20s linear infinite'
      },
      keyframes: ({ theme }) => ({
        banner: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        banner2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' }
        },
        rerender: {
          '0%': {
            ['border-color']: theme('colors.vercel.pink')
          },
          '40%': {
            ['border-color']: theme('colors.vercel.pink')
          }
        },
        highlight: {
          '0%': {
            background: theme('colors.vercel.pink'),
            color: theme('colors.white')
          },
          '40%': {
            background: theme('colors.vercel.pink'),
            color: theme('colors.white')
          }
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)'
          }
        },
        translateXReset: {
          '100%': {
            transform: 'translateX(0)'
          }
        },
        fadeToTransparent: {
          '0%': {
            opacity: 1
          },
          '40%': {
            opacity: 1
          },
          '100%': {
            opacity: 0
          }
        }
      })
    }
  },
  corePlugins: {
    aspectRatio: false
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries')
  ]
}
