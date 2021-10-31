import React, {useState} from 'react'
import {useMethod} from '../../infra/hooks/useMethod'
import {useTracker} from 'meteor/react-meteor-data'
import {PagesCollection} from '../../collections/pages'
import {RoutePaths} from '../app/routes'
import {ListControls} from '../components/ListControls'
import {NavLink} from 'react-router-dom'

export const PagesList = ({appId}) => {
  const [searchValue, setSearchValue] = useState('')
  const {pages} = useTracker(() => {
    const sub = Meteor.subscribe('pages.byAppId', {appId})
    const pages = PagesCollection.find({
      name: {$regex: searchValue, $options: 'i'},
    }).fetch()

    return {
      pages,
      loading: !sub.ready(),
    }
  }, [appId, searchValue])

  const removePage = useMethod('pages.remove')

  const handleRemovePage = (pageId) => {
    removePage.call(pageId)
  }

  return (
    <>
      <ListControls
        searchValue={searchValue}
        onSearch={(value) => setSearchValue(value)}
        onAddClickGoTo={appId ? `${RoutePaths.APPS}/${appId}${RoutePaths.NEW_PAGE}` : RoutePaths.NEW_PAGE}
      />
      <PagesListComponent pages={pages} />
    </>
  )
}

const PagesListComponent = ({pages}) => {
  return (
    <div className="flex flex-col gap-0.5 mt-1">
      {pages?.map((page) => (
        <NavLink
          key={page._id}
          className={`border rounded-sm px-2 py-1 hover:bg-gray-50 cursor-pointer`}
          to={`${RoutePaths.PAGES}/${page._id}`}
        >
          {page.name}
        </NavLink>
      ))}
    </div>
  )
}
