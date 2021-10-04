import {transformClassToStyle} from './transformClassToStyle'
import {ComponentsCollection} from '../collections/components'
import {SelectorsCollection} from '../collections/selectors'
import {LENNA_ATTR_KEYS} from '../infra/constants/lenna-attr-keys'

export const generateCss = (params) => {
  let selectors = params?.selectors
  if (params?.appId) {
    selectors = SelectorsCollection.find({appId: params.appId}).fetch()
  }
  let styles = ''
  selectors?.forEach((selector) => {
    const component = ComponentsCollection.findOne({_id: selector.componentId})
    styles += `[${LENNA_ATTR_KEYS.COMPONENT}='${component.name}'] ${selector.value ? selector.value : ''} {`
    selector?.classes?.forEach((className) => {
      styles += transformClassToStyle(className)
    })
    styles += `}`

    selector?.classesByStates?.forEach(({state, classes}) => {
      styles += `[${LENNA_ATTR_KEYS.COMPONENT}='${component.name}'][${LENNA_ATTR_KEYS.STATE}='${state}'] ${
        selector.value ? selector.value : ''
      } {`
      classes?.forEach((className) => {
        styles += transformClassToStyle(className)
      })
    })

    selector?.classesByStyles?.forEach(({style, classes}) => {
      styles += `[${LENNA_ATTR_KEYS.COMPONENT}='${component.name}'][${LENNA_ATTR_KEYS.STYLE}='${style}'] ${
        selector.value ? selector.value : ''
      } {`
      classes?.forEach((className) => {
        styles += transformClassToStyle(className)
      })
    })
  })
  return styles
}
