import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LOGIN_PAGE } from "./urls";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {isAuthenticated ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: LOGIN_PAGE,
                  state: { from: props.location },
                }}
              />
            )}
          </>
        );
      }}
    />
  );
};

export default PrivateRoute;
