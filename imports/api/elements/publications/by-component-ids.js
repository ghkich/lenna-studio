import {ElementsCollection} from '../../../collections/elements'

Meteor.publish('elements.byComponentIds', function (componentIds = []) {
  if (!this.userId) {
    return this.ready()
  }
  return ElementsCollection.find({componentId: {$in: componentIds}})
})
