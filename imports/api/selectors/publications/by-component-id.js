import {SelectorsCollection} from '../../../collections/selectors'

Meteor.publish('selectors.byComponentId', function ({componentId} = {}) {
  if (!this.userId) {
    return this.ready()
  }
  return SelectorsCollection.find({componentId})
})
