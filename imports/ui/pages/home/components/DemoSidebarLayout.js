import React, {useEffect, useRef, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretLeft} from '@fortawesome/pro-solid-svg-icons'
import {useOnClickOutside} from '../../../hooks/useOnClickOutside'
import {NavLink} from 'react-router-dom'
import {RoutePaths} from '../../../app/routes'
import {faCircleUser, faSidebarFlip} from '@fortawesome/pro-light-svg-icons'
import {useDemoContext} from './DemoContext'

export const DemoSidebarLayout = ({height, content, sidebarContent, startWithSidebarHidden, refreshDeps = []}) => {
  const [showFloatingSidebar, setShowFloatingSidebar] = useState(false)
  const [afterDelay, setAfterDelay] = useState(false)
  const {state} = useDemoContext()

  const sidebar = useRef()
  useOnClickOutside(sidebar, () => setShowFloatingSidebar(false))

  useEffect(() => {
    if (startWithSidebarHidden && state.activeTabId === 'localhost') {
      setTimeout(() => {
        setAfterDelay(true)
      }, 750)
    }
  }, [state.activeTabId])

  useEffect(() => {
    setShowFloatingSidebar(false)
  }, refreshDeps)

  return (
    <div className={`flex relative w-full h-${height ? height : '92'}`}>
      <div
        className={`relative bg-white w-full h-${
          height ? height : '92'
        } flex rounded-md text-gray-600 text-left overflow-hidden`}
      >
        <div className={`flex-1 ${height ? height : '92'} bg-gradient-to-br from-gray-50 to-gray-100 relative`}>
          {content}
        </div>
        <div
          className={`block sm:hidden w-6 h-${
            height ? height : '92'
          } bg-white border-l border-black border-opacity-10 flex flex-col justify-center items-center`}
          onClick={() => {
            setShowFloatingSidebar(true)
          }}
        >
          <FontAwesomeIcon icon={faCaretLeft} className="text-gray-700" />
        </div>
        <div
          ref={sidebar}
          className={`w-0 h-${
            height ? height : '92'
          } absolute z-20 right-0 bg-white sm:static border-l border-black border-opacity-10 text-gray-500 transition-all transform translate-x-60 ${
            showFloatingSidebar ? 'w-60 -translate-x-0 rounded-r-md shadow-lg' : ''
          } ${
            startWithSidebarHidden
              ? `${afterDelay ? 'duration-300 sm:translate-x-0 sm:w-60' : ''}`
              : 'sm:translate-x-0 sm:w-60'
          }`}
        >
          <div className="bg-white border-b h-7 px-1 flex justify-between items-center">
            <NavLink to={RoutePaths.APPS} className="flex flex-1 gap-1 items-center px-2 pt-0.5">
              <FontAwesomeIcon icon={faSidebarFlip} className="text-2xs" />
              <h1 className="text-2xs font-extralight">Lenna Studio</h1>
            </NavLink>
            <NavLink to={RoutePaths.PROFILE} className="flex-none flex gap-1 items-center p-2 cursor-pointer">
              <span className="text-2xs font-light">username</span>
              <FontAwesomeIcon icon={faCircleUser} className="text-2xs" />
            </NavLink>
          </div>
          <div className={`p-4 flex flex-col gap-1.5`}>{sidebarContent}</div>
        </div>
      </div>
    </div>
  )
}
