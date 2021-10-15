import React from 'react'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {PagesList} from '../../containers/PagesList'

export const Pages = () => {
  return (
    <SidebarLayout>
      <PagesList />
    </SidebarLayout>
  )
}
