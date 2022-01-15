import React, {useState} from 'react'
import {useTracker} from 'meteor/react-meteor-data'
import {RoutePaths} from '../app/routes'
import {ListControls} from '../components/ListControls'
import {ComponentsCollection} from '../../collections/components'
import {NavLink} from 'react-router-dom'

export const ComponentsList = ({appId}) => {
  const [searchValue, setSearchValue] = useState('')
  const {components} = useTracker(() => {
    const sub = Meteor.subscribe('components.byAppId', {appId})
    const components = ComponentsCollection.find(
      {
        name: {$regex: searchValue, $options: 'i'},
      },
      {sort: {createdAt: 1}},
    ).fetch()

    return {
      components,
      loading: !sub.ready(),
    }
  }, [appId, searchValue])

  return (
    <>
      <ListControls
        searchValue={searchValue}
        onSearch={(value) => setSearchValue(value)}
        onAddClickGoTo={`${RoutePaths.APPS}/${appId}${RoutePaths.NEW_COMPONENT}`}
        placeholder="Search components..."
      />
      <ComponentsListComponent components={components} appId={appId} />
    </>
  )
}

const ComponentsListComponent = ({components, appId}) => {
  return (
    <div className="flex flex-col gap-0.5 mt-1">
      {components?.map((comp) => (
        <NavLink
          key={comp._id}
          className={`border rounded-sm px-2 py-1 hover:bg-gray-50 cursor-pointer`}
          to={`${RoutePaths.APPS}/${appId}${RoutePaths.COMPONENTS}/${comp._id}`}
        >
          {comp.name}
        </NavLink>
      ))}
    </div>
  )
}
