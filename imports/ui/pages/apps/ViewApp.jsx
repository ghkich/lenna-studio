import React from 'react'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {RoutePaths} from '../../app/routes'
import {PageHeader} from '../../components/PageHeader'
import {useParams} from 'react-router-dom'
import {PagesList} from '../../containers/PagesList'
import {useTracker} from 'meteor/react-meteor-data'
import {AppsCollection} from '../../../collections/apps'

export const ViewApp = () => {
  const {id: appId} = useParams() || {}

  const {app} = useTracker(() => {
    if (!appId) return {}
    const sub = Meteor.subscribe('apps.byId', {appId})
    const app = AppsCollection.findOne({_id: appId})

    return {
      app,
      loading: !sub.ready(),
    }
  }, [appId])

  return (
    <SidebarLayout menuMinimized>
      <PageHeader title={app?.name} goBackTo={RoutePaths.APPS} />
      <PagesList appId={appId} />
    </SidebarLayout>
  )
}
