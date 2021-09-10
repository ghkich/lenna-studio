import React, {useEffect, useState} from 'react'

export const Selector = ({selector, state, style, onChange, onRemove, className}) => {
  const {value, classes} = selector
  const [selectorValue, setSelectorValue] = useState(value)
  const [selectorClasses, setSelectorClasses] = useState(classes)

  useEffect(() => {
    setSelectorValue(value)
  }, [value])

  useEffect(() => {
    setSelectorClasses(classes)
  }, [classes])

  return (
    <div className={`w-full mb-2 border border-gray-200 bg-gray-100 relative ${className}`}>
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange({value, classes: '', state})
            onRemove()
          }}
          className="absolute right-1 top-1 opacity-50 hover:opacity-75"
        >
          Remove
        </button>
      )}
      {value && (
        <input
          className="w-full py-1 px-2 bg-gray-200"
          value={selectorValue}
          onChange={(e) => setSelectorValue(e.target.value)}
          onBlur={(e) => {
            onChange({value: e.target.value, classes: selectorClasses, state})
          }}
        />
      )}
      <textarea
        onChange={(e) => setSelectorClasses(e.target.value)}
        onBlur={(e) => {
          onChange({value: selectorValue, classes: e.target.value, state})
        }}
        className="w-full p-2 bg-gray-100"
        spellCheck={false}
        value={selectorClasses}
      />
    </div>
  )
}
