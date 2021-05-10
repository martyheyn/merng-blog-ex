// Checks if we are logged in
// redirects us to homepage if we try to access the login or register pages
import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';

export const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
};

export const AuthRouteProfile = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to='/' />
      }
    />
  );
};
