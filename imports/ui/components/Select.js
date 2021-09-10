import React from 'react'

export const Select = ({label, value, onChange, options}) => (
  <div>
    {label && <label className="pb-1 block text-gray-400">{label}</label>}
    <select value={value} onChange={onChange} className="p-2 mb-2 font-semibold border border-gray-300 w-full">
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
)
