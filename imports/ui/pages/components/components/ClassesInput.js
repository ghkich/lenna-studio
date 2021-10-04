import React, {useCallback, useEffect, useState} from 'react'
import {useMethod} from '../../../../infra/hooks/useMethod'
import {useAppContext} from '../../../app/AuthContext'
import {debounce} from '../../../utils/debounce'

export const ClassesInput = ({componentId, selectorId, selectorValue, classes, style, state, disabled}) => {
  const [value, setValue] = useState()
  const appContext = useAppContext()
  const appId = appContext?.state.selectedAppId

  useEffect(() => {
    setValue(classes?.join(' '))
  }, [classes])

  const updateOrCreateBaseClasses = useMethod('selectors.updateOrCreateBaseClasses')
  const updateOrCreateStyleClasses = useMethod('selectors.updateOrCreateStyleClasses')
  const updateOrCreateStateClasses = useMethod('selectors.updateOrCreateStateClasses')

  const handleUpdateClasses = (classes) => {
    if (style) {
      updateOrCreateStyleClasses.call({appId, componentId, selectorId, selectorValue, style, classes})
      return
    }
    if (state) {
      updateOrCreateStateClasses.call({appId, componentId, selectorId, selectorValue, state, classes})
      return
    }
    updateOrCreateBaseClasses.call({appId, componentId, selectorId, selectorValue, classes})
  }

  const debouncedHandleUpdateClasses = useCallback(debounce(handleUpdateClasses, 300), [])

  return (
    <div>
      <textarea
        value={value || ''}
        onBlur={(e) => handleUpdateClasses(e.target.value.split(' '))}
        onChange={(e) => {
          setValue(e.target.value)
          debouncedHandleUpdateClasses(e.target.value.split(' '))
        }}
        className="w-full p-2 border"
        spellCheck={false}
        disabled={disabled}
      />
    </div>
  )
}
