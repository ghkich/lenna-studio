import React from 'react'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {useTracker} from 'meteor/react-meteor-data'
import {Button} from '../../components/basic/Button'
import {PageHeader} from '../../components/PageHeader'

export const Profile = () => {
  const user = useTracker(() => Meteor.user())
  return (
    <SidebarLayout menuMinimized>
      <PageHeader title="Profile" />
      <div className="flex flex-col gap-2 ">
        <Button
          onClick={() => {
            Meteor.logout()
          }}
        >
          Logout
        </Button>
      </div>
    </SidebarLayout>
  )
}
