import React, {useState} from 'react'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {NavLink} from 'react-router-dom'
import {useTracker} from 'meteor/react-meteor-data'
import {AppsCollection} from '../../../collections/apps'
import {RoutePaths} from '../../app/routes'
import {ListControls} from '../../components/ListControls'
import {faArrowTurnUp} from '@fortawesome/pro-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export const Apps = () => {
  const [appSearchValue, setAppSearchValue] = useState('')

  const {apps, loadingApps} = useTracker(() => {
    const sub = Meteor.subscribe('apps.byUserId')
    const apps = AppsCollection.find(
      {
        name: {$regex: appSearchValue, $options: 'i'},
      },
      {sort: {createdAt: -1}},
    ).fetch()

    return {
      apps,
      loadingApps: !sub.ready(),
    }
  }, [appSearchValue])

  return (
    <SidebarLayout loading={loadingApps}>
      <ListControls
        searchValue={appSearchValue}
        onSearch={(value) => setAppSearchValue(value)}
        onAddClickGoTo={RoutePaths.NEW_APP}
        placeholder="Search apps..."
      />
      {apps.length === 0 && (
        <div className="flex mt-1 pl-1 pr-2 pt-3 border-t border-gray-100">
          <div className="flex-1 pr-2">
            <h1 className="font-bold mb-1">Create your first app</h1>
            <h2>We can't wait to see what you've got</h2>
          </div>
          <FontAwesomeIcon icon={faArrowTurnUp} className="text-3xl" />
        </div>
      )}
      <div className="flex flex-col gap-1 mt-1">
        {apps.map((app) => (
          <NavLink
            key={app._id}
            to={`${RoutePaths.APPS}/${app._id}`}
            className="border rounded-sm p-2 hover:bg-gray-50"
          >
            {app.name}
          </NavLink>
        ))}
      </div>
    </SidebarLayout>
  )
}
