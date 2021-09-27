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
  const [state, setState] = useState('closed')
  return (
    <AuthenticatedLayout>
      <div data-component="Breadcrumbs">
        <div>People</div>
        <a href="#">List</a>
      </div>
      <div className="page-content">
        <div data-component="CustomSelect" data-style="primary" data-state={state}>
          <div onClick={() => setState((prev) => (prev === 'closed' ? 'opened' : 'closed'))}>Select...</div>
          <div className="dropdown">
            <div>Option</div>
            <div>Option</div>
            <div>Option</div>
            <div>Option</div>
          </div>
        </div>
      </div>
      <div className="spacer mb-5"></div>
      <footer>
        <button
          data-component="CustomButton"
          data-style="primary"
          type="button"
          onClick={() => (window.location.href = '/profile')}
        >
          Go to profile
        </button>
      </footer>
    </AuthenticatedLayout>
  )
}

export const Login = () => {
  return (
    <LoginLayout>
      <form>
        <input data-component="CustomInput" type="text" placeholder="email" />
        <input data-component="CustomInput" type="password" placeholder="password" />
        <footer>
          <button
            data-component="CustomButton"
            data-style="primary"
            type="button"
            onClick={() => (window.location.href = '/')}
          >
            Login
          </button>
          <button
            data-component="CustomButton"
            data-style="secondary"
            data-state="idle"
            type="button"
            onClick={() => (window.location.href = '/register')}
          >
            Register
          </button>
          <button data-component="LinkButton" data-style="primary" type="button">
            Remember password
          </button>
        </footer>
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
