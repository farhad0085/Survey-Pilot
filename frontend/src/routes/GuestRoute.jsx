import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

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
                pathname: "/",
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