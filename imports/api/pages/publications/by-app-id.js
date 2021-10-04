import {PagesCollection} from '../../../collections/pages'

Meteor.publish('pages.byAppId', function ({appId} = {}) {
  if (!this.userId) {
    return this.ready()
  }
  return PagesCollection.find({appId})
})
