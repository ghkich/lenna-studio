import React from 'react'
import {Home} from '../pages/home/Home'
import {Login} from '../pages/login/Login'
import {Components} from '../pages/components/Components'

export const RoutePaths = {
  LOGIN: '/login',
  HOME: '/',
  COMPONENTS: '/components',
}

export const publicRoutes = [
  {
    path: RoutePaths.LOGIN,
    component: Login,
  },
]

export const authenticatedRoutes = [
  {
    exact: true,
    path: RoutePaths.HOME,
    component: Home,
  },
  {
    path: RoutePaths.COMPONENTS,
    component: Components,
  },
]
