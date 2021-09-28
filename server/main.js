import {Meteor} from 'meteor/meteor'
import {INITIAL_COMPONENTS_DATA} from '../imports/infra/data/components-data'
import {INITIAL_PAGE_DATA} from '../imports/infra/data/pages-data'
import {INITIAL_THEMES_DATA} from '../imports/infra/data/themes-data'
import {ComponentsApi} from '../imports/api/components'
import {ElementsApi} from '../imports/api/elements'
import {PagesApi} from '../imports/api/pages'
import {ThemesApi} from '../imports/api/themes'

Meteor.methods({
  ...ElementsApi.getMethods(),
  ...ComponentsApi.getMethods(),
  ...ThemesApi.getMethods(),
  ...PagesApi.getMethods(),
})

PagesApi.registerPublications()
ElementsApi.registerPublications()
ComponentsApi.registerPublications()
ThemesApi.registerPublications()

Meteor.startup(() => {
  if (ComponentsApi.collection.find().count()) return
  INITIAL_COMPONENTS_DATA.forEach((component) => {
    ComponentsApi.collection.insert(component)
  })
  INITIAL_PAGE_DATA.forEach((page) => PagesApi.collection.insert(page))
  INITIAL_THEMES_DATA.forEach((theme) => ThemesApi.collection.insert(theme))

  Accounts.createUser({
    email: 'gh.kich@gmail.com',
    password: '123456',
  })
})
