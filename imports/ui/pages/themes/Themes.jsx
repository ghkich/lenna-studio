import React from 'react'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {ThemesList} from '../../containers/themes/ThemesList'

export const Themes = () => {
  return (
    <SidebarLayout>
      <ThemesList />
    </SidebarLayout>
  )
}
