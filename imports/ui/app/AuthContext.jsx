import React, {createContext, useContext, useState} from 'react'
import {getLocalItem, removeLocalItem, setLocalItem} from '../utils/storage-utils'

const initialAppState = {
  user: null,
}

const persistedAuth = getLocalItem('auth')
const persistedAppState = {
  ...initialAppState,
  user: persistedAuth?.user || null,
}

const AppContext = createContext(persistedAppState)

export const AppProvider = ({children}) => {
  const [state, setState] = useState(persistedAppState)

  const actions = {
    setUser: (user) => {
      setState((prev) => ({...prev, user}))
      setLocalItem('auth', user)
    },
    removeUser: () => {
      setState((prev) => ({...prev, user: null}))
      removeLocalItem('auth')
    },
    setSelectedAppId: (selectedAppId) => {
      setState((prev) => ({...prev, selectedAppId}))
    },
  }

  return <AppContext.Provider value={{state, actions}}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
