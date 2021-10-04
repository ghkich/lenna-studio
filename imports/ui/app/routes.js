import React from 'react'
import {StructurePage} from '../pages/structure/StructurePage'
import {LoginPage} from '../pages/login/LoginPage'
import {ComponentsPage} from '../pages/components/ComponentsPage'

export const RoutePaths = {
  LOGIN: '/login',
  STRUCTURE: '/',
  COMPONENTS: '/components',
}

export const publicRoutes = [
  {
    path: RoutePaths.LOGIN,
    component: LoginPage,
  },
]

export const authenticatedRoutes = [
  {
    exact: true,
    path: RoutePaths.STRUCTURE,
    component: StructurePage,
  },
  {
    path: RoutePaths.COMPONENTS,
    component: ComponentsPage,
  },
]
