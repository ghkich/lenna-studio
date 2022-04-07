import React from 'react'
import {useHistory, NavLink} from 'react-router-dom'
import {RoutePaths} from '../../app/routes'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {faSidebarFlip} from '@fortawesome/pro-thin-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Button} from '../../components/basic/Button'
import {Form} from '../../components/form/Form'
import {TextInput} from '../../components/basic/TextInput'
import {useMethod} from '../../../infra/hooks/useMethod'

export const Register = () => {
  const history = useHistory()

  const createUser = useMethod('accounts.createUser', {
    onSuccess: () => {
      history.push(`${RoutePaths.LOGIN}`)
    },
  })

  const onSubmit = ({username, email, password, confirmPassword}) => {
    if (password === confirmPassword) {
      createUser.call({username, email, password})
    }
  }

  return (
    <SidebarLayout>
      <div className="flex flex-col items-center justify-center p-2 gap-5 w-full h-screen">
        <div className="text-center">
          <FontAwesomeIcon icon={faSidebarFlip} className="text-5xl text-gray-400" />
          <h1 className="text-base font-thin m-0 mt-1">Lenna Studio</h1>
        </div>
        <Form onSubmit={onSubmit} className="w-8/12">
          <TextInput name="username" placeholder="Username" />
          <TextInput name="email" placeholder="E-mail" />
          <TextInput type="password" name="password" placeholder="Password" />
          <TextInput type="password" name="confirmPassword" placeholder="Confirm Password" />
          <Button type="submit" style="primary">
            Create
          </Button>
        </Form>
        <div className="pt-4 border-t w-6/12 text-center">
          <NavLink to={RoutePaths.LOGIN} className="uppercase hover:opacity-75">
            Back to Login
          </NavLink>
        </div>
      </div>
    </SidebarLayout>
  )
}
