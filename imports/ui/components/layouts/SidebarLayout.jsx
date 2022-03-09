import React, {useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBrowsers, faCube, faBarsProgress, faSwatchbook, faLoader, faArrowLeft} from '@fortawesome/pro-solid-svg-icons'
import {useLocation, NavLink, useParams, useHistory} from 'react-router-dom'
import {useTracker} from 'meteor/react-meteor-data'
import {RoutePaths} from '../../app/routes'
import {faSidebarFlip, faCircleUser} from '@fortawesome/pro-light-svg-icons'
import {AppsCollection} from '../../../collections/apps'
import {useMethod} from '../../../infra/hooks/useMethod'

export const SidebarLayout = ({children, contentComponent, loading, menuMinimized}) => {
  const {appId} = useParams() || {}
  const location = useLocation()
  const history = useHistory()
  const user = useTracker(() => Meteor.user())

  const findPage = useMethod('pages.findByPath', {
    onSuccess: (page) => {
      if (page) {
        history.push(`${RoutePaths.APPS}/${appId}${RoutePaths.PAGES}/${page._id}?structureType=actual`)
      }
    },
  })

  useEffect(() => {
    let params = new URL(document.location).searchParams
    let pagePathParam = params.get('pagePath')
    if (pagePathParam) {
      findPage.call({appId, path: pagePathParam})
    }
  }, [])

  const {app} = useTracker(() => {
    if (!appId) return {}
    const sub = Meteor.subscribe('apps.byId', appId)
    const app = AppsCollection.findOne(appId)

    return {
      app,
      loading: !sub.ready(),
    }
  }, [appId])

  const tabs = [
    {label: 'App', icon: faBarsProgress, path: ''},
    {label: 'Pages', icon: faBrowsers, path: RoutePaths.PAGES},
    {label: 'Components', icon: faCube, path: RoutePaths.COMPONENTS},
    {label: 'Themes', icon: faSwatchbook, path: RoutePaths.THEMES},
  ]

  const isTabActive = (tabPath) => {
    let regex = `^/apps/${appId}/?$`
    if (tabPath) {
      regex = `^/apps/${appId}${tabPath}`
    }
    return location.pathname.match(new RegExp(regex, 'g'))
  }

  return (
    <div data-ls="AuthenticatedLayout" className="flex">
      <div className="content flex-1 hidden sm:block bg-gradient-to-bl from-blue-500 to-purple-500">
        {contentComponent}
      </div>
      <div className="w-1.5 h-screen bg-gray-100 hover:bg-gray-200 border-l border-gray-200 hover:bg-opacity-75 cursor-pointer hidden sm:block" />
      <div className="sidebar flex flex-col bg-white text-gray-500 text-xs w-full sm:w-80 h-screen sm:border-l border-gray-200">
        {user && (
          <>
            <div className="bg-white border-b h-7 px-1 flex justify-between items-center">
              <NavLink to={RoutePaths.APPS} className="flex gap-1 items-center p-2">
                <FontAwesomeIcon icon={faSidebarFlip} className="text-2xs" />
                <h1 className="text-2xs font-extralight">Lenna Studio</h1>
              </NavLink>
              <NavLink to={RoutePaths.PROFILE} className="flex-none flex gap-1 items-center p-2 cursor-pointer">
                <span className="text-2xs font-light">{user?.username}</span>
                <FontAwesomeIcon icon={faCircleUser} className="text-2xs" />
              </NavLink>
            </div>
            {app && (
              <NavLink
                className={`${
                  menuMinimized ? 'py-2' : 'py-3'
                } px-3 flex justify-start items-center gap-2 border-b bg-gray-50 uppercase text-2xs`}
                to={RoutePaths.APPS}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="" />
                <h2 className="leading-none">{app.name}</h2>
              </NavLink>
            )}
            {appId && (
              <div className="w-full border-b border-gray-200 flex justify-between">
                <div className={`flex w-full  justify-between ${!menuMinimized ? 'h-14' : 'h-10'}`}>
                  {tabs?.map((tab, idx) => (
                    <NavLink
                      key={idx}
                      className={`flex-1 flex flex-col gap-1 justify-center items-center border-r border-gray-200 cursor-pointer ${
                        isTabActive(tab.path) ? 'bg-gray-100  text-blue-500' : ''
                      }`}
                      to={`${RoutePaths.APPS}/${appId}${tab.path ? tab.path : ''}`}
                    >
                      <FontAwesomeIcon icon={tab.icon} className={`text-lg`} />
                      {!menuMinimized && <h2 className={`text-2xs`}>{tab.label}</h2>}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        <div className={`flex-1 h-screen ${user ? 'p-4' : 'px-4'} overflow-auto relative`}>
          {loading && (
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-white flex justify-center">
              <FontAwesomeIcon icon={faLoader} className="text-xl my-10" spin />
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
