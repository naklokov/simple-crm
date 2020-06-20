import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'

import { Error, Login } from '../forms'

interface PrivateRouteProps {
  component: React.FC<any>,
  authed: boolean,
}

const PrivateRoute = ({ component: Component, authed, ...rest }: PrivateRouteProps) => (
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

const App = () => (
  <Router>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/error">
        <Error />
      </Route>
      <Route path="/">
        <Link to="/error">Error</Link>
        <br />
        <Link to="/login">Authorization</Link>
      </Route>
    </Switch>
  </Router>
)

export default App;
