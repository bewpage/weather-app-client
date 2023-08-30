import React, { ReactElement } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../store/auth';

const PrivateRoute = () => {
  const context = useAuthContext();
  let location = useLocation();

  if (
    context.state.authTokens === 'null' ||
    context.state.authTokens === null
  ) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
