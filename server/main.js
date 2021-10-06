import {Meteor} from 'meteor/meteor'
import {APPS_SEED} from '../imports/infra/data/apps-data'
import {THEMES_SEED} from '../imports/infra/data/themes-data'
import {PAGES_SEED} from '../imports/infra/data/pages-data'
import {COMPONENTS_SEED} from '../imports/infra/data/components-data'
import {AppSchema, AppsCollection} from '../imports/collections/apps'
import {ThemeSchema, ThemesCollection} from '../imports/collections/themes'
import {PageSchema, PagesCollection} from '../imports/collections/pages'
import {ComponentSchema, ComponentsCollection} from '../imports/collections/components'
import {SelectorSchema, SelectorsCollection} from '../imports/collections/selectors'
import {ElementSchema, ElementsCollection} from '../imports/collections/elements'
import {STRUCTURE_TYPES} from '../imports/infra/constants/structure-types'

// PUBLICATIONS
import '../imports/api/apps/publications/by-user-id'
import '../imports/api/apps/publications/by-category'
import '../imports/api/pages/publications/by-app-id'
import '../imports/api/components/publications/by-id'
import '../imports/api/components/publications/by-app-id'
import '../imports/api/elements/publications/by-component-id'
import '../imports/api/elements/publications/by-page-id'
import '../imports/api/selectors/publications/by-component-id'
import '../imports/api/selectors/publications/by-app-id'

// METHODS
import '../imports/api/pages/methods'
import '../imports/api/components/methods'
import '../imports/api/elements/methods'
import '../imports/api/selectors/methods'

import './api/index'
import {createElementsFor} from '../imports/api/elements/methods/create-elements-for'

// STARTUP
Meteor.startup(() => {
  AppsCollection.attachSchema(AppSchema)
  PagesCollection.attachSchema(PageSchema)
  ThemesCollection.attachSchema(ThemeSchema)
  ComponentsCollection.attachSchema(ComponentSchema)
  SelectorsCollection.attachSchema(SelectorSchema)
  ElementsCollection.attachSchema(ElementSchema)

  if (ComponentsCollection.find().count()) return

  const userId = Accounts.createUser({
    email: 'gh.kich@gmail.com',
    username: 'gustavo',
    password: '123',
  })

  THEMES_SEED.forEach((theme) =>
    ThemesCollection.insert({
      userId,
      ...theme,
    }),
  )

  const createOrUpdateSelectors = ({appId, componentId, selectors, style, state}) => {
    if (!appId || !selectors || !componentId) return
    selectors.forEach(({value, classes}) => {
      const selectorValue = value || undefined
      const selector = SelectorsCollection.findOne({appId, componentId, value: selectorValue}) || {}
      if (selector?._id) {
        if (style) {
          SelectorsCollection.update(
            {_id: selector._id, 'classesByStyles.style': style},
            {
              $pull: {classesByStyles: {style}},
            },
          )
          return SelectorsCollection.update(
            {_id: selector._id},
            {
              $addToSet: {classesByStyles: {style, classes}},
            },
          )
        }
        if (state) {
          SelectorsCollection.update(
            {_id: selector._id, 'classesByStates.state': state},
            {
              $pull: {classesByStates: {state}},
            },
          )
          return SelectorsCollection.update(
            {_id: selector._id},
            {
              $addToSet: {classesByStates: {state, classes}},
            },
          )
        }
        return SelectorsCollection.update(
          {_id: selector._id},
          {
            $set: {classes},
          },
        )
      }
      let propsToInsert = {
        classes,
      }
      if (style) {
        propsToInsert = {
          classesByStyles: [{style, classes}],
        }
      }
      if (state) {
        propsToInsert = {
          classesByStates: [{state, classes}],
        }
      }
      return SelectorsCollection.insert({
        appId,
        componentId,
        value,
        ...propsToInsert,
      })
    })
  }

  APPS_SEED.forEach((app, index) => {
    const themes = ThemesCollection.find().fetch()
    const themeId = index < themes.length - 1 ? themes[index]?._id : themes[0]?._id
    const appId = AppsCollection.insert({
      ...(app.addForUser ? {userId} : {}),
      themeId,
      ...app,
    })

    COMPONENTS_SEED.forEach((component) => {
      const componentId = ComponentsCollection.insert({
        appId,
        name: component.name,
        category: component.category,
      })

      createOrUpdateSelectors({appId, componentId, selectors: component.selectors})

      component.styles?.forEach((style) => {
        createOrUpdateSelectors({appId, componentId, selectors: style.selectors, style: style.value})
        ComponentsCollection.update(
          {_id: componentId},
          {
            $addToSet: {
              styles: style.value,
            },
          },
        )
      })

      component.states?.forEach((state) => {
        createOrUpdateSelectors({appId, componentId, selectors: state.selectors, state: state.value})
        ComponentsCollection.update(
          {_id: componentId},
          {
            $addToSet: {
              states: state.value,
            },
          },
        )
      })
      createElementsFor({
        appId,
        componentId,
        nodes: component.childNodes,
        structureType: STRUCTURE_TYPES.EXPECTED,
      })
    })

    PAGES_SEED.forEach((page) => {
      const pageId = PagesCollection.insert({
        appId,
        name: page.name,
        path: page.path,
      })
      createElementsFor({
        appId,
        pageId,
        nodes: page.childNodes,
        structureType: STRUCTURE_TYPES.EXPECTED,
      })
    })
  })
})
