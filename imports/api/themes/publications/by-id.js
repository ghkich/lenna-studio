import {ThemesCollection} from '../../../collections/themes'

Meteor.publish('themes.byId', function ({themeId} = {}) {
  if (!this.userId) {
    return this.ready()
  }
  return ThemesCollection.find({_id: themeId})
})
