import React, {useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBrowsers, faCube, faPalette, faSwatchbook} from '@fortawesome/pro-solid-svg-icons'
import {useLocation, useHistory} from 'react-router-dom'
import {useTracker} from 'meteor/react-meteor-data'
import {AppsCollection} from '../../collections/apps'
import {useAppContext} from '../app/AuthContext'
import {RoutePaths} from '../app/routes'

export const SidebarLayout = ({children, contentComponent}) => {
  const location = useLocation()
  const history = useHistory()
  const user = useTracker(() => Meteor.user())
  const {state, actions} = useAppContext()

  const tabs = [
    {label: 'Structure', icon: faBrowsers, path: RoutePaths.STRUCTURE},
    {label: 'Components', icon: faCube, path: RoutePaths.COMPONENTS},
    {label: 'Inspiration', icon: faSwatchbook, path: RoutePaths.INSPIRATION},
    {label: 'Themes', icon: faPalette, path: RoutePaths.THEMES},
  ]

  const {apps} = useTracker(() => {
    const sub = Meteor.subscribe('apps.byUserId')
    const apps = AppsCollection.find({userId: user?._id}).fetch()

    return {
      apps,
      status: sub.ready() ? 'ready' : 'loading',
    }
  }, [])

  useEffect(() => {
    if (apps.length > 0) {
      actions.setSelectedAppId(apps[0]?._id)
    }
  }, [apps])

  return (
    <div data-ls="AuthenticatedLayout" className="flex">
      <div className="content flex-1">{contentComponent}</div>
      <div className="w-2 h-screen bg-gray-100 hover:bg-gray-200 hover:bg-opacity-75 cursor-pointer" />
      <div className="sidebar flex flex-col bg-white text-gray-500 text-xs w-80 h-screen border-l border-gray-200">
        {user && (
          <>
            <div className="bg-gray-50 border-b h-6 flex justify-between items-center">
              <select
                value={state.selectedAppId}
                onChange={(e) => actions.setSelectedAppId(e.target.value)}
                className="bg-transparent ml-2 text-2xs"
              >
                {apps?.map((app) => (
                  <option key={app._id} value={app._id}>
                    {app.name}
                  </option>
                ))}
              </select>
              <div className="flex-none">
                <span className="font-semibold text-2xs">{user?.username}</span>
                <button
                  type="button"
                  className="p-1 mr-2 opacity-75 text-2xs"
                  onClick={() => {
                    Meteor.logout()
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
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
          </>
        )}
        <div className="flex-1 p-4 overflow-auto">{children}</div>
      </div>
    </div>
  )
}
