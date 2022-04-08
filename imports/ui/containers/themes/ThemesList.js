import React, {useState} from 'react'
import {useTracker} from 'meteor/react-meteor-data'
import {RoutePaths} from '../../app/routes'
import {ListControls} from '../../components/ListControls'
import {NavLink} from 'react-router-dom'
import {ThemesCollection} from '../../../collections/themes'

export const ThemesList = ({appId}) => {
  const [searchValue, setSearchValue] = useState('')

  const {themes} = useTracker(() => {
    Meteor.subscribe('themes.byUserId')
    Meteor.subscribe('themes.global')
    const themes = ThemesCollection.find(
      {
        name: {$regex: searchValue, $options: 'i'},
      },
      {sort: {createdAt: 1}},
    ).fetch()

    return {
      themes,
    }
  }, [searchValue])

  return (
    <>
      <ListControls
        searchValue={searchValue}
        onSearch={(value) => setSearchValue(value)}
        onAddClickGoTo={`${RoutePaths.APPS}/${appId}${RoutePaths.NEW_THEME}`}
        placeholder="Search themes..."
      />
      <ThemesListComponent themes={themes} appId={appId} />
    </>
  )
}

const ThemesListComponent = ({themes, appId}) => {
  return (
    <div className="flex flex-col gap-1.5 sm:gap-0.5">
      {themes?.map((comp) => (
        <NavLink
          key={comp._id}
          className={`border px-2 py-2 sm:py-1 hover:bg-gray-50 cursor-pointer transition-colors`}
          to={`${RoutePaths.APPS}/${appId}${RoutePaths.THEMES}/${comp._id}`}
        >
          {comp.name}
        </NavLink>
      ))}
    </div>
  )
}
