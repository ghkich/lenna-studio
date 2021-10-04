import React from 'react'
import {LoginPage} from '../pages/login/LoginPage'
import {StructurePage} from '../pages/structure/StructurePage'
import {ComponentsPage} from '../pages/components/ComponentsPage'
import {InspirationPage} from '../pages/inspiration/InspirationPage'
import {ThemesPage} from '../pages/themes/ThemesPage'

export const RoutePaths = {
  LOGIN: '/login',
  STRUCTURE: '/',
  COMPONENTS: '/components',
  INSPIRATION: '/inspiration',
  THEMES: '/themes',
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
  {
    path: RoutePaths.INSPIRATION,
    component: InspirationPage,
  },
  {
    path: RoutePaths.THEMES,
    component: ThemesPage,
  },
]
