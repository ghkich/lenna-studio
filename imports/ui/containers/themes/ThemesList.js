import React, {useState} from 'react'
import {useTracker} from 'meteor/react-meteor-data'
import {RoutePaths} from '../../app/routes'
import {ListControls} from '../../components/ListControls'
import {NavLink} from 'react-router-dom'
import {ThemesCollection} from '../../../collections/themes'

export const ThemesList = () => {
  const [searchValue, setSearchValue] = useState('')

  const {themes} = useTracker(() => {
    Meteor.subscribe('themes.byUserId')
    Meteor.subscribe('themes.global')
    const themes = ThemesCollection.find({
      name: {$regex: searchValue, $options: 'i'},
    }).fetch()

    return {
      themes,
    }
  }, [])

  return (
    <>
      <ListControls
        searchValue={searchValue}
        onSearch={(value) => setSearchValue(value)}
        onAddClickGoTo={RoutePaths.NEW_THEME}
        placeholder="Search themes..."
      />
      <ThemesListComponent themes={themes} />
    </>
  )
}

const ThemesListComponent = ({themes}) => {
  return (
    <div className="flex flex-col gap-0.5 mt-1">
      {themes?.map((comp) => (
        <NavLink
          key={comp._id}
          className={`border rounded-sm px-2 py-1 hover:bg-gray-50 cursor-pointer`}
          to={`${RoutePaths.THEMES}/${comp._id}`}
        >
          {comp.name}
        </NavLink>
      ))}
    </div>
  )
}
