import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/pro-solid-svg-icons'
import {useMethod} from '../../infra/hooks/useMethod'

export const PagesList = ({pages, selectedPageId, onSelectPage, showRemove}) => {
  const removePage = useMethod('pages.remove')

  const handleRemovePage = (pageId) => {
    removePage.call(pageId)
  }

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
            <div onClick={() => handleRemovePage(page._id)} className="opacity-25 hover:opacity-75">
              <FontAwesomeIcon icon={faTrashCan} />
            </div>
          )}
        </button>
      ))}
    </div>
  )
}
