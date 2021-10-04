import {ComponentsCollection} from '../../../collections/components'
import {SelectorsCollection} from '../../../collections/selectors'

Meteor.methods({
  ['components.create'](component) {
    const existingComponentName = ComponentsCollection.find({appId: component.appId, name: component.name}).fetch()
    if (existingComponentName?.length > 0) {
      throw new Meteor.Error('component name already exists')
    }
    return ComponentsCollection.insert(component)
  },
  ['components.update']({_id, ...component}) {
    return ComponentsCollection.update(_id, {$set: component})
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
})
