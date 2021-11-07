import {ThemesCollection} from '../../../collections/themes'

Meteor.publish('themes.byUserId', function () {
  if (!this.userId) {
    return this.ready()
  }
  return ThemesCollection.find({userId: this.userId})
})
