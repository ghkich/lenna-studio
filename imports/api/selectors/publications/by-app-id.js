import {SelectorsCollection} from '../../../collections/selectors'

Meteor.publish('selectors.byAppId', function ({appId} = {}) {
  if (!this.userId) {
    return this.ready()
  }
  return SelectorsCollection.find({appId})
})
