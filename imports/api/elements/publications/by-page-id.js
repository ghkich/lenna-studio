import {ElementsCollection} from '../../../collections/elements'

Meteor.publish('elements.byPageId', function ({pageId} = {}) {
  if (!this.userId) {
    return this.ready()
  }
  return ElementsCollection.find({pageId})
})
