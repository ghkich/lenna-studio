import React from 'react'
import {useFormContext} from 'react-hook-form'

export const TextInput = ({name, className, ...props} = {className: ''}) => {
  const {register} = useFormContext() || {}

  return (
    <input
      {...(register ? register(name) : {})}
      type="text"
      className={`p-2 rounded-sm border ${className}`}
      {...props}
    />
  )
}
