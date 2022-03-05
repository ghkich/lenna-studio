const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        100: '25rem',
        108: '26rem',
      },
      colors: {
        gray: colors.gray,
      },
      fontSize: {
        '2xs': '0.65rem',
      },
      outline: {
        red: ['2px dashed #FF0000', '-2px'],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['label-checked'],
      textColor: ['label-checked'],
    },
  },
  plugins: [
    plugin(({addVariant, e}) => {
      addVariant('label-checked', ({modifySelectors, separator}) => {
        modifySelectors(({className}) => {
          const eClassName = e(`label-checked${separator}${className}`) // escape class
          const yourSelector = 'input[type="radio"]' // your input selector. Could be any
          return `${yourSelector}:checked ~ .${eClassName}` // ~ - CSS selector for siblings
        })
      })
    }),
  ],
}
