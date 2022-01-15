import React, {useEffect, useState} from 'react'
import {ObjectUtils} from '../utils/object-utils'
import {CUSTOM_ATTR_KEYS} from '../../infra/constants/custom-attr-keys'
import {useTracker} from 'meteor/react-meteor-data'
import {SelectorsCollection} from '../../collections/selectors'
import {generateCss} from '../../api/generate-css'
import {ComponentsCollection} from '../../collections/components'
import {ElementsCollection} from '../../collections/elements'
import {ThemesCollection} from '../../collections/themes'
import {AppsCollection} from '../../collections/apps'
import {STRUCTURE_TYPES} from '../../infra/constants/structure-types'

export const ElementsPreview = ({appId, elements, selectedComponentId, selectedStyle, selectedState}) => {
  const [css, setCss] = useState('')
  const [previewReady, setPreviewReady] = useState(false)

  useEffect(() => {
    let renderDelay
    if (css) {
      renderDelay = setTimeout(() => setPreviewReady(true), 50)
    }
    return () => {
      clearTimeout(renderDelay)
    }
  }, [css])

  const {allElements, theme, selectors} = useTracker(() => {
    if (!elements) return {}
    const componentIds = elements
      ?.map((element) => {
        if (!element.parentId && element.componentId) {
          return element.componentId
        }
        if (element?.component?._id) {
          return element.component._id
        } else {
          const componentName = element.attrs?.[CUSTOM_ATTR_KEYS.COMPONENT]
          if (componentName) {
            return ComponentsCollection.findOne({appId, name: componentName})?._id
          }
        }
      })
      .filter(Boolean)
    Meteor.subscribe('apps.byId', appId)
    Meteor.subscribe('components.byAppId', {appId})
    Meteor.subscribe('components.byIds', componentIds)
    Meteor.subscribe('elements.byComponentIds', componentIds)
    Meteor.subscribe('selectors.byComponentIds', componentIds)
    Meteor.subscribe('themes.byUserId')
    let selectors = SelectorsCollection.find({componentId: {$in: componentIds}}).fetch()

    const app = AppsCollection.findOne(appId)
    const theme = ThemesCollection.findOne(app?.themeId)

    const allElements = []
    const allElementComponentIds = componentIds

    let component

    elements.forEach((element) => {
      const componentId = element?.component?._id
      if (componentId) {
        component = ComponentsCollection.findOne({_id: componentId})
        const componentElements =
          element?.structure.type === STRUCTURE_TYPES.ACTUAL ? [] : ElementsCollection.find({componentId}).fetch()
        const componentContainerElement = componentElements.find((el) => !el.parentId)
        componentElements
          .filter((el) => el.parentId && el.parentId !== component?.childrenContainerElementId)
          .forEach((el) => {
            if (el.component?._id) {
              allElementComponentIds.push(el.component?._id)
            }
            if (el.parentId === componentContainerElement?._id) {
              allElements.push({...el, parentId: element._id})
            } else {
              allElements.push(el)
            }
          })
      }
      if (element.parentId !== component?.childrenContainerElementId) {
        allElements.push(element)
      }
    })

    if (!selectedComponentId) {
      Meteor.subscribe('selectors.byComponentIds', allElementComponentIds)
      selectors = SelectorsCollection.find({componentId: {$in: allElementComponentIds}}).fetch()
    }

    return {
      allElements,
      theme,
      selectors,
    }
  }, [elements])

  useEffect(() => {
    if (!theme || !selectors) return null
    const css = generateCss({theme, selectors})
    setCss(css)
  }, [theme, selectors])

  useEffect(() => {
    if (selectedComponentId) {
      const selectedComponent = ComponentsCollection.findOne(selectedComponentId)
      const updateComponentElementCustomData = () => {
        setTimeout(() => {
          const domComponents = document.querySelectorAll(`[data-component=${selectedComponent.name}]`)
          if (domComponents?.length > 0) {
            domComponents.forEach((domComp) => {
              if (selectedStyle) {
                domComp?.setAttribute(CUSTOM_ATTR_KEYS.STYLE, selectedStyle)
              }
              if (selectedState) {
                domComp?.setAttribute(CUSTOM_ATTR_KEYS.STATE, selectedState)
              }
            })
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
  const renderChildren = (children) => {
    if (!children || children.length === 0) return null
    return children?.map((element) => {
      let component = ComponentsCollection.findOne(element.component?._id)
      if (!element.parentId) {
        component = ComponentsCollection.findOne(element.componentId)
      }
      const tagName = element?.tagName || ElementsCollection.findOne({componentId: component?._id})?.tagName
      const componentProps = {
        [CUSTOM_ATTR_KEYS.COMPONENT]: component?.name || element.attrs?.[CUSTOM_ATTR_KEYS.COMPONENT],
        [CUSTOM_ATTR_KEYS.STYLE]:
          element.component?.style || component?.styles?.[0] || element.attrs?.[CUSTOM_ATTR_KEYS.STYLE],
        [CUSTOM_ATTR_KEYS.STATE]:
          element.component?.state || component?.states?.[0] || element.attrs?.[CUSTOM_ATTR_KEYS.STATE],
      }
      if (element?.text) {
        return element?.text + '\n'
      }
      if (!tagName) return null
      const children = allElements?.filter((el) => el?.parentId === element._id)
      return React.createElement(
        tagName,
        {
          key: element?._id,
          ...ObjectUtils.omit(['class', 'viewbox', 'style'], ObjectUtils.removeUndefined(element?.attrs)),
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
      <div
        id="__lennaPreview"
        className={`${
          previewReady ? 'opacity-1' : 'opacity-0'
        } transition-opacity duration-250 flex items-center justify-center w-full h-screen`}
      >
        {renderChildren([containerElement])}
      </div>
    </>
  )
}
