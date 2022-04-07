import React, {createContext, useContext, useState} from 'react'
import {faBrowser, faRectangleCode, faSidebarFlip} from '@fortawesome/pro-light-svg-icons'
import {DemoTabLenna} from './DemoTabLenna'
import {DemoTabProject} from './DemoTabProject'
import {DemoTabLocalhost} from './DemoTabLocalhost'
import {STRUCTURE_TYPES} from '../../../../infra/constants/structure-types'
import {DEMO_ELEMENTS} from './DemoElements'

export const DEMO_APP_ID = 'Yomz2bSRgTNna9w3y'

export const DEMO_TABS = [
  {id: 'lenna', label: 'Lenna Studio', icon: faSidebarFlip, component: DemoTabLenna},
  {id: 'project', label: 'Your project', icon: faRectangleCode, component: DemoTabProject},
  {id: 'localhost', label: 'Localhost', icon: faBrowser, component: DemoTabLocalhost},
]

const initialAppState = {
  activeTabId: DEMO_TABS[0].id,
  loading: false,
  fileSelected: 'index',
  structureType: STRUCTURE_TYPES.ACTUAL,
  actualElements: DEMO_ELEMENTS.ACTUAL,
  expectedElements: DEMO_ELEMENTS.EXPECTED,
  demoEnd: false,
}

const persistedAppState = {
  ...initialAppState,
}

const DemoContext = createContext(persistedAppState)

export const DemoProvider = ({children}) => {
  const [state, setState] = useState(persistedAppState)

  const actions = {
    setActiveTabId: (activeTabId) => {
      setState((prev) => ({...prev, activeTabId}))
    },
    setLoading: (loading) => {
      setState((prev) => ({...prev, loading}))
    },
    setStructureType: (structureType) => {
      setState((prev) => ({...prev, structureType}))
    },
    setFileSelected: (fileSelected) => {
      setState((prev) => ({...prev, fileSelected}))
    },
    setActualElements: (actualElements) => {
      setState((prev) => ({...prev, actualElements}))
    },
    setDemoEnd: (demoEnd) => {
      setState((prev) => ({...prev, demoEnd}))
    },
    resetState: () => {
      setState(initialAppState)
    },
  }

  return <DemoContext.Provider value={{state, actions}}>{children}</DemoContext.Provider>
}

export const useDemoContext = () => useContext(DemoContext)
