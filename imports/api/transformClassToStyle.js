export const transformClassToStyle = (className, theme) => {
  if (!theme) return ''

  const obj = {
    hidden: `display: none;`,
    block: `display: block;`,
    flex: `display: flex;`,
    'h-10': `height: 35px;`,
    'h-screen': `height: 100vh;`,
    'flex-col': `flex-direction: column;`,
    'justify-center': `justify-content: center;`,
    'items-center': `align-items: center;`,
    'w-64': `width: 250px;`,
    'w-80': `width: 300px;`,
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
    'py-2': `padding-bottom: 5px; padding-top: 5px;`,
    'p-2': `padding: 5px;`,
    'p-5': `padding: 10px;`,
    'px-2': `padding-left: 5px; padding-right: 5px;`,
    'px-5': `padding-left: 10px; padding-right: 10px;`,
    'mb-2': `margin-bottom: 5px`,
    border: `border-style: solid; border-width: 1px;`,
    rounded: `border-radius: 6px;`,
  }

  return obj[className] ? obj[className] : ``
}
