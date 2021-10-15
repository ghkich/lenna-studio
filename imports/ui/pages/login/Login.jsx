import React from 'react'
import {Meteor} from 'meteor/meteor'
import {useHistory, NavLink} from 'react-router-dom'
import {RoutePaths} from '../../app/routes'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {faSidebarFlip} from '@fortawesome/pro-light-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Button} from '../../components/basic/Button'
import {TextInput} from '../../components/basic/TextInput'
import {useForm} from 'react-hook-form'

export const Login = () => {
  const {register, handleSubmit} = useForm()
  const history = useHistory()

  const onSubmit = ({email, password}) => {
    Meteor.loginWithPassword({email}, password, () => {
      if (Meteor.user()) {
        history.push(RoutePaths.APPS)
      }
    })
  }

  return (
    <SidebarLayout>
      <div className="flex flex-col items-center justify-center p-2 gap-5 w-full h-screen">
        <div className="text-center">
          <FontAwesomeIcon icon={faSidebarFlip} className="text-5xl" />
          <h1 className="text-base font-extralight m-0 mt-1">Lenna Studio</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-8/12">
          <TextInput register={register} name="email" placeholder="E-mail" />
          <TextInput type="password" register={register} name="password" placeholder="Password" />
          <Button type="submit" style="primary">
            Sign in
          </Button>
        </form>
        <div className="pt-4 border-t w-6/12 text-center">
          <NavLink to={RoutePaths.REGISTER} className="uppercase hover:opacity-75">
            Create account
          </NavLink>
        </div>
      </div>
    </SidebarLayout>
  )
}
