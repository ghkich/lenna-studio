import {transformClassToCss} from './transform-class-to-css'
import {ComponentsCollection} from '../collections/components'
import {SelectorsCollection} from '../collections/selectors'
import {CUSTOM_ATTR_KEYS} from '../infra/constants/custom-attr-keys'

export const generateCss = (params) => {
  let selectors = params?.selectors
  if (params?.appId) {
    selectors = SelectorsCollection.find({appId: params.appId}).fetch()
  }
  let cssStyles = ''
  selectors?.forEach((selector) => {
    const component = ComponentsCollection.findOne({_id: selector.componentId})
    if (!component) return
    cssStyles += `[${CUSTOM_ATTR_KEYS.COMPONENT}='${component.name}'] ${selector.value ? selector.value : ''} {`
    selector?.classes?.forEach((className) => {
      cssStyles += transformClassToCss(className)
    })
    cssStyles += `}`

    selector?.classesByStyles?.forEach(({style, classes}) => {
      cssStyles += `[${CUSTOM_ATTR_KEYS.COMPONENT}='${component.name}'][${CUSTOM_ATTR_KEYS.STYLE}='${style}'] ${
        selector.value ? selector.value : ''
      } {`
      classes?.forEach((className) => {
        cssStyles += transformClassToCss(className)
      })
      cssStyles += `}`
    })

    selector?.classesByStates?.forEach(({state, classes}) => {
      cssStyles += `[${CUSTOM_ATTR_KEYS.COMPONENT}='${component.name}'][${CUSTOM_ATTR_KEYS.STATE}='${state}'] ${
        selector.value ? selector.value : ''
      } {`
      classes?.forEach((className) => {
        cssStyles += transformClassToCss(className)
      })
      cssStyles += `}`
    })
  })
  return cssStyles
}
