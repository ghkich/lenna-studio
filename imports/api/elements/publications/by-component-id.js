import {ElementsCollection} from '../../../collections/elements'

Meteor.publish('elements.byComponentId', function ({componentId} = {}) {
  if (!this.userId) {
    return this.ready()
  }
  return ElementsCollection.find({componentId})
})
