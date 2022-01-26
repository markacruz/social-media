const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extends: {
      colors: {
        'black-rgba': 'rgba(0, 0, 0, 0.7'
      }
    }
  },
  variants: {
    extend: {
        backgroundColor: ['label-checked'], // you need add new variant to a property you want to extend
    },
  },
  plugins: [
    plugin(({ addVariant, e }) => {
        addVariant('label-checked', ({ modifySelectors, separator }) => {
            modifySelectors(
                ({ className }) => {
                    const eClassName = e(`label-checked${separator}${className}`); // escape class
                    const yourSelector = 'input[type="radio"]'; // your input selector. Could be any
                    return `${yourSelector}:checked ~ .${eClassName}`; // ~ - CSS selector for siblings
                }
            )
        })
    }),
],
}
