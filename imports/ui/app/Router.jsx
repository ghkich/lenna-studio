import React, {useState} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export const LoginLayout = ({children}) => (
  <div data-component="LoginLayout">
    <div className="content">{children}</div>
  </div>
)

export const AuthenticatedLayout = ({children}) => (
  <div data-component="AuthenticatedLayout">
    <div className="toolbar">
      username <a href="/login">(logout)</a>
    </div>
    <div className="content">{children}</div>
  </div>
)

export const Home = () => {
  const [state, setState] = useState('Closed')
  return (
    <AuthenticatedLayout>
      <div data-component="CustomSelect" data-style="Default" data-state={state}>
        <div onClick={() => setState((prev) => (prev === 'Closed' ? 'Opened' : 'Closed'))}>Select...</div>
        <div className="dropdown">
          <div>Option</div>
          <div>Option</div>
          <div>Option</div>
          <div>Option</div>
        </div>
      </div>
      <div className="spacer mb-5"></div>
      <button data-component="CustomButton" type="button" onClick={() => (window.location.href = '/profile')}>
        Go to profile
      </button>
    </AuthenticatedLayout>
  )
}

export const Login = () => {
  return (
    <LoginLayout>
      <form>
        <input data-component="CustomInput" type="text" placeholder="email" />
        <input data-component="CustomInput" type="password" placeholder="password" />
        <button data-component="CustomButton" type="button" onClick={() => (window.location.href = '/')}>
          Login
        </button>
      </form>
    </LoginLayout>
  )
}

export const Profile = () => {
  return (
    <AuthenticatedLayout>
      <div data-component="Card">Lorem ipsum dolor sit asimet</div>
    </AuthenticatedLayout>
  )
}
