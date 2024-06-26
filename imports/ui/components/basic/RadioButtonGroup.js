import React from 'react'

export const RadioButtonGroup = ({className, children, ...props}) => {
  return (
    <div {...props} className={`flex  ${className}`}>
      {children}
    </div>
  )
}

export const RadioButton = ({value, children, className, ...props}) => {
  return (
    <label className="flex-1">
      <input {...props} type="radio" value={value} className="hidden" />
      <div
        className={`w-full p-1.5 border label-checked:bg-gray-50 label-checked:text-gray-700 text-center cursor-pointer ${className}`}
      >
        {children}
      </div>
    </label>
  )
}
