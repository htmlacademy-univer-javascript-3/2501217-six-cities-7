import { Navigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';

interface PrivateRouteProps {
  children: React.ReactNode;
  authorizationStatus: AuthorizationStatus;
}

export const PrivateRoute = ({ children, authorizationStatus }: PrivateRouteProps) => (
  authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.Login} replace />
);
