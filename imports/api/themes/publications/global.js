import {ThemesCollection} from '../../../collections/themes'

Meteor.publish('themes.global', function () {
  if (!this.userId) {
    return this.ready()
  }
  return ThemesCollection.find({userId: {$exists: false}})
})
