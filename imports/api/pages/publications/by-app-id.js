import {PagesCollection} from '../../../collections/pages'

Meteor.publish('pages.byAppId', function ({appId} = {}) {
  if (!this.userId) {
    return this.ready()
  }
  let terms = {userId: this.userId, appId}
  if (!appId) {
    terms = {userId: this.userId}
  }
  return PagesCollection.find(terms)
})
