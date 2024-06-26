import React from 'react'
import {useMethod} from '../../../infra/hooks/useMethod'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/pro-solid-svg-icons'

export const RemoveElement = ({element}) => {
  if (!element.parentId) return null
  const removeElement = useMethod('elements.remove', {
    onSuccess: () => {},
  })

  return (
    <button
      type="button"
      className={`flex h-6 w-6 justify-center items-center bg-white border hover:bg-gray-50 hover:text-red-500`}
      onClick={() => {
        removeElement.call({_id: element._id})
      }}
    >
      <FontAwesomeIcon icon={faTrashCan} className="text-2xs" />
    </button>
  )
}
