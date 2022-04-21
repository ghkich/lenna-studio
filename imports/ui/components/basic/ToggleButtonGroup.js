import React from 'react'

export const ToggleButtonGroup = ({buttons, activeButton, onToggle}) => {
  return (
    <div className="flex">
      {buttons?.map((button, index) => (
        <button
          key={button.value}
          type="button"
          className={`flex-1 p-2 border ${
            activeButton === button.value ? 'bg-gray-100 text-gray-700 font-semibold' : ''
          } ${index + 1 < buttons.length ? 'border-r-0' : ''}`}
          onClick={() => onToggle(button.value)}
        >
          {button.label}
        </button>
      ))}
    </div>
  )
}
