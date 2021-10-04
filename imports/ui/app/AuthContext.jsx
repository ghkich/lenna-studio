import React, {createContext, useContext, useState} from 'react'

const initialAppState = {}

const persistedAppState = {
  ...initialAppState,
}

const AppContext = createContext(persistedAppState)

export const AppProvider = ({children}) => {
  const [state, setState] = useState(persistedAppState)

  const actions = {
    setSelectedAppId: (selectedAppId) => {
      setState((prev) => ({...prev, selectedAppId}))
    },
  }

  return <AppContext.Provider value={{state, actions}}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
