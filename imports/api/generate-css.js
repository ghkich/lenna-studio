import {transformClassToStyle} from './transformClassToStyle'
import {ComponentsCollection} from '../collections/components'
import {SelectorsCollection} from '../collections/selectors'
import {CUSTOM_DATA_KEY} from '../infra/constants/lenna-attr-keys'

export const generateCss = (params) => {
  let selectors = params?.selectors
  if (params?.appId) {
    selectors = SelectorsCollection.find({appId: params.appId}).fetch()
  }
  let styles = ''
  selectors?.forEach((selector) => {
    const component = ComponentsCollection.findOne({_id: selector.componentId})
    if (!component) return
    styles += `[${CUSTOM_DATA_KEY}^='${component.name}'] ${selector.value ? selector.value : ''} {`
    selector?.classes?.forEach((className) => {
      styles += transformClassToStyle(className)
    })
    styles += `}`

    selector?.classesByStyles?.forEach(({style, classes}) => {
      styles += `[${CUSTOM_DATA_KEY}^='${component.name}'][${CUSTOM_DATA_KEY}*='-${style}'] ${
        selector.value ? selector.value : ''
      } {`
      classes?.forEach((className) => {
        styles += transformClassToStyle(className)
      })
      styles += `}`
    })

    selector?.classesByStates?.forEach(({state, classes}) => {
      styles += `[${CUSTOM_DATA_KEY}^='${component.name}'][${CUSTOM_DATA_KEY}*=':${state}'] ${
        selector.value ? selector.value : ''
      } {`
      classes?.forEach((className) => {
        styles += transformClassToStyle(className)
      })
      styles += `}`
    })
  })
  return styles
}
