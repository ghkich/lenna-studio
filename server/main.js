import {Meteor} from 'meteor/meteor'
import {INITIAL_COMPONENTS_DATA} from '../imports/infra/data/components'
import {INITIAL_PAGE_DATA} from '../imports/infra/data/pages'
import {ComponentsCollection} from '../imports/api/components'
import {PagesCollection} from '../imports/api/pages'
import {INITIAL_THEMES_DATA} from '../imports/infra/data/themes'
import {ThemesCollection} from '../imports/api/themes'
import {INITIAL_ACCOUNTS_DATA} from '../imports/infra/data/accounts'
import {AccountsCollection} from '../imports/api/accounts'

Meteor.methods({
  'components.insert'(component) {
    if (component) {
      return ComponentsCollection.insert(component)
    }
  },
  'components.update'(component) {
    if (component) {
      ComponentsCollection.update(component._id, {$set: {...component}})
    }
  },
  'themes.update'(theme) {
    if (theme) {
      ThemesCollection.update(theme._id, {$set: {...theme}})
    }
  },
  'accounts.update'(account) {
    if (account) {
      AccountsCollection.update(account._id, {$set: {...account}})
    }
  },
})

// Meteor.publish('components', function () {
//   return ComponentsCollection.find()
// })

Meteor.startup(() => {
  if (ComponentsCollection.find().count()) return
  INITIAL_COMPONENTS_DATA.forEach((component) => ComponentsCollection.insert(component))
  INITIAL_PAGE_DATA.forEach((page) => PagesCollection.insert(page))
  INITIAL_THEMES_DATA.forEach((theme) => ThemesCollection.insert(theme))
  INITIAL_ACCOUNTS_DATA.forEach((account) => AccountsCollection.insert(account))
})
