import {transformClassToCss} from './transform-class-to-css'
import {ComponentsCollection} from '../collections/components'
import {CUSTOM_ATTR_KEYS} from '../infra/constants/custom-attr-keys'
import {tailwindBaseCss} from './tailwind-base-css'

export const generateCss = ({selectors, theme, includeTailwindBase}) => {
  let cssStyles = includeTailwindBase ? tailwindBaseCss : ''
  selectors?.forEach((selector) => {
    const component = ComponentsCollection.findOne({_id: selector.componentId})
    if (!component) return
    cssStyles += `[${CUSTOM_ATTR_KEYS.COMPONENT}='${component.name}'] ${selector.value ? selector.value : ''} {`
    selector?.classes?.forEach((className) => {
      cssStyles += transformClassToCss(className, theme)
    })
    cssStyles += `}`

    selector?.classesByStyles?.forEach(({style, classes}) => {
      cssStyles += `[${CUSTOM_ATTR_KEYS.COMPONENT}='${component.name}'][${CUSTOM_ATTR_KEYS.STYLE}='${style}'] ${
        selector.value ? selector.value : ''
      } {`
      classes?.forEach((className) => {
        cssStyles += transformClassToCss(className, theme)
      })
      cssStyles += `}`
    })

    selector?.classesByStates?.forEach(({state, classes}) => {
      cssStyles += `[${CUSTOM_ATTR_KEYS.COMPONENT}='${component.name}'][${CUSTOM_ATTR_KEYS.STATE}='${state}'] ${
        selector.value ? selector.value : ''
      } {`
      classes?.forEach((className) => {
        cssStyles += transformClassToCss(className, theme)
      })
      cssStyles += `}`
    })
  })
  return cssStyles
}
