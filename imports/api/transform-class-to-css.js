const spacing = {
  0: 0,
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  64: '16rem',
  80: '20rem',
}

const heights = Object.entries(spacing).reduce((newObj, [key, val]) => {
  const spacingHeights = Object.assign(newObj, {[`h-${key}`]: `height: ${val};`})
  return {
    ...spacingHeights,
    'h-auto': 'height: auto;',
    'h-full': 'height: 100%;',
    'h-screen': 'height: 100vh;',
  }
}, {})

const widths = Object.entries(spacing).reduce((newObj, [key, val]) => {
  const spacingWidths = Object.assign(newObj, {[`w-${key}`]: `width: ${val};`})
  return {
    ...spacingWidths,
    'w-auto': 'width: auto',
    'w-full': 'width: 100%;',
    'w-screen': 'width: 100vw;',
  }
}, {})

const paddings = Object.entries(spacing).reduce((newObj, [key, val]) => {
  const paddings = Object.assign(newObj, {[`p-${key}`]: `padding: ${val};`})
  const paddingsVer = Object.assign(newObj, {[`py-${key}`]: `padding-top: ${val}; padding-bottom: ${val};`})
  const paddingsHor = Object.assign(newObj, {[`px-${key}`]: `padding-left: ${val}; padding-right: ${val};`})
  const paddingsLeft = Object.assign(newObj, {[`pl-${key}`]: `padding-left: ${val};`})
  const paddingsRight = Object.assign(newObj, {[`pr-${key}`]: `padding-right: ${val};`})
  const paddingsTop = Object.assign(newObj, {[`pt-${key}`]: `padding-top: ${val};`})
  const paddingsBottom = Object.assign(newObj, {[`pb-${key}`]: `padding-bottom: ${val};`})
  return {
    ...paddings,
    ...paddingsVer,
    ...paddingsHor,
    ...paddingsLeft,
    ...paddingsRight,
    ...paddingsTop,
    ...paddingsBottom,
  }
}, {})

const margins = Object.entries(spacing).reduce((newObj, [key, val]) => {
  const margins = Object.assign(newObj, {[`m-${key}`]: `margin: ${val};`})
  const marginsVer = Object.assign(newObj, {[`my-${key}`]: `margin-top: ${val}; margin-bottom: ${val};`})
  const marginsHor = Object.assign(newObj, {[`mx-${key}`]: `margin-left: ${val}; margin-right: ${val};`})
  const marginsLeft = Object.assign(newObj, {[`ml-${key}`]: `margin-left: ${val};`})
  const marginsRight = Object.assign(newObj, {[`mr-${key}`]: `margin-right: ${val};`})
  const marginsTop = Object.assign(newObj, {[`mt-${key}`]: `margin-top: ${val};`})
  const marginsBottom = Object.assign(newObj, {[`mb-${key}`]: `margin-bottom: ${val};`})
  return {
    ...margins,
    ...marginsVer,
    ...marginsHor,
    ...marginsLeft,
    ...marginsRight,
    ...marginsTop,
    ...marginsBottom,
    'mx-auto': 'margin: 0 auto;',
  }
}, {})

export const transformClassToCss = (className, theme) => {
  const settings = theme?.settings
  const obj = {
    hidden: `display: none;`,
    block: `display: block;`,
    flex: `display: flex;`,
    'inline-flex': `display: inline-flex;`,
    relative: 'position: relative;',
    absolute: 'position: absolute;',
    ...heights,
    ...widths,
    'max-w-xs': 'max-width: 20rem;',
    'max-w-sm': 'max-width: 24rem;',
    'max-w-md': 'max-width: 28rem;',
    ...paddings,
    ...margins,
    'appearance-none': 'appearance: none;',
    'flex-col': `flex-direction: column;`,
    'justify-center': `justify-content: center;`,
    'justify-between': `justify-content: space-between;`,
    'items-center': `align-items: center;`,
    'items-baseline': `align-items: baseline;`,
    'bg-primary': `background-color: ${settings?.colors?.primary};`,
    'bg-secondary': `background-color: ${settings?.colors?.secondary};`,
    'bg-white': `background-color: white;`,
    'bg-black': `background-color: black;`,
    'bg-gray-50': `background-color: #f9fafb;`,
    'bg-gray-800': `background-color: #1f2937;`,
    'bg-gray': `background-color: #111827;`,
    'placeholder-gray': `background-color: #d1d5db;`,
    'border-transparent': `border-color: transparent;`,
    'border-white': `border-color: white;`,
    'border-gray': `border-color: #d1d5db;`,
    'text-primary': `color: ${settings?.colors?.primary};`,
    'text-secondary': `color: ${settings?.colors?.secondary};`,
    'text-white': `color: white;`,
    'text-gray-300': `color: #d1d5db;`,
    'text-gray-400': `color: #9ca3af;`,
    'text-gray': `color: #111827;`,
    'text-gray-900': `color: #111827;`,
    'text-xs': `font-size: 0.75rem; line-height: 1rem;`,
    'text-sm': `font-size: 0.875rem; line-height: 1.25rem;`,
    'text-base': `font-size: 1rem; line-height: 1.5rem;`,
    'text-lg': `font-size: 1.125rem; line-height: 1.75rem;`,
    'text-xl': `font-size: 1.25rem; line-height: 1.75rem;`,
    'text-2xl': `font-size: 1.5rem; line-height: 2rem;`,
    'text-3xl': `font-size: 1.875rem; line-height: 2.25rem;`,
    'text-center': `text-align: center;`,
    'font-light': `font-weight: 300;`,
    'font-normal': `font-weight: 400;`,
    'font-medium': `font-weight: 500;`,
    'font-semibold': `font-weight: 600;`,
    'font-bold': `font-weight: 700;`,
    'font-extrabold': `font-weight: 800;`,
    'tracking-tight': `letter-spacing: -0.025em;`,
    'shadow-sm': `box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);`,
    shadow: `box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);`,
    'shadow-md': `box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);`,
    'shadow-lg': `box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);`,
    'shadow-xl': `box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);`,
    'cursor-pointer': `cursor: pointer;`,
    border: `border-style: solid; border-width: 1px;`,
    'rounded-none': `border-radius: 0px;`,
    'rounded-sm': `border-radius: ${settings.roundLevel * 0.125}rem;`,
    rounded: `border-radius: ${settings.roundLevel * 0.25}rem;`,
    'rounded-md': `border-radius: ${settings.roundLevel * 0.375}rem;`,
    'rounded-full': `border-radius: 50%;`,
    'rounded-t-md': `border-top-left-radius: ${settings.roundLevel * 0.375}rem; border-top-right-radius: ${
      settings.roundLevel * 0.375
    }rem;`,
    'rounded-b-md': `border-bottom-left-radius: ${settings.roundLevel * 0.375}rem; border-bottom-right-radius: ${
      settings.roundLevel * 0.375
    }rem;`,
  }

  return obj[className] ? obj[className] : ``
}
