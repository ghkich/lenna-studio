import React from 'react'

export const ToggleButtonGroup = ({buttons, activeButton, onToggle}) => {
  return (
    <div className="flex">
      {buttons?.map((button, index) => (
        <button
          key={button.value}
          type="button"
          className={`flex-1 p-2 border font-bold ${
            activeButton === button.value ? 'bg-purple-50 text-purple-500' : ''
          } ${index + 1 < buttons.length ? 'border-r-0' : ''}`}
          onClick={() => onToggle(button.value)}
        >
          {button.label}
        </button>
      ))}
    </div>
  )
}
