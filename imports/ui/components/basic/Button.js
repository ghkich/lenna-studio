import React from 'react'

export const Button = ({style, className, children, ...props}) => {
  return (
    <button
      type="button"
      className={`${
        style === 'primary'
          ? 'bg-blue-500 hover:bg-blue-600 text-white font-semibold'
          : 'bg-white text-gray-600 hover:bg-gray-50 border'
      } p-2 rounded-sm  transition-colors duration-200 uppercase tracking-wider ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
