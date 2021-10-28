import {ComponentsCollection} from '../../../collections/components'

Meteor.publish('components.byAppId', function ({appId} = {}) {
  if (!this.userId) {
    return this.ready()
  }
  let terms = {userId: this.userId, appId}
  if (!appId) {
    terms = {userId: this.userId}
  }
  return ComponentsCollection.find(terms)
})
