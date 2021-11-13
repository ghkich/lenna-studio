import React from 'react'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {ComponentsList} from '../../containers/ComponentsList'
import {useParams} from 'react-router-dom'

export const Components = () => {
  const {appId} = useParams() || {}

  return (
    <SidebarLayout>
      <ComponentsList appId={appId} />
    </SidebarLayout>
  )
}
