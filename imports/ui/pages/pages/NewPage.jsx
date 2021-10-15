import React from 'react'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {PageHeader} from '../../components/PageHeader'

export const NewPage = () => {
  return (
    <SidebarLayout menuMinimized>
      <PageHeader title="New page" />
    </SidebarLayout>
  )
}
