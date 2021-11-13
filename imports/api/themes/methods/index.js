import {ThemesCollection} from '../../../collections/themes'

Meteor.methods({
  ['themes.create'](theme) {
    if (!theme?.name) return
    const existingPageName = ThemesCollection.find({appId: theme?.appId, name: theme.name}).fetch()
    if (existingPageName?.length > 0) {
      throw new Meteor.Error('theme name already exists')
    }
    const terms = {...theme, userId: this.userId}
    return ThemesCollection.insert(terms)
  },
  ['themes.update'](_id, theme) {
    if (!theme?.name) return
    return ThemesCollection.update(_id, {$set: theme})
  },
  ['themes.remove'](_id) {
    return ThemesCollection.remove(_id)
  },
})
