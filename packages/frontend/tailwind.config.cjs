/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  future: {
    hoverOnlyWhenSupported: true
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-nunito)', ...fontFamily.sans]
      },
      fontSize: {
        pLight: [
          '18px',
          {
            lineHeight: '21.6px',
            fontWeight: '300'
          }
        ],
        pRegular: [
          '18px',
          {
            lineHeight: '21.6px',
            fontWeight: '400'
          }
        ],
        pMedium: [
          '18px',
          {
            lineHeight: '21.6px',
            fontWeight: '500'
          }
        ],
        pBold: [
          '18px',
          {
            lineHeight: '21.6px',
            fontWeight: '700'
          }
        ],
        h2: [
          '36px',
          {
            lineHeight: '21.6px',
            fontWeight: '400'
          }
        ],
        h1Regular: [
          '42px',
          {
            lineHeight: '21.6px',
            fontWeight: '400'
          }
        ],
        h1Bold: [
          '42px',
          {
            lineHeight: '21.6px',
            fontWeight: '700'
          }
        ]
      },
      boxShadow: {
        sm: '0px 2px 4px rgba(11, 31, 77, 0.08)',
        md: '0px 4px 8px rgba(11, 31, 77, 0.1)',
        lg: '0px 8px 16px rgba(11, 31, 77, 0.12)',
        xl: '0px 12px 24px rgba(11, 31, 77, 0.14)',
        '2xl': '0px 16px 32px rgba(11, 31, 77, 0.16)'
      },
      colors: {
        message: '#4070F4',
        success: '#0BB07B',
        warning: '#FFAD0D',
        error: '#F03D3D',
        information: '#3C4C70',
        gray5: '#FAFAFC',
        gray10: '#E7E9ED',
        gray20: '#CED2DB',
        gray30: '#B6BCC9',
        gray40: '#9EA5B8',
        gray50: '#858FA6',
        brand: {
          red: '#DB4D45',
          green: '#6BC2BB',
          yellow: '#FFC639',
          white: '#FFFFFF',
          black: '#333333',
          redVariant01: '#C5453E',
          redVariant02: '#AF3D37',
          greenVariant01: '#60AEA8',
          greenVariant02: '#559B95',
          yellowVariant01: '#E5B233',
          yellowVariant02: '#CC9E2D'
        }
      }
    }
  },
  corePlugins: {
    aspectRatio: false
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries')
  ]
}
