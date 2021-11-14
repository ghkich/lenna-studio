import {Meteor} from 'meteor/meteor'
import {AppSchema, AppsCollection} from '../imports/collections/apps'
import {ThemeSchema, ThemesCollection} from '../imports/collections/themes'
import {PageSchema, PagesCollection} from '../imports/collections/pages'
import {ComponentSchema, ComponentsCollection} from '../imports/collections/components'
import {SelectorSchema, SelectorsCollection} from '../imports/collections/selectors'
import {ElementSchema, ElementsCollection} from '../imports/collections/elements'

// PUBLICATIONS
import '../imports/api/apps/publications/by-user-id'
import '../imports/api/apps/publications/by-category'
import '../imports/api/apps/publications/by-id'
import '../imports/api/pages/publications/by-app-id'
import '../imports/api/pages/publications/by-category'
import '../imports/api/pages/publications/by-id'
import '../imports/api/components/publications/by-app-id'
import '../imports/api/components/publications/by-category'
import '../imports/api/components/publications/by-id'
import '../imports/api/components/publications/by-ids'
import '../imports/api/elements/publications/by-app-id'
import '../imports/api/elements/publications/by-component-id'
import '../imports/api/elements/publications/by-component-ids'
import '../imports/api/elements/publications/by-page-id'
import '../imports/api/selectors/publications/by-app-id'
import '../imports/api/selectors/publications/by-component-id'
import '../imports/api/selectors/publications/by-component-ids'
import '../imports/api/themes/publications/by-id'
import '../imports/api/themes/publications/by-user-id'
import '../imports/api/themes/publications/global'

// METHODS
import '../imports/api/apps/methods'
import '../imports/api/pages/methods'
import '../imports/api/components/methods'
import '../imports/api/elements/methods'
import '../imports/api/selectors/methods'
import '../imports/api/themes/methods'

// REST API
import './rest-api/index'

// STARTUP
Meteor.startup(() => {
  AppsCollection.attachSchema(AppSchema)
  PagesCollection.attachSchema(PageSchema)
  ThemesCollection.attachSchema(ThemeSchema)
  ComponentsCollection.attachSchema(ComponentSchema)
  SelectorsCollection.attachSchema(SelectorSchema)
  ElementsCollection.attachSchema(ElementSchema)
})
