import React from 'react'
import {useFormContext} from 'react-hook-form'

export const Select = ({name, label, value, defaultValue, onChange, className, options}) => {
  const {register} = useFormContext() || {}

  return (
    <div className={className}>
      {label && <label className="pb-1 block text-gray-400">{label}</label>}
      <select
        {...(register && name ? register(name, {defaultValue}) : {})}
        value={value}
        onChange={onChange}
        className="p-1.5 font-semibold border border-gray-300 required:bg-gray-100 w-full"
      >
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
