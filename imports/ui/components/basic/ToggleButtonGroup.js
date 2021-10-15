import React from 'react'

export const ToggleButtonGroup = ({buttons, activeButton, onToggle}) => {
  return (
    <div className="flex">
      {buttons?.map((button, index) => (
        <button
          key={button.value}
          type="button"
          className={`flex-1 p-1.5 border ${activeButton === button.value ? 'bg-blue-50 text-blue-500' : ''} ${
            index + 1 < buttons.length ? 'border-r-0 rounded-l-sm' : 'rounded-r-sm'
          }`}
          onClick={() => onToggle(button.value)}
        >
          {button.label}
        </button>
      ))}
    </div>
  )
}
