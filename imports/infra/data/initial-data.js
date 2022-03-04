import {APPS_SEED} from './apps-data'
import {PAGES_SEED} from './pages-data'
import {COMPONENTS_SEED} from './components-data'
import {THEMES_SEED} from './themes-data'
import {STRUCTURE_TYPES} from '../constants/structure-types'
import {AppsCollection} from '../../collections/apps'
import {PagesCollection} from '../../collections/pages'
import {ComponentsCollection} from '../../collections/components'
import {ThemesCollection} from '../../collections/themes'
import {SelectorsCollection} from '../../collections/selectors'
import {createElementsFor} from '../../api/elements/methods/create-elements-for'

export const loadInitialData = () => {
  if (ComponentsCollection.find().count()) return
  let themeId

  const userId = Accounts.createUser({
    email: 'gh.kich@gmail.com',
    username: 'gustavo',
    password: '123456',
  })

  THEMES_SEED.forEach(
    (theme) =>
      (themeId = ThemesCollection.insert({
        ...theme,
      })),
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

  APPS_SEED.forEach((app) => {
    const appId = AppsCollection.insert({
      ...(app.addForUser ? {userId, themeId} : {}),
      ...app,
    })

    COMPONENTS_SEED.forEach((component) => {
      const componentId = ComponentsCollection.insert({
        ...(app.addForUser ? {userId} : {}),
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
      const layoutComponentId = ComponentsCollection.findOne({name: page.layout})?._id
      const pageId = PagesCollection.insert({
        ...(app.addForUser ? {userId} : {}),
        appId,
        category: page.category,
        layoutComponentId,
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
}
