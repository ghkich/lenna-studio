import React from 'react'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {ComponentsList} from '../../containers/ComponentsList'

export const Components = () => {
  return (
    <SidebarLayout>
      <ComponentsList />
    </SidebarLayout>
  )
}
