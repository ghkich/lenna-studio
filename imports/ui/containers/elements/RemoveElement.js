import React from 'react'
import {useMethod} from '../../../infra/hooks/useMethod'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/pro-solid-svg-icons'

export const RemoveElement = ({element}) => {
  const removeElement = useMethod('elements.remove', {
    onSuccess: (teste) => {
      console.log('teste', teste)
    },
  })

  return (
    <button
      type="button"
      className={`flex h-6 w-6 justify-center items-center rounded-sm bg-white border hover:bg-gray-50`}
      onClick={() => {
        removeElement.call({_id: element._id})
      }}
    >
      <FontAwesomeIcon icon={faTrashCan} className="text-2xs" />
    </button>
  )
}
