import {SelectorsCollection} from '../../../collections/selectors'

Meteor.publish('selectors.byComponentIds', function (componentIds = []) {
  if (!this.userId) {
    return this.ready()
  }
  return SelectorsCollection.find({componentId: {$in: componentIds}})
})
