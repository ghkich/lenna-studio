import React from 'react'
import {useFormContext} from 'react-hook-form'

export const Select = ({name, label, defaultValue, value, onChange, className, options}) => {
  const {register} = useFormContext() || {}

  return (
    <div className={className}>
      {label && <label className="pb-1 block text-gray-400">{label}</label>}
      <select
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        className="p-1.5 font-semibold border border-gray-300 required:bg-gray-100 w-full"
        {...(register && name ? register(name) : {})}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
