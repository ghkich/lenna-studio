import React from 'react'
import {useHistory} from 'react-router-dom'
import {faArrowLeft, faTrashCan} from '@fortawesome/pro-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export const PageHeader = ({title, goBackTo, onDelete}) => {
  const history = useHistory()

  return (
    <div className="flex items-center justify-between pb-2">
      <button
        type="button"
        className="flex items-center gap-2  hover:opacity-75 cursor-pointer"
        onClick={() => (goBackTo ? history.push(goBackTo) : history.goBack())}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="" />
        <h2 className="leading-none">{title}</h2>
      </button>
      {onDelete && (
        <button
          type="button"
          className={`flex h-6 w-6 justify-center items-center rounded-sm bg-white border hover:bg-gray-50 hover:text-red-500`}
          onClick={onDelete}
        >
          <FontAwesomeIcon icon={faTrashCan} className="text-2xs" />
        </button>
      )}
    </div>
  )
}
