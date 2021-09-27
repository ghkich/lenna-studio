import React from 'react'
import {useAppContext} from '../app/AuthContext'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBrowsers, faCube, faPalette, faStarOfLife, faSwatchbook} from '@fortawesome/pro-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
import {RoutePaths} from '../app/routes'
import {useLocation, useHistory} from 'react-router-dom'

library.add(faBrowsers, faCube, faPalette, faSwatchbook, faStarOfLife)

const tabs = [
  {label: 'Structure', icon: faBrowsers, path: RoutePaths.HOME},
  {label: 'Components', icon: faCube, path: RoutePaths.COMPONENTS},
  {label: 'Inspiration', icon: faSwatchbook},
  {label: 'Theme', icon: faPalette},
]

export const AuthenticatedLayout = ({user, children}) => {
  const {actions} = useAppContext()
  const location = useLocation()
  const history = useHistory()
  return (
    <div className="flex">
      <div className="flex-1"></div>
      <div className="w-1 h-screen bg-black bg-opacity-75"></div>
      <div className="flex flex-col bg-white text-gray-500 text-xs w-80 h-screen">
        <div>Selected APP ID</div>
        <div className="w-full border-b border-gray-200 flex justify-between">
          <div className="flex w-full h-14 justify-between">
            {tabs?.map((tab, idx) => (
              <div
                key={idx}
                className={`flex-1 flex flex-col justify-center items-center border-r border-gray-200 cursor-pointer ${
                  tab.path === location.pathname ? 'bg-gray-100  text-blue-500' : ''
                }`}
                onClick={() => {
                  history.push(tab.path)
                }}
              >
                <FontAwesomeIcon icon={tab.icon} className={`text-lg mb-1`} />
                <div className={`text-2xs`}>{tab.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 p-4">{children}</div>
        <div>
          <button
            type="button"
            onClick={() => {
              Meteor.logout(() => {
                actions.removeUser()
              })
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
