import React from 'react'

export const TextInput = ({register, name, className, ...props} = {className: ''}) => {
  return (
    <input
      {...(register ? register(name) : {})}
      type="text"
      className={`p-2 rounded-sm border ${className}`}
      {...props}
    />
  )
}
