import React from 'react'
import MainRouter from './Router'
import {AppProvider} from './AuthContext'

export const App = () => {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  )
}
