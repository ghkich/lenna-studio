import {ComponentsCollection} from '../../../collections/components'
import {SelectorsCollection} from '../../../collections/selectors'
import {ElementsCollection} from '../../../collections/elements'
import {STRUCTURE_TYPES} from '../../../infra/constants/structure-types'

Meteor.methods({
  ['components.create']({name, category, elements}) {
    if (!name) return
    const existingComponentName = ComponentsCollection.find({name}).fetch()
    if (existingComponentName?.length > 0) {
      throw new Meteor.Error('component name already exists')
    }
    const componentId = ComponentsCollection.insert({name, category, userId: this.userId})
    if (componentId && elements) {
      elements.forEach((element) => {
        ElementsCollection.insert({
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
