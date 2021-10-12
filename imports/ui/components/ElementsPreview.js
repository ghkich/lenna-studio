import React, {useEffect, useState} from 'react'
import {omit} from '../utils/object-utils'
import {CUSTOM_DATA_KEY} from '../../infra/constants/lenna-attr-keys'
import {ComponentsCollection} from '../../collections/components'
import {useTracker} from 'meteor/react-meteor-data'
import {SelectorsCollection} from '../../collections/selectors'
import {generateCss} from '../../api/generate-css'
import {useAppContext} from '../app/AuthContext'

export const ElementsPreview = ({elements, selectedPageId, selectedComponentId, selectedStyle, selectedState}) => {
  const [css, setCss] = useState('')
  const {state} = useAppContext()

  useTracker(() => {
    if (!state.selectedAppId) return {}
    Meteor.subscribe('selectors.byAppId', {appId: state.selectedAppId})
    Meteor.subscribe('components.byAppId', {appId: state.selectedAppId})
    const appSelectors = SelectorsCollection.find().fetch()

    const css = generateCss({selectors: appSelectors})
    setCss(css)
  }, [state.selectedAppId, selectedPageId])

  useEffect(() => {
    if (selectedComponentId) {
      const component = ComponentsCollection.findOne({_id: selectedComponentId})

      let customData = component?.name
      if (selectedStyle) {
        customData += `-${selectedStyle}`
      }
      if (selectedState) {
        customData += `:${selectedState}`
      }

      const updateComponentElementCustomData = () => {
        setTimeout(() => {
          const selectedComponentElement = document.getElementById(selectedComponentId)
          if (selectedComponentElement) {
            selectedComponentElement?.setAttribute(CUSTOM_DATA_KEY, customData)
          } else {
            updateComponentElementCustomData()
          }
        }, 100)
      }
      updateComponentElementCustomData()
    }
  }, [selectedComponentId, selectedStyle, selectedState])

  const containerElement = elements?.find((el) => !el.parentId)
  if (!containerElement) return null
  const renderChildren = (childrenIds, containerComponentId) => {
    if (!childrenIds || childrenIds.length === 0) return null
    return childrenIds?.map((childId) => {
      const element = elements?.find((el) => el._id === childId)
      if (!element?.tagName) {
        return element.text
      }
      return React.createElement(
        element?.tagName,
        {
          key: element?._id,
          id: containerComponentId,
          ...omit(['class', 'viewbox'], element?.attrs),
          className: element?.attrs?.class,
          viewBox: element?.attrs?.viewbox,
        },
        renderChildren(element.childrenIds),
      )
    })
  }
  return (
    <>
      <style>{css}</style>
      {renderChildren([containerElement._id], selectedComponentId)}
    </>
  )
}
