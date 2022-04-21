import React from 'react'
import {useFormContext} from 'react-hook-form'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretDown} from '@fortawesome/pro-solid-svg-icons'

export const Select = ({name, label, defaultValue, value, onChange, className, options, ...props}) => {
  const {register} = useFormContext() || {}

  return (
    <div className={`relative ${className}`}>
      <FontAwesomeIcon icon={faCaretDown} className="absolute bottom-3 right-3 pointer-events-none" />
      {label && <label className="pb-1 block text-gray-400">{label}</label>}
      <select
        defaultValue={defaultValue}
        value={value}
        className="px-2 py-2 font-semibold bg-white border border-gray-200 required:bg-gray-100 w-full appearance-none focus:outline-none focus:ring ring-gray-200 focus:border-gray-300"
        {...(register && name ? register(name) : {})}
        onChange={onChange}
        {...props}
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
