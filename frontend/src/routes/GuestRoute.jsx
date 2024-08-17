import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import { DASHBOARD_PAGE } from './urls';

const GuestRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth()

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {!isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: DASHBOARD_PAGE,
                search: props.location.search,
                state: {
                  from: props.location,
                  search: props.location.search
                },
              }}
            />
          )}
        </>
      )}
    />
  );
};


export default GuestRoute