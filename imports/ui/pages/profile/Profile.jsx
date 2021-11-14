import React from 'react'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {useTracker} from 'meteor/react-meteor-data'
import {Button} from '../../components/basic/Button'
import {PageHeader} from '../../components/PageHeader'
import {useMethod} from '../../../infra/hooks/useMethod'
import {TextInput} from '../../components/basic/TextInput'
import {Form} from '../../components/form/Form'

export const Profile = () => {
  const user = useTracker(() => Meteor.user())

  const updateUser = useMethod('accounts.updateUser', {
    onSuccess: () => {},
  })

  const onSubmit = ({username, email}) => {
    updateUser.call(user?._id, {username, email})
  }

  if (!user) return null

  return (
    <SidebarLayout menuMinimized>
      <PageHeader title="Profile" />
      <div className="flex flex-col gap-2 mt-1">
        <Form onSubmit={onSubmit} defaultValues={{username: user.username, email: user.emails?.[0]?.address}}>
          <TextInput name="username" placeholder="Username" />
          <TextInput name="email" placeholder="E-mail" />
          <div className="flex gap-2 pb-2 border-b">
            <Button type="submit" className="flex-1">
              Save
            </Button>
          </div>
        </Form>
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
