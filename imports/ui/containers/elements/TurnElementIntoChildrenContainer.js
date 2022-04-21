import React from 'react'
import {useMethod} from '../../../infra/hooks/useMethod'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBracketsCurly} from '@fortawesome/pro-solid-svg-icons'

export const TurnElementIntoChildrenContainer = ({element, active}) => {
  const updateComponent = useMethod('components.update')

  return (
    <button
      type="button"
      className={`flex h-6 w-6 justify-center items-center bg-white border ${
        active ? 'bg-gray-50 text-gray-700' : 'hover:bg-gray-50 text-gray-400'
      }`}
      onClick={() => {
        updateComponent.call({componentId: element.componentId, childrenContainerElementId: element._id})
      }}
    >
      <FontAwesomeIcon icon={faBracketsCurly} className="text-2xs" />
    </button>
  )
}
