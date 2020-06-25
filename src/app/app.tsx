import React from 'react';
import Cookie from 'js-cookie'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Error, Login, Clients } from '../forms'
import { http } from '../constants';

const { AUTH_COOKIE_SESSION, AUTH_COOKIE_USERNAME, HTTP_CODES } = http

const isAuth = () => 
  !!Cookie.get(AUTH_COOKIE_SESSION) && !!Cookie.get(AUTH_COOKIE_USERNAME) 

interface PrivateRouteProps {
  path: string,
  children: JSX.Element,
}

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
  console.log('auth', isAuth())
  return (
    <Route
      {...rest}
      render={
        ({ location }) => isAuth()
          ? children
          : <Redirect to={{ 
              pathname: '/login', 
              state: { from: location }
            }}
          />
      }
    />
  )
}

const App = () => (
  <Router>
    <Switch>
      <Route path="/error">
        <Error />
      </Route>
      <PrivateRoute path="/clients">
        <Clients/>
      </PrivateRoute>
      <Route path="/login">
        <Login />
      </Route>
      <Redirect from='/' to={{ pathname: '/clients' }}/>
      <Route path="*">
        <Error code={HTTP_CODES.NOT_FOUND} />
      </Route>
    </Switch>
  </Router>
)

export default App;
