import React from 'react'
import {Redirect} from 'react-router-dom'
import {RoutePaths} from '../../app/routes'

export const Home = () => {
  return <Redirect to={RoutePaths.APPS} />
}
