import {ComponentsCollection} from '../../../collections/components'
import {SelectorsCollection} from '../../../collections/selectors'
import {ElementsCollection} from '../../../collections/elements'
import {STRUCTURE_TYPES} from '../../../infra/constants/structure-types'

Meteor.methods({
  ['components.byName'](name) {
    return ComponentsCollection.findOne({name})
  },
  ['components.create'](component, elements) {
    if (!component?.name) return
    const existingComponentName = ComponentsCollection.find({appId: component?.appId, name: component?.name}).fetch()
    if (existingComponentName?.length > 0) {
      throw new Meteor.Error('component name already exists')
    }
    const componentId = ComponentsCollection.insert({...component, userId: this.userId})
    if (componentId && elements) {
      elements.forEach((element) => {
        ElementsCollection.insert({
          appId: component?.appId,
          userId: this.userId,
          componentId,
          tagName: element.tagName,
          structure: {
            type: STRUCTURE_TYPES.EXPECTED,
          },
        })
      })
    }
    return componentId
  },
  ['components.update']({componentId, ...component}) {
    return ComponentsCollection.update(componentId, {$set: component})
  },
  ['components.addStyle']({componentId, style}) {
    if (!style) return
    return ComponentsCollection.update(componentId, {$addToSet: {styles: style}})
  },
  ['components.removeStyle']({componentId, style}) {
    SelectorsCollection.update(
      {
        componentId,
        'classesByStyles.style': style,
      },
      {
        $pull: {classesByStyles: {style}},
      },
    )
    return ComponentsCollection.update(componentId, {$pull: {styles: style}})
  },
  ['components.addState']({componentId, state}) {
    if (!state) return
    return ComponentsCollection.update(componentId, {$addToSet: {states: state}})
  },
  ['components.removeState']({componentId, state}) {
    SelectorsCollection.update(
      {
        componentId,
        'classesByStates.state': state,
      },
      {
        $pull: {classesByStates: {state}},
      },
    )
    return ComponentsCollection.update(componentId, {$pull: {states: state}})
  },
  ['components.remove'](componentId) {
    ElementsCollection.remove({componentId})
    SelectorsCollection.remove({componentId})
    return ComponentsCollection.remove(componentId)
  },
})
