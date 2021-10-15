import {Tags} from '../../../components/basic/Tags'
import React from 'react'
import {useMethod} from '../../../../infra/hooks/useMethod'

export const ManageStyles = ({componentId, styles, selectedStyle, onChangeStyle}) => {
  const addStyle = useMethod('components.addStyle')
  const removeStyle = useMethod('components.removeStyle')

  return (
    <div>
      <Tags
        tags={styles}
        selectedTag={selectedStyle}
        onChangeTag={onChangeStyle}
        onAddTag={(style) => {
          addStyle.call({componentId, style})
        }}
        onRemoveTag={(style) => {
          removeStyle.call({componentId, style})
        }}
        addTagPlaceholder="New style"
      />
    </div>
  )
}
