import React, {useRef} from 'react'
import {Meteor} from 'meteor/meteor'
import {useAppContext} from '../../app/AuthContext'
import {useHistory} from 'react-router-dom'
import {RoutePaths} from '../../app/routes'

export const Login = () => {
  const email = useRef()
  const password = useRef()
  const {actions} = useAppContext()
  const history = useHistory()

  const handleLogin = (e) => {
    e.preventDefault()
    Meteor.loginWithPassword({email: email.current?.value}, password.current?.value, () => {
      if (Meteor.user()) {
        actions.setUser(Meteor.user())
        history.push(RoutePaths.HOME)
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleLogin} className="bg-gray-200 p-2">
        <input type="text" ref={email} className="mr-2" />
        <input type="password" ref={password} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
