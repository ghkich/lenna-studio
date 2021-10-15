import React, {useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/pro-solid-svg-icons'
import {useMethod} from '../../infra/hooks/useMethod'
import {useTracker} from 'meteor/react-meteor-data'
import {PagesCollection} from '../../collections/pages'
import {RoutePaths} from '../app/routes'
import {ListControls} from '../components/ListControls'

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
        onAddClickGoTo={RoutePaths.NEW_PAGE}
      />
      <PagesListComponent pages={pages} />
    </>
  )
}

const PagesListComponent = ({pages, selectedPageId, onSelectPage, onRemoveClick, showRemove}) => {
  return (
    <div className="border-b">
      {pages?.map((page) => (
        <button
          key={page._id}
          type="button"
          className={`flex border border-b-0 px-2 py-1 w-full text-left ${
            page._id === selectedPageId ? 'bg-blue-50 text-blue-500' : ''
          }`}
          onClick={() => onSelectPage(page._id)}
        >
          <div className="flex-1">{page.name}</div>
          {showRemove && (
            <div onClick={onRemoveClick} className="opacity-25 hover:opacity-75">
              <FontAwesomeIcon icon={faTrashCan} />
            </div>
          )}
        </button>
      ))}
    </div>
  )
}
