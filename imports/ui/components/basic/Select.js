import React from 'react'

export const Select = ({label, value, defaultValue, onChange, options}) => {
  return (
    <div>
      {label && <label className="pb-1 block text-gray-400">{label}</label>}
      <select
        required
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        className="p-1.5 font-semibold border border-gray-300 required:bg-gray-100 w-full"
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
