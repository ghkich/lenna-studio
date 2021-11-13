import React from 'react'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {PagesList} from '../../containers/PagesList'
import {useParams} from 'react-router-dom'

export const Pages = () => {
  const {appId} = useParams() || {}

  return (
    <SidebarLayout>
      <PagesList appId={appId} />
    </SidebarLayout>
  )
}
