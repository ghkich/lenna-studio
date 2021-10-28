import React, {useEffect, useState} from 'react'
import {omit} from '../utils/object-utils'
import {CUSTOM_ATTR_KEYS} from '../../infra/constants/custom-attr-keys'
import {useTracker} from 'meteor/react-meteor-data'
import {SelectorsCollection} from '../../collections/selectors'
import {generateCss} from '../../api/generate-css'

export const ElementsPreview = ({elements, componentId, selectedStyle, selectedState}) => {
  const [css, setCss] = useState('')
  const appId = elements?.[0]?.appId

  useTracker(() => {
    if (!appId) return {}
    Meteor.subscribe('selectors.byAppId', {appId})
    Meteor.subscribe('components.byAppId', {appId})
    const appSelectors = SelectorsCollection.find().fetch()

    const css = generateCss({selectors: appSelectors})
    setCss(css)
  }, [appId])

  useEffect(() => {
    if (componentId) {
      const updateComponentElementCustomData = () => {
        setTimeout(() => {
          const domComponent = document.getElementById(componentId)
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
  }, [componentId, selectedStyle, selectedState])

  const containerElement = elements?.find((el) => !el?.parentId)
  if (!containerElement) return null
  const renderChildren = (children, containerComponentId) => {
    if (!children || children.length === 0) return null
    return children?.map((element) => {
      if (!element?.tagName) {
        return element?.text
      }
      const children = elements?.filter((el) => el?.parentId === element._id)
      return React.createElement(
        element?.tagName,
        {
          key: element?._id,
          id: containerComponentId,
          ...omit(['class', 'viewbox'], element?.attrs),
          className: element?.attrs?.class,
          viewBox: element?.attrs?.viewbox,
        },
        renderChildren(children),
      )
    })
  }
  return (
    <>
      <style>{css}</style>
      {renderChildren([containerElement], componentId)}
    </>
  )
}
