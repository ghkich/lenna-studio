import {Meteor} from 'meteor/meteor'
import {INITIAL_COMPONENTS_DATA} from '../imports/infra/data/components-data'
import {INITIAL_PAGE_DATA} from '../imports/infra/data/pages-data'
import {INITIAL_THEMES_DATA} from '../imports/infra/data/themes-data'
import {
  ComponentsCollection,
  ComponentsMethods,
  ComponentSchema,
  RegisterComponentsPublications,
} from '../imports/api/components'
import {PagesCollection} from '../imports/api/pages'
import {ThemesCollection} from '../imports/api/themes'

Meteor.methods({
  ...ComponentsMethods,
})

RegisterComponentsPublications()

Meteor.startup(() => {
  if (ComponentsCollection.find().count()) return
  INITIAL_COMPONENTS_DATA.forEach((component) => {
    ComponentSchema?.validate(component)
    ComponentsCollection.insert(component)
  })
  INITIAL_PAGE_DATA.forEach((page) => PagesCollection.insert(page))
  INITIAL_THEMES_DATA.forEach((theme) => ThemesCollection.insert(theme))

  Accounts.createUser({
    email: 'gh.kich@gmail.com',
    password: '123456',
  })
})
