import {useTracker} from 'meteor/react-meteor-data'
import {PagesCollection} from '../../api/pages'
import {ComponentsCollection} from '../../api/components'
import {ThemesCollection} from '../../api/themes'
import {AccountsCollection} from '../../api/accounts'

export const usePages = () =>
  useTracker(() => {
    const subscription = Meteor.subscribe('pages')
    const pages = PagesCollection.find().fetch()
    return {
      data: pages,
      status: !subscription.ready() ? 'loading' : 'ready',
    }
  }, [])

export const useComponents = () =>
  useTracker(() => {
    const subscription = Meteor.subscribe('components')
    const components = ComponentsCollection.find().fetch()
    return {
      data: components,
      status: !subscription.ready() ? 'loading' : 'ready',
    }
  }, [])

export const useThemes = () =>
  useTracker(() => {
    const subscription = Meteor.subscribe('themes')
    const themes = ThemesCollection.find().fetch()
    return {
      data: themes,
      status: !subscription.ready() ? 'loading' : 'ready',
    }
  }, [])

export const useAccounts = () =>
  useTracker(() => {
    const subscription = Meteor.subscribe('accounts')
    const accounts = AccountsCollection.find().fetch()
    return {
      data: accounts,
      status: !subscription.ready() ? 'loading' : 'ready',
    }
  }, [])
