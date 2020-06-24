import React from 'react';
import Cookie from 'js-cookie'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'

import { Error, Login, Clients } from '../forms'
import { AUTH_COOKIE_SESSION, AUTH_COOKIE_USERNAME, HTTP_CODES } from '../constants';

const isAuth = () => 
  !!Cookie.get(AUTH_COOKIE_SESSION) && !!Cookie.get(AUTH_COOKIE_USERNAME) 

interface PrivateRouteProps {
  path: string,
  component: React.FC<any>,
  authed: boolean
}

const PrivateRoute = ({ component: Component, authed, ...rest }: PrivateRouteProps) => {
  return (
  <Route
    {...rest}
    render={
      (props) => authed
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }}
        />
    }
  />
)
  }

const App = () => (
  <Router>
    <Switch>
      <Route 
        path="/login"
        component={Login}
      />
      <Route 
        path="/error"
        component={Error} 
      />
      <PrivateRoute 
        path="/clients" 
        authed={isAuth()} 
        component={Clients} 
      />
      
      <Redirect exact from='/' to='/clients'/>
      <Route path="*">
        <Error code={HTTP_CODES.NOT_FOUND} />
      </Route>
    </Switch>
  </Router>
)

export default App;
