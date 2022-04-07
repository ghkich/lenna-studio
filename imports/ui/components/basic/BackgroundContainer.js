import React from 'react'

export const BackgroundContainer = ({imageUrl, blendMode, className, children, ...props}) => {
  return (
    <div
      className={`w-full h-full ${className}`}
      {...props}
      style={{
        backgroundImage: `url(${imageUrl}), linear-gradient(to bottom right, var(--tw-gradient-stops))`,
        backgroundSize: '100% 100%',
        backgroundBlendMode: blendMode ? blendMode : 'color-dodge',
      }}
    >
      {children}
    </div>
  )
}
