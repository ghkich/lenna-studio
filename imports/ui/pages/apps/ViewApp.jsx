import React from 'react'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {RoutePaths} from '../../app/routes'
import {PageHeader} from '../../components/PageHeader'
import {useParams} from 'react-router-dom'
import {PagesList} from '../../containers/PagesList'

export const ViewApp = () => {
  const {id: appId} = useParams() || {}

  return (
    <SidebarLayout menuMinimized>
      <PageHeader title="View app" goBackTo={RoutePaths.APPS} />
      <PagesList appId={appId} />
    </SidebarLayout>
  )
}
