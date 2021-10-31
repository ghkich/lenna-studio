import React from 'react'
import {Login} from '../pages/login/Login'
import {Components} from '../pages/components/Components'
import {Themes} from '../pages/themes/Themes'
import {Register} from '../pages/register/Register'
import {Apps} from '../pages/apps/Apps'
import {Profile} from '../pages/profile/Profile'
import {NewApp} from '../pages/apps/NewApp'
import {ViewApp} from '../pages/apps/ViewApp'
import {Pages} from '../pages/pages/Pages'
import {Home} from '../pages/home/Home'
import {NewPage} from '../pages/pages/NewPage'
import {NewComponent} from '../pages/components/NewComponent'
import {ViewComponent} from '../pages/components/ViewComponent'
import {ViewPage} from '../pages/pages/ViewPage'

export const RoutePaths = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  APPS: '/apps',
  NEW_APP: '/apps/new',
  COMPONENTS: '/components',
  NEW_COMPONENT: '/components/new',
  PAGES: '/pages',
  NEW_PAGE: '/pages/new',
  THEMES: '/themes',
  NEW_THEME: '/themes/new',
}

export const publicRoutes = [
  {
    path: RoutePaths.LOGIN,
    component: Login,
  },
  {
    path: RoutePaths.REGISTER,
    component: Register,
  },
]

export const authenticatedRoutes = [
  {
    exact: true,
    path: RoutePaths.HOME,
    component: Home,
  },
  {
    exact: true,
    path: RoutePaths.APPS,
    component: Apps,
  },
  {
    exact: true,
    path: RoutePaths.NEW_APP,
    component: NewApp,
  },
  {
    exact: true,
    path: `${RoutePaths.APPS}/:id`,
    component: ViewApp,
  },
  {
    exact: true,
    path: RoutePaths.PAGES,
    component: Pages,
  },
  {
    exact: true,
    path: RoutePaths.NEW_PAGE,
    component: NewPage,
  },
  {
    exact: true,
    path: `${RoutePaths.APPS}/:id${RoutePaths.NEW_PAGE}`,
    component: NewPage,
  },
  {
    exact: true,
    path: `${RoutePaths.PAGES}/:id`,
    component: ViewPage,
  },
  {
    exact: true,
    path: RoutePaths.COMPONENTS,
    component: Components,
  },
  {
    exact: true,
    path: RoutePaths.NEW_COMPONENT,
    component: NewComponent,
  },
  {
    exact: true,
    path: `${RoutePaths.APPS}/:id${RoutePaths.NEW_COMPONENT}`,
    component: NewComponent,
  },
  {
    exact: true,
    path: `${RoutePaths.COMPONENTS}/:id`,
    component: ViewComponent,
  },
  {
    path: RoutePaths.THEMES,
    component: Themes,
  },
  {
    path: RoutePaths.PROFILE,
    component: Profile,
  },
]
