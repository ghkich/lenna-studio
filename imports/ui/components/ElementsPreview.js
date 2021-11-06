import React, {useEffect, useState} from 'react'
import {omit} from '../utils/object-utils'
import {CUSTOM_ATTR_KEYS} from '../../infra/constants/custom-attr-keys'
import {useTracker} from 'meteor/react-meteor-data'
import {SelectorsCollection} from '../../collections/selectors'
import {generateCss} from '../../api/generate-css'
import {ComponentsCollection} from '../../collections/components'
import {ElementsCollection} from '../../collections/elements'

export const ElementsPreview = ({elements, selectedComponentId, selectedStyle, selectedState}) => {
  const [css, setCss] = useState('')

  useTracker(() => {
    if (!elements) return {}
    const componentIds = elements
      ?.map((element) => (element.parentId ? element?.component?._id : element.componentId))
      .filter(Boolean)
    if (componentIds.length === 0) return {}
    Meteor.subscribe('components.byIds', componentIds)
    Meteor.subscribe('selectors.byComponentIds', componentIds)
    Meteor.subscribe('elements.byComponentIds', componentIds)
    const selectors = SelectorsCollection.find({componentId: {$in: componentIds}}).fetch()
    const css = generateCss({selectors})
    setCss(css)
  }, [elements])

  useEffect(() => {
    if (selectedComponentId) {
      const updateComponentElementCustomData = () => {
        setTimeout(() => {
          const domComponent = document.getElementById(selectedComponentId)
          if (domComponent) {
            domComponent?.setAttribute(CUSTOM_ATTR_KEYS.STYLE, selectedStyle)
            domComponent?.setAttribute(CUSTOM_ATTR_KEYS.STATE, selectedState)
          } else {
            updateComponentElementCustomData()
          }
        }, 100)
      }
      updateComponentElementCustomData()
    }
  }, [selectedComponentId, selectedStyle, selectedState])

  const containerElement = elements?.find((el) => !el?.parentId)
  if (!containerElement) return null
  const renderChildren = (children, containerComponentId) => {
    if (!children || children.length === 0) return null
    return children?.map((element) => {
      let component = ComponentsCollection.findOne(element.component?._id)
      if (!element.parentId) {
        component = ComponentsCollection.findOne(element.componentId)
      }
      const tagName = element?.tagName || ElementsCollection.findOne({componentId: component?._id})?.tagName
      const componentProps = {
        [CUSTOM_ATTR_KEYS.COMPONENT]: component?.name,
        [CUSTOM_ATTR_KEYS.STYLE]: element.component?.style || component?.styles?.[0],
        [CUSTOM_ATTR_KEYS.STATE]: element.component?.state || component?.states?.[0],
      }
      if (element?.text) {
        return element?.text
      }
      if (!tagName) return null
      const children = elements?.filter((el) => el?.parentId === element._id)
      return React.createElement(
        tagName,
        {
          key: element?._id,
          id: containerComponentId,
          ...omit(['class', 'viewbox'], element?.attrs),
          className: element?.attrs?.class,
          viewBox: element?.attrs?.viewbox,
          ...componentProps,
        },
        renderChildren(children),
      )
    })
  }
  return (
    <>
      <style>{css}</style>
      {renderChildren([containerElement], selectedComponentId)}
    </>
  )
}
