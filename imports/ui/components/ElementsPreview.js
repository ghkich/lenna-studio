import React from 'react'
import {omit} from '../utils/object-utils'

export const ElementsPreview = ({elements}) => {
  const containerElement = elements?.find((el) => !el.parentId)
  if (!containerElement) return null
  const renderChildren = (childrenIds) => {
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
          ...omit(['class', 'viewbox'], element?.attrs),
          className: element?.attrs?.class,
          viewBox: element?.attrs?.viewbox,
        },
        renderChildren(element.childrenIds),
      )
    })
  }
  return renderChildren([containerElement._id])
}
