import React, {useEffect} from 'react'
import {omit} from '../utils/object-utils'
import {CUSTOM_DATA_KEY} from '../../infra/constants/lenna-attr-keys'
import {ComponentsCollection} from '../../collections/components'

export const ElementsPreview = ({elements, selectedComponentId, selectedStyle, selectedState}) => {
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
  return renderChildren([containerElement._id], selectedComponentId)
}
