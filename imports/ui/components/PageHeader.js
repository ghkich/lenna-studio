import React from 'react'
import {useHistory} from 'react-router-dom'
import {faArrowLeft, faCopy, faTrashCan} from '@fortawesome/pro-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const copyHtml = async () => {
  const html = document.getElementById('__lennaPreview')?.innerHTML
  await navigator.clipboard.writeText(html)
}

export const PageHeader = ({title, goBackTo, showCopyButton, onDelete}) => {
  const history = useHistory()

  return (
    <div className="flex gap-2 items-center pb-2">
      <button
        type="button"
        className="flex flex-1 gap-2 items-center hover:opacity-75 cursor-pointer"
        onClick={() => (goBackTo ? history.push(goBackTo) : history.goBack())}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="" />
        <h2 className="leading-none">{title}</h2>
      </button>
      {showCopyButton && (
        <button
          type="button"
          className={`flex h-6 w-6 justify-center items-center rounded-sm bg-white border hover:bg-gray-50`}
          onClick={() => copyHtml()}
        >
          <FontAwesomeIcon icon={faCopy} className="text-2xs" />
        </button>
      )}
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
