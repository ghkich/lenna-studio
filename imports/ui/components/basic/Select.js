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
        className="px-1.5 py-2 font-semibold border border-gray-300 required:bg-gray-100 w-full"
        {...(register && name ? register(name) : {})}
        onChange={onChange}
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
