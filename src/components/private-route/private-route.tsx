import { Navigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '@/const';
import { useAppSelector } from '@/hooks/use-store';
import { getAuthorizationStatus } from '@/store/selectors';
import { Spinner } from '@/components/spinner/spinner';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner message="Checking authorization..." />;
  }

  return authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.Login} replace />;
};
