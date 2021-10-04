import React, {useRef} from 'react'
import {Meteor} from 'meteor/meteor'
import {useHistory} from 'react-router-dom'
import {RoutePaths} from '../../app/routes'
import {SidebarLayout} from '../../layouts/SidebarLayout'

export const LoginPage = () => {
  const email = useRef()
  const password = useRef()
  const history = useHistory()

  const handleLogin = (e) => {
    e.preventDefault()
    Meteor.loginWithPassword({email: email.current?.value}, password.current?.value, () => {
      if (Meteor.user()) {
        history.push(RoutePaths.STRUCTURE)
      }
    })
  }

  return (
    <SidebarLayout>
      <form onSubmit={handleLogin} className="bg-gray-200 p-2">
        <input type="text" ref={email} className="mr-2" />
        <input type="password" ref={password} />
        <button type="submit">Login</button>
      </form>
    </SidebarLayout>
  )
}
