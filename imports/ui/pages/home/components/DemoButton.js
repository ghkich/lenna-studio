import React from 'react'
import {Button} from '../../../components/basic/Button'

export const DemoButton = ({className, children, ...props}) => {
  return (
    <div className={`relative ${className}`}>
      <Button {...props} className={`w-full relative z-10`}>
        {children}
      </Button>
      <div className="absolute top-0.5 left-0 right-0 z-0 flex justify-center">
        <div className="animate-ping w-full h-7 bg-gradient-to-r from-transparent via-gray-700 to-transparent rounded opacity-100" />
      </div>
    </div>
  )
}
