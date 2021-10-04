import {Tags} from '../../../components/Tags'
import React from 'react'
import {useMethod} from '../../../../infra/hooks/useMethod'

export const ManageStates = ({componentId, states, selectedState, onChangeState}) => {
  const addState = useMethod('components.addState')
  const removeState = useMethod('components.removeState')

  return (
    <div>
      <Tags
        tags={states}
        selectedTag={selectedState}
        onChangeTag={onChangeState}
        onAddTag={(state) => {
          addState.call({componentId, state})
        }}
        onRemoveTag={(state) => {
          removeState.call({componentId, state})
        }}
        addTagPlaceholder="New state"
      />
    </div>
  )
}
