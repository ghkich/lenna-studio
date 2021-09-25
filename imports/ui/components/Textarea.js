import React from 'react'

export const Textarea = ({value, onChange}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 bg-gray-50"
      spellCheck={false}
    />
  )
}
