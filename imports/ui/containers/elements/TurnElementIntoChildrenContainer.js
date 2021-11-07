import React from 'react'
import {useMethod} from '../../../infra/hooks/useMethod'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBracketsCurly} from '@fortawesome/pro-solid-svg-icons'

export const TurnElementIntoChildrenContainer = ({element, active}) => {
  const updateComponent = useMethod('components.update')

  return (
    <button
      type="button"
      className={`flex h-6 w-6 justify-center items-center rounded-sm bg-white border ${
        active ? 'bg-blue-50 text-blue-500' : 'hover:bg-gray-50'
      }`}
      onClick={() => {
        updateComponent.call({componentId: element.componentId, childrenContainerElementId: element._id})
      }}
    >
      <FontAwesomeIcon icon={faBracketsCurly} className="text-2xs" />
    </button>
  )
}
