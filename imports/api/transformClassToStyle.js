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
  64: '16rem',
  80: '20rem',
}

const heights = Object.entries(spacing).reduce((newObj, [key, val]) => {
  const spacingHeights = Object.assign(newObj, {[`h-${key}`]: `height: ${val};`})
  return {
    ...spacingHeights,
    'h-full': 'height: 100%;',
    'h-screen': 'height: 100vh;',
  }
}, {})

const widths = Object.entries(spacing).reduce((newObj, [key, val]) => {
  const spacingWidths = Object.assign(newObj, {[`w-${key}`]: `width: ${val};`})
  return {
    ...spacingWidths,
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
  }
}, {})

export const transformClassToStyle = (className) => {
  const theme = {
    colors: {
      primary: '#333333',
      secondary: '#ff0000',
    },
  }

  const obj = {
    hidden: `display: none;`,
    block: `display: block;`,
    flex: `display: flex;`,
    ...heights,
    ...widths,
    ...paddings,
    ...margins,
    'flex-col': `flex-direction: column;`,
    'justify-center': `justify-content: center;`,
    'items-center': `align-items: center;`,
    'bg-primary': `background-color: ${theme.colors.primary};`,
    'bg-secondary': `background-color: ${theme.colors.secondary};`,
    'bg-white': `background-color: white;`,
    'border-white': `border-color: white;`,
    'border-gray': `border-color: gray;`,
    'text-primary': `color: ${theme.colors.primary};`,
    'text-secondary': `color: ${theme.colors.secondary};`,
    'text-white': `color: white;`,
    'text-sm': `font-size: 12px;`,
    'shadow-lg': `box-shadow: 0 2px 10px rgba(0,0,0,0.2);`,
    'shadow-xl': `box-shadow: 0 5px 20px rgba(0,0,0,0.2);`,
    'cursor-pointer': `cursor: pointer;`,
    border: `border-style: solid; border-width: 1px;`,
    rounded: `border-radius: 6px;`,
  }

  return obj[className] ? obj[className] : ``
}
