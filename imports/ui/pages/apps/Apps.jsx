import React, {useState} from 'react'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {NavLink} from 'react-router-dom'
import {useTracker} from 'meteor/react-meteor-data'
import {AppsCollection} from '../../../collections/apps'
import {RoutePaths} from '../../app/routes'
import {ListControls} from '../../components/ListControls'

export const Apps = () => {
  const [appSearchValue, setAppSearchValue] = useState('')

  const {apps, loadingApps} = useTracker(() => {
    const sub = Meteor.subscribe('apps.byUserId')
    const apps = AppsCollection.find({
      name: {$regex: appSearchValue, $options: 'i'},
    }).fetch()

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
