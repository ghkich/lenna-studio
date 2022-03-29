const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        68: '17rem',
        70: '17.5rem',
        84: '21rem',
        92: '23rem',
      },
      maxHeight: {
        100: '25rem',
        108: '26rem',
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
