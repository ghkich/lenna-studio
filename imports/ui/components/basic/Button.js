import React from 'react'

const getStyleClasses = (style) => {
  if (style === 'primary') {
    return `bg-purple-500 hover:bg-opacity-90 text-white font-semibold`
  }
  if (style === 'transparent') {
    return `border border-white hover:bg-white hover:bg-opacity-10 px-6`
  }
  return `bg-white text-gray-600 hover:bg-gray-50 border`
}

export const Button = ({style, className, children, ...props}) => {
  return (
    <button
      type="button"
      className={`${getStyleClasses(style)} p-2 transition-all duration-200 uppercase tracking-wider ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
