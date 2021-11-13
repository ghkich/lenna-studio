import React from 'react'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {ThemesList} from '../../containers/themes/ThemesList'
import {useParams} from 'react-router-dom'

export const Themes = () => {
  const {appId} = useParams() || {}

  return (
    <SidebarLayout>
      <ThemesList appId={appId} />
    </SidebarLayout>
  )
}
