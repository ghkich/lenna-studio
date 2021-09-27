import React, {useState} from 'react'
import {BrowserRouter as Router, Redirect, Switch, Route, useLocation} from 'react-router-dom'
import {authenticatedRoutes, publicRoutes, RoutePaths} from './routes'
import {AuthenticatedLayout} from '../layouts/AuthenticatedLayout'
import {useAppContext} from './AuthContext'

const AuthtenticatedRoute = ({children, authenticated, ...props}) => {
  return (
    <Route
      {...props}
      render={({location}) => {
        if (!authenticated) {
          return (
            <Redirect
              to={{
                pathname: RoutePaths.LOGIN,
                state: {from: location},
              }}
            />
          )
        }

        return children
      }}
    />
  )
}

export const SwitchRoutes = () => {
  const {state} = useAppContext()
  const isAuthenticated = state?.user !== null
  const location = useLocation()

  return (
    <Switch>
      {publicRoutes.map((route, i) => (
        <Route key={i} path={route.path} exact={route.exact} component={route.component} />
      ))}
      {authenticatedRoutes.map((route, i) => (
        <AuthtenticatedRoute key={i} path={route.path} exact={route.exact} authenticated={isAuthenticated}>
          <AuthenticatedLayout user={state?.user}>
            <route.component />
          </AuthenticatedLayout>
        </AuthtenticatedRoute>
      ))}
      <Redirect to={{pathname: isAuthenticated ? RoutePaths.HOME : RoutePaths.LOGIN, state: {from: location}}} />
    </Switch>
  )
}

const MainRouter = () => {
  return (
    <Router>
      <SwitchRoutes />
    </Router>
  )
}

export default MainRouter
