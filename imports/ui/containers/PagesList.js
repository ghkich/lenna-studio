import React, {useState} from 'react'
import {useTracker} from 'meteor/react-meteor-data'
import {PagesCollection} from '../../collections/pages'
import {RoutePaths} from '../app/routes'
import {ListControls} from '../components/ListControls'
import {NavLink} from 'react-router-dom'

export const PagesList = ({appId}) => {
  const [searchValue, setSearchValue] = useState('')
  const {pages} = useTracker(() => {
    const sub = Meteor.subscribe('pages.byAppId', {appId})
    const pages = PagesCollection.find(
      {
        name: {$regex: searchValue, $options: 'i'},
      },
      {sort: {createdAt: 1}},
    ).fetch()

    return {
      pages,
      loading: !sub.ready(),
    }
  }, [appId, searchValue])

  return (
    <>
      <ListControls
        searchValue={searchValue}
        onSearch={(value) => setSearchValue(value)}
        onAddClickGoTo={appId ? `${RoutePaths.APPS}/${appId}${RoutePaths.NEW_PAGE}` : RoutePaths.NEW_PAGE}
        placeholder="Search pages..."
      />
      <PagesListComponent pages={pages} appId={appId} />
    </>
  )
}

const PagesListComponent = ({pages, appId}) => {
  return (
    <div className="flex flex-col gap-1.5 sm:gap-0.5">
      {pages?.map((page) => (
        <NavLink
          key={page._id}
          className={`border px-2 py-2 sm:py-1 hover:bg-gray-50 cursor-pointer transition-colors`}
          to={`${RoutePaths.APPS}/${appId}${RoutePaths.PAGES}/${page._id}`}
        >
          {page.name}
        </NavLink>
      ))}
    </div>
  )
}
