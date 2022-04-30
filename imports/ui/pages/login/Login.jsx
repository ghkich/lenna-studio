import React, {useState} from 'react'
import {Meteor} from 'meteor/meteor'
import {useHistory, NavLink, Redirect} from 'react-router-dom'
import {RoutePaths} from '../../app/routes'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {faSidebarFlip} from '@fortawesome/pro-thin-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Button} from '../../components/basic/Button'
import {Form} from '../../components/form/Form'
import {TextInput} from '../../components/basic/TextInput'
import {useTracker} from 'meteor/react-meteor-data'

export const Login = () => {
  const history = useHistory()
  const user = useTracker(() => Meteor.user())
  const [loading, setLoading] = useState(false)

  if (user) {
    return <Redirect to={RoutePaths.APPS} />
  }

  const onSubmit = ({email, password}) => {
    setLoading(true)
    Meteor.loginWithPassword({email}, password, () => {
      setLoading(false)
      if (Meteor.user()) {
        window.top.postMessage({message: 'forceNavigation'}, '*')
        history.push(RoutePaths.APPS)
      } else {
        alert('E-mail or password is incorrect')
      }
    })
  }

  return (
    <SidebarLayout animateSidebar loading={loading}>
      <div className="flex flex-col items-center justify-center p-2 gap-5 w-full h-screen">
        <div className="text-center">
          <FontAwesomeIcon icon={faSidebarFlip} className="text-5xl text-gray-400" />
          <h1 className="text-base font-thin m-0 mt-1">Lenna Studio</h1>
        </div>
        <Form onSubmit={onSubmit} defaultValues={{email: 'demo@lenna.studio', password: '123456'}} className="w-8/12">
          <TextInput name="email" placeholder="E-mail" required />
          <TextInput type="password" name="password" placeholder="Password" required />
          <Button type="submit" style="primary">
            Sign in
          </Button>
        </Form>
        <div className="pt-4 border-t w-6/12 text-center">
          <NavLink to={RoutePaths.REGISTER} className="uppercase hover:opacity-75">
            Create account
          </NavLink>
        </div>
      </div>
    </SidebarLayout>
  )
}
