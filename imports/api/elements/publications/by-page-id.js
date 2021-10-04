import {ElementsCollection} from '../../../collections/elements'

Meteor.publish('elements.byPageId', function ({pageId, structureType} = {}) {
  if (!this.userId) {
    return this.ready()
  }
  return ElementsCollection.find({pageId, 'structure.type': structureType})
})
