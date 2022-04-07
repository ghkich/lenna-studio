import React from 'react'

export const DemoTextBubble = ({className, children}) => {
  return <p className={`p-3 my-2 bg-white bg-opacity-75 border border-white rounded ${className}`}>{children}</p>
}
