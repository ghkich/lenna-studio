import React, {useEffect, useState} from 'react'
import {Select} from './Select'

export const Selector = ({selectors, onChange, className}) => {
  const [selector] = selectors || []
  const [selectorValue, setSelectorValue] = useState(selector?.value)
  const [selectorClasses, setSelectorClasses] = useState(selector?.classes)

  useEffect(() => {
    console.log('selectors', selectors)
    console.log('selector?.classes?', selector?.classes)

    setSelectorValue(selector?.value)
  }, [selectors])

  useEffect(() => {
    console.log('selector', selector)
    console.log('selectorValue', selectorValue)
    const classes = selectors?.find((s) => s.value === selectorValue)?.classes || selector?.classes || ''
    console.log('classes', classes)

    if (classes) {
      setSelectorClasses(classes?.join(' '))
    }
  }, [selectors, selectorValue])

  return (
    <div className={`w-full mb-1 relative ${className}`}>
      <Select
        value={selectorValue}
        onChange={(e) => {
          setSelectorValue(e.target.value)
        }}
        options={selectors?.map((selector) => ({label: selector.value, value: selector.value}))}
      />
      <textarea
        onChange={(e) => setSelectorClasses(e.target.value)}
        onBlur={(e) => {
          onChange({value: selectorValue, classes: e.target.value.split(' ')})
        }}
        className="w-full p-2 border border-gray-300 border-t-0 bg-gray-50"
        spellCheck={false}
        value={selectorClasses}
      />
    </div>
  )
}
